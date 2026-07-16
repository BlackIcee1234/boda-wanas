"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { useSiteConfig } from "@/context/SiteContext";
import { CursiveText } from "@/components/CursiveText";

const STORAGE_KEY = "boda_envelope_seen";

export function EnvelopeIntro({ onComplete }: { onComplete: () => void }) {
  const { config } = useSiteConfig();
  const [phase, setPhase] = useState<"closed" | "opening" | "done">("closed");

  if (!config.envelope.enabled) {
    return null;
  }

  function handleOpen() {
    setPhase("opening");
    setTimeout(() => {
      setPhase("done");
      localStorage.setItem(STORAGE_KEY, "true");
      onComplete();
    }, 2200);
  }

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2c2c2c]/90 backdrop-blur-sm"
        >
          <div className="relative mx-4 w-full max-w-md perspective-[1200px]">
            {/* Sobre */}
            <motion.div
              className="relative mx-auto aspect-[4/3] w-full max-w-sm"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Cuerpo del sobre */}
              <div className="absolute inset-0 rounded-sm bg-[#f5f0e8] shadow-2xl">
                <div className="absolute inset-x-0 bottom-0 h-[55%] bg-[#ede8df]" />
                <div
                  className="absolute inset-x-0 bottom-0 h-[55%] bg-[#e0d8cc]"
                  style={{ clipPath: "polygon(0 100%, 50% 30%, 100% 100%)" }}
                />
              </div>

              {/* Solapa */}
              <motion.div
                className="absolute inset-x-0 top-0 h-[55%] origin-top"
                style={{
                  background: "linear-gradient(180deg, #faf7f2 0%, #e8ddd0 100%)",
                  clipPath: "polygon(0 0, 50% 70%, 100% 0)",
                }}
                animate={
                  phase === "opening"
                    ? { rotateX: -160, opacity: 0.3 }
                    : { rotateX: 0 }
                }
                transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              />

              {/* Carta interior */}
              <motion.div
                className="absolute inset-x-6 top-8 bottom-8 flex flex-col items-center justify-center rounded-sm bg-white p-6 text-center shadow-inner"
                animate={
                  phase === "opening"
                    ? { y: -80, opacity: 1, scale: 1.05 }
                    : { y: 20, opacity: 0.9 }
                }
                transition={{ duration: 1, delay: phase === "opening" ? 0.3 : 0 }}
              >
                <Heart className="mb-3 h-8 w-8 text-[#8b9d83]" fill="#8b9d83" />
                <p className="text-2xl text-[#2c2c2c] sm:text-3xl">
                  <CursiveText text={config.couple.display} />
                </p>
                <p className="mt-2 text-sm text-[#6b6358]">{config.envelope.message}</p>
                <p className="mt-1 font-serif text-xs uppercase tracking-[0.3em] text-[#8b9d83]">
                  {config.dateDisplay}
                </p>
              </motion.div>
            </motion.div>

            {phase === "closed" && (
              <motion.button
                type="button"
                onClick={handleOpen}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-10 w-full rounded-sm bg-[#8b9d83] px-6 py-4 font-serif text-sm uppercase tracking-[0.2em] text-white shadow-lg"
              >
                Abrir invitación
              </motion.button>
            )}
          </div>
        </motion.div>
    </AnimatePresence>
  );
}

export function shouldShowEnvelope(): boolean {
  if (typeof window === "undefined") return false;
  return !localStorage.getItem(STORAGE_KEY);
}
