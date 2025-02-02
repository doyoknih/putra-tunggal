import { prisma } from "@/constants/variables";
import { ResponseHandler } from "@/lib/responseHandler";
import { NextRequest } from "next/server";

export async function POST(requst: Request) {
  try {
    const { roomId, senderId, pesan } = await requst.json();
    const chat = await prisma.chat.create({
      data: {
        pesan,
        roomId,
        senderId,
      },
    });
    await prisma.room.update({
      where: {
        id: roomId,
      },
      data: {
        lastMessage: pesan,
      },
    });
    return ResponseHandler.get(chat);
  } catch (error) {
    return ResponseHandler.serverError((error as Error)?.message);
  }
}

export async function GET(req: NextRequest) {
  try {
    const roomId = req.nextUrl.searchParams.get("roomId");
    const room = await prisma.chat.findMany({
      where: { roomId: roomId ?? undefined },
      orderBy: { createdAt: "desc" },
    });
    return ResponseHandler.get(room);
  } catch (error) {
    return ResponseHandler.serverError((error as Error)?.message);
  }
}
