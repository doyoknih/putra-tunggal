import { prisma } from "@/constants/variables";
import { ResponseHandler } from "@/lib/responseHandler";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";

export async function GET(req: NextRequest, { params }: any) {
  try {
    const { id } = await params;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return ResponseHandler.InvalidData("user not found");
    }

    return ResponseHandler.get(user);
  } catch (error) {
    console.error(error);
    return ResponseHandler.serverError();
  }
}

export async function PATCH(req: NextRequest, { params }: any) {
  try {
    const body = await req.json();
    const { id } = params;
    const { password, Service, ...userData } = body;

    // Cari user berdasarkan ID
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        Service: true, // Ambil data Service yang terkait dengan user
      },
    });

    if (!user) {
      return ResponseHandler.InvalidData("User not found");
    }

    let hashedPassword = user.password;
    if (password && password !== user.password) {
      if (password.length < 8 || !/[a-zA-Z]/.test(password)) {
        return ResponseHandler.InvalidData(
          "Password harus minimal 8 huruf dan mengandung minimal 1 karakter."
        );
      }
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Update data User
    const updateUser = await prisma.user.update({
      where: { id },
      data: {
        ...userData,
        password: hashedPassword,
      },
      include: {
        Service: true,
      },
    });

    // Update data Service jika ada
    if (Service && Array.isArray(Service)) {
      // Hapus semua service lama yang terkait dengan user ini
      await prisma.service.deleteMany({
        where: { dokterId: id },
      });

      // Tambahkan service baru berdasarkan data yang dikirim
      await prisma.service.createMany({
        data: Service.map((service) => ({
          dokterId: id,
          namaService: service.namaService,
          harga: service.harga,
        })),
      });
    }

    return ResponseHandler.updated(
      updateUser,
      "Berhasil update data user & service"
    );
  } catch (error) {
    console.error("Error saat update user:", error);
    return ResponseHandler.serverError();
  }
}

export async function DELETE(req: NextRequest, { params }: any) {
  try {
    const { id } = await params;

    const user = await prisma.user.findUnique({
      where: { id },
      include: { Service: true }, // Ambil data Service yang terkait
    });

    if (!user) {
      return ResponseHandler.InvalidData("User not found");
    }

    // Hapus semua Service yang terkait sebelum menghapus User
    await prisma.service.deleteMany({
      where: { dokterId: id },
    });

    // Hapus User setelah Service terhapus
    const deletedUser = await prisma.user.delete({
      where: { id },
    });

    return ResponseHandler.deleted(deletedUser);
  } catch (error) {
    console.error(error);
    return ResponseHandler.serverError();
  }
}
