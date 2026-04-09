import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

// Derive notifications from real booking + review data — no separate table needed
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const [guestBookings, hostBookings, reviews] = await Promise.all([
    // Guest bookings (confirmed, cancelled)
    db.booking.findMany({
      where: { guestId: userId },
      include: { listing: { select: { title: true, slug: true, images: true } } },
      orderBy: { updatedAt: "desc" },
      take: 30,
    }),
    // Bookings on host's listings (new pending bookings, cancellations)
    db.booking.findMany({
      where: { listing: { hostId: userId } },
      include: {
        listing: { select: { title: true, slug: true } },
        guest: { select: { name: true, image: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 30,
    }),
    // Reviews on host's listings
    db.review.findMany({
      where: { listing: { hostId: userId } },
      include: {
        listing: { select: { title: true, slug: true } },
        author: { select: { name: true, image: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
  ]);

  type Notification = {
    id: string;
    type: string;
    title: string;
    body: string;
    image: string | null;
    href: string;
    createdAt: Date;
  };

  const notifications: Notification[] = [];

  // Guest booking notifications
  for (const b of guestBookings) {
    if (b.status === "CONFIRMED") {
      notifications.push({
        id: `booking-confirmed-${b.id}`,
        type: "booking_confirmed",
        title: "Booking confirmed",
        body: `Your stay at ${b.listing.title} is confirmed.`,
        image: b.listing.images?.[0] ?? null,
        href: `/dashboard/bookings/${b.id}`,
        createdAt: b.updatedAt,
      });
    }
    if (b.status === "CANCELLED") {
      notifications.push({
        id: `booking-cancelled-${b.id}`,
        type: "booking_cancelled",
        title: "Booking cancelled",
        body: `Your booking at ${b.listing.title} was cancelled.`,
        image: b.listing.images?.[0] ?? null,
        href: `/dashboard/bookings/${b.id}`,
        createdAt: b.updatedAt,
      });
    }
  }

  // Host booking notifications
  for (const b of hostBookings) {
    if (b.status === "PENDING") {
      notifications.push({
        id: `host-booking-pending-${b.id}`,
        type: "new_booking_request",
        title: "New booking request",
        body: `${b.guest.name ?? "A guest"} requested to book ${b.listing.title}.`,
        image: b.guest.image ?? null,
        href: `/host/bookings/${b.id}`,
        createdAt: b.createdAt,
      });
    }
    if (b.status === "CONFIRMED") {
      notifications.push({
        id: `host-booking-confirmed-${b.id}`,
        type: "booking_confirmed",
        title: "Booking confirmed",
        body: `${b.guest.name ?? "A guest"} confirmed a stay at ${b.listing.title}.`,
        image: b.guest.image ?? null,
        href: `/host/bookings/${b.id}`,
        createdAt: b.updatedAt,
      });
    }
  }

  // Review notifications for host
  for (const r of reviews) {
    notifications.push({
      id: `review-${r.id}`,
      type: "new_review",
      title: "New review received",
      body: `${r.author.name ?? "A guest"} left a ${r.rating}-star review on ${r.listing.title}.`,
      image: r.author.image ?? null,
      href: `/listings/${r.listing.slug}`,
      createdAt: r.createdAt,
    });
  }

  // Sort all by date desc
  notifications.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return NextResponse.json(notifications.slice(0, 40));
}
