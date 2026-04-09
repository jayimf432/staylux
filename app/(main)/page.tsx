"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Star,
  ArrowRight,
  Shield,
  Award,
  Headphones,
  Waves,
  Mountain,
  Trees,
  Anchor,
  Home,
  Building,
  Tent,
  Ship,
  Sparkles,
  ChevronRight,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ListingCard } from "@/components/listings/ListingCard";
import { formatPrice } from "@/lib/utils";

// ─── Hero Search ─────────────────────────────────────────────────────────────
function HeroSearch() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    if (guests > 1) params.set("adults", String(guests));
    router.push(`/listings?${params.toString()}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:divide-x divide-white/20">
          {/* Location */}
          <div className="flex flex-col p-3 md:p-4 group">
            <label className="text-xs font-semibold text-white/80 mb-1 flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              Location
            </label>
            <input
              type="text"
              placeholder="Where are you going?"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent text-white placeholder-white/50 text-sm focus:outline-none font-medium"
            />
          </div>

          {/* Check-in */}
          <div className="flex flex-col p-3 md:p-4">
            <label className="text-xs font-semibold text-white/80 mb-1 flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Check in
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="bg-transparent text-white text-sm focus:outline-none font-medium [color-scheme:dark]"
            />
          </div>

          {/* Check-out */}
          <div className="flex flex-col p-3 md:p-4">
            <label className="text-xs font-semibold text-white/80 mb-1 flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Check out
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="bg-transparent text-white text-sm focus:outline-none font-medium [color-scheme:dark]"
            />
          </div>

          {/* Guests + Search */}
          <div className="flex items-center gap-2 p-2">
            <div className="flex flex-col flex-1 px-2">
              <label className="text-xs font-semibold text-white/80 mb-1 flex items-center gap-1">
                <Users className="h-3 w-3" />
                Guests
              </label>
              <input
                type="number"
                min={1}
                max={20}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="bg-transparent text-white text-sm focus:outline-none font-medium w-16"
              />
            </div>
            <Button
              onClick={handleSearch}
              className="bg-gradient-to-r from-[#FF385C] to-[#E61E4D] text-white rounded-xl h-12 px-6 shrink-0 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline ml-1">Search</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Category Pills ───────────────────────────────────────────────────────────
const categories = [
  { icon: Waves, label: "Beachfront", value: "BEACHFRONT" },
  { icon: Mountain, label: "Mountains", value: "CABIN" },
  { icon: Trees, label: "Treehouses", value: "TREEHOUSE" },
  { icon: Ship, label: "Boats", value: "BOAT" },
  { icon: Building, label: "Apartments", value: "APARTMENT" },
  { icon: Home, label: "Villas", value: "VILLA" },
  { icon: Award, label: "Mansions", value: "MANSION" },
  { icon: Tent, label: "Tiny homes", value: "TINY_HOME" },
];

function CategoryPills({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
      <button
        onClick={() => onSelect("")}
        className={`category-pill shrink-0 ${active === "" ? "active" : ""}`}
      >
        <Sparkles className="h-5 w-5" />
        <span>All</span>
      </button>
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onSelect(cat.value)}
          className={`category-pill shrink-0 ${active === cat.value ? "active" : ""}`}
        >
          <cat.icon className="h-5 w-5" />
          <span>{cat.label}</span>
        </button>
      ))}
    </div>
  );
}

// ─── Featured Listings ────────────────────────────────────────────────────────
const MOCK_LISTINGS = [
  {
    id: "1",
    slug: "sunset-villa-maldives",
    title: "Overwater Villa — Maldives",
    city: "Baa Atoll",
    country: "Maldives",
    propertyType: "VILLA",
    pricePerNight: 1250,
    avgRating: 4.97,
    totalReviews: 238,
    images: ["https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80"],
    isFeatured: true,
    instantBook: true,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    beds: 2,
    hostId: "host1",
    host: { id: "host1", name: "Amira", image: null, createdAt: new Date() },
  },
  {
    id: "2",
    slug: "mountain-cabin-aspen",
    title: "Luxury Ski Chalet — Aspen",
    city: "Aspen",
    country: "USA",
    propertyType: "CABIN",
    pricePerNight: 895,
    avgRating: 4.92,
    totalReviews: 156,
    images: ["https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80"],
    isFeatured: true,
    instantBook: false,
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    beds: 5,
    hostId: "host2",
    host: { id: "host2", name: "James", image: null, createdAt: new Date() },
  },
  {
    id: "3",
    slug: "treehouse-costa-rica",
    title: "Jungle Treehouse — Costa Rica",
    city: "Manuel Antonio",
    country: "Costa Rica",
    propertyType: "TREEHOUSE",
    pricePerNight: 420,
    avgRating: 4.98,
    totalReviews: 89,
    images: ["https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=80"],
    isFeatured: true,
    instantBook: true,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    beds: 1,
    hostId: "host3",
    host: { id: "host3", name: "Sofia", image: null, createdAt: new Date() },
  },
  {
    id: "4",
    slug: "beachfront-villa-santorini",
    title: "Cliffside Villa — Santorini",
    city: "Oia",
    country: "Greece",
    propertyType: "VILLA",
    pricePerNight: 1850,
    avgRating: 4.95,
    totalReviews: 312,
    images: ["https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80"],
    isFeatured: true,
    instantBook: false,
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 3,
    beds: 3,
    hostId: "host4",
    host: { id: "host4", name: "Nikos", image: null, createdAt: new Date() },
  },
  {
    id: "5",
    slug: "penthouse-new-york",
    title: "Manhattan Penthouse — NYC",
    city: "New York",
    country: "USA",
    propertyType: "APARTMENT",
    pricePerNight: 780,
    avgRating: 4.89,
    totalReviews: 201,
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80"],
    isFeatured: false,
    instantBook: true,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    beds: 2,
    hostId: "host5",
    host: { id: "host5", name: "Rachel", image: null, createdAt: new Date() },
  },
  {
    id: "6",
    slug: "houseboat-amsterdam",
    title: "Historic Houseboat — Amsterdam",
    city: "Amsterdam",
    country: "Netherlands",
    propertyType: "BOAT",
    pricePerNight: 340,
    avgRating: 4.93,
    totalReviews: 427,
    images: ["https://images.unsplash.com/photo-1536768139911-e290a59011e4?w=800&q=80"],
    isFeatured: false,
    instantBook: true,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    beds: 1,
    hostId: "host6",
    host: { id: "host6", name: "Lena", image: null, createdAt: new Date() },
  },
];

// ─── How It Works ─────────────────────────────────────────────────────────────
const howItWorks = [
  {
    step: "01",
    icon: Search,
    title: "Find your perfect stay",
    desc: "Browse thousands of unique properties — from secluded villas to city penthouses. Use smart filters to find exactly what you need.",
    color: "from-rose-500 to-pink-600",
  },
  {
    step: "02",
    icon: Calendar,
    title: "Book with confidence",
    desc: "Secure payment, flexible cancellation options, and 24/7 support. Your booking is protected every step of the way.",
    color: "from-violet-500 to-purple-600",
  },
  {
    step: "03",
    icon: Star,
    title: "Live the experience",
    desc: "Check in seamlessly, enjoy curated amenities, and share your story. Our hosts go above and beyond to make it unforgettable.",
    color: "from-amber-500 to-orange-600",
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  {
    name: "Sarah Mitchell",
    location: "New York, USA",
    avatar: "SM",
    rating: 5,
    text: "StayLux found us the most breathtaking villa in Santorini. The booking was seamless, the host was incredible, and we'll never forget the sunset views. 10/10 would book again.",
    property: "Cliffside Villa, Greece",
  },
  {
    name: "Marco Bianchi",
    location: "Milan, Italy",
    avatar: "MB",
    rating: 5,
    text: "I've tried every rental platform out there. StayLux is on a completely different level. The properties are stunning, the service is premier, and everything just works.",
    property: "Overwater Villa, Maldives",
  },
  {
    name: "Emma Tanaka",
    location: "Tokyo, Japan",
    avatar: "ET",
    rating: 5,
    text: "Stayed in the most magical treehouse in Costa Rica. My kids still talk about it. The platform was so easy to use and the host recommendations were spot-on.",
    property: "Jungle Treehouse, Costa Rica",
  },
];

// ─── Homepage ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("");
  const [favs, setFavs] = useState<Set<string>>(new Set());
  const [featuredListings, setFeaturedListings] = useState<any[]>([]);
  const [loadingListings, setLoadingListings] = useState(true);

  useEffect(() => {
    fetch("/api/listings?limit=6&sort=featured")
      .then((r) => r.json())
      .then((d) => setFeaturedListings(d.listings ?? []))
      .catch(() => setFeaturedListings([]))
      .finally(() => setLoadingListings(false));
  }, []);

  const handleCategorySelect = (value: string) => {
    setActiveCategory(value);
    const params = new URLSearchParams();
    if (value) params.set("propertyType", value);
    router.push(`/listings?${params.toString()}`);
  };

  return (
    <>
      {/* ─── Hero Section ─── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div
          className="absolute inset-0 animate-gradient-shift bg-[size:300%_300%]"
          style={{
            background:
              "linear-gradient(-45deg, #0f0c29, #302b63, #24243e, #1a0533, #0d1117, #1c2a4a)",
            backgroundSize: "400% 400%",
          }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${(i * 37 + 11) % 100}%`,
                top: `${(i * 53 + 7) % 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + (i % 4),
                repeat: Infinity,
                delay: (i * 0.4) % 5,
              }}
            />
          ))}
        </div>

        {/* Overlay image */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1920&q=80"
            alt="Luxury villa background"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-10 container text-center py-32 flex flex-col items-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-sm mb-4 py-1.5 px-4 text-sm">
              <Sparkles className="h-3.5 w-3.5 mr-1.5 text-amber-400" />
              The world's most extraordinary stays
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
          >
            Live Beyond
            <br />
            <span className="bg-gradient-to-r from-[#FF385C] via-[#ff6b7a] to-[#E61E4D] bg-clip-text text-transparent">
              Ordinary
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed"
          >
            Discover curated villas, private treehouses, overwater bungalows,
            and hidden gems across 190 countries. Your extraordinary escape
            starts here.
          </motion.p>

          {/* Search Bar */}
          <div className="w-full">
            <HeroSearch />
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8 mt-4"
          >
            {[
              { value: "2M+", label: "Unique properties" },
              { value: "190+", label: "Countries" },
              { value: "50M+", label: "Happy guests" },
              { value: "4.9★", label: "Average rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/50">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1"
          >
            <div className="w-1 h-3 bg-white/60 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Category Filters ─── */}
      <section className="container py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Explore by type</h2>
          <Link
            href="/listings"
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            View all <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        <CategoryPills active={activeCategory} onSelect={handleCategorySelect} />
      </section>

      {/* ─── Featured Listings ─── */}
      <section className="container pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Featured stays</h2>
            <p className="text-muted-foreground mt-1">
              Hand-picked exceptional properties
            </p>
          </div>
          <Link href="/listings">
            <Button variant="outline" className="hidden md:flex gap-2">
              View all listings
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loadingListings
            ? [...Array(6)].map((_, i) => (
                <div key={i} className="h-72 rounded-2xl bg-muted animate-pulse" />
              ))
            : featuredListings.map((listing, i) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <ListingCard
                listing={listing as any}
                isFavorited={favs.has(listing.id)}
                onToggleFavorite={(id) => {
                  setFavs((prev) => {
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

        <div className="mt-8 text-center md:hidden">
          <Link href="/listings">
            <Button variant="outline" size="lg" className="gap-2">
              View all listings
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="bg-muted/30 py-20">
        <div className="container">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4">
              Simple & transparent
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">How StayLux works</h2>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
              From discovery to checkout, we've made every step effortless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5 shadow-lg`}
                >
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-5xl font-black text-muted/30 absolute top-4 right-6">
                  {item.step}
                </span>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="container py-20">
        <div className="text-center mb-14">
          <Badge variant="outline" className="mb-4">
            Guest stories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            Loved by travelers worldwide
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-300"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-5">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-primary font-bold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground border-t border-border pt-3">
                {t.property}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Host CTA ─── */}
      <section className="container pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl"
          style={{
            background:
              "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
          }}
        >
          <div className="absolute inset-0 opacity-10">
            <Image
              src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=80"
              alt="Host your property"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative z-10 p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white max-w-lg">
              <Badge className="bg-white/10 text-white border-white/20 mb-4">
                For hosts
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Turn your property into
                <span className="text-[#FF385C]"> income</span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed">
                Join 2 million hosts earning with StayLux. Set your own
                schedule, prices, and rules. Our tools make hosting effortless.
              </p>
              <div className="flex flex-wrap gap-6 mt-6 text-sm text-white/60">
                <span className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-emerald-400" />
                  $1M host protection
                </span>
                <span className="flex items-center gap-2">
                  <Headphones className="h-4 w-4 text-blue-400" />
                  24/7 support
                </span>
                <span className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-amber-400" />
                  Superhost program
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <p className="text-white/50 text-sm">Average earnings/month</p>
              <div className="text-5xl font-black text-white">$3,200</div>
              <Link href="/host/listings/new">
                <Button
                  size="xl"
                  className="bg-gradient-to-r from-[#FF385C] to-[#E61E4D] text-white hover:shadow-xl hover:shadow-primary/30"
                >
                  Start hosting
                  <ArrowRight className="h-5 w-5 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── Trust Badges ─── */}
      <section className="border-t border-border py-12">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: Shield,
                title: "$1M Protection",
                desc: "Every booking is covered by our comprehensive host & guest protection program.",
                color: "text-emerald-500",
              },
              {
                icon: Headphones,
                title: "24/7 Support",
                desc: "Our team of specialists is always available to help you before, during, and after your stay.",
                color: "text-blue-500",
              },
              {
                icon: Award,
                title: "Verified Properties",
                desc: "Every listing goes through our strict quality review process to ensure accuracy.",
                color: "text-amber-500",
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl bg-muted flex items-center justify-center ${item.color}`}
                >
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
