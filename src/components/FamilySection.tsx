"use client";

import { motion } from "framer-motion";
import { Heart, Users } from "lucide-react";
import { useSiteConfig } from "@/context/SiteContext";

export function FamilySection() {
  const { config } = useSiteConfig();
  const { family } = config;

  if (!family?.enabled) return null;

  const brideParents = family.brideParents?.names?.trim();
  const groomParents = family.groomParents?.names?.trim();
  const godparents = (family.godparents ?? []).filter((g) => g.names?.trim());

  const hasContent = Boolean(brideParents || groomParents || godparents.length);
  if (!hasContent) return null;

  return (
    <section id="familia" className="bg-[#f5f0e8] px-4 py-16 sm:px-6 sm:py-20 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="mb-2 flex items-center justify-center gap-2 font-serif text-xs uppercase tracking-[0.35em] text-[#8b9d83]">
            <Users className="h-4 w-4" />
            Familia
          </p>
          <h2 className="font-serif text-3xl text-[#2c2c2c] sm:text-4xl md:text-5xl">
            {family.sectionTitle}
          </h2>
          {family.sectionSubtitle && (
            <p className="mt-3 text-sm text-[#6b6358] sm:text-base">{family.sectionSubtitle}</p>
          )}
        </motion.div>

        <div className="space-y-10">
          {(brideParents || groomParents) && (
            <div className="grid gap-8 sm:grid-cols-2">
              {brideParents && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <p className="mb-2 font-serif text-xs uppercase tracking-[0.25em] text-[#8b9d83]">
                    Padres de la novia
                  </p>
                  <p className="whitespace-pre-line font-cursive text-2xl leading-relaxed text-[#2c2c2c] sm:text-3xl">
                    {brideParents}
                  </p>
                </motion.div>
              )}
              {groomParents && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <p className="mb-2 font-serif text-xs uppercase tracking-[0.25em] text-[#8b9d83]">
                    Padres del novio
                  </p>
                  <p className="whitespace-pre-line font-cursive text-2xl leading-relaxed text-[#2c2c2c] sm:text-3xl">
                    {groomParents}
                  </p>
                </motion.div>
              )}
            </div>
          )}

          {godparents.length > 0 && (
            <div className="space-y-6 border-t border-[#e0d8cc] pt-10">
              {godparents.map((padrino, i) => (
                <motion.div
                  key={`${padrino.role}-${i}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <p className="mb-2 flex items-center justify-center gap-2 font-serif text-xs uppercase tracking-[0.25em] text-[#8b9d83]">
                    <Heart className="h-3.5 w-3.5" fill="#8b9d83" stroke="#8b9d83" />
                    {padrino.role}
                  </p>
                  <p className="whitespace-pre-line font-cursive text-2xl leading-relaxed text-[#2c2c2c] sm:text-3xl">
                    {padrino.names}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
