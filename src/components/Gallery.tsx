"use client";

import { motion } from "framer-motion";
import { GALLERY_PLACEHOLDERS } from "@/lib/constants";

export function Gallery() {
  return (
    <section id="galeria" className="bg-[#faf7f2] px-4 py-16 sm:px-6 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="mb-2 font-serif text-xs uppercase tracking-[0.35em] text-[#8b9d83]">
            Galería
          </p>
          <h2 className="font-serif text-3xl text-[#2c2c2c] sm:text-4xl md:text-5xl">
            Nuestros momentos
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-6">
          {GALLERY_PLACEHOLDERS.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`group relative overflow-hidden rounded-sm ${
                index === 0 ? "col-span-2 row-span-2 aspect-[4/3] md:aspect-auto md:min-h-[320px]" : "aspect-square"
              }`}
            >
              <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#d4c4a8] via-[#e8ddd0] to-[#b8a88a] transition-transform duration-500 group-hover:scale-105">
                <span className="font-serif text-sm uppercase tracking-[0.2em] text-[#5c5348] sm:text-base">
                  {photo.label}
                </span>
                <span className="mt-2 text-xs text-[#6b6358]">Foto {photo.id}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
