import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import type { AttendanceStatus, FoodType } from "@/generated/prisma/client";

interface RsvpBody {
  guestId: string;
  name: string;
  phone: string;
  attendance: AttendanceStatus;
  guestCount: number;
  companionNames: string | null;
  foodType: FoodType;
  dietaryRestrictions: string | null;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RsvpBody;

    if (!body.guestId || !body.name?.trim() || !body.phone?.trim() || !body.attendance) {
      return NextResponse.json({ error: "Campos requeridos incompletos" }, { status: 400 });
    }

    const guest = await prisma.guest.findUnique({
      where: { id: body.guestId },
      include: { rsvp: true },
    });

    if (!guest) {
      return NextResponse.json({ error: "Invitado no encontrado" }, { status: 404 });
    }

    if (body.attendance === "YES") {
      if (body.guestCount < 1 || body.guestCount > guest.maxGuests) {
        return NextResponse.json(
          { error: `Número de asistentes inválido. Máximo permitido: ${guest.maxGuests}` },
          { status: 400 }
        );
      }
    }

    const rsvpData = {
      attendance: body.attendance,
      phone: body.phone.trim(),
      guestCount: body.attendance === "YES" ? body.guestCount : 0,
      companionNames: body.companionNames,
      foodType: body.foodType ?? "NORMAL",
      dietaryRestrictions: body.dietaryRestrictions,
      registeredAt: new Date(),
    };

    if (guest.rsvp) {
      await prisma.rsvp.update({
        where: { guestId: guest.id },
        data: rsvpData,
      });
    } else {
      await prisma.rsvp.create({
        data: {
          guestId: guest.id,
          ...rsvpData,
        },
      });
    }

    await prisma.guest.update({
      where: { id: guest.id },
      data: { name: body.name.trim(), phone: body.phone.trim() },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Error al guardar confirmación" }, { status: 500 });
  }
}
