import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { DollarSign, TrendingUp, Home, BarChart2, Calendar, MessageSquare, Settings, Plus } from "lucide-react";

const hostNavLinks = [
  { href: "/host", icon: BarChart2, label: "Overview" },
  { href: "/host/listings", icon: Home, label: "Listings" },
  { href: "/host/bookings", icon: Calendar, label: "Bookings" },
  { href: "/host/earnings", icon: DollarSign, label: "Earnings" },
  { href: "/host/messages", icon: MessageSquare, label: "Messages" },
];

export default async function HostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="pt-16 min-h-screen">
      <div className="container py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:flex flex-col w-64 shrink-0">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Host dashboard
                </p>
                <Link href="/host/listings/new">
                  <button className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center text-white hover:bg-primary/90 transition-colors">
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </Link>
              </div>

              <nav className="flex flex-col gap-1">
                {hostNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200"
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-border">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  Switch to guest view
                </Link>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
