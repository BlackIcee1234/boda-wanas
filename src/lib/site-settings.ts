import { prisma } from "@/lib/db";
import { DEFAULT_SITE_CONFIG } from "@/lib/defaults";
import type { GiftsConfig, SiteConfig } from "@/types/site-config";
import type { Prisma } from "@/generated/prisma/client";

const SETTINGS_ID = "default";

export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const row = await prisma.siteSettings.findUnique({
      where: { id: SETTINGS_ID },
    });

    if (!row?.data) return DEFAULT_SITE_CONFIG;

    return mergeConfig(DEFAULT_SITE_CONFIG, row.data as Partial<SiteConfig>);
  } catch {
    return DEFAULT_SITE_CONFIG;
  }
}

export async function updateSiteConfig(
  partial: Partial<SiteConfig>
): Promise<SiteConfig> {
  const current = await getSiteConfig();
  const merged = mergeConfig(current, partial);

  await prisma.siteSettings.upsert({
    where: { id: SETTINGS_ID },
    create: { id: SETTINGS_ID, data: merged as unknown as Prisma.InputJsonValue },
    update: { data: merged as unknown as Prisma.InputJsonValue },
  });

  return merged;
}

function normalizeGifts(
  partial: Partial<GiftsConfig> | Record<string, unknown> | undefined,
  base: GiftsConfig
): GiftsConfig {
  if (!partial) return base;

  if ("bankTransfer" in partial && partial.bankTransfer) {
    const p = partial as Partial<GiftsConfig>;
    return {
      ...base,
      ...p,
      bankTransfer: { ...base.bankTransfer, ...p.bankTransfer },
      liverpool: { ...base.liverpool, ...(p.liverpool ?? {}) },
      custom: { ...base.custom, ...(p.custom ?? {}) },
    };
  }

  const legacy = partial as Record<string, string>;
  return {
    ...base,
    sectionTitle: legacy.title ?? base.sectionTitle,
    sectionSubtitle: legacy.subtitle ?? base.sectionSubtitle,
    bankTransfer: {
      ...base.bankTransfer,
      enabled: true,
      bank: legacy.bank ?? base.bankTransfer.bank,
      accountName: legacy.accountName ?? base.bankTransfer.accountName,
      clabe: legacy.clabe ?? base.bankTransfer.clabe,
      concept: legacy.concept ?? base.bankTransfer.concept,
    },
  };
}

function normalizeTimeline(
  timeline: SiteConfig["timeline"] | undefined,
  base: SiteConfig["timeline"]
): SiteConfig["timeline"] {
  if (!timeline?.length) return base;

  const hasPhotos = timeline.some(
    (t) => t.id === "photos" || /sesi[oó]n de fotos|fotos/i.test(t.title)
  );
  const hasCocktail = timeline.some(
    (t) => t.id === "cocktail" || /c[oó]ctel/i.test(t.title)
  );

  // Migrate stale itineraries that still include photo session / miss cocktail
  if (hasPhotos || !hasCocktail) return base;
  return timeline;
}

function normalizeLadiesColors(
  colors: SiteConfig["dressCode"]["ladies"]["colors"] | undefined,
  base: SiteConfig["dressCode"]["ladies"]["colors"]
) {
  const list = colors?.length ? colors : base;
  const hasBlack = list.some(
    (c) => c.hex.toLowerCase() === "#1a1a1a" || c.name.toLowerCase() === "negro"
  );
  return hasBlack ? list : [...list, { hex: "#1A1A1A", name: "Negro" }];
}

function mergeConfig(base: SiteConfig, partial: Partial<SiteConfig>): SiteConfig {
  return {
    ...base,
    ...partial,
    couple: { ...base.couple, ...partial.couple },
    ceremony: { ...base.ceremony, ...partial.ceremony },
    reception: { ...base.reception, ...partial.reception },
    dressCode: {
      ...base.dressCode,
      ...partial.dressCode,
      ladies: {
        ...base.dressCode.ladies,
        ...partial.dressCode?.ladies,
        colors: normalizeLadiesColors(
          partial.dressCode?.ladies?.colors,
          base.dressCode.ladies.colors
        ),
      },
      gentlemen: { ...base.dressCode.gentlemen, ...partial.dressCode?.gentlemen },
    },
    gifts: normalizeGifts(partial.gifts, base.gifts),
    family: {
      ...base.family,
      ...partial.family,
      brideParents: {
        ...base.family.brideParents,
        ...partial.family?.brideParents,
      },
      groomParents: {
        ...base.family.groomParents,
        ...partial.family?.groomParents,
      },
      godparents: partial.family?.godparents ?? base.family.godparents,
    },
    phrases: {
      ...base.phrases,
      ...partial.phrases,
      items: partial.phrases?.items ?? base.phrases.items,
    },
    envelope: { ...base.envelope, ...partial.envelope },
    seo: { ...base.seo, ...partial.seo },
    galleryImages: partial.galleryImages ?? base.galleryImages,
    timeline: normalizeTimeline(partial.timeline, base.timeline),
  };
}
