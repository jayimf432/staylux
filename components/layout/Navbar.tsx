"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  Monitor,
  Menu,
  X,
  Bell,
  Search,
  Globe,
  ChevronDown,
  Heart,
  Calendar,
  LayoutDashboard,
  Home,
  LogOut,
  User,
  Settings,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn, getInitials } from "@/lib/utils";

const navLinks = [
  { href: "/listings", label: "Explore" },
  { href: "/host/listings/new", label: "Become a host" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const isHomepage = pathname === "/";

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const themeIcon = mounted ? (
    theme === "dark" ? (
      <Moon className="h-4 w-4" />
    ) : theme === "light" ? (
      <Sun className="h-4 w-4" />
    ) : (
      <Monitor className="h-4 w-4" />
    )
  ) : null;

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled || !isHomepage
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF385C] to-[#E61E4D] flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span
              className={cn(
                "text-xl font-bold tracking-tight transition-colors",
                scrolled || !isHomepage ? "text-foreground" : "text-white"
              )}
            >
              StayLux
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                  scrolled || !isHomepage
                    ? "text-foreground hover:bg-accent"
                    : "text-white/90 hover:text-white hover:bg-white/10",
                  pathname === link.href && "bg-primary/10 text-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={cycleTheme}
              className={cn(
                "rounded-xl",
                !scrolled && isHomepage && "text-white hover:text-white hover:bg-white/10"
              )}
              aria-label="Toggle theme"
            >
              {themeIcon}
            </Button>

            {session ? (
              <>
                {/* Notifications */}
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "rounded-xl relative",
                    !scrolled && isHomepage && "text-white hover:text-white hover:bg-white/10"
                  )}
                  onClick={() => router.push("/dashboard/notifications")}
                  aria-label="Notifications"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
                </Button>

                {/* User menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className={cn(
                      "flex items-center gap-2 px-2 py-1.5 rounded-xl border transition-all duration-200",
                      userMenuOpen
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50",
                      !scrolled && isHomepage && "border-white/30 hover:border-white/60"
                    )}
                    aria-label="User menu"
                  >
                    <Menu
                      className={cn(
                        "h-4 w-4",
                        !scrolled && isHomepage ? "text-white" : "text-foreground"
                      )}
                    />
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={session.user?.image ?? ""} />
                      <AvatarFallback className="text-xs">
                        {getInitials(session.user?.name ?? "U")}
                      </AvatarFallback>
                    </Avatar>
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-56 rounded-2xl border border-border bg-card shadow-xl overflow-hidden z-50"
                        onMouseLeave={() => setUserMenuOpen(false)}
                      >
                        <div className="px-4 py-3 border-b border-border">
                          <p className="text-sm font-semibold text-foreground">
                            {session.user?.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {session.user?.email}
                          </p>
                        </div>
                        <div className="py-1">
                          {[
                            {
                              href: "/dashboard",
                              icon: LayoutDashboard,
                              label: "Dashboard",
                            },
                            {
                              href: "/dashboard/bookings",
                              icon: Calendar,
                              label: "My bookings",
                            },
                            {
                              href: "/dashboard/favorites",
                              icon: Heart,
                              label: "Wishlist",
                            },
                            {
                              href: "/host",
                              icon: Home,
                              label: "Switch to hosting",
                            },
                            {
                              href: "/host/listings/new",
                              icon: Plus,
                              label: "Add your property",
                            },
                            {
                              href: "/dashboard/profile",
                              icon: Settings,
                              label: "Account settings",
                            },
                          ].map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-accent transition-colors"
                            >
                              <item.icon className="h-4 w-4 text-muted-foreground" />
                              {item.label}
                            </Link>
                          ))}
                        </div>
                        <div className="border-t border-border py-1">
                          <button
                            onClick={() => {
                              setUserMenuOpen(false);
                              signOut({ callbackUrl: "/" });
                            }}
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                          >
                            <LogOut className="h-4 w-4" />
                            Sign out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      !scrolled &&
                        isHomepage &&
                        "text-white hover:text-white hover:bg-white/10"
                    )}
                  >
                    Log in
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" variant="gradient">
                    Sign up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "md:hidden rounded-xl",
                !scrolled && isHomepage && "text-white hover:text-white hover:bg-white/10"
              )}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-16 left-0 right-0 z-40 bg-background border-b border-border shadow-xl"
          >
            <nav className="container py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              {!session && (
                <div className="flex flex-col gap-2 pt-2 border-t border-border mt-2">
                  <Link href="/login" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Log in
                    </Button>
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Button variant="gradient" className="w-full">
                      Sign up
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
