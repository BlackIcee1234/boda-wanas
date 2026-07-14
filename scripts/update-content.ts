/**
 * Force-update production site settings for itinerary, black dress color,
 * family, and phrases when DB overrides have stale values.
 */
import "dotenv/config";
import { prisma } from "../src/lib/db";
import { DEFAULT_SITE_CONFIG } from "../src/lib/defaults";
import type { SiteConfig } from "../src/types/site-config";
import type { Prisma } from "../src/generated/prisma/client";

const SETTINGS_ID = "default";

async function main() {
  const row = await prisma.siteSettings.findUnique({ where: { id: SETTINGS_ID } });
  const current = (row?.data ?? {}) as Partial<SiteConfig>;

  const ladiesColors = current.dressCode?.ladies?.colors ?? DEFAULT_SITE_CONFIG.dressCode.ladies.colors;
  const hasBlack = ladiesColors.some(
    (c) => c.hex.toLowerCase() === "#1a1a1a" || c.name.toLowerCase() === "negro"
  );

  const updated: SiteConfig = {
    ...DEFAULT_SITE_CONFIG,
    ...current,
    couple: { ...DEFAULT_SITE_CONFIG.couple, ...current.couple },
    ceremony: { ...DEFAULT_SITE_CONFIG.ceremony, ...current.ceremony },
    reception: { ...DEFAULT_SITE_CONFIG.reception, ...current.reception },
    dressCode: {
      ...DEFAULT_SITE_CONFIG.dressCode,
      ...current.dressCode,
      ladies: {
        ...DEFAULT_SITE_CONFIG.dressCode.ladies,
        ...current.dressCode?.ladies,
        colors: hasBlack
          ? ladiesColors
          : [...ladiesColors, { hex: "#1A1A1A", name: "Negro" }],
      },
      gentlemen: {
        ...DEFAULT_SITE_CONFIG.dressCode.gentlemen,
        ...current.dressCode?.gentlemen,
      },
    },
    gifts: current.gifts
      ? ({
          ...DEFAULT_SITE_CONFIG.gifts,
          ...current.gifts,
        } as SiteConfig["gifts"])
      : DEFAULT_SITE_CONFIG.gifts,
    family: {
      ...DEFAULT_SITE_CONFIG.family,
      ...current.family,
      brideParents: {
        ...DEFAULT_SITE_CONFIG.family.brideParents,
        ...current.family?.brideParents,
      },
      groomParents: {
        ...DEFAULT_SITE_CONFIG.family.groomParents,
        ...current.family?.groomParents,
      },
      godparents:
        current.family?.godparents ?? DEFAULT_SITE_CONFIG.family.godparents,
    },
    phrases: {
      ...DEFAULT_SITE_CONFIG.phrases,
      ...current.phrases,
      items: current.phrases?.items ?? DEFAULT_SITE_CONFIG.phrases.items,
    },
    // Always apply the new itinerary (no photos; cocktail; dinner 8pm)
    timeline: DEFAULT_SITE_CONFIG.timeline,
    envelope: { ...DEFAULT_SITE_CONFIG.envelope, ...current.envelope },
    seo: { ...DEFAULT_SITE_CONFIG.seo, ...current.seo },
    galleryImages: current.galleryImages ?? DEFAULT_SITE_CONFIG.galleryImages,
  };

  await prisma.siteSettings.upsert({
    where: { id: SETTINGS_ID },
    create: { id: SETTINGS_ID, data: updated as unknown as Prisma.InputJsonValue },
    update: { data: updated as unknown as Prisma.InputJsonValue },
  });

  console.log("Site settings updated:");
  console.log("- timeline:", updated.timeline.map((t) => t.title).join(" → "));
  console.log("- ladies colors:", updated.dressCode.ladies.colors.map((c) => c.name).join(", "));
  console.log("- family enabled:", updated.family.enabled);
  console.log("- phrases:", updated.phrases.items.length);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
