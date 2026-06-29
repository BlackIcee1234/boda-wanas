"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Volume2, VolumeX } from "lucide-react";
import { useSiteConfig } from "@/context/SiteContext";
import { useMusic } from "@/context/MusicContext";

export function MusicPlayer() {
  const { config } = useSiteConfig();
  const { playing, toggle, registerAudio } = useMusic();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);

  const musicUrl = config.music.url?.startsWith("http")
    ? config.music.url
    : config.music.url || "/music/romantic.mp3";

  useEffect(() => {
    registerAudio(audioRef.current);
    return () => registerAudio(null);
  }, [registerAudio, musicUrl]);

  useEffect(() => {
    if (config.music.enabled) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [config.music.enabled]);

  if (!config.music.enabled || !musicUrl) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src={musicUrl}
        loop
        preload="auto"
        onError={() => setError(true)}
        onPlay={() => setError(false)}
      />
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
          >
            {error && (
              <p className="rounded-sm bg-white/95 px-3 py-1.5 text-xs text-red-600 shadow">
                No se pudo cargar la música
              </p>
            )}
            <motion.button
              type="button"
              onClick={() => toggle()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-[#e0d8cc] bg-white/90 shadow-lg backdrop-blur-md transition-colors hover:bg-[#8b9d83] hover:text-white"
              aria-label={playing ? "Pausar música" : "Reproducir música"}
            >
              {playing ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
