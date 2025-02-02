import { prisma } from "@/constants/variables";
import { ResponseHandler } from "@/lib/responseHandler";

export async function GET() {
  try {
    const role = await prisma.role.findMany();

    return ResponseHandler.get(role);
  } catch (error) {
    return ResponseHandler.serverError();
  }
}
