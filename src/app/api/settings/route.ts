import { NextResponse } from "next/server";
import { getSiteConfig } from "@/lib/site-settings";

export async function GET() {
  const config = await getSiteConfig();
  return NextResponse.json(config);
}
