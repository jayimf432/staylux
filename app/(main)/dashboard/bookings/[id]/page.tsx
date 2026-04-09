"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar, MapPin, Users, ArrowLeft, Clock,
  CheckCircle2, XCircle, Star, Bed, Bath, Shield, X, MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice, getInitials } from "@/lib/utils";
import { toast } from "sonner";

const STATUS_CONFIG = {
  PENDING:   { label: "Pending",   className: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",       icon: Clock },
  CONFIRMED: { label: "Confirmed", className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300", icon: CheckCircle2 },
  CANCELLED: { label: "Cancelled", className: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",               icon: XCircle },
  COMPLETED: { label: "Completed", className: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",           icon: Star },
};

function formatDate(d: string | Date) {
  return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function BookingDetailContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = params?.id as string;

  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewHover, setReviewHover] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    if (searchParams.get("payment") === "success") {
      toast.success("Payment successful! Your booking is confirmed.");
    }
  }, [searchParams]);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/bookings/${id}`)
      .then((r) => {
        if (r.status === 404 || r.status === 403) {
          router.push("/dashboard/bookings");
          return null;
        }
        return r.json();
      })
      .then((data) => { if (data) setBooking(data); })
      .catch(() => toast.error("Failed to load booking"))
      .finally(() => setLoading(false));
  }, [id, router]);

  const handleSubmitReview = async () => {
    if (!reviewComment.trim()) { toast.error("Please write a review"); return; }
    setSubmittingReview(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: id, rating: reviewRating, comment: reviewComment }),
      });
      if (!res.ok) {
        const err = await res.json();
        toast.error(err.error ?? "Failed to submit review");
        return;
      }
      const review = await res.json();
      setBooking((prev: any) => ({ ...prev, review }));
      setReviewOpen(false);
      setReviewComment("");
      toast.success("Review submitted!");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    setCancelling(true);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "CANCELLED" }),
      });
      if (!res.ok) {
        toast.error("Failed to cancel booking");
        return;
      }
      setBooking((prev: any) => ({ ...prev, status: "CANCELLED" }));
      toast.success("Booking cancelled");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4 max-w-2xl">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-56 w-full rounded-2xl" />
        <Skeleton className="h-40 w-full rounded-2xl" />
        <Skeleton className="h-32 w-full rounded-2xl" />
      </div>
    );
  }

  if (!booking) return null;

  const status = STATUS_CONFIG[booking.status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.PENDING;
  const StatusIcon = status.icon;
  const listing = booking.listing;
  const canCancel = ["PENDING", "CONFIRMED"].includes(booking.status);
  const canReview = ["COMPLETED", "CONFIRMED"].includes(booking.status) && !booking.review;

  return (
    <div className="max-w-2xl space-y-6">
      {/* Back */}
      <Link
        href="/dashboard/bookings"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        My Bookings
      </Link>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-2xl font-bold">Booking details</h1>
          <span className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1 rounded-full ${status.className}`}>
            <StatusIcon className="h-3.5 w-3.5" />
            {status.label}
          </span>
        </div>
        <p className="text-xs text-muted-foreground font-mono">ID: {booking.id.slice(0, 16).toUpperCase()}</p>
      </motion.div>

      {/* Listing card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-2xl border border-border overflow-hidden bg-card"
      >
        {listing?.images?.[0] && (
          <div className="relative h-52 w-full">
            <Image src={listing.images[0]} alt={listing.title} fill className="object-cover" />
          </div>
        )}
        <div className="p-5">
          <Link href={`/listings/${listing?.slug}`} className="hover:underline">
            <h2 className="text-lg font-bold">{listing?.title}</h2>
          </Link>
          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
            <MapPin className="h-3.5 w-3.5" />
            {listing?.city}, {listing?.country}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-3">
            <span className="flex items-center gap-1"><Bed className="h-3.5 w-3.5" />{listing?.bedrooms} bed</span>
            <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5" />{listing?.bathrooms} bath</span>
            <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />Up to {listing?.maxGuests} guests</span>
          </div>
        </div>
      </motion.div>

      {/* Trip details */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-border bg-card divide-y divide-border"
      >
        <div className="px-5 py-3 flex justify-between items-center">
          <span className="text-sm text-muted-foreground flex items-center gap-2"><Calendar className="h-4 w-4" />Check-in</span>
          <span className="text-sm font-semibold">{formatDate(booking.checkIn)}</span>
        </div>
        <div className="px-5 py-3 flex justify-between items-center">
          <span className="text-sm text-muted-foreground flex items-center gap-2"><Calendar className="h-4 w-4" />Check-out</span>
          <span className="text-sm font-semibold">{formatDate(booking.checkOut)}</span>
        </div>
        <div className="px-5 py-3 flex justify-between items-center">
          <span className="text-sm text-muted-foreground flex items-center gap-2"><Clock className="h-4 w-4" />Duration</span>
          <span className="text-sm font-semibold">{booking.totalNights} nights</span>
        </div>
        <div className="px-5 py-3 flex justify-between items-center">
          <span className="text-sm text-muted-foreground flex items-center gap-2"><Users className="h-4 w-4" />Guests</span>
          <span className="text-sm font-semibold">
            {booking.adults} adult{booking.adults !== 1 ? "s" : ""}
            {booking.children > 0 && `, ${booking.children} child${booking.children !== 1 ? "ren" : ""}`}
            {booking.infants > 0 && `, ${booking.infants} infant${booking.infants !== 1 ? "s" : ""}`}
          </span>
        </div>
        {booking.specialRequests && (
          <div className="px-5 py-3">
            <p className="text-sm text-muted-foreground mb-1">Special requests</p>
            <p className="text-sm">{booking.specialRequests}</p>
          </div>
        )}
      </motion.div>

      {/* Price breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-2xl border border-border bg-card divide-y divide-border"
      >
        <div className="px-5 py-3 flex justify-between text-sm">
          <span className="text-muted-foreground">{formatPrice(listing?.pricePerNight)} × {booking.totalNights} nights</span>
          <span>{formatPrice(booking.subtotal)}</span>
        </div>
        <div className="px-5 py-3 flex justify-between text-sm">
          <span className="text-muted-foreground">Cleaning fee</span>
          <span>{formatPrice(booking.cleaningFee)}</span>
        </div>
        <div className="px-5 py-3 flex justify-between text-sm">
          <span className="text-muted-foreground">Service fee</span>
          <span>{formatPrice(booking.serviceFee)}</span>
        </div>
        <div className="px-5 py-3 flex justify-between text-sm">
          <span className="text-muted-foreground">Taxes</span>
          <span>{formatPrice(booking.taxes)}</span>
        </div>
        <div className="px-5 py-4 flex justify-between font-bold">
          <span>Total</span>
          <span className="text-lg">{formatPrice(booking.totalPrice)}</span>
        </div>
      </motion.div>

      {/* Host */}
      {listing?.host && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-border bg-card p-5 flex items-center gap-4"
        >
          <Avatar className="h-12 w-12">
            <AvatarImage src={listing.host.image ?? ""} />
            <AvatarFallback>{getInitials(listing.host.name ?? "H")}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground">Hosted by</p>
            <p className="font-semibold">{listing.host.name}</p>
            {listing.host.bio && (
              <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{listing.host.bio}</p>
            )}
          </div>
          <Shield className="h-5 w-5 text-emerald-500 shrink-0" />
        </motion.div>
      )}

      {/* Review (if exists) */}
      {booking.review && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-2xl border border-border bg-card p-5"
        >
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            Your review
          </h3>
          <div className="flex gap-0.5 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < booking.review.rating ? "fill-amber-400 text-amber-400" : "text-muted"}`} />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">{booking.review.comment}</p>
        </motion.div>
      )}

      {/* Leave a review prompt */}
      {canReview && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-2xl border border-primary/20 bg-primary/5 p-5 flex items-center justify-between gap-4"
        >
          <div>
            <p className="font-semibold text-sm">How was your stay?</p>
            <p className="text-xs text-muted-foreground mt-0.5">Share your experience to help other travelers.</p>
          </div>
          <Button variant="gradient" size="sm" onClick={() => setReviewOpen(true)}>
            Leave a review
          </Button>
        </motion.div>
      )}

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex gap-3 pb-6"
      >
        <Link href={`/listings/${listing?.slug}`} className="flex-1">
          <Button variant="outline" className="w-full">View listing</Button>
        </Link>
        {canCancel && (
          <Button
            variant="outline"
            className="flex-1 text-destructive border-destructive/30 hover:bg-destructive/10"
            onClick={handleCancel}
            disabled={cancelling}
          >
            {cancelling ? "Cancelling..." : "Cancel booking"}
          </Button>
        )}
      </motion.div>

      {/* Review modal */}
      {reviewOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl shadow-2xl w-full max-w-md p-6 border border-border"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-bold">Leave a review</h2>
                <p className="text-xs text-muted-foreground line-clamp-1">{listing?.title}</p>
              </div>
              <button onClick={() => setReviewOpen(false)} className="p-1.5 rounded-full hover:bg-accent transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Star rating */}
            <div className="mb-5">
              <p className="text-sm font-medium mb-2">Overall rating</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onMouseEnter={() => setReviewHover(star)}
                    onMouseLeave={() => setReviewHover(0)}
                    onClick={() => setReviewRating(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-8 w-8 transition-colors ${
                        star <= (reviewHover || reviewRating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {["", "Poor", "Fair", "Good", "Great", "Excellent"][reviewHover || reviewRating]}
              </p>
            </div>

            {/* Comment */}
            <div className="mb-5">
              <p className="text-sm font-medium mb-2">Your review</p>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Tell other travelers about your experience — what made it special, what could be improved..."
                rows={4}
                className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1 text-right">{reviewComment.length}/2000</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setReviewOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="gradient"
                className="flex-1"
                onClick={handleSubmitReview}
                disabled={submittingReview || !reviewComment.trim()}
              >
                {submittingReview ? "Submitting..." : "Submit review"}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default function BookingDetailPage() {
  return (
    <Suspense fallback={<div className="py-8 text-center text-muted-foreground">Loading...</div>}>
      <BookingDetailContent />
    </Suspense>
  );
}
