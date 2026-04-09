import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

const NAV = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/listings", label: "Listings" },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/reviews", label: "Reviews" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    redirect("/dashboard");
  }
  return (
    <div className="pt-16 container py-8">
      <div className="mb-6 flex items-center gap-1.5">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mr-4">
          Admin Panel
        </span>
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-sm px-3 py-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </div>
      {children}
    </div>
  );
}
