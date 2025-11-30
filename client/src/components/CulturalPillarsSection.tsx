import { useQuery } from "@tanstack/react-query";
import type { CulturalPillar } from "@shared/schema";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Skeleton } from "@/components/ui/skeleton";

function PillarCard({
  pillar,
  index,
}: {
  pillar: CulturalPillar;
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`group relative aspect-[4/5] overflow-hidden rounded-sm cursor-pointer transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
      data-testid={`card-pillar-${pillar.id}`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url('${pillar.imageUrl}')` }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-dark via-slate-dark/40 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div className="transform transition-all duration-500">
          <span className="text-gold font-lato text-xs tracking-[0.2em] uppercase mb-2 block">
            {pillar.subtitle}
          </span>
          <h3
            className="font-cinzel text-2xl md:text-3xl text-parchment-cream mb-3 transition-transform duration-500 group-hover:-translate-y-2"
            data-testid={`text-pillar-title-${pillar.id}`}
          >
            {pillar.title}
          </h3>
        </div>

        <div className="transform translate-y-full opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <div className="h-px w-12 bg-gold mb-4" />
          <p
            className="font-lato text-sm text-parchment/90 leading-relaxed"
            data-testid={`text-pillar-description-${pillar.id}`}
          >
            {pillar.description}
          </p>
        </div>
      </div>

      <div className="absolute top-4 right-4 w-8 h-8 border border-gold/30 rounded-full flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <svg
          className="w-4 h-4 text-gold"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
}

function PillarSkeleton() {
  return (
    <div className="aspect-[4/5] rounded-sm overflow-hidden">
      <Skeleton className="w-full h-full bg-parchment-dark" />
    </div>
  );
}

export function CulturalPillarsSection() {
  const { ref, isVisible } = useScrollAnimation();
  
  const { data: pillars, isLoading } = useQuery<CulturalPillar[]>({
    queryKey: ["/api/pillars"],
  });

  return (
    <section
      className="py-20 md:py-28 bg-parchment-dark"
      data-testid="section-cultural-pillars"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="font-lato text-sm tracking-[0.3em] text-terracotta uppercase mb-4 block">
            The Foundations
          </span>
          <h2
            className="font-cinzel text-4xl md:text-5xl text-slate mb-6"
            data-testid="text-pillars-title"
          >
            Cultural Pillars
          </h2>
          <p className="font-lato text-slate-light max-w-2xl mx-auto">
            Explore the three fundamental pillars that define India's contribution to world
            heritage
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {isLoading ? (
            <>
              <PillarSkeleton />
              <PillarSkeleton />
              <PillarSkeleton />
            </>
          ) : (
            pillars?.map((pillar, index) => (
              <PillarCard key={pillar.id} pillar={pillar} index={index} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
