import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { GalleryItem } from "@shared/schema";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

function GalleryCard({
  item,
  index,
  onClick,
}: {
  item: GalleryItem;
  index: number;
  onClick: () => void;
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const aspectClass =
    item.aspectRatio === "portrait"
      ? "row-span-2"
      : item.aspectRatio === "landscape"
      ? "col-span-1"
      : "";

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-sm cursor-pointer break-inside-avoid mb-4 transition-all duration-700 ${aspectClass} ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${(index % 6) * 50}ms` }}
      onClick={onClick}
      data-testid={`gallery-item-${item.id}`}
    >
      <div className="relative overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.imageAlt}
          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-dark/80 via-slate-dark/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 transition-all duration-500 group-hover:opacity-100">
          <span className="font-lato text-xs tracking-[0.15em] text-gold uppercase mb-1">
            {item.category}
          </span>
          <h3 className="font-cinzel text-lg text-parchment-cream mb-1">
            {item.title}
          </h3>
          <p className="font-lato text-sm text-parchment/80">{item.description}</p>
        </div>

        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-parchment/10 backdrop-blur-sm flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
          <svg
            className="w-4 h-4 text-parchment"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function GallerySkeleton() {
  return (
    <div className="break-inside-avoid mb-4">
      <Skeleton className="w-full h-48 rounded-sm" />
    </div>
  );
}

function GalleryModal({
  item,
  isOpen,
  onClose,
}: {
  item: GalleryItem | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-[95vw] h-[90vh] p-0 bg-parchment border-gold/20 overflow-hidden">
        <DialogTitle className="sr-only">{item.title}</DialogTitle>
        <DialogDescription className="sr-only">{item.description}</DialogDescription>
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          <div className="h-[40vh] md:h-full relative bg-slate-dark">
            <img
              src={item.imageUrl}
              alt={item.imageAlt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-parchment/10 hidden md:block" />
          </div>

          <div className="p-6 md:p-10 overflow-y-auto bg-parchment relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 md:top-6 md:right-6 text-slate-light hover:text-slate hover:bg-parchment-dark z-10"
              onClick={onClose}
              data-testid="button-close-modal"
            >
              <X className="h-5 w-5" />
            </Button>

            <div className="pt-4 md:pt-0">
              <span className="font-lato text-xs tracking-[0.2em] text-terracotta uppercase block mb-3">
                {item.category}
              </span>

              <h2
                className="font-cinzel text-2xl md:text-3xl lg:text-4xl text-slate mb-4"
                data-testid={`modal-title-${item.id}`}
              >
                {item.title}
              </h2>

              <div className="h-px w-16 bg-gold mb-6" />

              <p
                className="font-lato text-base md:text-lg text-slate-light leading-relaxed"
                data-testid={`modal-description-${item.id}`}
              >
                {item.detailedDescription}
              </p>

              <div className="mt-8 pt-6 border-t border-gold/20">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald/10 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-emerald"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="font-lato text-xs text-slate-light uppercase tracking-wider">
                      Heritage Category
                    </span>
                    <p className="font-cinzel text-sm text-slate">{item.category}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function GallerySection() {
  const { ref, isVisible } = useScrollAnimation();
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const { data: galleryItems, isLoading } = useQuery<GalleryItem[]>({
    queryKey: ["/api/gallery"],
  });

  return (
    <section
      className="py-20 md:py-28 bg-parchment-dark"
      data-testid="section-gallery"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="font-lato text-sm tracking-[0.3em] text-terracotta uppercase mb-4 block">
            Visual Heritage
          </span>
          <h2
            className="font-cinzel text-4xl md:text-5xl text-slate mb-6"
            data-testid="text-gallery-title"
          >
            Windows to the Past
          </h2>
          <p className="font-lato text-slate-light max-w-2xl mx-auto">
            A curated collection of India's rich cultural tapestry—festivals, art forms, and
            heritage sites that continue to inspire the world
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
          {isLoading ? (
            <>
              <GallerySkeleton />
              <GallerySkeleton />
              <GallerySkeleton />
              <GallerySkeleton />
              <GallerySkeleton />
              <GallerySkeleton />
              <GallerySkeleton />
              <GallerySkeleton />
            </>
          ) : (
            galleryItems?.map((item, index) => (
              <GalleryCard
                key={item.id}
                item={item}
                index={index}
                onClick={() => setSelectedItem(item)}
              />
            ))
          )}
        </div>
      </div>

      <GalleryModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  );
}
