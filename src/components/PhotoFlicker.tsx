import { motion, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect } from "react";

/** Auto-cycling photo reel. */
export function PhotoFlicker({ photos, words }: { photos: string[]; words: string[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setI((prev) => (prev + 1) % photos.length);
    }, 2500); // Change photo every 2.5 seconds
    return () => clearInterval(interval);
  }, [photos.length]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ scale: 1.15, opacity: 0, filter: "blur(20px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          exit={{ scale: 0.85, opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <img src={photos[i % photos.length]} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
        </motion.div>

        {/* shutter lines */}
        <motion.div
          key={`top-${i}`}
          className="absolute top-0 left-0 right-0 h-2 bg-primary origin-left z-20"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          key={`bot-${i}`}
          className="absolute bottom-0 left-0 right-0 h-2 bg-accent origin-right z-20"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* giant word */}
        <motion.h2
          key={`w-${i}`}
          initial={{ y: 80, opacity: 0, filter: "blur(30px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -80, opacity: 0, filter: "blur(30px)" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 font-display italic text-7xl md:text-[14rem] text-gradient leading-none mix-blend-difference text-center px-6"
        >
          {words[i % words.length]}
        </motion.h2>

        {/* frame counter HUD */}
        <div className="absolute top-6 left-6 font-mono text-xs tracking-widest text-foreground/60 z-20">
          REEL · {String(i + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
        </div>
        <div className="absolute top-6 right-6 font-mono text-xs tracking-widest text-foreground/60 z-20">
          ● REC
        </div>
      </AnimatePresence>
    </section>
  );
}
