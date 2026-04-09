import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") ?? "";

  const bookings = await db.booking.findMany({
    where: status ? { status: status as any } : {},
    include: {
      guest: { select: { id: true, name: true, email: true } },
      listing: { select: { id: true, title: true, slug: true, city: true, country: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json(bookings);
}
