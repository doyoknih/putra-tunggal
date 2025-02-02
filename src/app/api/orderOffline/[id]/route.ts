import { prisma } from "@/constants/variables";
import { ResponseHandler } from "@/lib/responseHandler";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;

    if (!id) {
      return ResponseHandler.InvalidData("Data Tidak ditemukan");
    }

    const order = await prisma.order.findFirstOrThrow({
      where: { id: id },
    });
    return ResponseHandler.get(order);
  } catch (error) {
    return ResponseHandler.serverError((error as Error)?.message);
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const { time } = await req.json();

    if (!id) {
      return ResponseHandler.InvalidData("Data Tidak ditemukan");
    }

    const order = await prisma.order.update({
      where: {
        id,
      },
      data: {
        time,
      },
    });

    return ResponseHandler.updated(order);
  } catch (error) {
    return ResponseHandler.serverError((error as Error)?.message);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;

    if (!id) {
      return ResponseHandler.InvalidData("Data Tidak ditemukan");
    }

    const order = await prisma.order.delete({
      where: {
        id,
      },
    });

    return ResponseHandler.deleted(order);
  } catch (error) {
    return ResponseHandler.serverError((error as Error)?.message);
  }
}
