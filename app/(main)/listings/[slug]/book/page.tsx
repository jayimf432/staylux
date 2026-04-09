"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ArrowRight, Check, CreditCard, Lock, Star } from "lucide-react";
import { formatPrice, calculateBookingPrice } from "@/lib/utils";
import type { ListingWithHost } from "@/types";
import { toast } from "sonner";

const STEPS = [
  "Trip details",
  "Price breakdown",
  "Your info",
  "Cancellation policy",
  "Payment",
  "Confirmation",
];

const CANCELLATION_COPY: Record<string, { title: string; description: string }> = {
  FLEXIBLE: {
    title: "Flexible policy",
    description: "Full refund if cancelled at least 24 hours before check-in.",
  },
  MODERATE: {
    title: "Moderate policy",
    description: "Full refund if cancelled at least 5 days before check-in.",
  },
  STRICT: {
    title: "Strict policy",
    description:
      "50% refund if cancelled more than 7 days before check-in. Non-refundable within 7 days.",
  },
};

function BookingFlowContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const slug = params?.slug as string;
  const checkIn = searchParams.get("checkIn") ?? "";
  const checkOut = searchParams.get("checkOut") ?? "";
  const guests = searchParams.get("guests") ?? "1";

  const [listing, setListing] = useState<ListingWithHost | null>(null);
  const [loadingListing, setLoadingListing] = useState(true);
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [requests, setRequests] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/listings/slug/${slug}`)
      .then((r) => r.json())
      .then((data) => setListing(data))
      .catch(() => toast.error("Failed to load listing"))
      .finally(() => setLoadingListing(false));
  }, [slug]);

  const today = new Date().toISOString().split("T")[0];

  // Redirect back to listing if dates are missing or in the past
  useEffect(() => {
    if (!checkIn || !checkOut) return;
    if (checkIn < today || checkOut <= checkIn) {
      toast.error("Invalid dates — please select new dates");
      router.replace(`/listings/${slug}`);
    }
  }, [checkIn, checkOut, today, slug, router]);

  const nights =
    checkIn && checkOut
      ? Math.max(
          0,
          Math.round(
            (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
              86400000
          )
        )
      : 1;

  const prices = listing
    ? calculateBookingPrice(
        Number(listing.pricePerNight),
        Number(listing.cleaningFee),
        nights
      )
    : null;

  const formatD = (d: string) =>
    d
      ? new Date(d).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "—";

  const progress = ((step + 1) / STEPS.length) * 100;

  const canProceed = () => {
    if (step === 2) return name.trim() && email.trim();
    return true;
  };

  const handleConfirmAndPay = async () => {
    if (!listing) return;
    setSubmitting(true);
    try {
      // Step 1: create the pending booking
      const bookingRes = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingId: listing.id,
          checkIn,
          checkOut,
          guests: Number(guests),
          specialRequests: requests || undefined,
        }),
      });

      if (bookingRes.status === 401) {
        toast.error("Please sign in to complete your booking");
        router.push(`/login?redirect=/listings/${slug}/book?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
        return;
      }

      if (bookingRes.status === 409) {
        toast.error("These dates are no longer available. Please choose different dates.");
        return;
      }

      if (!bookingRes.ok) {
        const err = await bookingRes.json();
        toast.error(err.error ?? "Booking failed. Please try again.");
        return;
      }

      const booking = await bookingRes.json();

      // Step 2: create Stripe Checkout session and redirect
      const checkoutRes = await fetch("/api/bookings/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: booking.id }),
      });

      if (!checkoutRes.ok) {
        // Stripe not configured — fall back to direct confirmation
        setConfirmedBookingId(booking.id);
        setStep(5);
        return;
      }

      const { url } = await checkoutRes.json();
      if (url) {
        window.location.href = url; // redirect to Stripe Checkout
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingListing) {
    return (
      <div className="pt-20 pb-16 min-h-screen container max-w-xl space-y-4">
        <Skeleton className="h-2 w-full rounded-full" />
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-48 w-full rounded-xl" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="pt-32 text-center">
        <p className="text-muted-foreground mb-4">Listing not found.</p>
        <Link href="/listings">
          <Button variant="gradient">Browse listings</Button>
        </Link>
      </div>
    );
  }

  const cancellationInfo =
    CANCELLATION_COPY[listing.cancellationPolicy] ?? CANCELLATION_COPY.MODERATE;

  return (
    <div className="pt-20 pb-16 min-h-screen">
      <div className="container max-w-xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="h-1.5 bg-muted rounded-full mb-2">
            <div
              className="h-full bg-gradient-to-r from-[#FF385C] to-[#E61E4D] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Step {step + 1} of {STEPS.length} —{" "}
            <span className="font-medium text-foreground">{STEPS[step]}</span>
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.2 }}
          >
            {/* Step 0: Trip details */}
            {step === 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Your trip</h2>
                <div className="border border-border rounded-xl overflow-hidden divide-y divide-border">
                  <div className="p-4 flex justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Property</span>
                    <span className="text-sm font-semibold text-right max-w-[200px]">
                      {listing.title}
                    </span>
                  </div>
                  <div className="p-4 flex justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Location</span>
                    <span className="text-sm font-semibold">
                      {listing.city}, {listing.country}
                    </span>
                  </div>
                  <div className="p-4 flex justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Check-in</span>
                    <span className="text-sm font-semibold">{formatD(checkIn)}</span>
                  </div>
                  <div className="p-4 flex justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Check-out</span>
                    <span className="text-sm font-semibold">{formatD(checkOut)}</span>
                  </div>
                  <div className="p-4 flex justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Guests</span>
                    <span className="text-sm font-semibold">
                      {guests} guest{Number(guests) > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="p-4 flex justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Nights</span>
                    <span className="text-sm font-semibold">{nights}</span>
                  </div>
                </div>
                {listing.images?.[0] && (
                  <div className="relative h-44 rounded-xl overflow-hidden">
                    <Image
                      src={listing.images[0]}
                      alt={listing.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-sm">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-semibold">{listing.avgRating?.toFixed(2)}</span>
                      <span className="text-white/70">({listing.totalReviews} reviews)</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 1: Price breakdown */}
            {step === 1 && prices && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Price breakdown</h2>
                <div className="border border-border rounded-xl divide-y divide-border">
                  <div className="p-4 flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {formatPrice(listing.pricePerNight)} × {nights} nights
                    </span>
                    <span className="font-medium">{formatPrice(prices.subtotal)}</span>
                  </div>
                  <div className="p-4 flex justify-between text-sm">
                    <span className="text-muted-foreground">Cleaning fee</span>
                    <span className="font-medium">{formatPrice(prices.cleaningFee)}</span>
                  </div>
                  <div className="p-4 flex justify-between text-sm">
                    <span className="text-muted-foreground">Service fee</span>
                    <span className="font-medium">{formatPrice(prices.serviceFee)}</span>
                  </div>
                  <div className="p-4 flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxes</span>
                    <span className="font-medium">{formatPrice(prices.taxes)}</span>
                  </div>
                  <div className="p-4 flex justify-between font-bold">
                    <span>Total (USD)</span>
                    <span className="text-lg">{formatPrice(prices.totalPrice)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Guest info */}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Your information</h2>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Full name</label>
                    <Input
                      placeholder="Jane Smith"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Email address</label>
                    <Input
                      type="email"
                      placeholder="jane@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Phone number</label>
                    <Input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Special requests (optional)
                    </label>
                    <textarea
                      placeholder="Anything you'd like the host to know..."
                      value={requests}
                      onChange={(e) => setRequests(e.target.value)}
                      rows={3}
                      className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Cancellation policy */}
            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Cancellation policy</h2>
                <div className="p-4 rounded-xl border border-border bg-muted/30 space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">{cancellationInfo.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {cancellationInfo.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-800">
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                    ⚠️ Please read carefully before confirming
                  </p>
                  <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                    By proceeding, you acknowledge and agree to the host&apos;s
                    cancellation policy.
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Payment */}
            {step === 4 && prices && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Payment</h2>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Lock className="h-3 w-3" />
                  Secured by Stripe — your payment info is encrypted
                </div>
                <div className="p-5 rounded-2xl border border-border bg-muted/30 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{listing.title}</span>
                    <span>{nights} nights</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Service & taxes</span>
                    <span>{formatPrice(prices.serviceFee + prices.taxes)}</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t border-border">
                    <span>Total due today</span>
                    <span className="text-lg">{formatPrice(prices.totalPrice)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-sm text-blue-800 dark:text-blue-300">
                  <CreditCard className="h-4 w-4 shrink-0" />
                  You'll be redirected to Stripe's secure checkout page to complete payment.
                </div>
              </div>
            )}

            {/* Step 5: Confirmation */}
            {step === 5 && prices && (
              <div className="text-center py-8 space-y-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/30">
                  <Check className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Booking confirmed!</h2>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  You&apos;re all set! A confirmation email has been sent to your
                  inbox. We can&apos;t wait to host you.
                </p>
                <div className="border border-border rounded-xl p-4 text-sm space-y-2 text-left">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Booking ID</span>
                    <span className="font-mono font-medium">
                      {confirmedBookingId
                        ? confirmedBookingId.slice(0, 8).toUpperCase()
                        : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Property</span>
                    <span className="font-medium">{listing.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dates</span>
                    <span className="font-medium">
                      {formatD(checkIn)} → {formatD(checkOut)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total paid</span>
                    <span className="font-bold text-emerald-600">
                      {formatPrice(prices.totalPrice)}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <Link href="/dashboard/bookings" className="flex-1">
                    <Button variant="gradient" className="w-full">
                      View booking
                    </Button>
                  </Link>
                  <Link href="/listings" className="flex-1">
                    <Button variant="outline" className="w-full">
                      Explore more
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        {step < STEPS.length - 1 && (
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Button
              variant="gradient"
              disabled={!canProceed() || submitting}
              onClick={step === 4 ? handleConfirmAndPay : () => setStep((s) => s + 1)}
              className="gap-2"
            >
              {submitting
                ? "Processing..."
                : step === 4
                ? "Confirm & Pay"
                : "Continue"}
              {!submitting && <ArrowRight className="h-4 w-4" />}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="pt-20 container text-center">Loading...</div>}>
      <BookingFlowContent />
    </Suspense>
  );
}
