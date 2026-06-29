import { SiteProvider } from "@/context/SiteContext";
import { WeddingApp } from "@/components/WeddingApp";

export default function Home() {
  return (
    <SiteProvider>
      <WeddingApp />
    </SiteProvider>
  );
}
