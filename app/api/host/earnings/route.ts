import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // All completed/confirmed bookings for this host
  const bookings = await db.booking.findMany({
    where: {
      listing: { hostId: session.user.id },
      status: { in: ["CONFIRMED", "COMPLETED"] },
    },
    select: {
      totalPrice: true,
      createdAt: true,
      status: true,
    },
    orderBy: { createdAt: "asc" },
  });

  // Group by month for chart
  const monthlyMap: Record<string, number> = {};
  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  for (const b of bookings) {
    const d = new Date(b.createdAt);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    monthlyMap[key] = (monthlyMap[key] ?? 0) + Number(b.totalPrice);
  }

  // Build last 12 months
  const now = new Date();
  const monthly = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    monthly.push({
      month: MONTHS[d.getMonth()],
      earnings: Math.round(monthlyMap[key] ?? 0),
    });
  }

  const totalEarnings = bookings.reduce((sum, b) => sum + Number(b.totalPrice), 0);
  const confirmedEarnings = bookings
    .filter((b) => b.status === "CONFIRMED")
    .reduce((sum, b) => sum + Number(b.totalPrice), 0);

  // Count bookings and avg rating
  const [bookingCount, listings] = await Promise.all([
    db.booking.count({
      where: { listing: { hostId: session.user.id }, status: { in: ["CONFIRMED", "COMPLETED"] } },
    }),
    db.listing.findMany({
      where: { hostId: session.user.id },
      select: { avgRating: true, totalReviews: true },
    }),
  ]);

  const totalReviews = listings.reduce((s, l) => s + l.totalReviews, 0);
  const avgRating =
    listings.length > 0
      ? listings.reduce((s, l) => s + l.avgRating, 0) / listings.filter((l) => l.avgRating > 0).length
      : 0;

  return NextResponse.json({
    totalEarnings,
    pendingPayout: confirmedEarnings,
    bookingCount,
    avgRating: avgRating > 0 ? avgRating.toFixed(2) : "—",
    totalReviews,
    monthly,
  });
}
