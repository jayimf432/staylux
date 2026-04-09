import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") ?? "";
  const minRating = Number(searchParams.get("minRating") ?? 0);

  const reviews = await db.review.findMany({
    where: {
      AND: [
        search
          ? {
              OR: [
                { comment: { contains: search, mode: "insensitive" } },
                { listing: { title: { contains: search, mode: "insensitive" } } },
                { author: { name: { contains: search, mode: "insensitive" } } },
              ],
            }
          : {},
        minRating > 0 ? { rating: { gte: minRating } } : {},
      ],
    },
    include: {
      author: { select: { id: true, name: true, email: true, image: true } },
      listing: { select: { id: true, slug: true, title: true, city: true, country: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return NextResponse.json(reviews);
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { reviewId } = await req.json();
  if (!reviewId) return NextResponse.json({ error: "Missing reviewId" }, { status: 400 });

  await db.review.delete({ where: { id: reviewId } });

  return NextResponse.json({ success: true });
}
