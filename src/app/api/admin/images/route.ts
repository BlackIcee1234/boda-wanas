import { NextResponse } from "next/server";
import { readdir } from "fs/promises";
import path from "path";
import { verifyAdminSession } from "@/lib/auth";

export async function GET() {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const dir = path.join(process.cwd(), "public/boda/optimized");
    const files = await readdir(dir);
    const images = files
      .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
      .map((f) => `/boda/optimized/${f}`);

    return NextResponse.json({ images });
  } catch {
    return NextResponse.json({ images: [] });
  }
}
