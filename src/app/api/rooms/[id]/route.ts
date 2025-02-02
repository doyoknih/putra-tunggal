import { prisma } from "@/constants/variables";
import { ResponseHandler } from "@/lib/responseHandler";

// get detail room by id
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id
        const room = await prisma.room.findFirst({ where: { id: id }});
        return ResponseHandler.get(room);
    } catch (error) {
        return ResponseHandler.serverError((error as Error)?.message);
    }
}