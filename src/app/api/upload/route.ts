import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { ResponseHandler } from "@/lib/responseHandler";
import { baseURL } from "@/constants/variables";

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No file received or incorrect file type." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = file.name;
    const timestamp = Date.now();
    const uniqueName = `${timestamp}_${filename}`.replace(/\s+/g, "_");
    const fileUrl = `${baseURL}/assets/${uniqueName}`;

    await writeFile(
      path.join(process.cwd(), "public/assets", uniqueName),
      buffer
    );

    return ResponseHandler.created(fileUrl);
  } catch (error) {
    return ResponseHandler.serverError();
  }
};
