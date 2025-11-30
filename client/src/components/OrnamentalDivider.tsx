interface OrnamentalDividerProps {
  variant?: "mandala" | "geometric" | "lotus";
  className?: string;
}

export function OrnamentalDivider({ variant = "mandala", className = "" }: OrnamentalDividerProps) {
  if (variant === "mandala") {
    return (
      <div className={`flex items-center justify-center gap-4 ${className}`} data-testid="divider-mandala">
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent md:w-24" />
        <svg
          className="h-8 w-8 text-gold md:h-12 md:w-12"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" />
          <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="1" />
          <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="1" />
          <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="1" />
          <circle cx="50" cy="50" r="5" fill="currentColor" />
          {[...Array(8)].map((_, i) => (
            <line
              key={i}
              x1="50"
              y1="5"
              x2="50"
              y2="95"
              stroke="currentColor"
              strokeWidth="1"
              transform={`rotate(${i * 22.5} 50 50)`}
            />
          ))}
          {[...Array(8)].map((_, i) => (
            <path
              key={`petal-${i}`}
              d="M50 15 Q60 30 50 45 Q40 30 50 15"
              fill="currentColor"
              fillOpacity="0.3"
              transform={`rotate(${i * 45} 50 50)`}
            />
          ))}
        </svg>
        <div className="h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent md:w-24" />
      </div>
    );
  }

  if (variant === "geometric") {
    return (
      <div className={`flex items-center justify-center gap-3 ${className}`} data-testid="divider-geometric">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold md:w-20" />
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rotate-45 border border-gold" />
          <div className="h-3 w-3 rotate-45 border border-gold bg-gold/20" />
          <div className="h-2 w-2 rotate-45 border border-gold" />
        </div>
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold md:w-20" />
      </div>
    );
  }

  if (variant === "lotus") {
    return (
      <div className={`flex items-center justify-center gap-4 ${className}`} data-testid="divider-lotus">
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent md:w-24" />
        <svg
          className="h-6 w-10 text-gold md:h-8 md:w-14"
          viewBox="0 0 70 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M35 5 Q42 15 35 30 Q28 15 35 5"
            fill="currentColor"
            fillOpacity="0.4"
          />
          <path
            d="M25 12 Q35 18 30 32 Q22 18 25 12"
            fill="currentColor"
            fillOpacity="0.3"
          />
          <path
            d="M45 12 Q35 18 40 32 Q48 18 45 12"
            fill="currentColor"
            fillOpacity="0.3"
          />
          <path
            d="M15 18 Q28 22 25 35 Q12 25 15 18"
            fill="currentColor"
            fillOpacity="0.2"
          />
          <path
            d="M55 18 Q42 22 45 35 Q58 25 55 18"
            fill="currentColor"
            fillOpacity="0.2"
          />
          <ellipse
            cx="35"
            cy="35"
            rx="20"
            ry="4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
        <div className="h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent md:w-24" />
      </div>
    );
  }

  return null;
}
