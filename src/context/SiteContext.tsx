"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { DEFAULT_SITE_CONFIG } from "@/lib/defaults";
import type { SiteConfig } from "@/types/site-config";

interface SiteContextValue {
  config: SiteConfig;
  loading: boolean;
  refresh: () => Promise<void>;
}

const SiteContext = createContext<SiteContextValue>({
  config: DEFAULT_SITE_CONFIG,
  loading: true,
  refresh: async () => {},
});

export function SiteProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    try {
      const res = await fetch("/api/settings");
      if (res.ok) {
        const data = (await res.json()) as SiteConfig;
        setConfig(data);
      }
    } catch {
      setConfig(DEFAULT_SITE_CONFIG);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <SiteContext.Provider value={{ config, loading, refresh }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSiteConfig() {
  return useContext(SiteContext);
}
