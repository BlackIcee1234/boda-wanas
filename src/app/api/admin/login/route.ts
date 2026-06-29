import { NextRequest, NextResponse } from "next/server";
import { createAdminSession, verifyAdminPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { password } = (await request.json()) as { password?: string };

    if (!password || !verifyAdminPassword(password)) {
      return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
    }

    await createAdminSession();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Error de autenticación" }, { status: 500 });
  }
}
