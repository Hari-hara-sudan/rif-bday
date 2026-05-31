import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { useRef, useState } from "react";

/** Scroll-driven rapid photo swap. Looks beat-synced. */
export function PhotoFlicker({ photos, words }: { photos: string[]; words: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const idx = useTransform(scrollYProgress, [0, 1], [0, photos.length - 0.01]);
  const [i, setI] = useState(0);
  useMotionValueEvent(idx, "change", (v) => setI(Math.floor(v)));

  return (
    <section ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          key={i}
          initial={{ scale: 1.15, opacity: 0, filter: "blur(20px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <img src={photos[i % photos.length]} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
        </motion.div>

        {/* shutter lines */}
        <motion.div
          key={`top-${i}`}
          className="absolute top-0 left-0 right-0 h-2 bg-primary origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          key={`bot-${i}`}
          className="absolute bottom-0 left-0 right-0 h-2 bg-accent origin-right"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* giant word */}
        <motion.h2
          key={`w-${i}`}
          initial={{ y: 80, opacity: 0, filter: "blur(30px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
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
      </div>
    </section>
  );
}
