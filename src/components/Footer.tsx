"use client";

import { Heart } from "lucide-react";
import { useSiteConfig } from "@/context/SiteContext";

export function Footer() {
  const { config } = useSiteConfig();

  return (
    <footer className="bg-[#2c2c2c] px-4 py-10 text-center sm:px-6">
      <Heart className="mx-auto mb-3 h-6 w-6 text-[#c4a77d]" fill="#c4a77d" />
      <p className="font-cursive text-2xl text-[#faf7f2] sm:text-3xl md:text-4xl">
        {config.couple.display}
      </p>
      <p className="mt-2 text-sm text-[#c4a77d]">{config.dateDisplay}</p>
      <p className="mt-6 text-xs text-[#8b8b8b]">
        Con amor, esperamos celebrar contigo este día especial.
      </p>
    </footer>
  );
}
