import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

interface Params { params: Promise<{ conversationId: string }> }

export async function GET(_req: Request, { params }: Params) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { conversationId } = await params;

  const messages = await db.message.findMany({
    where: {
      conversationId,
      OR: [{ senderId: session.user.id }, { receiverId: session.user.id }],
    },
    include: {
      sender: { select: { id: true, name: true, image: true } },
    },
    orderBy: { createdAt: "asc" },
  });

  // Mark messages as read
  await db.message.updateMany({
    where: { conversationId, receiverId: session.user.id, read: false },
    data: { read: true },
  });

  return NextResponse.json(messages);
}
