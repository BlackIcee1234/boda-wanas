"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Gift,
  Building2,
  User,
  CreditCard,
  Copy,
  Check,
  ExternalLink,
  ShoppingBag,
  Store,
} from "lucide-react";
import { useSiteConfig } from "@/context/SiteContext";
import { hasVisibleGifts } from "@/lib/gifts";

export function GiftRegistry() {
  const { config } = useSiteConfig();
  const { gifts } = config;
  const [copied, setCopied] = useState(false);

  if (!hasVisibleGifts(gifts)) return null;

  async function copyClabe() {
    try {
      await navigator.clipboard.writeText(gifts.bankTransfer.clabe);
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
          <p className="mb-2 flex items-center justify-center gap-2 font-serif text-xs uppercase tracking-[0.35em] text-[#8b9d83]">
            <Gift className="h-4 w-4" />
            Regalos
          </p>
          <h2 className="mb-4 font-serif text-3xl text-[#2c2c2c] sm:text-4xl">
            {gifts.sectionTitle}
          </h2>
          <p className="mb-10 text-sm leading-relaxed text-[#5c5348] sm:text-base">
            {gifts.sectionSubtitle}
          </p>
        </motion.div>

        <div className="space-y-6">
          {gifts.bankTransfer.enabled && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-sm border border-[#e0d8cc] bg-white/80 p-6 text-left sm:p-8"
            >
              <h3 className="mb-5 flex items-center gap-2 font-serif text-xl text-[#2c2c2c]">
                <Building2 className="h-5 w-5 text-[#8b9d83]" />
                {gifts.bankTransfer.title}
              </h3>
              <dl className="space-y-5">
                <div className="flex items-start gap-3">
                  <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-[#8b9d83]" />
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-[#8b9d83]">Banco</dt>
                    <dd className="mt-1 font-serif text-lg text-[#2c2c2c]">
                      {gifts.bankTransfer.bank}
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <User className="mt-0.5 h-5 w-5 shrink-0 text-[#8b9d83]" />
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-[#8b9d83]">Titular</dt>
                    <dd className="mt-1 font-serif text-lg text-[#2c2c2c]">
                      {gifts.bankTransfer.accountName}
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-[#8b9d83]" />
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-[#8b9d83]">CLABE</dt>
                    <dd className="mt-1 break-all font-mono text-base text-[#2c2c2c] sm:text-lg">
                      {gifts.bankTransfer.clabe}
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Gift className="mt-0.5 h-5 w-5 shrink-0 text-[#8b9d83]" />
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-[#8b9d83]">Concepto</dt>
                    <dd className="mt-1 text-[#5c5348]">{gifts.bankTransfer.concept}</dd>
                  </div>
                </div>
              </dl>
              <button
                type="button"
                onClick={copyClabe}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-sm border border-[#8b9d83] bg-[#8b9d83] px-5 py-3 text-sm uppercase tracking-[0.15em] text-white transition-opacity hover:opacity-90"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" /> ¡Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" /> Copiar CLABE
                  </>
                )}
              </button>
            </motion.div>
          )}

          {gifts.liverpool.enabled && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-sm border border-[#e0d8cc] bg-white/80 p-6 text-left sm:p-8"
            >
              <h3 className="mb-3 flex items-center gap-2 font-serif text-xl text-[#2c2c2c]">
                <ShoppingBag className="h-5 w-5 text-[#8b9d83]" />
                {gifts.liverpool.title}
              </h3>
              {gifts.liverpool.description && (
                <p className="mb-4 text-sm text-[#5c5348]">{gifts.liverpool.description}</p>
              )}
              {gifts.liverpool.eventNumber && (
                <p className="mb-4 font-serif text-lg text-[#8b7355]">
                  No. de evento: {gifts.liverpool.eventNumber}
                </p>
              )}
              {gifts.liverpool.url && (
                <a
                  href={gifts.liverpool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-sm border border-[#8b9d83] px-5 py-3 text-sm uppercase tracking-[0.15em] text-[#5c6b54] transition-colors hover:bg-[#8b9d83] hover:text-white"
                >
                  <ExternalLink className="h-4 w-4" />
                  Ver mesa Liverpool
                </a>
              )}
            </motion.div>
          )}

          {gifts.custom.enabled && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-sm border border-[#e0d8cc] bg-white/80 p-6 text-left sm:p-8"
            >
              <h3 className="mb-3 flex items-center gap-2 font-serif text-xl text-[#2c2c2c]">
                <Store className="h-5 w-5 text-[#8b9d83]" />
                {gifts.custom.title}
              </h3>
              {gifts.custom.description && (
                <p className="mb-4 text-sm text-[#5c5348]">{gifts.custom.description}</p>
              )}
              {gifts.custom.reference && (
                <p className="mb-4 font-serif text-lg text-[#8b7355]">
                  Referencia: {gifts.custom.reference}
                </p>
              )}
              {gifts.custom.url && (
                <a
                  href={gifts.custom.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-sm border border-[#8b9d83] px-5 py-3 text-sm uppercase tracking-[0.15em] text-[#5c6b54] transition-colors hover:bg-[#8b9d83] hover:text-white"
                >
                  <ExternalLink className="h-4 w-4" />
                  Ir a la mesa de regalos
                </a>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
