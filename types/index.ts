import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}

export type UserRole = "GUEST" | "HOST" | "ADMIN";

export type PropertyType =
  | "VILLA"
  | "APARTMENT"
  | "CABIN"
  | "TREEHOUSE"
  | "BEACHFRONT"
  | "MANSION"
  | "TINY_HOME"
  | "BOAT";

export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED";

export type CancellationPolicy = "FLEXIBLE" | "MODERATE" | "STRICT";

export interface ListingWithHost {
  id: string;
  title: string;
  description: string;
  slug: string;
  propertyType: PropertyType;
  pricePerNight: number;
  cleaningFee: number;
  serviceFee: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  beds: number;
  images: string[];
  amenities: string[];
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  isActive: boolean;
  isFeatured: boolean;
  instantBook: boolean;
  cancellationPolicy: CancellationPolicy;
  avgRating: number;
  totalReviews: number;
  hostId: string;
  host: {
    id: string;
    name: string | null;
    image: string | null;
    createdAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface BookingWithDetails {
  id: string;
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
  infants: number;
  pets: number;
  totalNights: number;
  subtotal: number;
  cleaningFee: number;
  serviceFee: number;
  taxes: number;
  totalPrice: number;
  status: BookingStatus;
  specialRequests: string | null;
  guestId: string;
  listingId: string;
  listing: ListingWithHost;
  guest: {
    id: string;
    name: string | null;
    image: string | null;
    email: string | null;
  };
  review?: ReviewData | null;
  createdAt: Date;
}

export interface ReviewData {
  id: string;
  rating: number;
  comment: string;
  cleanliness: number;
  accuracy: number;
  checkIn: number;
  communication: number;
  location: number;
  value: number;
  hostResponse?: string | null;
  authorId: string;
  author: {
    id: string;
    name: string | null;
    image: string | null;
  };
  createdAt: Date;
}

export interface SearchFilters {
  location?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  children?: number;
  infants?: number;
  pets?: number;
  minPrice?: number;
  maxPrice?: number;
  propertyType?: string;
  amenities?: string[];
  bedrooms?: number;
  bathrooms?: number;
  beds?: number;
  instantBook?: boolean;
  topRated?: boolean;
  cancellationPolicy?: string;
  sortBy?: "recommended" | "price_asc" | "price_desc" | "rating" | "newest";
  page?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}

export interface EarningsData {
  month: string;
  earnings: number;
  bookings: number;
}

export interface ConversationSummary {
  conversationId: string;
  otherUser: {
    id: string;
    name: string | null;
    image: string | null;
  };
  lastMessage: {
    content: string;
    createdAt: Date;
    read: boolean;
  };
  listing?: {
    id: string;
    title: string;
    images: string[];
  };
  unreadCount: number;
}
