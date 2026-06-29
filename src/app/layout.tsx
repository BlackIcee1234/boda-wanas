import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Lora } from "next/font/google";
import "./globals.css";
import { WEDDING } from "@/lib/constants";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: `${WEDDING.couple.display} — Invitación de Boda`,
  description: WEDDING.welcomeMessage,
  openGraph: {
    title: `${WEDDING.couple.display} — Invitación de Boda`,
    description: WEDDING.welcomeMessage,
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf7f2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${cormorant.variable} ${lora.variable} scroll-smooth`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
