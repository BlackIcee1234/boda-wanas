"use client";

import { useState } from "react";
import { NAV_SECTIONS } from "@/lib/constants";

export function Navigation() {
  const [open, setOpen] = useState(false);

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
          className="font-serif text-sm tracking-[0.15em] text-[#2c2c2c] sm:text-base"
        >
          A & O
        </button>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Menú"
          aria-expanded={open}
        >
          <span
            className={`block h-0.5 w-5 bg-[#2c2c2c] transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-[#2c2c2c] transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-[#2c2c2c] transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>

        <ul className="hidden items-center gap-6 md:flex">
          {NAV_SECTIONS.map((section) => (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => scrollTo(section.id)}
                className="text-xs uppercase tracking-[0.15em] text-[#5c5348] transition-colors hover:text-[#8b9d83]"
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
            {NAV_SECTIONS.map((section) => (
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
