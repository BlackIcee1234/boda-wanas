"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, ChevronDown } from "lucide-react";
import { useSiteConfig } from "@/context/SiteContext";

function CursiveName({ name, className }: { name: string; className?: string }) {
  const first = name.charAt(0);
  const rest = name.slice(1);
  return (
    <span className={className}>
      <span className="inline-block origin-bottom font-cursive text-[1.12em] leading-none">
        {first}
      </span>
      <span className="font-cursive">{rest}</span>
    </span>
  );
}

export function Hero() {
  const { config } = useSiteConfig();
  const [mounted, setMounted] = useState(false);
  const bride = config.couple.bride;
  const groom = config.couple.groom;

  useEffect(() => setMounted(true), []);

  function scrollDown() {
    document.getElementById("cuenta-regresiva")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="inicio" className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Imagen fullscreen en mobile, contenida en desktop */}
      <div className="absolute inset-0 md:relative md:mx-auto md:max-w-5xl md:px-6 md:pt-6">
        <div className="relative h-[100svh] w-full md:aspect-[16/10] md:h-auto md:max-h-[85svh] md:overflow-hidden md:rounded-sm md:shadow-2xl">
          <Image
            src={config.heroImage}
            alt={`${config.couple.display} — foto principal`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Overlay gradiente */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />

          {/* Nombres centrados en cursiva */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-2 flex items-center gap-2 font-serif text-xs uppercase tracking-[0.4em] text-white/80 sm:text-sm"
            >
              <Calendar className="h-4 w-4" />
              Nos casamos
            </motion.p>

            {mounted && (
              <div className="flex flex-col items-center">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 1 }}
                  className="text-5xl leading-none sm:text-6xl md:text-7xl lg:text-8xl"
                >
                  <CursiveName name={bride} />
                </motion.h1>
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="my-1 font-cursive text-3xl text-[#e8ddd0] sm:text-4xl md:text-5xl"
                >
                  &
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 1 }}
                  className="text-5xl leading-none sm:text-6xl md:text-7xl lg:text-8xl"
                >
                  <CursiveName name={groom} />
                </motion.h1>
              </div>
            )}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              className="mt-6 max-w-md font-serif text-sm leading-relaxed text-white/90 sm:text-base md:text-lg"
            >
              {config.welcomeMessage}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6, duration: 0.8 }}
              className="mt-4 font-serif text-base text-[#e8ddd0] sm:text-lg"
            >
              {config.dateDisplay}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/70 transition-colors hover:text-white md:bottom-12"
        aria-label="Desplazarse hacia abajo"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="h-8 w-8" />
        </motion.div>
      </motion.button>
    </section>
  );
}
