import { prisma } from "@/constants/variables";
import { ResponseHandler } from "@/lib/responseHandler";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      include: {
        dokter: true,
      },
    });
    return ResponseHandler.get(services);
  } catch (error) {
    console.log((error as Error)?.message);
    return ResponseHandler.serverError((error as Error)?.message);
  }
}
