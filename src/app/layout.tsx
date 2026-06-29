import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Lora, Great_Vibes } from "next/font/google";
import "./globals.css";
import { buildSiteMetadata } from "@/lib/metadata";

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

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-cursive",
});

export async function generateMetadata(): Promise<Metadata> {
  return buildSiteMetadata();
}

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
    <html
      lang="es"
      className={`${cormorant.variable} ${lora.variable} ${greatVibes.variable} scroll-smooth`}
    >
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
