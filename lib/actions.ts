"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

// ─── Toggle Favorite ──────────────────────────────────────────────────────────
export async function toggleFavorite(listingId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  const existing = await db.favorite.findUnique({
    where: { userId_listingId: { userId: session.user.id, listingId } },
  });

  if (existing) {
    await db.favorite.delete({
      where: { userId_listingId: { userId: session.user.id, listingId } },
    });
    revalidatePath("/listings");
    revalidatePath("/dashboard/favorites");
    return { favorited: false };
  } else {
    await db.favorite.create({ data: { userId: session.user.id, listingId } });
    revalidatePath("/listings");
    revalidatePath("/dashboard/favorites");
    return { favorited: true };
  }
}

// ─── Create Booking ───────────────────────────────────────────────────────────
const createBookingSchema = z.object({
  listingId: z.string(),
  checkIn: z.string(),
  checkOut: z.string(),
  guests: z.number().int().min(1),
});

export async function createBooking(data: z.infer<typeof createBookingSchema>) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  const parsed = createBookingSchema.safeParse(data);
  if (!parsed.success) return { error: "Invalid booking data" };

  const { listingId, checkIn, checkOut, guests } = parsed.data;

  const listing = await db.listing.findUnique({ where: { id: listingId } });
  if (!listing) return { error: "Listing not found" };

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const nights = Math.round(
    (checkOutDate.getTime() - checkInDate.getTime()) / 86400000
  );

  if (nights < 1) return { error: "Invalid dates" };

  const subtotal = Number(listing.pricePerNight) * nights;
  const cleaningFee = Number(listing.cleaningFee);
  const serviceFee = Math.round(subtotal * 0.12);
  const taxes = Math.round((subtotal + cleaningFee + serviceFee) * 0.08);
  const totalPrice = subtotal + cleaningFee + serviceFee + taxes;

  // Check for conflicting bookings
  const conflict = await db.booking.findFirst({
    where: {
      listingId,
      status: { in: ["PENDING", "CONFIRMED"] },
      AND: [
        { checkIn: { lt: checkOutDate } },
        { checkOut: { gt: checkInDate } },
      ],
    },
  });

  if (conflict) return { error: "These dates are unavailable" };

  const booking = await db.booking.create({
    data: {
      checkIn: checkInDate,
      checkOut: checkOutDate,
      adults: guests,
      totalNights: nights,
      subtotal,
      cleaningFee,
      serviceFee,
      taxes,
      totalPrice,
      status: listing.instantBook ? "CONFIRMED" : "PENDING",
      guestId: session.user.id,
      listingId,
    },
  });

  revalidatePath("/dashboard/bookings");
  return { booking, success: true };
}

// ─── Cancel Booking ───────────────────────────────────────────────────────────
export async function cancelBooking(bookingId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  const booking = await db.booking.findUnique({ where: { id: bookingId } });
  if (!booking) return { error: "Booking not found" };
  if (booking.guestId !== session.user.id) return { error: "Unauthorized" };
  if (!["PENDING", "CONFIRMED"].includes(booking.status)) {
    return { error: "Booking cannot be cancelled" };
  }

  await db.booking.update({
    where: { id: bookingId },
    data: { status: "CANCELLED" },
  });

  revalidatePath("/dashboard/bookings");
  return { success: true };
}

// ─── Submit Review ────────────────────────────────────────────────────────────
const reviewSchema = z.object({
  bookingId: z.string(),
  listingId: z.string(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(10),
  cleanliness: z.number().int().min(1).max(5),
  accuracy: z.number().int().min(1).max(5),
  checkIn: z.number().int().min(1).max(5),
  communication: z.number().int().min(1).max(5),
  location: z.number().int().min(1).max(5),
  value: z.number().int().min(1).max(5),
});

export async function submitReview(data: z.infer<typeof reviewSchema>) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  const parsed = reviewSchema.safeParse(data);
  if (!parsed.success) return { error: "Invalid review data" };

  const booking = await db.booking.findUnique({
    where: { id: parsed.data.bookingId },
  });

  if (!booking || booking.guestId !== session.user.id) {
    return { error: "Unauthorized" };
  }
  if (booking.status !== "COMPLETED") {
    return { error: "Can only review completed stays" };
  }

  const review = await db.review.create({
    data: {
      ...parsed.data,
      authorId: session.user.id,
    },
  });

  // Update listing avgRating
  const allReviews = await db.review.findMany({
    where: { listingId: parsed.data.listingId },
    select: { rating: true },
  });
  const avgRating =
    allReviews.reduce((a, r) => a + r.rating, 0) / allReviews.length;
  await db.listing.update({
    where: { id: parsed.data.listingId },
    data: { avgRating, totalReviews: allReviews.length },
  });

  revalidatePath(`/listings/${parsed.data.listingId}`);
  return { review, success: true };
}

// ─── Create Listing ───────────────────────────────────────────────────────────
const createListingSchema = z.object({
  title: z.string().min(10),
  description: z.string().min(50),
  propertyType: z.string(),
  pricePerNight: z.number().positive(),
  cleaningFee: z.number().min(0),
  maxGuests: z.number().int().min(1),
  bedrooms: z.number().int().min(0),
  beds: z.number().int().min(1),
  bathrooms: z.number().int().min(1),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  zipCode: z.string().default("00000"),
  latitude: z.number().default(0),
  longitude: z.number().default(0),
  cancellationPolicy: z.string().default("MODERATE"),
  instantBook: z.boolean().default(false),
  amenities: z.array(z.string()).default([]),
  images: z.array(z.string()).default([]),
});

export async function createListing(data: z.infer<typeof createListingSchema>) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  const parsed = createListingSchema.safeParse(data);
  if (!parsed.success) return { error: "Invalid listing data" };

  // Generate slug
  const base = parsed.data.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const slug = `${base}-${Date.now()}`;

  const listing = await db.listing.create({
    data: {
      ...parsed.data,
      slug,
      propertyType: parsed.data.propertyType as any,
      amenities: parsed.data.amenities as any[],
      cancellationPolicy: parsed.data.cancellationPolicy as any,
      pricePerNight: parsed.data.pricePerNight,
      cleaningFee: parsed.data.cleaningFee,
      hostId: session.user.id,
    },
  });

  // Promote user to HOST role
  await db.user.update({
    where: { id: session.user.id },
    data: { role: "HOST" },
  });

  revalidatePath("/host/listings");
  redirect(`/host/listings/${listing.id}/edit`);
}
