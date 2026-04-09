import { NextResponse } from "next/server";
import { db } from "@/lib/db";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function GET(_req: Request, { params }: Params) {
  const { slug } = await params;

  try {
    const listing = await db.listing.findUnique({
      where: { slug },
      include: {
        host: {
          select: { id: true, name: true, image: true, bio: true, createdAt: true },
        },
        reviews: {
          include: {
            author: { select: { id: true, name: true, image: true } },
          },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
        bookings: {
          where: { status: { in: ["PENDING", "CONFIRMED"] } },
          select: { checkIn: true, checkOut: true },
        },
        _count: { select: { reviews: true, bookings: true } },
      },
    });

    if (!listing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(listing);
  } catch (error) {
    console.error("[LISTING_SLUG_GET]", error);
    return NextResponse.json({ error: "Failed to fetch listing" }, { status: 500 });
  }
}
