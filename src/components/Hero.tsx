"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { WEDDING } from "@/lib/constants";

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const names = WEDDING.couple.display.split("");

  useEffect(() => setMounted(true), []);

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center sm:px-6"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#f5f0e8] via-[#faf7f2] to-[#ede8df]" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-[#c4a77d]/20 blur-3xl" />
        <div className="absolute -right-20 bottom-20 h-72 w-72 rounded-full bg-[#8b9d83]/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mx-auto mb-8 aspect-[4/5] w-full max-w-sm overflow-hidden rounded-sm shadow-2xl sm:max-w-md md:max-w-lg"
        >
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#d4c4a8] via-[#e8ddd0] to-[#b8a88a]">
            <div className="border border-white/40 p-8 text-center">
              <p className="font-serif text-sm uppercase tracking-[0.35em] text-[#5c5348]">
                Foto principal
              </p>
              <p className="mt-3 font-serif text-2xl text-[#3d3832] sm:text-3xl">
                {WEDDING.couple.display}
              </p>
              <p className="mt-2 text-xs text-[#6b6358]">Placeholder — reemplazar con foto</p>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-4 font-serif text-xs uppercase tracking-[0.4em] text-[#8b9d83] sm:text-sm"
        >
          Nos casamos
        </motion.p>

        <h1 className="mb-6 font-serif text-4xl leading-tight text-[#2c2c2c] sm:text-5xl md:text-6xl lg:text-7xl">
          {mounted &&
            names.map((char, i) => (
              <motion.span
                key={`${char}-${i}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.04, duration: 0.5 }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mx-auto max-w-xl font-serif text-base leading-relaxed text-[#5c5348] sm:text-lg md:text-xl"
        >
          {WEDDING.welcomeMessage}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="mt-6 font-serif text-lg text-[#8b7355] sm:text-xl"
        >
          {WEDDING.dateDisplay}
        </motion.p>
      </div>
    </section>
  );
}
