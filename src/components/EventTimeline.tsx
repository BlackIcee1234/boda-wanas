"use client";

import { motion } from "framer-motion";
import {
  Church,
  PartyPopper,
  Camera,
  UtensilsCrossed,
  Music,
  Heart,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { useSiteConfig } from "@/context/SiteContext";
import { ColorPalette } from "@/components/ColorPalette";
import type { TimelineEvent } from "@/types/site-config";

const iconMap = {
  church: Church,
  party: PartyPopper,
  camera: Camera,
  utensils: UtensilsCrossed,
  music: Music,
  heart: Heart,
};

function TimelineIcon({ icon, index }: { icon: TimelineEvent["icon"]; index: number }) {
  const Icon = iconMap[icon] ?? Heart;
  return (
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, type: "spring", stiffness: 200 }}
      className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#8b9d83] bg-white shadow-md sm:h-14 sm:w-14"
    >
      <Icon className="h-5 w-5 text-[#8b9d83] sm:h-6 sm:w-6" />
    </motion.div>
  );
}

export function EventTimeline() {
  const { config } = useSiteConfig();

  return (
    <section id="timeline" className="bg-[#faf7f2] px-4 py-16 sm:px-6 sm:py-20 md:py-24">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="mb-2 font-serif text-xs uppercase tracking-[0.35em] text-[#8b9d83]">
            Itinerario
          </p>
          <h2 className="font-serif text-3xl text-[#2c2c2c] sm:text-4xl md:text-5xl">
            Programa del día
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-[#e0d8cc] sm:left-7" />

          {config.timeline.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="relative mb-8 flex gap-4 pl-0 sm:gap-6"
            >
              <TimelineIcon icon={event.icon} index={index} />
              <div className="flex-1 rounded-sm border border-[#e0d8cc] bg-white/70 p-4 backdrop-blur-sm sm:p-5">
                <div className="mb-1 flex items-center gap-2">
                  <span className="font-serif text-lg font-medium text-[#8b7355]">
                    {event.time}
                  </span>
                </div>
                <h3 className="mb-1 font-serif text-xl text-[#2c2c2c]">{event.title}</h3>
                <p className="text-sm text-[#5c5348]">{event.description}</p>
                {event.mapsUrl && (
                  <a
                    href={event.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.1em] text-[#8b9d83] hover:underline"
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    Ver ubicación
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DressCodeSection() {
  const { config } = useSiteConfig();

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
            {config.dateDisplay}
          </h2>
        </motion.div>

        <div className="mb-8 grid gap-6 md:grid-cols-2 md:gap-8">
          <EventLocationCard
            title="Ceremonia"
            icon={Church}
            venue={config.ceremony.name}
            time={config.ceremony.time}
            address={config.ceremony.address}
            mapsUrl={config.ceremony.mapsUrl}
          />
          <EventLocationCard
            title="Recepción"
            icon={PartyPopper}
            venue={config.reception.name}
            time={config.reception.time}
            address={config.reception.address}
            mapsUrl={config.reception.mapsUrl}
            delay={0.15}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-sm border border-[#e0d8cc] bg-white/70 p-6 sm:p-8"
        >
          <h3 className="mb-8 text-center font-serif text-2xl text-[#2c2c2c] sm:text-3xl">
            {config.dressCode.title}
          </h3>
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h4 className="mb-2 flex items-center gap-2 font-serif text-lg text-[#8b7355]">
                <Heart className="h-4 w-4" fill="#8b9d83" stroke="#8b9d83" />
                {config.dressCode.ladies.label}
              </h4>
              <p className="mb-2 text-[#2c2c2c]">{config.dressCode.ladies.description}</p>
              <p className="text-sm leading-relaxed text-[#6b6358]">
                {config.dressCode.ladies.tip}
              </p>
              <ColorPalette colors={config.dressCode.ladies.colors} label="The Colors" />
            </div>
            <div>
              <h4 className="mb-2 flex items-center gap-2 font-serif text-lg text-[#8b7355]">
                <Heart className="h-4 w-4" fill="#8b9d83" stroke="#8b9d83" />
                {config.dressCode.gentlemen.label}
              </h4>
              <p className="mb-2 text-[#2c2c2c]">{config.dressCode.gentlemen.description}</p>
              <p className="text-sm leading-relaxed text-[#6b6358]">
                {config.dressCode.gentlemen.tip}
              </p>
              <ColorPalette colors={config.dressCode.gentlemen.colors} label="The Colors" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function EventLocationCard({
  title,
  icon: Icon,
  venue,
  time,
  address,
  mapsUrl,
  delay = 0,
}: {
  title: string;
  icon: typeof Church;
  venue: string;
  time: string;
  address: string;
  mapsUrl: string;
  delay?: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
      className="flex flex-col rounded-sm border border-[#e0d8cc] bg-white/70 p-6 backdrop-blur-sm sm:p-8"
    >
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-5 w-5 text-[#8b9d83]" />
        <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#8b9d83]">{title}</p>
      </div>
      <h3 className="mb-3 font-serif text-xl text-[#2c2c2c] sm:text-2xl">{venue}</h3>
      <p className="mb-2 font-serif text-lg text-[#8b7355]">{time}</p>
      <p className="mb-6 flex-1 text-sm leading-relaxed text-[#5c5348] sm:text-base">{address}</p>
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-sm border border-[#8b9d83] bg-transparent px-5 py-3 text-sm uppercase tracking-[0.15em] text-[#5c6b54] transition-colors hover:bg-[#8b9d83] hover:text-white"
      >
        <MapPin className="h-4 w-4" />
        Ver en Google Maps
      </a>
    </motion.article>
  );
}
