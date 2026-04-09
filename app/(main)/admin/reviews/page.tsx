"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Star, Trash2, ExternalLink, User, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

interface AdminReview {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  author: { id: string; name: string | null; email: string; image: string | null };
  listing: { id: string; slug: string; title: string; city: string; country: string };
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`h-3.5 w-3.5 ${s <= rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
        />
      ))}
    </div>
  );
}

function getInitials(name: string) {
  return name.split(" ").map((p) => p[0]).join("").toUpperCase().slice(0, 2);
}

const RATING_FILTERS = [0, 5, 4, 3, 2, 1];

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (minRating > 0) params.set("minRating", String(minRating));
    fetch(`/api/admin/reviews?${params}`)
      .then((r) => r.json())
      .then(setReviews)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [search, minRating]); // eslint-disable-line react-hooks/exhaustive-deps

  const deleteReview = async (reviewId: string) => {
    if (!confirm("Delete this review? This cannot be undone.")) return;
    setDeleting(reviewId);
    try {
      const res = await fetch("/api/admin/reviews", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewId }),
      });
      if (!res.ok) throw new Error();
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      toast.success("Review deleted");
    } catch {
      toast.error("Failed to delete review");
    } finally {
      setDeleting(null);
    }
  };

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(2)
    : "—";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reviews</h1>
        <p className="text-muted-foreground mt-1">Moderate all guest reviews across the platform</p>
      </div>

      {/* Quick star breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[5, 4, 3, 2].map((star) => {
          const count = reviews.filter((r) => r.rating === star).length;
          return (
            <button
              key={star}
              onClick={() => setMinRating(minRating === star ? 0 : star)}
              className={`rounded-xl border p-3 text-left transition-colors ${
                minRating === star ? "border-primary bg-primary/5" : "border-border hover:bg-muted/30"
              }`}
            >
              <div className="flex gap-0.5 mb-1">
                {[...Array(star)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xl font-bold">{count}</p>
              <p className="text-xs text-muted-foreground">{star}-star reviews</p>
            </button>
          );
        })}
      </div>

      {/* Search + rating filter */}
      <div className="flex gap-3 flex-wrap items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by review text, listing, or guest..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {RATING_FILTERS.map((r) => (
            <Button
              key={r}
              size="sm"
              variant={minRating === r ? "default" : "outline"}
              onClick={() => setMinRating(r)}
              className="gap-1"
            >
              {r === 0 ? "All" : (
                <><Star className="h-3 w-3 fill-current" /> {r}+</>
              )}
            </Button>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">
            {loading ? "Loading..." : `${reviews.length} reviews`}
          </CardTitle>
          {!loading && reviews.length > 0 && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-foreground">{avgRating}</span>
              avg rating
            </div>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {reviews.map((review) => (
              <div key={review.id} className="px-6 py-4 hover:bg-muted/20 transition-colors">
                <div className="flex items-start gap-4">
                  <Avatar className="h-9 w-9 shrink-0">
                    <AvatarImage src={review.author.image ?? ""} />
                    <AvatarFallback className="text-xs">
                      {review.author.name ? getInitials(review.author.name) : <User className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-medium text-sm">{review.author.name ?? review.author.email}</span>
                      <StarRow rating={review.rating} />
                      <span className="text-xs text-muted-foreground">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-1.5">{review.comment}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MessageSquare className="h-3 w-3" />
                      <Link
                        href={`/listings/${review.listing.slug ?? review.listing.id}`}
                        target="_blank"
                        className="hover:text-foreground transition-colors hover:underline flex items-center gap-1"
                      >
                        {review.listing.title}
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                      <span>·</span>
                      <span>{review.listing.city}, {review.listing.country}</span>
                    </div>
                  </div>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="shrink-0 h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    disabled={deleting === review.id}
                    onClick={() => deleteReview(review.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            {!loading && reviews.length === 0 && (
              <div className="px-6 py-12 text-center text-muted-foreground">
                <Star className="w-8 h-8 mx-auto mb-3 opacity-30" />
                No reviews found
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
