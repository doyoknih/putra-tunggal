import { prisma } from "@/constants/variables";
import { ResponseHandler } from "@/lib/responseHandler";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        role: true,
        Service: true,
      },
    });

    return ResponseHandler.get(users);
  } catch (error) {
    return ResponseHandler.serverError();
  }
}
