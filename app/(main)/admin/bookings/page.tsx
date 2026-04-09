"use client";

import { useEffect, useState } from "react";
import { CalendarCheck, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AdminBooking {
  id: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  guest: { id: string; name: string | null; email: string };
  listing: { id: string; title: string; slug: string; city: string; country: string };
}

const STATUSES = ["", "PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"];
const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  COMPLETED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
function nights(checkIn: string, checkOut: string) {
  return Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000);
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (statusFilter) params.set("status", statusFilter);
    fetch(`/api/admin/bookings?${params}`)
      .then((r) => r.json())
      .then(setBookings)
      .finally(() => setLoading(false));
  }, [statusFilter]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">All Bookings</h1>
        <p className="text-muted-foreground mt-1">Platform-wide booking management</p>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-1.5 flex-wrap">
        {STATUSES.map((s) => (
          <Button
            key={s || "all"}
            size="sm"
            variant={statusFilter === s ? "default" : "outline"}
            onClick={() => setStatusFilter(s)}
          >
            {s || "All"}
          </Button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {loading ? "Loading..." : `${bookings.length} bookings`}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {bookings.map((booking) => (
              <div key={booking.id} className="px-6 py-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-start gap-4">
                  {/* Listing info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm truncate">{booking.listing.title}</p>
                      <Link
                        href={`/listings/${booking.listing.slug ?? booking.listing.id}`}
                        target="_blank"
                        className="text-muted-foreground hover:text-foreground shrink-0"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {booking.listing.city}, {booking.listing.country}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Guest: <span className="font-medium text-foreground">{booking.guest.name ?? booking.guest.email}</span>
                    </p>
                  </div>

                  {/* Dates + price */}
                  <div className="hidden sm:block text-xs text-right shrink-0">
                    <p className="font-medium">{formatDate(booking.checkIn)} – {formatDate(booking.checkOut)}</p>
                    <p className="text-muted-foreground">{nights(booking.checkIn, booking.checkOut)} nights</p>
                    <p className="font-semibold text-sm mt-1">${Number(booking.totalPrice).toLocaleString()}</p>
                  </div>

                  {/* Status */}
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[booking.status] ?? "bg-muted text-muted-foreground"}`}>
                      {booking.status}
                    </span>
                    <span className="text-xs text-muted-foreground">{formatDate(booking.createdAt)}</span>
                  </div>
                </div>

                {/* Mobile prices */}
                <div className="sm:hidden mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>{formatDate(booking.checkIn)} – {formatDate(booking.checkOut)} ({nights(booking.checkIn, booking.checkOut)}n)</span>
                  <span className="font-semibold text-foreground">${Number(booking.totalPrice).toLocaleString()}</span>
                </div>
              </div>
            ))}

            {!loading && bookings.length === 0 && (
              <div className="px-6 py-12 text-center text-muted-foreground">
                <CalendarCheck className="w-8 h-8 mx-auto mb-3 opacity-30" />
                No bookings found
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
