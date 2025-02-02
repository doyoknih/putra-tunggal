import { prisma } from "@/constants/variables";
import { ResponseHandler } from "@/lib/responseHandler";
import { JwtPayload } from "jsonwebtoken";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("accessToken");
    if (token) {
      const decoded: any = jwt.decode(token);
      const userId = decoded.id;

      const user = await prisma.user.findFirstOrThrow({
        where: { id: userId },
        include: { role: true },
      });
      return ResponseHandler.get(user);
    } else {
      const userData = (await headers()).get("x-user-data");
      if (!userData) {
        return ResponseHandler.Unauthorized();
      }
      const user: JwtPayload = JSON.parse(userData);
      const detailuser = await prisma.user.findFirstOrThrow({
        where: { id: user.id },
        include: {
          role: true,
        },
      });
      return ResponseHandler.get(detailuser);
    }
  } catch (error) {
    return ResponseHandler.serverError((error as Error)?.message);
  }
}
