import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { verifyAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

interface ImportRow {
  codigo?: string;
  nombre?: string;
  telefono?: string;
  max_invitados?: number | string;
}

function normalizeCode(code: string): string {
  return code.trim().toUpperCase();
}

export async function POST(request: NextRequest) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Archivo requerido" }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json<ImportRow>(sheet);

    let imported = 0;
    let updated = 0;
    const errors: string[] = [];

    for (const [index, row] of rows.entries()) {
      const code = row.codigo ? normalizeCode(String(row.codigo)) : "";
      const name = row.nombre?.toString().trim();
      const phone = row.telefono?.toString().trim() || null;
      const maxGuests = Number(row.max_invitados) || 1;

      if (!code || !name) {
        errors.push(`Fila ${index + 2}: código y nombre son requeridos`);
        continue;
      }

      const existing = await prisma.guest.findUnique({ where: { code } });

      if (existing) {
        await prisma.guest.update({
          where: { code },
          data: { name, phone, maxGuests },
        });
        updated++;
      } else {
        await prisma.guest.create({
          data: { code, name, phone, maxGuests },
        });
        imported++;
      }
    }

    return NextResponse.json({ imported, updated, errors });
  } catch {
    return NextResponse.json({ error: "Error al importar archivo" }, { status: 500 });
  }
}

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

    const data = guests.map((g) => ({
      codigo: g.code,
      nombre: g.name,
      telefono: g.phone ?? "",
      max_invitados: g.maxGuests,
      asistencia: g.rsvp?.attendance ?? "PENDIENTE",
      num_asistentes: g.rsvp?.guestCount ?? 0,
      acompanantes: g.rsvp?.companionNames ?? "",
      tipo_comida: g.rsvp?.foodType ?? "",
      restricciones: g.rsvp?.dietaryRestrictions ?? "",
      fecha_registro: g.rsvp?.registeredAt?.toISOString() ?? "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Invitados");
    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": 'attachment; filename="invitados-boda.xlsx"',
      },
    });
  } catch {
    return NextResponse.json({ error: "Error al exportar" }, { status: 500 });
  }
}
