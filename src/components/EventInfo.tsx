"use client";

import { motion } from "framer-motion";
import { WEDDING } from "@/lib/constants";

interface EventCardProps {
  title: string;
  venue: string;
  time: string;
  address: string;
  mapsUrl: string;
  delay?: number;
}

function EventCard({ title, venue, time, address, mapsUrl, delay = 0 }: EventCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
      className="flex flex-col rounded-sm border border-[#e0d8cc] bg-white/70 p-6 backdrop-blur-sm sm:p-8"
    >
      <p className="mb-1 font-serif text-xs uppercase tracking-[0.3em] text-[#8b9d83]">
        {title}
      </p>
      <h3 className="mb-3 font-serif text-xl text-[#2c2c2c] sm:text-2xl">{venue}</h3>
      <p className="mb-2 font-serif text-lg text-[#8b7355]">{time}</p>
      <p className="mb-6 flex-1 text-sm leading-relaxed text-[#5c5348] sm:text-base">
        {address}
      </p>
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-sm border border-[#8b9d83] bg-transparent px-5 py-3 text-sm uppercase tracking-[0.15em] text-[#5c6b54] transition-colors hover:bg-[#8b9d83] hover:text-white"
      >
        Ver en Google Maps
      </a>
    </motion.article>
  );
}

export function EventInfo() {
  return (
    <section id="evento" className="bg-[#f5f0e8] px-4 py-16 sm:px-6 sm:py-20 md:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="mb-2 font-serif text-xs uppercase tracking-[0.35em] text-[#8b9d83]">
            Detalles del evento
          </p>
          <h2 className="font-serif text-3xl text-[#2c2c2c] sm:text-4xl md:text-5xl">
            {WEDDING.dateDisplay}
          </h2>
        </motion.div>

        <div className="mb-12 grid gap-6 md:grid-cols-2 md:gap-8">
          <EventCard
            title="Ceremonia"
            venue={WEDDING.ceremony.name}
            time={WEDDING.ceremony.time}
            address={WEDDING.ceremony.address}
            mapsUrl={WEDDING.ceremony.mapsUrl}
          />
          <EventCard
            title="Recepción"
            venue={WEDDING.reception.name}
            time={WEDDING.reception.time}
            address={WEDDING.reception.address}
            mapsUrl={WEDDING.reception.mapsUrl}
            delay={0.15}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-sm border border-[#e0d8cc] bg-white/70 p-6 sm:p-8"
        >
          <h3 className="mb-6 text-center font-serif text-2xl text-[#2c2c2c] sm:text-3xl">
            {WEDDING.dressCode.title}
          </h3>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-serif text-lg text-[#8b7355]">
                {WEDDING.dressCode.ladies.label}
              </h4>
              <p className="mb-2 text-[#2c2c2c]">{WEDDING.dressCode.ladies.description}</p>
              <p className="text-sm leading-relaxed text-[#6b6358]">
                {WEDDING.dressCode.ladies.tip}
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-serif text-lg text-[#8b7355]">
                {WEDDING.dressCode.gentlemen.label}
              </h4>
              <p className="mb-2 text-[#2c2c2c]">{WEDDING.dressCode.gentlemen.description}</p>
              <p className="text-sm leading-relaxed text-[#6b6358]">
                {WEDDING.dressCode.gentlemen.tip}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
