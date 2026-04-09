import { z } from "zod";

export const createBookingSchema = z.object({
  listingId: z.string(),
  checkIn: z.string().datetime(),
  checkOut: z.string().datetime(),
  adults: z.number().min(1),
  children: z.number().min(0).default(0),
  infants: z.number().min(0).default(0),
  pets: z.number().min(0).default(0),
  specialRequests: z.string().max(1000).optional(),
});

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(20, "Review must be at least 20 characters").max(2000),
  cleanliness: z.number().min(1).max(5),
  accuracy: z.number().min(1).max(5),
  checkIn: z.number().min(1).max(5),
  communication: z.number().min(1).max(5),
  location: z.number().min(1).max(5),
  value: z.number().min(1).max(5),
});

export const messageSchema = z.object({
  content: z.string().min(1).max(2000),
  receiverId: z.string(),
  listingId: z.string().optional(),
  conversationId: z.string().optional(),
});

export const profileSchema = z.object({
  name: z.string().min(2).max(100),
  bio: z.string().max(500).optional(),
  phone: z.string().optional(),
  image: z.string().url().optional(),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type MessageInput = z.infer<typeof messageSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
