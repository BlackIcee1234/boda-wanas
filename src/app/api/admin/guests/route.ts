import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const guests = await prisma.guest.findMany({
      include: { rsvp: true },
      orderBy: { name: "asc" },
    });

    const confirmed = guests.filter((g) => g.rsvp?.attendance === "YES");
    const declined = guests.filter((g) => g.rsvp?.attendance === "NO");
    const maybe = guests.filter((g) => g.rsvp?.attendance === "MAYBE");
    const pending = guests.filter((g) => !g.rsvp);
    const totalPeople = guests.reduce((sum, g) => sum + (g.rsvp?.guestCount ?? 0), 0);

    return NextResponse.json({
      stats: {
        totalGuests: guests.length,
        confirmed: confirmed.length,
        declined: declined.length,
        maybe: maybe.length,
        pending: pending.length,
        totalPeople,
      },
      guests: guests.map((g) => ({
        id: g.id,
        code: g.code,
        name: g.name,
        phone: g.phone,
        maxGuests: g.maxGuests,
        rsvp: g.rsvp
          ? {
              attendance: g.rsvp.attendance,
              phone: g.rsvp.phone,
              guestCount: g.rsvp.guestCount,
              companionNames: g.rsvp.companionNames,
              foodType: g.rsvp.foodType,
              dietaryRestrictions: g.rsvp.dietaryRestrictions,
              registeredAt: g.rsvp.registeredAt.toISOString(),
            }
          : null,
      })),
    });
  } catch {
    return NextResponse.json({ error: "Error al obtener datos" }, { status: 500 });
  }
}
