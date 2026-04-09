"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, Calendar, Users, MapPin, Star,
  CheckCircle, XCircle, Clock, DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice, formatDate, getInitials } from "@/lib/utils";
import { toast } from "sonner";

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: any }> = {
  PENDING:   { label: "Pending",   color: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",   icon: Clock },
  CONFIRMED: { label: "Confirmed", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400", icon: CheckCircle },
  CANCELLED: { label: "Cancelled", color: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400",           icon: XCircle },
  COMPLETED: { label: "Completed", color: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",       icon: CheckCircle },
};

export default function HostBookingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [actioning, setActioning] = useState(false);

  useEffect(() => {
    fetch(`/api/bookings/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then(setBooking)
      .catch(() => router.push("/host/bookings"))
      .finally(() => setLoading(false));
  }, [id, router]);

  const handleAction = async (status: "CONFIRMED" | "CANCELLED") => {
    setActioning(true);
    try {
      const res = await fetch("/api/host/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: id, status }),
      });
      if (!res.ok) throw new Error();
      setBooking((prev: any) => ({ ...prev, status }));
      toast.success(status === "CONFIRMED" ? "Booking confirmed" : "Booking cancelled");
    } catch {
      toast.error("Action failed. Please try again.");
    } finally {
      setActioning(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl space-y-6 py-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-40 w-full rounded-2xl" />
        <Skeleton className="h-56 w-full rounded-2xl" />
      </div>
    );
  }

  if (!booking) return null;

  const status = STATUS_CONFIG[booking.status] ?? STATUS_CONFIG.PENDING;
  const StatusIcon = status.icon;
  const nights = booking.totalNights;

  return (
    <div className="max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

        {/* Header */}
        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/host/bookings")} className="p-2 rounded-full hover:bg-accent transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Booking details</h1>
            <p className="text-xs text-muted-foreground font-mono">{booking.id}</p>
          </div>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${status.color}`}>
            <StatusIcon className="h-3.5 w-3.5" />
            {status.label}
          </span>
        </div>

        {/* Listing card */}
        <Card>
          <CardContent className="p-0 overflow-hidden rounded-2xl">
            {booking.listing?.images?.[0] && (
              <img src={booking.listing.images[0]} alt={booking.listing.title} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
              <h2 className="font-semibold text-base">{booking.listing?.title}</h2>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                <MapPin className="h-3.5 w-3.5" />
                {booking.listing?.city}, {booking.listing?.country}
              </p>
              <Link href={`/listings/${booking.listing?.slug}`}>
                <Button variant="outline" size="sm" className="mt-3 text-xs">View listing</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Guest card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Guest</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={booking.guest?.image ?? ""} />
                <AvatarFallback>{getInitials(booking.guest?.name ?? "G")}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{booking.guest?.name}</p>
                <p className="text-sm text-muted-foreground">{booking.guest?.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trip details */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Trip details</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Check-in</p>
                  <p className="text-sm font-semibold">{formatDate(booking.checkIn, "EEE, MMM d, yyyy")}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Check-out</p>
                  <p className="text-sm font-semibold">{formatDate(booking.checkOut, "EEE, MMM d, yyyy")}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground shrink-0" />
              <p className="text-sm">
                {booking.adults} adult{booking.adults !== 1 ? "s" : ""}
                {booking.children > 0 && `, ${booking.children} child${booking.children !== 1 ? "ren" : ""}`}
              </p>
            </div>
            <p className="text-xs text-muted-foreground">{nights} night{nights !== 1 ? "s" : ""}</p>

            {booking.specialRequests && (
              <>
                <hr className="border-border" />
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Special requests</p>
                  <p className="text-sm">{booking.specialRequests}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Price breakdown */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
              <DollarSign className="h-4 w-4" /> Price breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{formatPrice(Number(booking.listing?.pricePerNight))} × {nights} nights</span>
              <span>{formatPrice(Number(booking.subtotal))}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cleaning fee</span>
              <span>{formatPrice(Number(booking.cleaningFee))}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service fee</span>
              <span>{formatPrice(Number(booking.serviceFee))}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Taxes</span>
              <span>{formatPrice(Number(booking.taxes))}</span>
            </div>
            <hr className="border-border" />
            <div className="flex justify-between font-bold text-base">
              <span>Total</span>
              <span>{formatPrice(Number(booking.totalPrice))}</span>
            </div>
          </CardContent>
        </Card>

        {/* Review */}
        {booking.review && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Guest review</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < booking.review.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{booking.review.comment}</p>
            </CardContent>
          </Card>
        )}

        {/* Actions — only for PENDING */}
        {booking.status === "PENDING" && (
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/30"
              disabled={actioning}
              onClick={() => handleAction("CANCELLED")}
            >
              <XCircle className="h-4 w-4 mr-2" /> Decline
            </Button>
            <Button
              variant="gradient"
              className="flex-1"
              disabled={actioning}
              onClick={() => handleAction("CONFIRMED")}
            >
              <CheckCircle className="h-4 w-4 mr-2" /> Confirm booking
            </Button>
          </div>
        )}

      </motion.div>
    </div>
  );
}
