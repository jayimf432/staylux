"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, Home, CalendarCheck, Star, DollarSign, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Stats {
  userCount: number;
  listingCount: number;
  bookingCount: number;
  reviewCount: number;
  totalRevenue: number;
  recentBookings: {
    id: string;
    createdAt: string;
    totalPrice: number;
    status: string;
    guest: { name: string | null; email: string };
    listing: { title: string };
  }[];
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  COMPLETED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((d) => setStats(d))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Platform overview and analytics</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 bg-muted rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const statCards = [
    { label: "Total Users", value: stats.userCount, icon: Users, href: "/admin/users", color: "text-blue-600" },
    { label: "Active Listings", value: stats.listingCount, icon: Home, href: "/admin/listings", color: "text-emerald-600" },
    { label: "Total Bookings", value: stats.bookingCount, icon: CalendarCheck, href: "/admin/bookings", color: "text-violet-600" },
    { label: "Reviews", value: stats.reviewCount, icon: Star, href: "#", color: "text-amber-600" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Platform overview and analytics</p>
        </div>
        <div className="flex gap-2 text-sm text-muted-foreground">
          <Link href="/admin/users" className="hover:text-foreground transition-colors">Users</Link>
          <span>·</span>
          <Link href="/admin/listings" className="hover:text-foreground transition-colors">Listings</Link>
          <span>·</span>
          <Link href="/admin/bookings" className="hover:text-foreground transition-colors">Bookings</Link>
        </div>
      </div>

      {/* Revenue highlight */}
      <Card className="border-0 bg-gradient-to-r from-slate-900 to-slate-700 text-white">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="p-3 bg-white/10 rounded-xl">
            <DollarSign className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm text-white/70">Total Platform Revenue</p>
            <p className="text-4xl font-bold mt-0.5">
              ${stats.totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-1 text-emerald-400 text-sm font-medium">
            <TrendingUp className="w-4 h-4" />
            Confirmed + Completed
          </div>
        </CardContent>
      </Card>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <Link key={card.label} href={card.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2 pt-5 px-5">
                <CardTitle className="text-sm font-medium text-muted-foreground">{card.label}</CardTitle>
                <card.icon className={`w-4 h-4 ${card.color}`} />
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <p className="text-3xl font-bold">{card.value.toLocaleString()}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent bookings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Bookings</CardTitle>
          <Link href="/admin/bookings" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            View all →
          </Link>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {stats.recentBookings.map((b) => (
              <div key={b.id} className="py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate">{b.listing.title}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {b.guest.name ?? b.guest.email} · {new Date(b.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-semibold text-sm">${Number(b.totalPrice).toLocaleString()}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[b.status] ?? "bg-muted text-muted-foreground"}`}>
                    {b.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
