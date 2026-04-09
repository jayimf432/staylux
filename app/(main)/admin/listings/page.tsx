"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Home, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AdminListing {
  id: string;
  slug: string;
  title: string;
  city: string;
  country: string;
  isActive: boolean;
  pricePerNight: number;
  createdAt: string;
  images: string[];
  host: { id: string; name: string | null; email: string };
  _count: { bookings: number; reviews: number };
}

export default function AdminListingsPage() {
  const [listings, setListings] = useState<AdminListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    fetch(`/api/admin/listings?${params}`)
      .then((r) => r.json())
      .then(setListings)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleActive = async (listingId: string, isActive: boolean) => {
    setUpdating(listingId);
    try {
      const res = await fetch("/api/admin/listings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId, isActive }),
      });
      if (!res.ok) throw new Error();
      setListings((prev) => prev.map((l) => l.id === listingId ? { ...l, isActive } : l));
      toast.success("Listing updated");
    } catch {
      toast.error("Failed to update listing");
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Listing Moderation</h1>
        <p className="text-muted-foreground mt-1">Review and moderate all property listings</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by title or city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {loading ? "Loading..." : `${listings.length} listings`}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {listings.map((listing) => (
              <div key={listing.id} className="flex items-center gap-4 px-6 py-4 hover:bg-muted/30 transition-colors">
                {/* Thumbnail */}
                <div className="w-14 h-14 rounded-lg bg-muted overflow-hidden shrink-0">
                  {listing.images?.[0] ? (
                    <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Home className="w-5 h-5 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm truncate">{listing.title}</p>
                    <Link
                      href={`/listings/${listing.slug ?? listing.id}`}
                      target="_blank"
                      className="text-muted-foreground hover:text-foreground shrink-0"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <p className="text-xs text-muted-foreground">{listing.city}, {listing.country}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Host: {listing.host.name ?? listing.host.email}
                  </p>
                </div>

                {/* Stats */}
                <div className="hidden md:flex flex-col text-xs text-muted-foreground text-right gap-0.5">
                  <span>${Number(listing.pricePerNight).toLocaleString()}/night</span>
                  <span>{listing._count.bookings} bookings · {listing._count.reviews} reviews</span>
                </div>

                {/* Active toggle */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${listing.isActive ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-700"}`}>
                    {listing.isActive ? "Active" : "Inactive"}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={updating === listing.id}
                    onClick={() => toggleActive(listing.id, !listing.isActive)}
                    className="text-xs h-7 px-2"
                  >
                    {listing.isActive ? "Deactivate" : "Activate"}
                  </Button>
                </div>
              </div>
            ))}

            {!loading && listings.length === 0 && (
              <div className="px-6 py-12 text-center text-muted-foreground">
                <Home className="w-8 h-8 mx-auto mb-3 opacity-30" />
                No listings found
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
