"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { getInitials } from "@/lib/utils";

interface Conversation {
  conversationId: string;
  listingId: string | null;
  otherUser: { id: string; name: string | null; image: string | null };
  lastMessage: string;
  lastMessageAt: string;
  unread: number;
}

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "Just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function MessagesPage() {
  const [convos, setConvos] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/messages")
      .then((r) => r.json())
      .then((d) => setConvos(Array.isArray(d) ? d : []))
      .finally(() => setLoading(false));
  }, []);

  const filtered = convos.filter((c) =>
    c.otherUser.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-muted-foreground text-sm mt-1">Conversations with your hosts</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search conversations..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-3 p-4 rounded-2xl border border-border">
              <Skeleton className="h-12 w-12 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-56" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <MessageCircle className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No messages yet</p>
          <p className="text-sm mt-1">Messages with hosts will appear here.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((convo, i) => (
            <motion.div
              key={convo.conversationId}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                href={`/dashboard/messages/${convo.conversationId}`}
                className="flex gap-3 p-4 rounded-2xl border border-border hover:bg-accent/50 transition-colors"
              >
                <Avatar className="h-12 w-12 shrink-0">
                  <AvatarImage src={convo.otherUser.image ?? ""} />
                  <AvatarFallback>{getInitials(convo.otherUser.name ?? "?")}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-sm font-semibold ${convo.unread > 0 ? "text-foreground" : "text-muted-foreground"}`}>
                      {convo.otherUser.name ?? "Unknown"}
                    </p>
                    <span className="text-xs text-muted-foreground shrink-0">{timeAgo(convo.lastMessageAt)}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className={`text-sm line-clamp-1 flex-1 ${convo.unread > 0 ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                      {convo.lastMessage}
                    </p>
                    {convo.unread > 0 && (
                      <Badge className="bg-primary text-white text-xs px-1.5 py-0.5 rounded-full shrink-0">
                        {convo.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
