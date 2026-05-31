import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function HorizontalGallery({ photos }: { photos: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-75%"]);

  return (
    <section ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8 px-8">
          {photos.map((src, i) => (
            <motion.div
              key={i}
              className="relative shrink-0 w-[70vw] md:w-[40vw] aspect-[3/4] rounded-3xl overflow-hidden shadow-glow"
              whileHover={{ scale: 1.02 }}
            >
              <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-script text-2xl text-accent">frame {String(i + 1).padStart(2, "0")}</p>
                <p className="font-display italic text-3xl text-foreground/90">muuuu, always</p>
              </div>
              <div className="absolute top-4 right-4 font-mono text-[10px] tracking-widest text-foreground/50">
                01.06.2026
              </div>
            </motion.div>
          ))}
        </motion.div>
        <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.4em] text-muted-foreground uppercase">
          ← scroll →
        </p>
      </div>
    </section>
  );
}
