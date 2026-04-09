import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow, differenceInDays } from "date-fns";
import slugify from "slugify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number | string,
  options?: Intl.NumberFormatOptions
) {
  const num = typeof price === "string" ? parseFloat(price) : price;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    ...options,
  }).format(num);
}

export function formatDate(date: Date | string, fmt = "MMM d, yyyy") {
  return format(new Date(date), fmt);
}

export function formatRelativeDate(date: Date | string) {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function calculateNights(checkIn: Date, checkOut: Date) {
  return differenceInDays(checkOut, checkIn);
}

export function generateSlug(title: string) {
  return slugify(title, { lower: true, strict: true, trim: true });
}

export function truncate(str: string, length: number) {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function calculateBookingPrice(
  pricePerNight: number,
  cleaningFee: number,
  nights: number,
  serviceFeePercent = 0.12,
  taxPercent = 0.10
) {
  const subtotal = pricePerNight * nights;
  const serviceFee = Math.round(subtotal * serviceFeePercent);
  const taxes = Math.round((subtotal + cleaningFee + serviceFee) * taxPercent);
  const totalPrice = subtotal + cleaningFee + serviceFee + taxes;
  return { subtotal, cleaningFee, serviceFee, taxes, totalPrice };
}

export function getAmenityLabel(amenity: string) {
  const labels: Record<string, string> = {
    WIFI: "Wi-Fi",
    POOL: "Pool",
    HOT_TUB: "Hot tub",
    KITCHEN: "Kitchen",
    PARKING: "Free parking",
    GYM: "Gym",
    PET_FRIENDLY: "Pets allowed",
    AIR_CONDITIONING: "Air conditioning",
    HEATING: "Heating",
    WASHER: "Washer",
    DRYER: "Dryer",
    TV: "TV",
    FIREPLACE: "Fireplace",
    BALCONY: "Balcony",
    BEACH_ACCESS: "Beach access",
    SKI_IN_SKI_OUT: "Ski-in/ski-out",
    EV_CHARGER: "EV charger",
    SECURITY_CAMERAS: "Security cameras",
    SMOKE_ALARM: "Smoke alarm",
    CARBON_MONOXIDE_ALARM: "Carbon monoxide alarm",
    FIRST_AID_KIT: "First aid kit",
    FIRE_EXTINGUISHER: "Fire extinguisher",
    WORKSPACE: "Dedicated workspace",
    BBQ_GRILL: "BBQ grill",
    OUTDOOR_DINING: "Outdoor dining area",
    GAME_ROOM: "Game room",
    BABY_GEAR: "Baby gear",
  };
  return labels[amenity] ?? amenity;
}

export function getPropertyTypeLabel(type: string) {
  const labels: Record<string, string> = {
    VILLA: "Villa",
    APARTMENT: "Apartment",
    CABIN: "Cabin",
    TREEHOUSE: "Treehouse",
    BEACHFRONT: "Beachfront",
    MANSION: "Mansion",
    TINY_HOME: "Tiny home",
    BOAT: "Boat",
  };
  return labels[type] ?? type;
}

export function absoluteUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  return `${base}${path}`;
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
