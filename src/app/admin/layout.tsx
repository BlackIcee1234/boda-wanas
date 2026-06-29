import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Panel de Control — Boda A&O",
  description: "Administración de invitados y personalización de la invitación de Ailyn & Oswaldo.",
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "Boda A&O — Admin",
    title: "Panel de Control — Boda A&O",
    description: "Gestión de invitados y configuración de la invitación digital.",
    images: [{ url: "/boda/optimized/hero.jpg", width: 1200, height: 630, alt: "Boda A&O" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Panel de Control — Boda A&O",
    description: "Gestión de invitados y configuración de la invitación digital.",
    images: ["/boda/optimized/hero.jpg"],
  },
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
