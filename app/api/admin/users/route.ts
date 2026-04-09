import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") ?? "";
  const role = searchParams.get("role") ?? "";

  const users = await db.user.findMany({
    where: {
      AND: [
        search ? { OR: [{ name: { contains: search, mode: "insensitive" } }, { email: { contains: search, mode: "insensitive" } }] } : {},
        role ? { role: role as any } : {},
      ],
    },
    include: { _count: { select: { bookings: true, listings: true, reviewsGiven: true } } },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json(users);
}

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { userId, role } = await req.json();
  const updated = await db.user.update({ where: { id: userId }, data: { role } });
  return NextResponse.json(updated);
}
