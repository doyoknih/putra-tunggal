import { prisma } from "@/constants/variables";
import { ResponseHandler } from "@/lib/responseHandler";
import { JwtPayload } from "jsonwebtoken";
import { headers } from "next/headers";

export async function GET() {
  try {
    const userData = (await headers()).get("x-user-data");
    if (!userData) {
      return ResponseHandler.Unauthorized();
    }
    const user: JwtPayload = JSON.parse(userData);
    const detailuser = await prisma.user.findFirstOrThrow({
      where: { id: user.id },
      include: { role: true },
    });
    if (detailuser.role.role === "Admin") {
      const orders = await prisma.order.findMany({
        include: {
          user: true,
          orderItem: {
            include: {
              service: {
                include: {
                  dokter: true,
                },
              },
            },
          },
        },
      });
      return ResponseHandler.get(orders);
    }

    if (detailuser.role.role === "User") {
      const orders = await prisma.orderItem.findMany({
        where: {
          order: {
            userId: detailuser.id,
          },
        },
        include: {
          order: {
            include: {
              user: true,
            },
          },
          service: {
            include: {
              dokter: true,
            },
          },
        },
      });
      return ResponseHandler.get(orders);
    }

    const orders = await prisma.order.findMany({
      where: {
        orderItem: {
          some: {
            service: {
              dokterId: detailuser.id,
            },
          },
        },
      },
      include: {
        user: true,
        orderItem: {
          include: {
            service: true,
          },
        },
      },
    });
    return ResponseHandler.get(orders);
  } catch (error) {
    return ResponseHandler.serverError((error as Error)?.message);
  }
}
