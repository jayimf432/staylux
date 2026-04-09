"use client";

import { useEffect, useState } from "react";
import { Search, Shield, User, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AdminUser {
  id: string;
  name: string | null;
  email: string;
  role: string;
  createdAt: string;
  image: string | null;
  _count: { bookings: number; listings: number; reviewsGiven: number };
}

const ROLES = ["GUEST", "HOST", "ADMIN"];
const ROLE_COLORS: Record<string, string> = {
  GUEST: "bg-slate-100 text-slate-700",
  HOST: "bg-blue-100 text-blue-700",
  ADMIN: "bg-red-100 text-red-700",
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (roleFilter) params.set("role", roleFilter);
    fetch(`/api/admin/users?${params}`)
      .then((r) => r.json())
      .then(setUsers)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [search, roleFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  const updateRole = async (userId: string, newRole: string) => {
    setUpdating(userId);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });
      if (!res.ok) throw new Error();
      setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, role: newRole } : u));
      toast.success("Role updated");
    } catch {
      toast.error("Failed to update role");
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground mt-1">View and manage all platform users</p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-1.5">
          {["", ...ROLES].map((r) => (
            <Button
              key={r || "all"}
              size="sm"
              variant={roleFilter === r ? "default" : "outline"}
              onClick={() => setRoleFilter(r)}
            >
              {r || "All Roles"}
            </Button>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {loading ? "Loading..." : `${users.length} users`}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {users.map((user) => (
              <div key={user.id} className="flex items-center gap-4 px-6 py-4 hover:bg-muted/30 transition-colors">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-muted overflow-hidden shrink-0">
                  {user.image ? (
                    <img src={user.image} alt={user.name ?? ""} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-5 h-5 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{user.name ?? "—"}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>

                {/* Stats */}
                <div className="hidden md:flex gap-6 text-xs text-muted-foreground">
                  <span>{user._count.bookings} bookings</span>
                  <span>{user._count.listings} listings</span>
                  <span>{user._count.reviewsGiven} reviews</span>
                </div>

                {/* Joined */}
                <div className="hidden lg:block text-xs text-muted-foreground shrink-0">
                  {new Date(user.createdAt).toLocaleDateString()}
                </div>

                {/* Role badge + changer */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ROLE_COLORS[user.role] ?? "bg-muted text-muted-foreground"}`}>
                    {user.role}
                  </span>
                  <div className="relative">
                    <select
                      value={user.role}
                      disabled={updating === user.id}
                      onChange={(e) => updateRole(user.id, e.target.value)}
                      className="appearance-none text-xs border rounded px-2 py-1 pr-6 bg-background cursor-pointer disabled:opacity-50"
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none text-muted-foreground" />
                  </div>
                </div>
              </div>
            ))}

            {!loading && users.length === 0 && (
              <div className="px-6 py-12 text-center text-muted-foreground">
                <Shield className="w-8 h-8 mx-auto mb-3 opacity-30" />
                No users found
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
