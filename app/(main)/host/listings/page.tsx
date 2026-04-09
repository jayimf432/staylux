"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Plus, Eye, Edit, Trash2, Star, Users, BedDouble,
  ToggleLeft, ToggleRight, MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";

export default function HostListingsPage() {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/host/listings")
      .then((r) => r.json())
      .then((data) => setListings(Array.isArray(data) ? data : []))
      .catch(() => toast.error("Failed to load listings"))
      .finally(() => setLoading(false));
  }, []);

  const handleToggleActive = async (listing: any) => {
    setTogglingId(listing.id);
    const next = !listing.isActive;
    setListings((prev) => prev.map((l) => l.id === listing.id ? { ...l, isActive: next } : l));
    try {
      const res = await fetch(`/api/listings/${listing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: next }),
      });
      if (!res.ok) {
        setListings((prev) => prev.map((l) => l.id === listing.id ? { ...l, isActive: !next } : l));
        toast.error("Failed to update listing");
      } else {
        toast.success(next ? "Listing published" : "Listing unpublished");
      }
    } catch {
      setListings((prev) => prev.map((l) => l.id === listing.id ? { ...l, isActive: !next } : l));
      toast.error("Something went wrong");
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this listing? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/listings/${id}`, { method: "DELETE" });
      if (!res.ok) { toast.error("Failed to delete listing"); return; }
      setListings((prev) => prev.filter((l) => l.id !== id));
      toast.success("Listing deleted");
    } catch {
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-36" />
          <Skeleton className="h-9 w-32 rounded-xl" />
        </div>
        {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-32 w-full rounded-2xl" />)}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Listings</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {listings.length} {listings.length === 1 ? "property" : "properties"}
          </p>
        </div>
        <Link href="/host/listings/new">
          <Button variant="gradient" size="sm" className="gap-2">
            <Plus className="h-4 w-4" /> Add listing
          </Button>
        </Link>
      </div>

      {listings.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border rounded-2xl">
          <div className="text-5xl mb-4">🏡</div>
          <h2 className="text-xl font-bold mb-2">No listings yet</h2>
          <p className="text-muted-foreground mb-6">Create your first listing to start earning.</p>
          <Link href="/host/listings/new">
            <Button variant="gradient" className="gap-2"><Plus className="h-4 w-4" />Create listing</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {listings.map((listing, i) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-border bg-card hover:shadow-md transition-all duration-200"
            >
              <div className="flex gap-4 p-4">
                {/* Image */}
                <div className="relative w-28 h-24 rounded-xl overflow-hidden shrink-0">
                  {listing.images?.[0] ? (
                    <Image src={listing.images[0]} alt={listing.title} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center text-2xl">🏡</div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-sm line-clamp-1">{listing.title}</h3>
                    <Badge
                      className={listing.isActive
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border-0 text-xs"
                        : "bg-muted text-muted-foreground border-0 text-xs"}
                    >
                      {listing.isActive ? "Published" : "Unpublished"}
                    </Badge>
                  </div>

                  <p className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                    <MapPin className="h-3 w-3" />{listing.city}, {listing.country}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      {listing.avgRating > 0 ? listing.avgRating.toFixed(2) : "No reviews"}
                      {listing.totalReviews > 0 && ` (${listing.totalReviews})`}
                    </span>
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" />{listing.maxGuests} guests</span>
                    <span className="flex items-center gap-1"><BedDouble className="h-3 w-3" />{listing.bedrooms} bed</span>
                    <span className="font-medium text-foreground">{formatPrice(listing.pricePerNight)}/night</span>
                    <span>{listing._count?.bookings ?? 0} bookings</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 items-end justify-between shrink-0">
                  <div className="flex items-center gap-1">
                    <Link href={`/listings/${listing.slug}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="View">
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                    <Link href={`/host/listings/${listing.id}/edit`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="Edit">
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      title="Delete"
                      onClick={() => handleDelete(listing.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <button
                    onClick={() => handleToggleActive(listing)}
                    disabled={togglingId === listing.id}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    title={listing.isActive ? "Unpublish" : "Publish"}
                  >
                    {listing.isActive
                      ? <ToggleRight className="h-5 w-5 text-emerald-500" />
                      : <ToggleLeft className="h-5 w-5" />}
                    {listing.isActive ? "Live" : "Off"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
