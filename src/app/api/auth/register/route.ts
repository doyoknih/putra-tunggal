import { ResponseHandler } from "@/lib/responseHandler";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, Service, ...userData } = body;

    if (!body) {
      return ResponseHandler.InvalidData();
    }

    if (!password || password.length < 8 || !/[a-zA-Z]/.test(password)) {
      return ResponseHandler.InvalidData(
        "Password harus minimal 8 huruf dan mengandung minimal 1 karakter."
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return ResponseHandler.InvalidData(
        `Email ${existingUser.email} sudah terdaftar`
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat User Baru
    const newUser = await prisma.user.create({
      data: {
        ...userData,
        email,
        password: hashedPassword,
      },
    });

    // Jika ada Service, buat Service untuk dokter
    if (Service && Array.isArray(Service)) {
      await prisma.service.createMany({
        data: Service.map((s) => ({
          namaService: s.namaService,
          harga: s.harga,
          dokterId: newUser.id, // Gunakan ID User yang baru dibuat
        })),
      });
    }

    const { password: _, ...withoutPassword } = newUser;
    return ResponseHandler.created(withoutPassword);
  } catch (error) {
    console.error("Error saat registrasi:", error);
    return ResponseHandler.serverError();
  }
}
