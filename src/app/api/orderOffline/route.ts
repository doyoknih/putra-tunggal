import { prisma } from "@/constants/variables";
import { ResponseHandler } from "@/lib/responseHandler";
import { JwtPayload } from "jsonwebtoken";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    // Ambil data user dari header
    const userData = (await headers()).get("x-user-data");
    if (!userData) {
      return ResponseHandler.Unauthorized();
    }
    const user: JwtPayload = JSON.parse(userData);

    // Parse body request
    const body = await req.json();
    const { serviceId, time, dokterId } = body;

    // Validasi body
    if (!serviceId || !dokterId) {
      return ResponseHandler.InvalidData("Missing required fields");
    }

    // Cari service berdasarkan serviceId dan dokterId
    const service = await prisma.service.findFirst({
      where: { id: serviceId, dokterId },
    });

    if (!service) {
      return ResponseHandler.InvalidData(
        "Service not found for the provided dokterId and serviceId"
      );
    }

    // Make sure `time` is passed if provided, or exclude it if not
    const orderData: any = {
      userId: user.id,
      total: service.harga, // Harga diambil dari service
      layanan: "Offline",
      orderItem: {
        create: [
          {
            serviceId: service.id,
            qty: 1, // Default jumlah qty
          },
        ],
      },
    };

    // Add `time` only if it is provided (i.e., not undefined or null)
    if (time) {
      orderData.time = time;
    }

    // Buat order baru
    const newOrder = await prisma.order.create({
      data: orderData,
      include: {
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

    return ResponseHandler.created(newOrder);
  } catch (error) {
    console.error(error);
    return ResponseHandler.serverError((error as Error).message);
  }
}
