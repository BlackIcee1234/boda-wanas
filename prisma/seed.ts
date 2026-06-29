import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const guests = [
    { code: "DEMO01", name: "Invitado de Prueba", phone: "3312345678", maxGuests: 2 },
    { code: "FAMILIA01", name: "Familia Pérez", phone: "3398765432", maxGuests: 4 },
    { code: "AMIGOS01", name: "Carlos Rodríguez", phone: "3387654321", maxGuests: 1 },
  ];

  for (const guest of guests) {
    await prisma.guest.upsert({
      where: { code: guest.code },
      update: guest,
      create: guest,
    });
  }

  console.log("Seed completado:", guests.length, "invitados");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
