"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star, Users, Bed, Bath, MessageCircle,
  Share2, Heart, ChevronLeft, ChevronRight, X,
  Shield, RefreshCcw, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ListingCard } from "@/components/listings/ListingCard";
import { ListingMap } from "@/components/listings/ListingMap";
import { Skeleton } from "@/components/ui/skeleton";
import {
  formatPrice, formatDate, getAmenityLabel,
  calculateBookingPrice, getInitials,
} from "@/lib/utils";
import type { ListingWithHost } from "@/types";
import { toast } from "sonner";

// ─── Image Gallery ─────────────────────────────────────────────────────────
function ImageGallery({ images }: { images: string[] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const openModal = (i: number) => { setModalIndex(i); setModalOpen(true); };
  const safeImages = images?.length > 0
    ? images
    : ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80"];

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden h-[480px]">
        <div className="col-span-2 row-span-2 relative cursor-pointer" onClick={() => openModal(0)}>
          <Image src={safeImages[0]} alt="Main photo" fill className="object-cover hover:opacity-95 transition-opacity" />
        </div>
        {safeImages.slice(1, 5).map((img, i) => (
          <div key={i} className="relative cursor-pointer" onClick={() => openModal(i + 1)}>
            <Image src={img} alt={`Photo ${i + 2}`} fill className="object-cover hover:opacity-90 transition-opacity" />
            {i === 3 && safeImages.length > 5 && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">+{safeImages.length - 5} more</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-3">
        <Button variant="outline" size="sm" onClick={() => openModal(0)} id="show-all-photos">Show all photos</Button>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"><X className="h-8 w-8" /></button>
          <button onClick={() => setModalIndex(i => (i - 1 + safeImages.length) % safeImages.length)} className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"><ChevronLeft className="h-10 w-10" /></button>
          <div className="relative w-full max-w-4xl h-[80vh] mx-8">
            <Image src={safeImages[modalIndex]} alt={`Photo ${modalIndex + 1}`} fill className="object-contain" />
          </div>
          <button onClick={() => setModalIndex(i => (i + 1) % safeImages.length)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"><ChevronRight className="h-10 w-10" /></button>
          <div className="absolute bottom-4 text-white text-sm">{modalIndex + 1} / {safeImages.length}</div>
        </div>
      )}
    </>
  );
}

// ─── Booking Widget ──────────────────────────────────────────────────────────
type BookedRange = { checkIn: string; checkOut: string };

function overlaps(checkIn: string, checkOut: string, booked: BookedRange[]): boolean {
  if (!checkIn || !checkOut) return false;
  const inD = new Date(checkIn).getTime();
  const outD = new Date(checkOut).getTime();
  return booked.some((b) => {
    const bIn = new Date(b.checkIn).getTime();
    const bOut = new Date(b.checkOut).getTime();
    return inD < bOut && outD > bIn;
  });
}

function BookingWidget({ listing }: { listing: ListingWithHost & { bookings?: BookedRange[] } }) {
  const today = new Date().toISOString().split("T")[0];
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [favorited, setFavorited] = useState(false);
  const bookedRanges: BookedRange[] = (listing as any).bookings ?? [];

  const nights = checkIn && checkOut
    ? Math.max(0, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000))
    : 0;

  const datesUnavailable = overlaps(checkIn, checkOut, bookedRanges);

  const dateError = checkIn && checkOut && new Date(checkOut) <= new Date(checkIn)
    ? "Check-out must be after check-in"
    : datesUnavailable
    ? "These dates are already booked — please choose different dates"
    : null;

  const prices = nights > 0 && !datesUnavailable
    ? calculateBookingPrice(Number(listing.pricePerNight), Number(listing.cleaningFee), nights)
    : null;

  const handleCheckInChange = (val: string) => {
    setCheckIn(val);
    if (checkOut && new Date(checkOut) <= new Date(val)) {
      setCheckOut("");
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied!");
  };

  return (
    <div className="booking-widget sticky top-24">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-2xl font-bold">{formatPrice(listing.pricePerNight)}</span>
          <span className="text-muted-foreground text-sm"> / night</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="font-semibold">{listing.avgRating?.toFixed(2) ?? "New"}</span>
          {listing.totalReviews > 0 && <span className="text-muted-foreground">({listing.totalReviews})</span>}
        </div>
      </div>

      <div className={`border rounded-xl overflow-hidden mb-3 ${dateError ? "border-destructive" : "border-border"}`}>
        <div className="grid grid-cols-2 divide-x divide-border border-b border-border">
          <div className="p-3">
            <label className="text-xs font-semibold text-muted-foreground block mb-0.5">CHECK-IN</label>
            <input type="date" value={checkIn} min={today} onChange={e => handleCheckInChange(e.target.value)} className="text-sm font-medium bg-transparent focus:outline-none w-full" />
          </div>
          <div className="p-3">
            <label className="text-xs font-semibold text-muted-foreground block mb-0.5">CHECKOUT</label>
            <input type="date" value={checkOut} min={checkIn || today} onChange={e => setCheckOut(e.target.value)} className="text-sm font-medium bg-transparent focus:outline-none w-full" />
          </div>
        </div>
        {dateError && (
          <p className="text-xs text-destructive px-3 py-1.5 bg-destructive/5">{dateError}</p>
        )}
        <div className="p-3">
          <label className="text-xs font-semibold text-muted-foreground block mb-0.5">GUESTS</label>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{guests} guest{guests > 1 ? "s" : ""}</span>
            <div className="flex items-center gap-2">
              <button onClick={() => setGuests(g => Math.max(1, g - 1))} className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-sm hover:bg-accent">-</button>
              <button onClick={() => setGuests(g => Math.min(listing.maxGuests, g + 1))} className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-sm hover:bg-accent">+</button>
            </div>
          </div>
        </div>
      </div>

      {bookedRanges.length > 0 && (
        <p className="text-xs text-muted-foreground mb-2">
          <span className="font-medium">Unavailable: </span>
          {bookedRanges.slice(0, 3).map((b, i) => (
            <span key={i}>
              {i > 0 && " · "}
              {new Date(b.checkIn).toLocaleDateString("en-US", { month: "short", day: "numeric" })}–{new Date(b.checkOut).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>
          ))}
          {bookedRanges.length > 3 && ` +${bookedRanges.length - 3} more`}
        </p>
      )}

      <Link href={nights > 0 && !datesUnavailable ? `/listings/${listing.slug}/book?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}` : "#"}>
        <Button variant="gradient" className="w-full h-12 text-base font-semibold" id="reserve-button" disabled={!checkIn || !checkOut || nights === 0 || !!datesUnavailable}>
          {nights > 0 ? "Reserve" : "Check availability"}
        </Button>
      </Link>

      <p className="text-center text-xs text-muted-foreground mt-2">
        {listing.instantBook
          ? <span className="flex items-center justify-center gap-1"><Zap className="h-3 w-3 text-emerald-500" />Instant booking — no wait</span>
          : "You won't be charged yet"}
      </p>

      {prices && nights > 0 && (
        <div className="mt-4 pt-4 border-t border-border space-y-2">
          <div className="flex justify-between text-sm"><span>{formatPrice(listing.pricePerNight)} × {nights} nights</span><span>{formatPrice(prices.subtotal)}</span></div>
          <div className="flex justify-between text-sm"><span>Cleaning fee</span><span>{formatPrice(prices.cleaningFee)}</span></div>
          <div className="flex justify-between text-sm"><span>Service fee</span><span>{formatPrice(prices.serviceFee)}</span></div>
          <div className="flex justify-between text-sm"><span>Taxes</span><span>{formatPrice(prices.taxes)}</span></div>
          <div className="flex justify-between text-sm font-bold pt-2 border-t border-border"><span>Total</span><span>{formatPrice(prices.totalPrice)}</span></div>
        </div>
      )}

      <div className="flex gap-2 mt-4">
        <Button variant="outline" size="sm" className="flex-1 gap-1.5" onClick={handleShare} id="share-button">
          <Share2 className="h-3.5 w-3.5" /> Share
        </Button>
        <Button variant="outline" size="sm" className="flex-1 gap-1.5"
          onClick={() => { setFavorited(!favorited); toast.success(favorited ? "Removed from wishlist" : "Added to wishlist"); }}
          id="save-button">
          <Heart className={`h-3.5 w-3.5 ${favorited ? "fill-primary text-primary" : ""}`} />
          {favorited ? "Saved" : "Save"}
        </Button>
      </div>

      {listing.host?.id && (
        <Link
          href={`/dashboard/messages/${[listing.host.id].sort().join("-")}`}
          onClick={async (e) => {
            // Pre-create the conversation with a greeting
            e.preventDefault();
            try {
              await fetch("/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  receiverId: listing.host.id,
                  content: `Hi! I'm interested in your listing "${listing.title}". Is it available?`,
                  listingId: listing.id,
                }),
              });
            } catch {}
            window.location.href = `/dashboard/messages`;
          }}
        >
          <Button variant="outline" className="w-full mt-2 gap-2 text-sm">
            <MessageCircle className="h-4 w-4" /> Contact host
          </Button>
        </Link>
      )}
    </div>
  );
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────
function DetailSkeleton() {
  return (
    <div className="pt-16 container py-8 space-y-6">
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-8 w-96" />
      <Skeleton className="h-[480px] w-full rounded-2xl" />
      <div className="grid grid-cols-3 gap-12 mt-10">
        <div className="col-span-2 space-y-4">
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <Skeleton className="h-80 rounded-2xl" />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ListingDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [listing, setListing] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [similar, setSimilar] = useState<ListingWithHost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFounde, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    async function load() {
      try {
        // Fetch listing by slug via API
        const res = await fetch(`/api/listings/slug/${slug}`);
        if (res.status === 404) { setNotFound(true); return; }
        const data = await res.json();
        setListing(data);
        setReviews(data.reviews ?? []);

        // Fetch similar listings (same property type)
        const simRes = await fetch(`/api/listings?type=${data.propertyType}&limit=3`);
        if (simRes.ok) {
          const simData = await simRes.json();
          // Exclude current listing
          setSimilar((simData.listings ?? []).filter((l: any) => l.id !== data.id).slice(0, 2));
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) return <DetailSkeleton />;
  if (notFounde) return (
    <div className="pt-32 text-center">
      <p className="text-6xl mb-4">🏡</p>
      <h1 className="text-2xl font-bold mb-2">Listing not found</h1>
      <p className="text-muted-foreground mb-6">This property may have been removed or the link is incorrect.</p>
      <Link href="/listings"><Button variant="gradient">Browse all listings</Button></Link>
    </div>
  );

  const avgSubRating = reviews.length > 0 ? {
    cleanliness: reviews.reduce((a: number, r: any) => a + r.cleanliness, 0) / reviews.length,
    accuracy: reviews.reduce((a: number, r: any) => a + r.accuracy, 0) / reviews.length,
    communication: reviews.reduce((a: number, r: any) => a + r.communication, 0) / reviews.length,
    location: reviews.reduce((a: number, r: any) => a + r.location, 0) / reviews.length,
    value: reviews.reduce((a: number, r: any) => a + r.value, 0) / reviews.length,
  } : {};

  return (
    <div className="pt-16">
      <div className="container py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link href="/listings" className="hover:text-foreground transition-colors">Stays</Link>
          <span>›</span>
          <span>{listing.city}, {listing.country}</span>
          <span>›</span>
          <span className="text-foreground">{listing.title}</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-6">{listing.title}</h1>

        <ImageGallery images={listing.images ?? []} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-10">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Host info */}
            <div className="border-b border-border pb-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">{listing.propertyType?.charAt(0) + listing.propertyType?.slice(1).toLowerCase()} hosted by {listing.host?.name}</h2>
                  <p className="text-muted-foreground text-sm mt-1 flex items-center gap-3 flex-wrap">
                    <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{listing.maxGuests} guests</span>
                    <span className="flex items-center gap-1"><Bed className="h-3.5 w-3.5" />{listing.bedrooms} bedrooms</span>
                    <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5" />{listing.bathrooms} bathrooms</span>
                  </p>
                </div>
                <Avatar className="h-14 w-14 shrink-0">
                  <AvatarImage src={listing.host?.image ?? ""} />
                  <AvatarFallback>{getInitials(listing.host?.name ?? "H")}</AvatarFallback>
                </Avatar>
              </div>

              <div className="mt-6 space-y-4">
                {listing.instantBook && (
                  <div className="flex items-center gap-3">
                    <Zap className="h-6 w-6 text-emerald-500 shrink-0" />
                    <div><p className="font-medium text-sm">Self check-in</p><p className="text-xs text-muted-foreground">Check yourself in with the smart lock.</p></div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-blue-500 shrink-0" />
                  <div><p className="font-medium text-sm">StayLux cover</p><p className="text-xs text-muted-foreground">Every booking includes our $1M protection guarantee.</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <RefreshCcw className="h-6 w-6 text-amber-500 shrink-0" />
                  <div>
                    <p className="font-medium text-sm">{listing.cancellationPolicy?.toLowerCase()} cancellation</p>
                    <p className="text-xs text-muted-foreground">Review policy for details before booking.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="border-b border-border pb-8">
              <h2 className="text-xl font-semibold mb-4">About this place</h2>
              <div className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">{listing.description}</div>
            </div>

            {/* Amenities */}
            {listing.amenities?.length > 0 && (
              <div className="border-b border-border pb-8">
                <h2 className="text-xl font-semibold mb-4">What this place offers</h2>
                <div className="grid grid-cols-2 gap-3">
                  {listing.amenities.map((amenity: string) => (
                    <div key={amenity} className="flex items-center gap-3 text-sm">
                      <span className="w-5 h-5 text-muted-foreground">✓</span>
                      {getAmenityLabel(amenity)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            {reviews.length > 0 && (
              <div className="border-b border-border pb-8">
                <div className="flex items-center gap-2 mb-6">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  <span className="text-xl font-bold">{listing.avgRating?.toFixed(2)}</span>
                  <span className="text-muted-foreground">· {listing.totalReviews} reviews</span>
                </div>

                {Object.keys(avgSubRating).length > 0 && (
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {Object.entries(avgSubRating).map(([key, val]) => (
                      <div key={key} className="flex items-center justify-between text-sm">
                        <span className="capitalize text-muted-foreground">{key}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-foreground rounded-full" style={{ width: `${((val as number) / 5) * 100}%` }} />
                          </div>
                          <span className="font-medium w-6">{(val as number).toFixed(1)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {reviews.map((review: any) => (
                    <div key={review.id} className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={review.author?.image ?? ""} />
                          <AvatarFallback>{getInitials(review.author?.name ?? "G")}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{review.author?.name}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(review.createdAt, "MMMM yyyy")}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Where you'll be</h2>
              <ListingMap
                latitude={listing.latitude}
                longitude={listing.longitude}
                city={listing.city}
                country={listing.country}
              />
            </div>
          </div>

          {/* Right column — Booking widget */}
          <div className="lg:col-span-1">
            <BookingWidget listing={listing} />
          </div>
        </div>

        {/* Similar listings */}
        {similar.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Similar properties</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map(l => <ListingCard key={l.id} listing={l} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
