import { OrnamentalDivider } from "./OrnamentalDivider";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function IntroductionSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="introduction"
      className="py-24 md:py-32 bg-parchment"
      data-testid="section-introduction"
    >
      <div
        ref={ref}
        className={`max-w-4xl mx-auto px-4 text-center transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <OrnamentalDivider variant="mandala" className="mb-12" />

        <h2 className="sr-only">Introduction</h2>

        <blockquote className="font-cinzel text-2xl md:text-3xl lg:text-4xl text-slate leading-relaxed md:leading-relaxed mb-8">
          <span className="text-terracotta text-5xl md:text-6xl leading-none">"</span>
          India's culture is a tapestry woven into the global narrative—a living heritage that has shaped civilizations, inspired artists, and enlightened seekers for millennia.
          <span className="text-terracotta text-5xl md:text-6xl leading-none">"</span>
        </blockquote>

        <p
          className="font-lato text-base md:text-lg text-slate-light max-w-3xl mx-auto leading-relaxed mb-12"
          data-testid="text-intro-description"
        >
          From the sacred banks of the Ganges to the spice-laden shores of Kerala, from the
          snow-capped Himalayas to the ancient temples of Tamil Nadu, this land has been a
          crucible of human achievement. Here, mathematics and medicine, philosophy and art,
          spirituality and science have flourished together, creating a heritage that continues
          to resonate across the world.
        </p>

        <OrnamentalDivider variant="lotus" className="mt-12" />
      </div>
    </section>
  );
}
