import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

// GET /api/messages — list all conversations for current user
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;

  // Get the latest message per conversationId that involves the current user
  const messages = await db.message.findMany({
    where: { OR: [{ senderId: userId }, { receiverId: userId }] },
    include: {
      sender: { select: { id: true, name: true, image: true } },
      receiver: { select: { id: true, name: true, image: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  // Group by conversationId, keep latest message per conversation
  const convMap = new Map<string, any>();
  for (const msg of messages) {
    if (!convMap.has(msg.conversationId)) {
      convMap.set(msg.conversationId, msg);
    }
  }

  // Count unread per conversation
  const unreadCounts = await db.message.groupBy({
    by: ["conversationId"],
    where: { receiverId: userId, read: false },
    _count: { id: true },
  });
  const unreadMap = new Map(unreadCounts.map((u) => [u.conversationId, u._count.id]));

  const conversations = Array.from(convMap.values()).map((msg) => ({
    conversationId: msg.conversationId,
    listingId: msg.listingId,
    otherUser: msg.senderId === userId ? msg.receiver : msg.sender,
    lastMessage: msg.content,
    lastMessageAt: msg.createdAt,
    unread: unreadMap.get(msg.conversationId) ?? 0,
  }));

  return NextResponse.json(conversations);
}

// POST /api/messages — send a message
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { receiverId, content, listingId, conversationId } = await req.json();

  if (!receiverId || !content?.trim()) {
    return NextResponse.json({ error: "receiverId and content are required" }, { status: 400 });
  }

  // Derive a stable conversationId from the two user IDs + optional listing
  const convId = conversationId ?? [session.user.id, receiverId].sort().join("-") + (listingId ? `-${listingId}` : "");

  const message = await db.message.create({
    data: {
      content: content.trim(),
      senderId: session.user.id,
      receiverId,
      listingId: listingId ?? null,
      conversationId: convId,
    },
    include: {
      sender: { select: { id: true, name: true, image: true } },
    },
  });

  return NextResponse.json(message, { status: 201 });
}
