import { prisma } from "@/constants/variables";
import { ResponseHandler } from "@/lib/responseHandler";

export async function GET() {
  try {
    const articles = await prisma.article.findMany();

    return ResponseHandler.get(articles);
  } catch (error) {
    return ResponseHandler.serverError();
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body) {
      ResponseHandler.InvalidData();
    }

    const newArticle = await prisma.article.create({
      data: body,
    });

    return ResponseHandler.created(newArticle);
  } catch (error) {
    return ResponseHandler.serverError();
  }
}
