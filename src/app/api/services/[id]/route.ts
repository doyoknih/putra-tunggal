import { prisma } from "@/constants/variables";
import { ResponseHandler } from "@/lib/responseHandler";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const service = await prisma.service.findFirstOrThrow({
      where: { id: id },
      include: { dokter: true },
    });
    return ResponseHandler.get(service);
  } catch (error) {
    return ResponseHandler.serverError((error as Error)?.message);
  }
}
