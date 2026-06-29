import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Countdown } from "@/components/Countdown";
import { EventInfo } from "@/components/EventInfo";
import { Gallery } from "@/components/Gallery";
import { RSVP } from "@/components/RSVP";
import { GiftRegistry } from "@/components/GiftRegistry";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="pt-14">
        <Hero />
        <Countdown />
        <EventInfo />
        <Gallery />
        <RSVP />
        <GiftRegistry />
      </main>
      <Footer />
    </>
  );
}
