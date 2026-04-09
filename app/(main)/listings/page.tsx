"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { SlidersHorizontal, Map, Grid3X3, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ListingCard, ListingCardSkeleton } from "@/components/listings/ListingCard";
import { cn } from "@/lib/utils";
import type { ListingWithHost } from "@/types";

const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
];

const PAGE_SIZE = 12;

// ─── Listings Content ───────────────────────────────────────────────────────
function ListingsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [listings, setListings] = useState<ListingWithHost[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [favs, setFavs] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState("recommended");
  const [showSortMenu, setShowSortMenu] = useState(false);

  const location = searchParams.get("location") ?? searchParams.get("city") ?? "";
  const propertyType = searchParams.get("propertyType") ?? searchParams.get("type") ?? "";

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
    setListings([]);
  }, [location, propertyType, sortBy]);

  useEffect(() => {
    async function fetchListings() {
      if (page === 1) setLoading(true);
      else setLoadingMore(true);
      try {
        const params = new URLSearchParams();
        if (location) params.set("city", location);
        if (propertyType) params.set("type", propertyType);
        params.set("sort", sortBy);
        params.set("page", String(page));
        params.set("limit", String(PAGE_SIZE));
        const res = await fetch(`/api/listings?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setListings(prev => page === 1 ? (data.listings ?? []) : [...prev, ...(data.listings ?? [])]);
          setTotal(data.total ?? 0);
        }
      } catch {
        if (page === 1) setListings([]);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    }
    fetchListings();
  }, [location, propertyType, sortBy, page]);

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            {location ? `Stays in ${location}` : propertyType ? `${propertyType.replace("_", " ")}s` : "All Stays"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {loading ? "Loading..." : `${total} properties found`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Sort */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => setShowSortMenu(!showSortMenu)}
              id="sort-button"
            >
              <ArrowUpDown className="h-4 w-4" />
              {SORT_OPTIONS.find(o => o.value === sortBy)?.label ?? "Sort"}
            </Button>
            {showSortMenu && (
              <div className="absolute right-0 mt-1 w-48 bg-card border border-border rounded-xl shadow-xl z-20 overflow-hidden">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setSortBy(opt.value); setShowSortMenu(false); }}
                    className={cn(
                      "w-full text-left px-4 py-2.5 text-sm hover:bg-accent transition-colors",
                      sortBy === opt.value && "text-primary font-medium"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filters */}
          <Button variant="outline" size="sm" className="gap-2" id="filter-button">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>

          {/* Map toggle */}
          <Button
            variant={showMap ? "gradient" : "outline"}
            size="sm"
            className="gap-2"
            onClick={() => setShowMap(!showMap)}
            id="map-toggle"
          >
            {showMap ? <Grid3X3 className="h-4 w-4" /> : <Map className="h-4 w-4" />}
            {showMap ? "Grid" : "Map"}
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className={cn(
        "grid gap-6",
        showMap
          ? "grid-cols-1 sm:grid-cols-2"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      )}>
        {loading
          ? [...Array(8)].map((_, i) => <ListingCardSkeleton key={i} />)
          : listings.map((listing: ListingWithHost, i: number) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <ListingCard
                  listing={listing}
                  isFavorited={favs.has(listing.id)}
                  onToggleFavorite={(id) => {
                    setFavs(prev => {
                      const next = new Set(prev);
                      if (next.has(id)) next.delete(id);
                      else next.add(id);
                      return next;
                    });
                  }}
                />
              </motion.div>
            ))}
      </div>

      {listings.length === 0 && !loading && (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🔍</p>
          <h3 className="text-xl font-semibold mb-2">No properties found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => router.push("/listings")}
          >
            Clear all filters
          </Button>
        </div>
      )}

      {/* Load more */}
      {!loading && listings.length > 0 && listings.length < total && (
        <div className="flex justify-center mt-10">
          <Button
            variant="outline"
            size="lg"
            className="px-10"
            disabled={loadingMore}
            onClick={() => setPage(p => p + 1)}
          >
            {loadingMore ? "Loading..." : `Show more (${total - listings.length} remaining)`}
          </Button>
        </div>
      )}
    </div>
  );
}

export default function ListingsPage() {
  return (
    <div className="pt-16">
      <Suspense fallback={
        <div className="container py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => <ListingCardSkeleton key={i} />)}
          </div>
        </div>
      }>
        <ListingsContent />
      </Suspense>
    </div>
  );
}
