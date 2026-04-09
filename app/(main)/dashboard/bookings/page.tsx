"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight, Clock, CheckCircle2, XCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice } from "@/lib/utils";

const STATUS_CONFIG = {
  PENDING:   { label: "Pending",   className: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",   icon: Clock },
  CONFIRMED: { label: "Confirmed", className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300", icon: CheckCircle2 },
  CANCELLED: { label: "Cancelled", className: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",           icon: XCircle },
  COMPLETED: { label: "Completed", className: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",       icon: Star },
};

function formatDate(d: string | Date) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/bookings")
      .then((r) => r.json())
      .then((data) => setBookings(Array.isArray(data) ? data : []))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, []);

  const upcoming = bookings.filter((b) => ["PENDING", "CONFIRMED"].includes(b.status));
  const past = bookings.filter((b) => ["COMPLETED", "CANCELLED"].includes(b.status));

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-36 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4">🧳</div>
        <h2 className="text-xl font-bold mb-2">No trips yet</h2>
        <p className="text-muted-foreground mb-6">Start exploring and book your first stay.</p>
        <Link href="/listings">
          <Button variant="gradient">Browse listings</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">My Bookings</h1>

      {upcoming.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Upcoming trips
          </h2>
          <div className="space-y-4">
            {upcoming.map((booking, i) => (
              <BookingCard key={booking.id} booking={booking} index={i} />
            ))}
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Past trips
          </h2>
          <div className="space-y-4">
            {past.map((booking, i) => (
              <BookingCard key={booking.id} booking={booking} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function BookingCard({ booking, index }: { booking: any; index: number }) {
  const status = STATUS_CONFIG[booking.status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.PENDING;
  const StatusIcon = status.icon;
  const image = booking.listing?.images?.[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/dashboard/bookings/${booking.id}`}>
        <div className="flex gap-4 p-4 rounded-2xl border border-border hover:shadow-md hover:border-primary/20 transition-all duration-200 bg-card cursor-pointer">
          {/* Image */}
          <div className="relative w-28 h-24 rounded-xl overflow-hidden shrink-0">
            {image ? (
              <Image src={image} alt={booking.listing?.title ?? ""} fill className="object-cover" />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center text-2xl">🏡</div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-semibold text-sm leading-tight line-clamp-1">
                {booking.listing?.title ?? "Listing"}
              </h3>
              <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${status.className}`}>
                <StatusIcon className="h-3 w-3" />
                {status.label}
              </span>
            </div>

            <p className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
              <MapPin className="h-3 w-3" />
              {booking.listing?.city}, {booking.listing?.country}
            </p>

            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(booking.checkIn)} → {formatDate(booking.checkOut)}
              </span>
              <span>·</span>
              <span>{booking.totalNights} nights</span>
            </div>
          </div>

          {/* Price + arrow */}
          <div className="flex flex-col items-end justify-between shrink-0">
            <span className="font-bold text-sm">{formatPrice(booking.totalPrice)}</span>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
