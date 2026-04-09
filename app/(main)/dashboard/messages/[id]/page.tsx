"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getInitials } from "@/lib/utils";
import { toast } from "sonner";

interface Message {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
  sender: { id: string; name: string | null; image: string | null };
}

function timeLabel(date: string) {
  return new Date(date).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export default function MessageThreadPage() {
  const { id: conversationId } = useParams<{ id: string }>();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Get current user id from the first message or session
  useEffect(() => {
    fetch("/api/users/me")
      .then((r) => r.json())
      .then((u) => setCurrentUserId(u.id));
  }, []);

  const loadMessages = () =>
    fetch(`/api/messages/${conversationId}`)
      .then((r) => r.json())
      .then((d) => setMessages(Array.isArray(d) ? d : []))
      .finally(() => setLoading(false));

  useEffect(() => { loadMessages(); }, [conversationId]);

  // Poll for new messages every 5s
  useEffect(() => {
    const t = setInterval(loadMessages, 5000);
    return () => clearInterval(t);
  }, [conversationId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const otherUser = messages.find((m) => m.senderId !== currentUserId)?.sender ?? null;

  // Derive receiverId from conversationId if no messages from other user yet.
  // conversationId format: "<userId1>-<userId2>[-<listingId>]" where both user IDs are cuid.
  // cuid2 ids are 24 chars; classic cuid start with 'c'. We identify the other user by
  // picking the segment that isn't the current user's id.
  const derivedReceiverId = (() => {
    if (!currentUserId || !conversationId) return undefined;
    const parts = conversationId.split("-");
    // Try to find any segment that matches a known user id format and isn't the current user
    // Simpler: join first two segments back (ids may contain hyphens via cuid)
    // Actual format: [id1, id2].sort().join("-") so the split produces exactly 2 segments for base ids
    // Edge: cuid ids don't contain hyphens, so split("-") gives exactly [id1, id2, ...listingId?]
    for (const part of parts) {
      if (part && part !== currentUserId) return part;
    }
    return undefined;
  })();

  const receiverId = otherUser?.id ?? derivedReceiverId;

  const handleSend = async () => {
    if (!input.trim() || !receiverId) return;
    setSending(true);
    const optimistic: Message = {
      id: "temp-" + Date.now(),
      content: input.trim(),
      senderId: currentUserId!,
      createdAt: new Date().toISOString(),
      sender: { id: currentUserId!, name: "You", image: null },
    };
    setMessages((prev) => [...prev, optimistic]);
    setInput("");
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ receiverId, content: input.trim(), conversationId }),
      });
      if (!res.ok) { toast.error("Failed to send message"); return; }
      // Replace optimistic with real
      const real = await res.json();
      setMessages((prev) => prev.map((m) => (m.id === optimistic.id ? real : m)));
    } catch {
      toast.error("Something went wrong");
      setMessages((prev) => prev.filter((m) => m.id !== optimistic.id));
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col h-[calc(100vh-140px)] max-w-2xl">
        <Skeleton className="h-14 w-full rounded-2xl mb-4" />
        <div className="flex-1 space-y-3 p-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
              <Skeleton className="h-10 w-48 rounded-2xl" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-border mb-4 shrink-0">
        <button onClick={() => router.push("/dashboard/messages")} className="p-2 rounded-full hover:bg-accent transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </button>
        {otherUser ? (
          <>
            <Avatar className="h-10 w-10">
              <AvatarImage src={otherUser.image ?? ""} />
              <AvatarFallback>{getInitials(otherUser.name ?? "?")}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">{otherUser.name}</p>
              <p className="text-xs text-muted-foreground">Host</p>
            </div>
          </>
        ) : (
          <p className="font-semibold text-sm">Conversation</p>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {messages.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground text-sm">
            No messages yet. Say hello!
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.senderId === currentUserId;
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-end gap-2 ${isMe ? "justify-end" : "justify-start"}`}
              >
                {!isMe && (
                  <Avatar className="h-7 w-7 shrink-0">
                    <AvatarImage src={msg.sender.image ?? ""} />
                    <AvatarFallback className="text-xs">{getInitials(msg.sender.name ?? "?")}</AvatarFallback>
                  </Avatar>
                )}
                <div className={`max-w-[70%] ${isMe ? "items-end" : "items-start"} flex flex-col`}>
                  <div className={`px-4 py-2.5 rounded-2xl text-sm ${
                    isMe
                      ? "bg-primary text-white rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  }`}>
                    {msg.content}
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-1 px-1">
                    {timeLabel(msg.createdAt)}
                  </span>
                </div>
              </motion.div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2 pt-4 border-t border-border mt-2 shrink-0">
        <input
          className="flex-1 rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
          disabled={sending}
        />
        <Button
          variant="gradient"
          size="icon"
          onClick={handleSend}
          disabled={sending || !input.trim()}
          className="shrink-0 h-10 w-10"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
