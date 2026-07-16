/**
 * Replace only galleryImages in SiteSettings. Preserves all other settings.
 */
import "dotenv/config";
import { config } from "dotenv";
import { prisma } from "../src/lib/db";
import { DEFAULT_SITE_CONFIG } from "../src/lib/defaults";
import type { SiteConfig } from "../src/types/site-config";
import type { Prisma } from "../src/generated/prisma/client";

config({ path: ".env.local" });

const SETTINGS_ID = "default";

async function main() {
  const row = await prisma.siteSettings.findUnique({ where: { id: SETTINGS_ID } });
  if (!row?.data) {
    console.log("No settings row; creating with defaults gallery only");
    await prisma.siteSettings.create({
      data: {
        id: SETTINGS_ID,
        data: DEFAULT_SITE_CONFIG as unknown as Prisma.InputJsonValue,
      },
    });
    console.log(`galleryImages: ${DEFAULT_SITE_CONFIG.galleryImages.length}`);
    return;
  }

  const current = row.data as SiteConfig;
  const updated: SiteConfig = {
    ...current,
    galleryImages: DEFAULT_SITE_CONFIG.galleryImages,
  };

  await prisma.siteSettings.update({
    where: { id: SETTINGS_ID },
    data: { data: updated as unknown as Prisma.InputJsonValue },
  });

  console.log(`galleryImages updated: ${updated.galleryImages.length} fotos (otros settings intactos)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
