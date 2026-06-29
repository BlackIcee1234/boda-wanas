"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { WEDDING } from "@/lib/constants";

export function GiftRegistry() {
  const [copied, setCopied] = useState(false);

  async function copyClabe() {
    try {
      await navigator.clipboard.writeText(WEDDING.gifts.clabe);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section id="regalos" className="bg-[#f5f0e8] px-4 py-16 sm:px-6 sm:py-20 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-2 font-serif text-xs uppercase tracking-[0.35em] text-[#8b9d83]">
            Mesa de regalos
          </p>
          <h2 className="mb-4 font-serif text-3xl text-[#2c2c2c] sm:text-4xl">
            {WEDDING.gifts.title}
          </h2>
          <p className="mb-10 text-sm leading-relaxed text-[#5c5348] sm:text-base">
            {WEDDING.gifts.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="rounded-sm border border-[#e0d8cc] bg-white/80 p-6 text-left sm:p-8"
        >
          <dl className="space-y-4">
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-[#8b9d83]">Banco</dt>
              <dd className="mt-1 font-serif text-lg text-[#2c2c2c]">{WEDDING.gifts.bank}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-[#8b9d83]">Titular</dt>
              <dd className="mt-1 font-serif text-lg text-[#2c2c2c]">
                {WEDDING.gifts.accountName}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-[#8b9d83]">CLABE</dt>
              <dd className="mt-1 break-all font-mono text-base text-[#2c2c2c] sm:text-lg">
                {WEDDING.gifts.clabe}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-[#8b9d83]">Concepto</dt>
              <dd className="mt-1 text-[#5c5348]">{WEDDING.gifts.concept}</dd>
            </div>
          </dl>

          <button
            type="button"
            onClick={copyClabe}
            className="mt-8 w-full rounded-sm border border-[#8b9d83] bg-[#8b9d83] px-5 py-3 text-sm uppercase tracking-[0.15em] text-white transition-opacity hover:opacity-90"
          >
            {copied ? "¡Copiado!" : "Copiar CLABE"}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
