import { CreateOrderDto } from "@/dto/createOrder.dto";
import { ResponseHandler } from "@/lib/responseHandler";
import { JwtPayload } from "jsonwebtoken";
import { headers } from "next/headers";
import midtrans from "@/providers/midtrans";
import { createId } from "@paralleldrive/cuid2";
import { prisma } from "@/constants/variables";
import moment from "moment";

export async function GET() {
  try {
    const userData = (await headers()).get("x-user-data");
    if (!userData) {
      return ResponseHandler.Unauthorized();
    }
    const user: JwtPayload = JSON.parse(userData);

    const orders = await prisma.order.findMany({
      where: {
        userId: user.id,
      },
      include: {
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

export async function POST(req: Request) {
  try {
    const userData = (await headers()).get("x-user-data");
    if (!userData) {
      return ResponseHandler.Unauthorized();
    }
    const user: JwtPayload = JSON.parse(userData);
    const body = await req.json();

    // check existing order
    const existingOrder = await prisma.order.findFirst({
      where: {
        userId: user.id,
        AND: {
          status: "Pending",
          orderItem: {
            some: {
              serviceId: body.serviceId,
            },
          },
          createdAt: {
            gte: moment().subtract(1, "days").toDate(),
          },
        },
      },
    });
    if (existingOrder) {
      if (existingOrder.redirectUrl !== null) {
        return ResponseHandler.get(existingOrder);
      }
    }

    const service = await prisma.service.findUnique({
      where: { id: body.serviceId },
    });
    if (!service) {
      return ResponseHandler.InvalidData("Service not found");
    }

    const createOrder = new CreateOrderDto(
      body.serviceId,
      body.qty,
      Number(service.harga)
    );

    const isValid = createOrder.isValid();
    if (!isValid.valid) {
      return ResponseHandler.InvalidData(isValid.message);
    }

    const orderId = createId();

    const tx = await midtrans.createTransactionRedirectUrl({
      transaction_details: {
        order_id: orderId,
        gross_amount: createOrder.total,
      },
      customer_details: {
        first_name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });

    const order = await prisma.order.create({
      data: {
        id: orderId,
        total: createOrder.total,
        userId: user.id,
        redirectUrl: tx,
      },
    });

    await prisma.orderItem.create({
      data: {
        qty: createOrder.qty,
        serviceId: createOrder.serviceId,
        orderId: order.id,
      },
    });
    return ResponseHandler.get(order);
  } catch (error) {
    console.log((error as Error)?.message);
    return ResponseHandler.serverError();
  }
}
