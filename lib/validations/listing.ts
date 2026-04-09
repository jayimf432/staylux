import { z } from "zod";

export const searchSchema = z.object({
  location: z.string().optional(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  adults: z.coerce.number().min(1).default(1),
  children: z.coerce.number().min(0).default(0),
  infants: z.coerce.number().min(0).default(0),
  pets: z.coerce.number().min(0).default(0),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().optional(),
  propertyType: z.string().optional(),
  amenities: z.string().optional(), // comma-separated
  bedrooms: z.coerce.number().min(0).optional(),
  bathrooms: z.coerce.number().min(0).optional(),
  beds: z.coerce.number().min(0).optional(),
  instantBook: z.coerce.boolean().optional(),
  topRated: z.coerce.boolean().optional(),
  cancellationPolicy: z.string().optional(),
  sortBy: z
    .enum(["recommended", "price_asc", "price_desc", "rating", "newest"])
    .default("recommended"),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(12),
});

export const createListingSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters").max(100),
  description: z
    .string()
    .min(50, "Description must be at least 50 characters")
    .max(5000),
  propertyType: z.enum([
    "VILLA",
    "APARTMENT",
    "CABIN",
    "TREEHOUSE",
    "BEACHFRONT",
    "MANSION",
    "TINY_HOME",
    "BOAT",
  ]),
  pricePerNight: z.coerce.number().min(10, "Minimum price is $10"),
  cleaningFee: z.coerce.number().min(0).default(0),
  maxGuests: z.coerce.number().min(1).max(50),
  bedrooms: z.coerce.number().min(0).max(50),
  bathrooms: z.coerce.number().min(0).max(50),
  beds: z.coerce.number().min(1).max(50),
  images: z.array(z.string()).min(1, "At least one image is required"),
  amenities: z.array(z.string()).default([]),
  address: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  country: z.string().min(2),
  zipCode: z.string().min(2),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  instantBook: z.boolean().default(false),
  cancellationPolicy: z
    .enum(["FLEXIBLE", "MODERATE", "STRICT"])
    .default("MODERATE"),
});

export const updateListingSchema = createListingSchema.partial();

export type SearchInput = z.infer<typeof searchSchema>;
export type CreateListingInput = z.infer<typeof createListingSchema>;
export type UpdateListingInput = z.infer<typeof updateListingSchema>;
