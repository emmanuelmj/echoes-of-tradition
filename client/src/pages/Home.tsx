import { HeroSection } from "@/components/HeroSection";
import { IntroductionSection } from "@/components/IntroductionSection";
import { CulturalPillarsSection } from "@/components/CulturalPillarsSection";
import { TimelineSection } from "@/components/TimelineSection";
import { GallerySection } from "@/components/GallerySection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-parchment font-lato">
      <HeroSection />
      <IntroductionSection />
      <CulturalPillarsSection />
      <TimelineSection />
      <GallerySection />
      <Footer />
    </main>
  );
}
