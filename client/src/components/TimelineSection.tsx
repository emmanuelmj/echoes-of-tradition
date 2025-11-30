import { useQuery } from "@tanstack/react-query";
import type { TimelineEra } from "@shared/schema";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Skeleton } from "@/components/ui/skeleton";

function TimelineItem({
  era,
  index,
  isLeft,
}: {
  era: TimelineEra;
  index: number;
  isLeft: boolean;
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <div
      ref={ref}
      className={`relative flex items-center gap-4 md:gap-8 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      data-testid={`timeline-item-${era.id}`}
    >
      <div className="hidden md:block absolute left-1/2 top-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-terracotta border-4 border-parchment z-10" />

      <div
        className={`flex-1 ${isLeft ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}
      >
        <div
          className={`bg-parchment-cream rounded-sm p-6 md:p-8 shadow-sm border border-gold/10 transition-all duration-300 hover:shadow-md hover:border-gold/20`}
        >
          <div className="flex items-start gap-4 md:gap-6 flex-col md:flex-row">
            <div
              className={`flex-shrink-0 ${isLeft ? "md:order-2" : "md:order-1"}`}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-gold/30">
                <img
                  src={era.imageUrl}
                  alt={era.imageAlt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <div className={`flex-1 ${isLeft ? "md:order-1" : "md:order-2"}`}>
              <span className="font-lato text-xs tracking-[0.2em] text-terracotta uppercase block mb-1">
                {era.era}
              </span>
              <h3
                className="font-cinzel text-xl md:text-2xl text-slate mb-1"
                data-testid={`text-timeline-title-${era.id}`}
              >
                {era.title}
              </h3>
              <span className="font-lato text-sm text-gold italic block mb-3">
                {era.period}
              </span>
              <p className="font-lato text-sm md:text-base text-slate-light leading-relaxed">
                {era.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block flex-1" />
    </div>
  );
}

function TimelineSkeleton({ isLeft }: { isLeft: boolean }) {
  return (
    <div className={`relative flex items-center gap-4 md:gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
      <div className={`flex-1 ${isLeft ? "md:pr-12" : "md:pl-12"}`}>
        <div className="bg-parchment-cream rounded-sm p-6 md:p-8">
          <div className="flex items-start gap-4 md:gap-6 flex-col md:flex-row">
            <Skeleton className="w-20 h-20 md:w-24 md:h-24 rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block flex-1" />
    </div>
  );
}

export function TimelineSection() {
  const { ref, isVisible } = useScrollAnimation();
  
  const { data: eras, isLoading } = useQuery<TimelineEra[]>({
    queryKey: ["/api/timeline"],
  });

  return (
    <section
      className="py-20 md:py-28 bg-parchment relative"
      data-testid="section-timeline"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="font-lato text-sm tracking-[0.3em] text-terracotta uppercase mb-4 block">
            Through the Ages
          </span>
          <h2
            className="font-cinzel text-4xl md:text-5xl text-slate mb-6"
            data-testid="text-timeline-section-title"
          >
            The Visual Timeline
          </h2>
          <p className="font-lato text-slate-light max-w-2xl mx-auto">
            Journey through millennia of civilization, from the earliest urban settlements to
            the great empires that shaped the world
          </p>
        </div>

        <div className="hidden md:block absolute left-1/2 top-48 bottom-32 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent" />

        <div className="space-y-8 md:space-y-0 md:py-8">
          {isLoading ? (
            <>
              <TimelineSkeleton isLeft={true} />
              <TimelineSkeleton isLeft={false} />
              <TimelineSkeleton isLeft={true} />
            </>
          ) : (
            eras?.map((era, index) => (
              <TimelineItem
                key={era.id}
                era={era}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
