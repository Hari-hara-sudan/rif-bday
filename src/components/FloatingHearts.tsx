export function FloatingHearts() {
  const hearts = Array.from({ length: 14 });
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" suppressHydrationWarning>
      {hearts.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 12;
        const dur = 14 + Math.random() * 10;
        const size = 12 + Math.random() * 20;
        return (
          <span
            key={i}
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${dur}s`,
              fontSize: `${size}px`,
              animation: `float-up ${dur}s linear ${delay}s infinite`,
            }}
            className="absolute bottom-0 text-accent/70"
            suppressHydrationWarning
          >
            ♥
          </span>
        );
      })}
    </div>
  );
}
