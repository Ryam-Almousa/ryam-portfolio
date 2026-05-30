export default function BackgroundFX() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden z-0"
    >
      {/* Stars */}
      {Array.from({ length: 80 }).map((_, i) => {
        const size = Math.random() * 2 + 2; // 2 - 4px
        const top = Math.random() * 85 + 5; // 5% - 90%
        const left = Math.random() * 90 + 5; // 5% - 95%
        const blur = Math.random() * 1.5;   // 0 - 1.5
        const opacity = Math.random() * 0.3 + 0.6; // 0.6 - 0.9
        return (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: size,
              height: size,
              top: `${top}%`,
              left: `${left}%`,
              filter: `blur(${blur}px)`,
              opacity,
              boxShadow: "0 0 10px 2px rgba(255,255,255,0.35)",
            }}
          />
        );
      })}

      {/* Meteors */}
      {Array.from({ length: 8 }).map((_, i) => {
        const top = Math.random() * 40 + 5;
        const delay = Math.random() * 4;
        const length = Math.random() * 140 + 160; // 160 - 300
        return (
          <span
            key={`m-${i}`}
            className="absolute rounded-full bg-gradient-to-r from-white via-white to-transparent animate-meteor"
            style={{
              top: `${top}%`,
              right: `-${length / 3}px`,
              width: `${length}px`,
              height: "2px",
              animationDelay: `${delay}s`,
              boxShadow: "0 0 10px 5px rgba(255,255,255,0.3)",
              opacity: 0.9,
            }}
          />
        );
      })}
    </div>
  );
}
