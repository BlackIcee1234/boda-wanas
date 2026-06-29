import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/site-settings";
import { absoluteUrl, getSiteUrl } from "@/lib/site-url";

export async function buildSiteMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  const siteUrl = getSiteUrl();
  const shareImage = absoluteUrl(config.seo?.shareImage || config.heroImage);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: config.seo?.shareTitle || `${config.couple.display} — Invitación de Boda`,
      template: `%s | ${config.seo?.siteName || "Boda A&O"}`,
    },
    description: config.seo?.shareDescription || config.welcomeMessage,
    applicationName: config.seo?.siteName || "Boda A&O",
    icons: {
      icon: "/icon.svg",
      apple: "/icon.svg",
    },
    openGraph: {
      type: "website",
      locale: "es_MX",
      url: siteUrl,
      siteName: config.seo?.siteName || "Boda A&O",
      title: config.seo?.shareTitle || `${config.couple.display} — Invitación de Boda`,
      description: config.seo?.shareDescription || config.welcomeMessage,
      images: [
        {
          url: shareImage,
          width: 1200,
          height: 630,
          alt: `${config.couple.display} — Invitación de Boda`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: config.seo?.shareTitle || `${config.couple.display} — Invitación de Boda`,
      description: config.seo?.shareDescription || config.welcomeMessage,
      images: [shareImage],
    },
  };
}
