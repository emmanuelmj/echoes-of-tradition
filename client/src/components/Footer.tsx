import { OrnamentalDivider } from "./OrnamentalDivider";

export function Footer() {
  return (
    <footer className="py-12 md:py-16 bg-parchment" data-testid="section-footer">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <OrnamentalDivider variant="geometric" className="mb-8" />

        <div className="mb-6">
          <h3 className="font-cinzel text-2xl text-slate mb-2">
            Echoes of Tradition
          </h3>
          <p className="font-lato text-sm text-slate-light">
            Celebrating the timeless heritage of India and the world
          </p>
        </div>

        <div className="flex items-center justify-center gap-6 mb-8">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-slate-light transition-all duration-300 hover:border-emerald hover:text-emerald hover:bg-emerald/5"
            aria-label="Visit GitHub"
            data-testid="link-github"
          >
            <i className="fab fa-github text-lg" />
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-slate-light transition-all duration-300 hover:border-emerald hover:text-emerald hover:bg-emerald/5"
            aria-label="Visit Twitter"
            data-testid="link-twitter"
          >
            <i className="fab fa-twitter text-lg" />
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-slate-light transition-all duration-300 hover:border-emerald hover:text-emerald hover:bg-emerald/5"
            aria-label="Visit Instagram"
            data-testid="link-instagram"
          >
            <i className="fab fa-instagram text-lg" />
          </a>
        </div>

        <div className="h-px w-24 bg-gold/30 mx-auto mb-6" />

        <p className="font-lato text-sm text-slate-light">
          Designed with{" "}
          <span className="text-terracotta" aria-label="love">
            <i className="fas fa-heart" />
          </span>{" "}
          for heritage preservation
        </p>
        <p className="font-lato text-xs text-slate-light/60 mt-2">
          &copy; {new Date().getFullYear()} Echoes of Tradition. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
