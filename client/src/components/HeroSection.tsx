import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  const scrollToContent = () => {
    const introSection = document.getElementById("introduction");
    if (introSection) {
      introSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-testid="section-hero"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920&q=85')`,
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-slate-dark/70 via-slate-dark/60 to-slate-dark/80" />
      
      <div className="absolute inset-0 bg-gradient-to-t from-slate-dark/50 via-transparent to-slate-dark/30" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <span className="inline-block text-gold font-lato text-sm md:text-base tracking-[0.3em] uppercase">
            Discover the Legacy
          </span>
        </div>

        <h1
          className="font-cinzel text-5xl md:text-7xl lg:text-8xl font-bold text-parchment-cream mb-6 tracking-wide animate-fade-in-up"
          data-testid="text-hero-title"
        >
          Echoes of Tradition
        </h1>

        <p
          className="font-lato text-lg md:text-xl lg:text-2xl text-parchment/90 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in"
          style={{ animationDelay: "0.4s" }}
          data-testid="text-hero-subtitle"
        >
          Bridging the timeless heritage of India with the world
        </p>

        <Button
          onClick={scrollToContent}
          className="group bg-terracotta hover:bg-terracotta-dark text-parchment-cream font-lato text-base md:text-lg px-8 py-6 rounded-sm tracking-wider transition-all duration-300 animate-fade-in border-terracotta-dark"
          style={{ animationDelay: "0.6s" }}
          data-testid="button-explore"
        >
          Explore the Journey
          <ChevronDown className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-y-1" />
        </Button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-8 w-8 text-parchment/50" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-parchment to-transparent" />
    </section>
  );
}
