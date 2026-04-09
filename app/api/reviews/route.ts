import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { bookingId, rating, comment, cleanliness, accuracy, checkIn, communication, location, value } = await req.json();

  if (!bookingId || !rating || !comment) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Verify the booking belongs to this guest and is COMPLETED or CONFIRMED
  const booking = await db.booking.findUnique({
    where: { id: bookingId },
    include: { review: true },
  });

  if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  if (booking.guestId !== session.user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (!["COMPLETED", "CONFIRMED"].includes(booking.status)) {
    return NextResponse.json({ error: "Can only review completed or confirmed bookings" }, { status: 400 });
  }
  if (booking.review) {
    return NextResponse.json({ error: "Already reviewed" }, { status: 409 });
  }

  const review = await db.review.create({
    data: {
      rating,
      comment,
      cleanliness: cleanliness ?? rating,
      accuracy: accuracy ?? rating,
      checkIn: checkIn ?? rating,
      communication: communication ?? rating,
      location: location ?? rating,
      value: value ?? rating,
      authorId: session.user.id,
      listingId: booking.listingId,
      bookingId,
    },
  });

  // Update listing avgRating and totalReviews
  const allReviews = await db.review.findMany({
    where: { listingId: booking.listingId },
    select: { rating: true },
  });
  const avg = allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length;
  await db.listing.update({
    where: { id: booking.listingId },
    data: { avgRating: Math.round(avg * 100) / 100, totalReviews: allReviews.length },
  });

  return NextResponse.json(review, { status: 201 });
}
