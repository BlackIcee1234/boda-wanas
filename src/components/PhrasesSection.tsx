"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useSiteConfig } from "@/context/SiteContext";
import { CursiveText } from "@/components/CursiveText";

const PHRASE_PHOTO = "/boda/optimized/phrases.jpg";

export function PhrasesSection() {
  const { config } = useSiteConfig();
  const phrases = config.phrases;

  if (!phrases?.enabled) return null;

  const items = (phrases.items ?? []).filter((p) => p.text?.trim());
  const phrase = items[0];
  if (!phrase) return null;

  return (
    <section id="frases" className="bg-[#faf7f2] px-4 py-14 sm:px-6 sm:py-16 md:py-20">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="overflow-visible rounded-sm"
        >
          <div className="relative mb-8 aspect-[16/10] w-full overflow-hidden md:aspect-[21/9]">
            <Image
              src={PHRASE_PHOTO}
              alt={config.couple.display}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#faf7f2] via-transparent to-transparent" />
          </div>

          <blockquote className="text-center">
            <Quote className="mx-auto mb-4 h-5 w-5 text-[#c4a77d]" />
            <p className="overflow-visible py-1 text-2xl leading-[1.55] text-[#2c2c2c] sm:text-3xl sm:leading-[1.5] md:text-4xl">
              <CursiveText text={phrase.text} mode="first" />
            </p>
            {phrase.attribution && (
              <footer className="mt-4 font-serif text-xs uppercase tracking-[0.25em] text-[#8b9d83]">
                — {phrase.attribution}
              </footer>
            )}
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
