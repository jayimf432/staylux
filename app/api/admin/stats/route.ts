import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // In production check session.user.role === "ADMIN"

  const [userCount, listingCount, bookingCount, reviewCount, revenue] = await Promise.all([
    db.user.count(),
    db.listing.count(),
    db.booking.count(),
    db.review.count(),
    db.booking.aggregate({
      _sum: { totalPrice: true },
      where: { status: { in: ["CONFIRMED", "COMPLETED"] } },
    }),
  ]);

  const recentBookings = await db.booking.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      guest: { select: { name: true, email: true } },
      listing: { select: { title: true } },
    },
  });

  return NextResponse.json({
    userCount,
    listingCount,
    bookingCount,
    reviewCount,
    totalRevenue: Number(revenue._sum.totalPrice ?? 0),
    recentBookings,
  });
}
