"use client";

import { useState } from "react";
import { NAV_SECTIONS } from "@/lib/defaults";
import { useSiteConfig } from "@/context/SiteContext";
import { hasVisibleGifts } from "@/lib/gifts";
import { Heart, Menu, X } from "lucide-react";
import { CursiveText } from "@/components/CursiveText";

export function Navigation() {
  const { config } = useSiteConfig();
  const [open, setOpen] = useState(false);

  const sections = NAV_SECTIONS.filter((s) => {
    if (s.id === "regalos") return hasVisibleGifts(config.gifts);
    if (s.id === "familia") {
      const f = config.family;
      if (!f?.enabled) return false;
      return Boolean(
        f.brideParents?.names?.trim() ||
          f.groomParents?.names?.trim() ||
          f.godparents?.some((g) => g.names?.trim())
      );
    }
    return true;
  });

  function scrollTo(id: string) {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-[#e0d8cc]/50 bg-[#faf7f2]/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={() => scrollTo("inicio")}
          className="flex items-center gap-1.5 text-lg text-[#2c2c2c] sm:text-xl"
        >
          <Heart className="h-4 w-4 text-[#8b9d83]" fill="#8b9d83" />
          <CursiveText
            text={`${config.couple.bride.charAt(0).toUpperCase()} & ${config.couple.groom.charAt(0).toUpperCase()}`}
            className="text-[1.35em] leading-none"
          />
        </button>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center md:hidden"
          aria-label="Menú"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <ul className="hidden items-center gap-5 lg:gap-6 md:flex">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => scrollTo(section.id)}
                className="text-xs uppercase tracking-[0.12em] text-[#5c5348] transition-colors hover:text-[#8b9d83]"
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {open && (
        <div className="border-t border-[#e0d8cc]/50 bg-[#faf7f2]/95 px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-3">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => scrollTo(section.id)}
                  className="w-full py-2 text-left text-sm uppercase tracking-[0.15em] text-[#5c5348]"
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
