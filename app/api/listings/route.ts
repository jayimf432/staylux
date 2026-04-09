import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city") ?? "";
    const type = searchParams.get("type") ?? "";
    const minPrice = Number(searchParams.get("minPrice") ?? 0);
    const maxPrice = Number(searchParams.get("maxPrice") ?? 99999);
    const guests = Number(searchParams.get("guests") ?? 1);
    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 12);
    const sort = searchParams.get("sort") ?? "featured";

    const where: any = {
      isActive: true,
      maxGuests: { gte: guests },
      pricePerNight: { gte: minPrice, lte: maxPrice },
    };

    if (city) {
      where.OR = [
        { city: { contains: city, mode: "insensitive" } },
        { country: { contains: city, mode: "insensitive" } },
        { state: { contains: city, mode: "insensitive" } },
      ];
    }

    if (type) where.propertyType = type;

    const orderBy: any =
      sort === "price_asc"
        ? [{ pricePerNight: "asc" }, { id: "asc" }]
        : sort === "price_desc"
        ? [{ pricePerNight: "desc" }, { id: "asc" }]
        : sort === "rating"
        ? [{ avgRating: "desc" }, { id: "asc" }]
        : sort === "newest"
        ? [{ createdAt: "desc" }, { id: "asc" }]
        : [{ isFeatured: "desc" }, { avgRating: "desc" }, { id: "asc" }];

    const [listings, total] = await Promise.all([
      db.listing.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          host: { select: { id: true, name: true, image: true } },
          _count: { select: { reviews: true } },
        },
      }),
      db.listing.count({ where }),
    ]);

    return NextResponse.json({
      listings,
      total,
      pages: Math.ceil(total / limit),
      page,
    });
  } catch (error) {
    console.error("[LISTINGS_GET]", error);
    return NextResponse.json(
      { error: "Failed to fetch listings" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const slug = `${body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;

    const listing = await db.listing.create({
      data: { ...body, slug, hostId: session.user.id },
    });

    return NextResponse.json(listing, { status: 201 });
  } catch (error) {
    console.error("[LISTINGS_POST]", error);
    return NextResponse.json(
      { error: "Failed to create listing" },
      { status: 500 }
    );
  }
}
