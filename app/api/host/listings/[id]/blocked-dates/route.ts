import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_req: Request, { params }: Params) {
  const { id } = await params;

  const blocked = await db.blockedDate.findMany({
    where: { listingId: id },
    select: { date: true },
    orderBy: { date: "asc" },
  });

  return NextResponse.json(blocked.map((b) => b.date.toISOString().split("T")[0]));
}

export async function POST(req: Request, { params }: Params) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const listing = await db.listing.findUnique({ where: { id } });
  if (!listing || listing.hostId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { dates } = await req.json() as { dates: string[] };
  if (!Array.isArray(dates) || dates.length === 0) {
    return NextResponse.json({ error: "No dates provided" }, { status: 400 });
  }

  await db.blockedDate.createMany({
    data: dates.map((d) => ({ listingId: id, date: new Date(d) })),
    skipDuplicates: true,
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request, { params }: Params) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const listing = await db.listing.findUnique({ where: { id } });
  if (!listing || listing.hostId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { dates } = await req.json() as { dates: string[] };
  if (!Array.isArray(dates) || dates.length === 0) {
    return NextResponse.json({ error: "No dates provided" }, { status: 400 });
  }

  await db.blockedDate.deleteMany({
    where: {
      listingId: id,
      date: { in: dates.map((d) => new Date(d)) },
    },
  });

  return NextResponse.json({ success: true });
}
