import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  const bookings = await db.booking.findMany({
    where: {
      listing: { hostId: session.user.id },
      ...(status ? { status: status as any } : {}),
    },
    include: {
      listing: {
        select: { id: true, title: true, slug: true, images: true, city: true, country: true },
      },
      guest: {
        select: { id: true, name: true, email: true, image: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(bookings);
}

// PATCH — host can confirm or cancel a booking
export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { bookingId, status } = await req.json();
  if (!bookingId || !["CONFIRMED", "CANCELLED"].includes(status)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const booking = await db.booking.findUnique({
    where: { id: bookingId },
    include: { listing: { select: { hostId: true } } },
  });

  if (!booking || booking.listing.hostId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const updated = await db.booking.update({
    where: { id: bookingId },
    data: { status },
  });

  return NextResponse.json(updated);
}
