import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code")?.trim().toUpperCase();

  if (!code) {
    return NextResponse.json({ error: "Código requerido" }, { status: 400 });
  }

  try {
    const guest = await prisma.guest.findUnique({
      where: { code },
      include: { rsvp: true },
    });

    if (!guest) {
      return NextResponse.json({ error: "Código de invitación no encontrado" }, { status: 404 });
    }

    return NextResponse.json({
      guest: {
        id: guest.id,
        name: guest.name,
        maxGuests: guest.maxGuests,
        hasRsvp: !!guest.rsvp,
      },
    });
  } catch {
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
