import { prisma } from "@/constants/variables";
import { ResponseHandler } from "@/lib/responseHandler";
import { unlink } from "fs/promises";
import { NextRequest } from "next/server";
import path from "path";

export async function GET(req: NextRequest, { params }: any) {
  try {
    const { id } = await params;

    const article = await prisma.article.findUnique({
      where: {
        id,
      },
    });

    if (!article) {
      return ResponseHandler.InvalidData("article not found");
    }

    return ResponseHandler.get(article);
  } catch (error) {
    console.error(error);
    return ResponseHandler.serverError();
  }
}

export async function PATCH(req: NextRequest, { params }: any) {
  try {
    const body = await req.json();
    const { id } = params;

    const article = await prisma.article.findUnique({
      where: {
        id,
      },
    });

    if (!article) {
      return ResponseHandler.InvalidData("Article not found");
    }

    const updatedArticle = await prisma.article.update({
      where: { id },
      data: body,
    });

    return ResponseHandler.updated(updatedArticle);
  } catch (error) {
    return ResponseHandler.serverError();
  }
}

export async function DELETE(req: NextRequest, { params }: any) {
  try {
    const { id } = await params;

    const article = await prisma.article.findUnique({
      where: {
        id,
      },
    });

    if (!article) {
      return ResponseHandler.InvalidData("article not found");
    }

    const filePath = path.join(
      process.cwd(),
      "public/assets",
      path.basename(article.image)
    );

    // Menghapus gambar dari folder assets
    await unlink(filePath).catch((err) => {
      // Log error jika gagal menghapus file, namun lanjutkan untuk menghapus article dari database
      console.error("Failed to delete image:", err);
    });

    const deletedarticle = await prisma.article.delete({
      where: { id },
    });

    return ResponseHandler.deleted(deletedarticle);
  } catch (error) {
    return ResponseHandler.serverError();
  }
}
