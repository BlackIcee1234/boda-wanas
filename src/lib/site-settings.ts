import { prisma } from "@/lib/db";
import { DEFAULT_SITE_CONFIG } from "@/lib/defaults";
import type { SiteConfig } from "@/types/site-config";
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
      ladies: { ...base.dressCode.ladies, ...partial.dressCode?.ladies },
      gentlemen: { ...base.dressCode.gentlemen, ...partial.dressCode?.gentlemen },
    },
    gifts: { ...base.gifts, ...partial.gifts },
    music: { ...base.music, ...partial.music },
    envelope: { ...base.envelope, ...partial.envelope },
    galleryImages: partial.galleryImages ?? base.galleryImages,
    timeline: partial.timeline ?? base.timeline,
  };
}
