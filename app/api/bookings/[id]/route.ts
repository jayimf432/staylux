import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_req: Request, { params }: Params) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const booking = await db.booking.findUnique({
      where: { id },
      include: {
        listing: {
          include: {
            host: { select: { id: true, name: true, image: true, bio: true } },
          },
        },
        guest: { select: { id: true, name: true, email: true, image: true } },
        review: {
          include: {
            author: { select: { id: true, name: true, image: true } },
          },
        },
      },
    });

    if (!booking) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Only the guest or the host can view the booking
    const isGuest = booking.guestId === session.user.id;
    const isHost = booking.listing.hostId === session.user.id;
    if (!isGuest && !isHost) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(booking);
  } catch (error) {
    console.error("[BOOKING_GET]", error);
    return NextResponse.json({ error: "Failed to fetch booking" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: Params) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const booking = await db.booking.findUnique({
      where: { id },
      include: { listing: { select: { hostId: true } } },
    });

    if (!booking) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const isGuest = booking.guestId === session.user.id;
    if (!isGuest) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { status } = await req.json();

    // Guest can only cancel
    if (status !== "CANCELLED") {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const updated = await db.booking.update({
      where: { id },
      data: { status: "CANCELLED" },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[BOOKING_PATCH]", error);
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
  }
}
