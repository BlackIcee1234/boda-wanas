import { NextRequest, NextResponse } from "next/server";
import { readdir } from "fs/promises";
import path from "path";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { list } from "@vercel/blob";
import { verifyAdminSession } from "@/lib/auth";

async function listLocalImages(): Promise<string[]> {
  try {
    const dir = path.join(process.cwd(), "public/boda/optimized");
    const files = await readdir(dir);
    return files
      .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
      .map((f) => `/boda/optimized/${f}`);
  } catch {
    return [];
  }
}

async function listBlobImages(): Promise<string[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return [];

  try {
    const { blobs } = await list({ prefix: "boda/", limit: 200 });
    return blobs
      .filter((b) => /\.(jpg|jpeg|png|webp)$/i.test(b.pathname))
      .map((b) => b.url);
  } catch {
    return [];
  }
}

export async function GET() {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const [local, remote] = await Promise.all([listLocalImages(), listBlobImages()]);
  const images = [...new Set([...local, ...remote])];

  return NextResponse.json({ images });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        const isAdmin = await verifyAdminSession();
        if (!isAdmin) {
          throw new Error("No autorizado");
        }

        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/jpg"],
          addRandomSuffix: true,
          maximumSizeInBytes: 12 * 1024 * 1024,
          tokenPayload: JSON.stringify({ role: "admin" }),
        };
      },
      onUploadCompleted: async () => {
        // no-op: client refreshes image list after upload
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error al subir" },
      { status: 400 }
    );
  }
}
