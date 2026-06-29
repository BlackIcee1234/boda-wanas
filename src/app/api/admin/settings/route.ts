import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { getSiteConfig, updateSiteConfig } from "@/lib/site-settings";
import type { SiteConfig } from "@/types/site-config";

export async function GET() {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const config = await getSiteConfig();
  return NextResponse.json(config);
}

export async function PUT(request: NextRequest) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Partial<SiteConfig>;
    const config = await updateSiteConfig(body);
    return NextResponse.json(config);
  } catch {
    return NextResponse.json({ error: "Error al guardar configuración" }, { status: 500 });
  }
}
