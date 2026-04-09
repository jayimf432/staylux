"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Bell, CheckCircle, XCircle, Clock, Star, Calendar,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";

const TYPE_CONFIG: Record<string, { icon: any; color: string; bg: string }> = {
  booking_confirmed:    { icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/40" },
  booking_cancelled:    { icon: XCircle,     color: "text-red-500",     bg: "bg-red-50 dark:bg-red-950/40" },
  new_booking_request:  { icon: Clock,       color: "text-amber-500",   bg: "bg-amber-50 dark:bg-amber-950/40" },
  new_review:           { icon: Star,        color: "text-violet-500",  bg: "bg-violet-50 dark:bg-violet-950/40" },
  default:              { icon: Bell,        color: "text-blue-500",    bg: "bg-blue-50 dark:bg-blue-950/40" },
};

interface Notification {
  id: string;
  type: string;
  title: string;
  body: string;
  image: string | null;
  href: string;
  createdAt: string;
}

export default function NotificationsPage() {
  const [items, setItems] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/notifications")
      .then((r) => r.json())
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <p className="text-muted-foreground text-sm mt-1">Your recent activity and alerts</p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex gap-3 p-4 rounded-2xl border border-border">
              <Skeleton className="h-10 w-10 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-64" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <Bell className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No notifications yet</p>
          <p className="text-sm mt-1">Activity from bookings and reviews will appear here.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item, i) => {
            const cfg = TYPE_CONFIG[item.type] ?? TYPE_CONFIG.default;
            const Icon = cfg.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Link
                  href={item.href}
                  className="flex gap-3 p-4 rounded-2xl border border-border hover:bg-accent/50 transition-colors group"
                >
                  {/* Icon or avatar */}
                  <div className="relative shrink-0">
                    {item.image ? (
                      <Avatar className="h-10 w-10">
                        <AvatarFallback />
                        <img src={item.image} alt="" className="w-full h-full object-cover rounded-full" />
                      </Avatar>
                    ) : (
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${cfg.bg}`}>
                        <Icon className={`h-5 w-5 ${cfg.color}`} />
                      </div>
                    )}
                    {item.image && (
                      <div className={`absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center ${cfg.bg} border-2 border-background`}>
                        <Icon className={`h-2.5 w-2.5 ${cfg.color}`} />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold group-hover:text-primary transition-colors">{item.title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">{item.body}</p>
                    <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(item.createdAt, "MMM d, yyyy · h:mm a")}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
