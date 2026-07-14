"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Images } from "lucide-react";
import { useSiteConfig } from "@/context/SiteContext";

export function Gallery() {
  const { config } = useSiteConfig();
  const images = config.galleryImages;

  return (
    <section id="galeria" className="bg-[#faf7f2] px-4 py-16 sm:px-6 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="mb-2 flex items-center justify-center gap-2 font-serif text-xs uppercase tracking-[0.35em] text-[#8b9d83]">
            <Images className="h-4 w-4" />
            Galería
          </p>
          <h2 className="font-serif text-3xl text-[#2c2c2c] sm:text-4xl md:text-5xl">
            Nuestros momentos
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-6">
          {images.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className={`group relative overflow-hidden rounded-sm ${
                index === 0
                  ? "col-span-2 row-span-2 aspect-[4/3] md:aspect-auto md:min-h-[320px]"
                  : "aspect-square"
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={
                  index === 0
                    ? "(max-width: 768px) 100vw, 66vw"
                    : "(max-width: 768px) 50vw, 33vw"
                }
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                unoptimized={photo.src.startsWith("http")}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
