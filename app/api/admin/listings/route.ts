import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") ?? "";

  const listings = await db.listing.findMany({
    where: search ? { OR: [{ title: { contains: search, mode: "insensitive" } }, { city: { contains: search, mode: "insensitive" } }] } : {},
    include: {
      host: { select: { id: true, name: true, email: true } },
      _count: { select: { bookings: true, reviews: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json(listings);
}

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { listingId, isActive } = await req.json();
  const updated = await db.listing.update({ where: { id: listingId }, data: { isActive } });
  return NextResponse.json(updated);
}
