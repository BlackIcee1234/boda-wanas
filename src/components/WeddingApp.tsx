"use client";

import { useState, useEffect } from "react";
import { SiteProvider } from "@/context/SiteContext";
import { MusicProvider } from "@/context/MusicContext";
import { EnvelopeIntro, shouldShowEnvelope } from "@/components/EnvelopeIntro";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Countdown } from "@/components/Countdown";
import { EventTimeline, DressCodeSection } from "@/components/EventTimeline";
import { Gallery } from "@/components/Gallery";
import { RSVP } from "@/components/RSVP";
import { GiftRegistry } from "@/components/GiftRegistry";
import { Footer } from "@/components/Footer";
import { MusicPlayer } from "@/components/MusicPlayer";
import { useSiteConfig } from "@/context/SiteContext";

function WeddingContent() {
  const { config, loading } = useSiteConfig();
  const [showContent, setShowContent] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (loading) return;
    const skipEnvelope = !config.envelope.enabled || !shouldShowEnvelope();
    if (skipEnvelope) setShowContent(true);
    setReady(true);
  }, [loading, config.envelope.enabled]);

  if (!ready) return <div className="min-h-screen bg-[#faf7f2]" />;

  return (
    <>
      {!showContent && <EnvelopeIntro onComplete={() => setShowContent(true)} />}
      <div className={showContent ? "" : "invisible h-0 overflow-hidden"}>
        <Navigation />
        <main className="pt-0">
          <Hero />
          <Countdown />
          <EventTimeline />
          <DressCodeSection />
          <Gallery />
          <RSVP />
          <GiftRegistry />
        </main>
        <Footer />
        <MusicPlayer />
      </div>
    </>
  );
}

export function WeddingApp() {
  return (
    <SiteProvider>
      <MusicProvider>
        <WeddingContent />
      </MusicProvider>
    </SiteProvider>
  );
}
