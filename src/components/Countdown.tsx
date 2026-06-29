"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Timer } from "lucide-react";
import { useSiteConfig } from "@/context/SiteContext";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: string): TimeLeft {
  const target = new Date(targetDate).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex min-w-[4.5rem] flex-col items-center rounded-sm border border-[#e0d8cc] bg-white/60 px-3 py-4 backdrop-blur-sm sm:min-w-[5.5rem] sm:px-5 sm:py-6 md:min-w-[6.5rem]">
      <span className="font-serif text-3xl text-[#2c2c2c] sm:text-4xl md:text-5xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#8b9d83] sm:text-xs">
        {label}
      </span>
    </div>
  );
}

export function Countdown() {
  const { config } = useSiteConfig();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(config.date));
    const timer = setInterval(
      () => setTimeLeft(calculateTimeLeft(config.date)),
      1000
    );
    return () => clearInterval(timer);
  }, [config.date]);

  return (
    <section
      id="cuenta-regresiva"
      className="bg-[#faf7f2] px-4 py-16 sm:px-6 sm:py-20 md:py-24"
    >
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-2 flex items-center justify-center gap-2 font-serif text-xs uppercase tracking-[0.35em] text-[#8b9d83]">
            <Timer className="h-4 w-4" />
            Cuenta regresiva
          </p>
          <h2 className="mb-2 font-serif text-3xl text-[#2c2c2c] sm:text-4xl md:text-5xl">
            Faltan
          </h2>
          <p className="mb-10 flex items-center justify-center gap-2 text-sm text-[#5c5348]">
            <Clock className="h-4 w-4 text-[#8b9d83]" />
            {config.dateDisplay}
          </p>
        </motion.div>

        {timeLeft && (
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6">
            <TimeBlock value={timeLeft.days} label="Días" />
            <span className="font-serif text-2xl text-[#c4a77d]">:</span>
            <TimeBlock value={timeLeft.hours} label="Horas" />
            <span className="font-serif text-2xl text-[#c4a77d]">:</span>
            <TimeBlock value={timeLeft.minutes} label="Minutos" />
            <span className="font-serif text-2xl text-[#c4a77d] sm:hidden">:</span>
            <div className="w-full sm:hidden" />
            <TimeBlock value={timeLeft.seconds} label="Segundos" />
          </div>
        )}
      </div>
    </section>
  );
}
