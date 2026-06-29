"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";

interface MusicContextValue {
  unlocked: boolean;
  playing: boolean;
  unlockAndPlay: () => Promise<void>;
  toggle: () => Promise<void>;
  registerAudio: (el: HTMLAudioElement | null) => void;
}

const MusicContext = createContext<MusicContextValue | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [playing, setPlaying] = useState(false);

  const registerAudio = useCallback((el: HTMLAudioElement | null) => {
    audioRef.current = el;
  }, []);

  const unlockAndPlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    setUnlocked(true);
    try {
      audio.volume = 0.4;
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }, []);

  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    setUnlocked(true);
    try {
      audio.volume = 0.4;
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }, [playing]);

  return (
    <MusicContext.Provider value={{ unlocked, playing, unlockAndPlay, toggle, registerAudio }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within MusicProvider");
  return ctx;
}
