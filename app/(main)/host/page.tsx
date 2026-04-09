"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Plus, TrendingUp, DollarSign, Star, Calendar, ArrowRight, Eye, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice } from "@/lib/utils";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

interface EarningsData {
  totalEarnings: number;
  pendingPayout: number;
  bookingCount: number;
  avgRating: string | number;
  totalReviews: number;
  monthly: { month: string; earnings: number }[];
}

interface Listing {
  id: string;
  slug: string;
  title: string;
  city: string;
  country: string;
  isActive: boolean;
  pricePerNight: number;
  avgRating: number;
  totalReviews: number;
  images: string[];
  _count: { bookings: number; reviews: number };
}

export default function HostOverviewPage() {
  const [earnings, setEarnings] = useState<EarningsData | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/host/earnings").then((r) => r.json()),
      fetch("/api/host/listings").then((r) => r.json()),
    ]).then(([earningsData, listingsData]) => {
      setEarnings(earningsData);
      setListings(Array.isArray(listingsData) ? listingsData.slice(0, 3) : []);
    }).finally(() => setLoading(false));
  }, []);

  const stats = earnings
    ? [
        { label: "Total earned", value: formatPrice(earnings.totalEarnings), change: null, icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
        { label: "Avg rating", value: earnings.avgRating === "—" ? "—" : Number(earnings.avgRating).toFixed(2), change: null, icon: Star, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/30" },
        { label: "Total bookings", value: String(earnings.bookingCount), change: null, icon: Calendar, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/30" },
        { label: "Active listings", value: String(listings.filter((l) => l.isActive !== false).length), change: null, icon: TrendingUp, color: "text-violet-500", bg: "bg-violet-50 dark:bg-violet-950/30" },
      ]
    : [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Host Overview</h1>
          <p className="text-muted-foreground text-sm">Your hosting performance at a glance</p>
        </div>
        <Link href="/host/listings/new">
          <Button variant="gradient" size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            New listing
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="border-0 shadow-sm">
                <CardContent className="p-4 space-y-2">
                  <Skeleton className="w-10 h-10 rounded-xl" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-3 w-24" />
                </CardContent>
              </Card>
            ))
          : stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <p className="text-xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
      </div>

      {/* Earnings chart */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Monthly Earnings</CardTitle>
            {earnings && (
              <span className="text-sm font-bold text-emerald-500">
                {formatPrice(earnings.totalEarnings)} total
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="w-full h-60 rounded-xl" />
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={earnings?.monthly ?? []} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, "Earnings"]}
                  contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }}
                />
                <Bar dataKey="earnings" fill="#FF385C" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Listings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Your listings</h2>
          <Link href="/host/listings">
            <Button variant="ghost" size="sm" className="gap-1 text-primary">
              Manage all <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <Card key={i} className="border-0 shadow-sm">
                <CardContent className="p-4 flex gap-4">
                  <Skeleton className="w-20 h-16 rounded-xl shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-32" />
                    <Skeleton className="h-3 w-40" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : listings.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="p-8 text-center text-muted-foreground">
              <p className="mb-3">No listings yet</p>
              <Link href="/host/listings/new">
                <Button variant="gradient" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" /> Create your first listing
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {listings.map((listing) => (
              <Card key={listing.id} className="hover:shadow-md transition-all duration-300">
                <CardContent className="p-4 flex gap-4">
                  <div className="relative w-20 h-16 rounded-xl overflow-hidden shrink-0 bg-muted">
                    {listing.images?.[0] && (
                      <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-sm line-clamp-1">{listing.title}</h3>
                      <Badge variant={listing.isActive !== false ? "success" : "secondary"} className="text-xs shrink-0">
                        {listing.isActive !== false ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{listing.city}, {listing.country}</p>
                    <div className="flex items-center gap-4 mt-1.5 text-xs text-muted-foreground">
                      {listing.avgRating > 0 && (
                        <span>⭐ {listing.avgRating.toFixed(2)} ({listing.totalReviews})</span>
                      )}
                      <span>{formatPrice(listing.pricePerNight)}/night</span>
                      <span>{listing._count.bookings} bookings</span>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Link href={`/listings/${listing.slug ?? listing.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-3.5 w-3.5" /></Button>
                    </Link>
                    <Link href={`/host/listings/${listing.id}/edit`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-3.5 w-3.5" /></Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
