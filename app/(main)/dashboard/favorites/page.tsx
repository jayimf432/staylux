"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ListingCard, ListingCardSkeleton } from "@/components/listings/ListingCard";
import { toast } from "sonner";
import type { ListingWithHost } from "@/types";

interface Favorite {
  id: string;
  listingId: string;
  listing: ListingWithHost;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/favorites")
      .then((r) => r.json())
      .then((data) => setFavorites(Array.isArray(data) ? data : []))
      .catch(() => setFavorites([]))
      .finally(() => setLoading(false));
  }, []);

  const handleToggle = async (listingId: string) => {
    setFavorites((prev) => prev.filter((f) => f.listingId !== listingId));
    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId }),
      });
      if (!res.ok) {
        toast.error("Failed to update wishlist");
        fetch("/api/favorites").then((r) => r.json()).then((d) => setFavorites(Array.isArray(d) ? d : []));
      } else {
        toast.success("Removed from wishlist");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-40 bg-muted rounded animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => <ListingCardSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
          <Heart className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-bold mb-2">No saved properties yet</h2>
        <p className="text-muted-foreground mb-6">Tap the heart on any listing to save it here.</p>
        <Link href="/listings">
          <Button variant="gradient">Explore listings</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Wishlist</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {favorites.length} saved {favorites.length === 1 ? "property" : "properties"}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((fav, i) => (
          <motion.div
            key={fav.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <ListingCard
              listing={fav.listing}
              isFavorited={true}
              onToggleFavorite={handleToggle}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
