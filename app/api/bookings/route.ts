import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bookings = await db.booking.findMany({
    where: { guestId: session.user.id },
    include: {
      listing: {
        select: {
          id: true, title: true, slug: true, city: true,
          country: true, images: true, pricePerNight: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(bookings);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { listingId, checkIn, checkOut, guests } = body;

  if (!listingId || !checkIn || !checkOut) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const listing = await db.listing.findUnique({ where: { id: listingId } });
  if (!listing) return NextResponse.json({ error: "Listing not found" }, { status: 404 });

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const nights = Math.round((checkOutDate.getTime() - checkInDate.getTime()) / 86400000);

  if (nights < 1) return NextResponse.json({ error: "Invalid dates" }, { status: 400 });

  const subtotal = Number(listing.pricePerNight) * nights;
  const cleaningFee = Number(listing.cleaningFee);
  const serviceFee = Math.round(subtotal * 0.12);
  const taxes = Math.round((subtotal + cleaningFee + serviceFee) * 0.08);
  const totalPrice = subtotal + cleaningFee + serviceFee + taxes;

  // Use a transaction so the conflict check + booking creation are atomic
  // This prevents race conditions where two users book the same dates simultaneously
  let booking;
  try {
    booking = await db.$transaction(async (tx) => {
      const conflict = await tx.booking.findFirst({
        where: {
          listingId,
          status: { in: ["PENDING", "CONFIRMED"] },
          AND: [{ checkIn: { lt: checkOutDate } }, { checkOut: { gt: checkInDate } }],
        },
      });
      if (conflict) throw new Error("DATES_UNAVAILABLE");

      return tx.booking.create({
        data: {
          checkIn: checkInDate,
          checkOut: checkOutDate,
          adults: guests ?? 1,
          totalNights: nights,
          subtotal, cleaningFee, serviceFee, taxes, totalPrice,
          status: listing.instantBook ? "CONFIRMED" : "PENDING",
          guestId: session.user.id,
          listingId,
        },
      });
    });
  } catch (err: any) {
    if (err.message === "DATES_UNAVAILABLE") {
      return NextResponse.json({ error: "Dates unavailable" }, { status: 409 });
    }
    throw err;
  }

  return NextResponse.json(booking, { status: 201 });
}
