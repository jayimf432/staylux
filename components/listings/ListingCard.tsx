"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star, ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatPrice, getPropertyTypeLabel } from "@/lib/utils";
import type { ListingWithHost } from "@/types";
import { cn } from "@/lib/utils";

interface ListingCardProps {
  listing: ListingWithHost;
  isFavorited?: boolean;
  onToggleFavorite?: (id: string) => void;
}

export function ListingCard({
  listing,
  isFavorited = false,
  onToggleFavorite,
}: ListingCardProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [favorited, setFavorited] = useState(isFavorited);

  const images = listing.images?.length > 0
    ? listing.images
    : ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80"];

  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = !favorited;
    setFavorited(next);
    onToggleFavorite?.(listing.id);

    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId: listing.id }),
      });
      if (!res.ok) {
        // Revert on failure (e.g. not logged in)
        setFavorited(!next);
      }
    } catch {
      setFavorited(!next);
    }
  };

  const goNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImage((i) => (i + 1) % images.length);
  };

  const goPrev = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImage((i) => (i - 1 + images.length) % images.length);
  };

  return (
    <Link href={`/listings/${listing.slug}`} className="block group">
      <div
        className="card-hover"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={images[currentImage]}
                alt={listing.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </motion.div>
          </AnimatePresence>

          {/* Overlay gradient */}
          <div className="absolute inset-0 image-overlay" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {listing.isFeatured && (
              <Badge variant="coral" className="text-xs">
                Featured
              </Badge>
            )}
            {listing.instantBook && (
              <Badge className="bg-emerald-500 text-white text-xs border-0">
                <Zap className="h-3 w-3 mr-0.5" />
                Instant
              </Badge>
            )}
          </div>

          {/* Favorite button */}
          <button
            onClick={handleFavorite}
            className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/40 hover:scale-110"
            aria-label={favorited ? "Remove from wishlist" : "Add to wishlist"}
          >
            <motion.div
              animate={favorited ? { scale: [1, 1.4, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart
                className={cn(
                  "h-4 w-4 transition-colors duration-200",
                  favorited
                    ? "fill-[#FF385C] text-[#FF385C]"
                    : "text-white fill-white/30"
                )}
              />
            </motion.div>
          </button>

          {/* Image navigation */}
          {images.length > 1 && (
            <AnimatePresence>
              {isHovered && (
                <>
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    onClick={goPrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-4 w-4 text-foreground" />
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    onClick={goNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-4 w-4 text-foreground" />
                  </motion.button>
                </>
              )}
            </AnimatePresence>
          )}

          {/* Image dots */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
              {images.slice(0, 5).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1 rounded-full transition-all duration-300",
                    i === currentImage
                      ? "w-4 bg-white"
                      : "w-1 bg-white/50"
                  )}
                />
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="mt-3 px-0.5">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                {getPropertyTypeLabel(listing.propertyType)} · {listing.city},{" "}
                {listing.country}
              </p>
              <h3 className="text-sm font-semibold text-foreground line-clamp-1 mt-0.5">
                {listing.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {listing.maxGuests} guests · {listing.bedrooms} bed ·{" "}
                {listing.bathrooms} bath
              </p>
            </div>

            {listing.avgRating > 0 && (
              <div className="flex items-center gap-1 shrink-0">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span className="text-sm font-medium">
                  {listing.avgRating.toFixed(2)}
                </span>
                {listing.totalReviews > 0 && (
                  <span className="text-xs text-muted-foreground">
                    ({listing.totalReviews})
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-sm font-bold text-foreground">
              {formatPrice(listing.pricePerNight)}
            </span>
            <span className="text-xs text-muted-foreground">/ night</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
export function ListingCardSkeleton() {
  return (
    <div className="space-y-3">
      <div className="aspect-[4/3] rounded-2xl shimmer" />
      <div className="space-y-2 px-0.5">
        <div className="h-3 w-24 rounded shimmer" />
        <div className="h-4 w-3/4 rounded shimmer" />
        <div className="h-3 w-1/2 rounded shimmer" />
        <div className="h-4 w-20 rounded-lg shimmer mt-1" />
      </div>
    </div>
  );
}
