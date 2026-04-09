"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar, MapPin, Users, Clock, CheckCircle2,
  XCircle, Star, Check, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice, getInitials } from "@/lib/utils";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const STATUS_CONFIG = {
  PENDING:   { label: "Pending",   className: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",       icon: Clock },
  CONFIRMED: { label: "Confirmed", className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300", icon: CheckCircle2 },
  CANCELLED: { label: "Cancelled", className: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",               icon: XCircle },
  COMPLETED: { label: "Completed", className: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",           icon: Star },
};

const TABS = ["All", "Pending", "Confirmed", "Completed", "Cancelled"] as const;

function formatDate(d: string | Date) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function HostBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [actionId, setActionId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/host/bookings")
      .then((r) => r.json())
      .then((data) => setBookings(Array.isArray(data) ? data : []))
      .catch(() => toast.error("Failed to load bookings"))
      .finally(() => setLoading(false));
  }, []);

  const handleAction = async (bookingId: string, status: "CONFIRMED" | "CANCELLED") => {
    setActionId(bookingId);
    try {
      const res = await fetch("/api/host/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, status }),
      });
      if (!res.ok) { toast.error("Failed to update booking"); return; }
      setBookings((prev) => prev.map((b) => b.id === bookingId ? { ...b, status } : b));
      toast.success(status === "CONFIRMED" ? "Booking confirmed" : "Booking declined");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setActionId(null);
    }
  };

  const filtered = activeTab === "All"
    ? bookings
    : bookings.filter((b) => b.status === activeTab.toUpperCase());

  const pendingCount = bookings.filter((b) => b.status === "PENDING").length;

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="flex gap-2">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-8 w-20 rounded-full" />)}</div>
        {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-36 w-full rounded-2xl" />)}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-3">
          Incoming Bookings
          {pendingCount > 0 && (
            <span className="text-sm font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
              {pendingCount} pending
            </span>
          )}
        </h1>
        <p className="text-muted-foreground text-sm mt-1">{bookings.length} total bookings across all your properties</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
              activeTab === tab
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            {tab}
            {tab === "Pending" && pendingCount > 0 && (
              <span className="ml-1.5 text-xs bg-amber-500 text-white rounded-full px-1.5 py-0.5">{pendingCount}</span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-2xl">
          <p className="text-4xl mb-3">📭</p>
          <p className="font-semibold">No {activeTab.toLowerCase()} bookings</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((booking, i) => {
            const status = STATUS_CONFIG[booking.status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.PENDING;
            const StatusIcon = status.icon;
            const isPending = booking.status === "PENDING";

            return (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className={cn(
                  "rounded-2xl border bg-card p-4 transition-all duration-200",
                  isPending ? "border-amber-200 dark:border-amber-800 shadow-sm" : "border-border hover:shadow-sm"
                )}
              >
                <div className="flex gap-4">
                  {/* Listing image */}
                  <div className="relative w-20 h-16 rounded-xl overflow-hidden shrink-0">
                    {booking.listing?.images?.[0] ? (
                      <Image src={booking.listing.images[0]} alt={booking.listing.title} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">🏡</div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs text-muted-foreground line-clamp-1">{booking.listing?.title}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />{booking.listing?.city}
                        </p>
                      </div>
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${status.className}`}>
                        <StatusIcon className="h-3 w-3" />
                        {status.label}
                      </span>
                    </div>

                    {/* Guest */}
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={booking.guest?.image ?? ""} />
                        <AvatarFallback className="text-xs">{getInitials(booking.guest?.name ?? "G")}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium">{booking.guest?.name}</span>
                      <span className="text-xs text-muted-foreground">{booking.guest?.email}</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(booking.checkIn)} → {formatDate(booking.checkOut)}</span>
                      <span>·</span>
                      <span>{booking.totalNights} nights</span>
                      <span className="flex items-center gap-1"><Users className="h-3 w-3" />{booking.adults} guests</span>
                      <span className="font-semibold text-foreground">{formatPrice(booking.totalPrice)}</span>
                    </div>
                  </div>
                </div>

                {/* Actions for pending */}
                {isPending && (
                  <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                    <Button
                      size="sm"
                      className="gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white flex-1"
                      onClick={() => handleAction(booking.id, "CONFIRMED")}
                      disabled={actionId === booking.id}
                    >
                      <Check className="h-3.5 w-3.5" /> Confirm
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10 flex-1"
                      onClick={() => handleAction(booking.id, "CANCELLED")}
                      disabled={actionId === booking.id}
                    >
                      <X className="h-3.5 w-3.5" /> Decline
                    </Button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
