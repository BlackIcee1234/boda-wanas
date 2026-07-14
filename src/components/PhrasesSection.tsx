"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useSiteConfig } from "@/context/SiteContext";

export function PhrasesSection() {
  const { config } = useSiteConfig();
  const phrases = config.phrases;

  if (!phrases?.enabled) return null;

  const items = (phrases.items ?? []).filter((p) => p.text?.trim());
  if (items.length === 0) return null;

  return (
    <section id="frases" className="bg-[#faf7f2] px-4 py-14 sm:px-6 sm:py-16 md:py-20">
      <div className="mx-auto max-w-3xl space-y-10">
        {items.map((phrase, index) => (
          <motion.blockquote
            key={phrase.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.7 }}
            className="text-center"
          >
            <Quote className="mx-auto mb-4 h-5 w-5 text-[#c4a77d]" />
            <p className="font-cursive text-2xl leading-relaxed text-[#2c2c2c] sm:text-3xl md:text-4xl">
              {phrase.text}
            </p>
            {phrase.attribution && (
              <footer className="mt-4 font-serif text-xs uppercase tracking-[0.25em] text-[#8b9d83]">
                — {phrase.attribution}
              </footer>
            )}
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}
