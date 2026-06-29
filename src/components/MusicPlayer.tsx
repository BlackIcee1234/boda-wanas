"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Volume2, VolumeX } from "lucide-react";
import { useSiteConfig } from "@/context/SiteContext";

export function MusicPlayer() {
  const { config } = useSiteConfig();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (config.music.enabled) {
      const timer = setTimeout(() => setVisible(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [config.music.enabled]);

  if (!config.music.enabled || !config.music.url) return null;

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => setPlaying(false));
      setPlaying(true);
    }
  }

  return (
    <>
      <audio ref={audioRef} src={config.music.url} loop preload="none" />
      <AnimatePresence>
        {visible && (
          <motion.button
            type="button"
            onClick={toggle}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-[#e0d8cc] bg-white/90 shadow-lg backdrop-blur-md transition-colors hover:bg-[#8b9d83] hover:text-white"
            aria-label={playing ? "Pausar música" : "Reproducir música"}
          >
            {playing ? (
              <Volume2 className="h-6 w-6" />
            ) : (
              <VolumeX className="h-6 w-6" />
            )}
            {playing && (
              <motion.span
                className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#8b9d83]"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Music className="h-3 w-3 text-white" />
              </motion.span>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
