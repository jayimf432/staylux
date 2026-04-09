import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Calendar, Heart, Star, MessageSquare, ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Dashboard" };

const MOCK_STATS = [
  { label: "Upcoming trips", value: "2", icon: Calendar, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/30" },
  { label: "Wishlist items", value: "12", icon: Heart, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-950/30" },
  { label: "Reviews given", value: "8", icon: Star, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/30" },
  { label: "Messages", value: "3", icon: MessageSquare, color: "text-violet-500", bg: "bg-violet-50 dark:bg-violet-950/30" },
];

const MOCK_UPCOMING = [
  {
    id: "b1",
    listing: { title: "Cliffside Villa — Santorini", city: "Oia", country: "Greece", images: ["https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=80"] },
    checkIn: "2025-08-14",
    checkOut: "2025-08-21",
    guests: 2,
    totalPrice: 14580,
    status: "CONFIRMED",
  },
  {
    id: "b2",
    listing: { title: "Overwater Villa — Maldives", city: "Baa Atoll", country: "Maldives", images: ["https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&q=80"] },
    checkIn: "2025-10-02",
    checkOut: "2025-10-09",
    guests: 2,
    totalPrice: 11000,
    status: "PENDING",
  },
];

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">
          Welcome back, {session.user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Here's what's happening with your account.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_STATS.map((stat) => (
          <Card key={stat.label} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming trips */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Upcoming trips</h2>
          <Link href="/dashboard/bookings">
            <Button variant="ghost" size="sm" className="gap-1 text-primary">
              View all <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {MOCK_UPCOMING.map((booking) => (
            <Link key={booking.id} href={`/dashboard/bookings/${booking.id}`}>
              <Card className="hover:shadow-md transition-all duration-300 cursor-pointer">
                <CardContent className="p-4 flex gap-4">
                  <div className="relative w-24 h-20 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={booking.listing.images[0]}
                      alt={booking.listing.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-sm line-clamp-1">{booking.listing.title}</h3>
                      <Badge
                        variant={booking.status === "CONFIRMED" ? "success" : "warning"}
                        className="shrink-0 text-xs"
                      >
                        {booking.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {booking.listing.city}, {booking.listing.country}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(booking.checkIn).toLocaleDateString("en-US", { month: "short", day: "numeric" })} —{" "}
                      {new Date(booking.checkOut).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      {" "}· {booking.guests} guest{booking.guests > 1 ? "s" : ""}
                    </p>
                    <p className="text-sm font-semibold mt-1">
                      ${booking.totalPrice.toLocaleString()} total
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {MOCK_UPCOMING.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="py-10 text-center">
              <Calendar className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <h3 className="font-medium mb-1">No upcoming trips</h3>
              <p className="text-sm text-muted-foreground mb-4">Time to plan your next adventure.</p>
              <Link href="/listings">
                <Button variant="gradient" size="sm">Explore stays</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: "/listings", label: "Find a stay", desc: "Browse 2M+ properties", emoji: "🔍" },
            { href: "/dashboard/favorites", label: "Your wishlist", desc: "12 saved properties", emoji: "❤️" },
            { href: "/host/listings/new", label: "List your space", desc: "Start earning as a host", emoji: "🏡" },
          ].map((action) => (
            <Link key={action.href} href={action.href}>
              <Card className="hover:shadow-md transition-all duration-300 cursor-pointer border hover:border-primary/30">
                <CardContent className="p-4">
                  <p className="text-2xl mb-2">{action.emoji}</p>
                  <p className="font-medium text-sm">{action.label}</p>
                  <p className="text-xs text-muted-foreground">{action.desc}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
