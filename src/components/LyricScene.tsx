import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const lines = [
  { t: "Kanmaniye",       sub: "my dearest" },
  { t: "Kanmaniye",       sub: "my eyes, my breath" },
  { t: "Unnodu",          sub: "with you" },
  { t: "Saran aagiren",   sub: "I surrender" },
];

export function LyricScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section ref={ref} className="relative">
      {lines.map((l, i) => {
        const start = i / lines.length;
        const end = (i + 1) / lines.length;
        return <Line key={i} line={l} idx={i} progress={scrollYProgress} start={start} end={end} />;
      })}
    </section>
  );
}

function Line({
  line, idx, progress, start, end,
}: {
  line: { t: string; sub: string };
  idx: number;
  // biome-ignore lint: motion value
  progress: any;
  start: number;
  end: number;
}) {
  const mid = (start + end) / 2;
  const opacity = useTransform(progress, [start, mid, end], [0, 1, 0]);
  const y = useTransform(progress, [start, end], [80, -80]);
  const scale = useTransform(progress, [start, mid, end], [0.8, 1.05, 0.9]);
  const blur = useTransform(progress, [start, mid, end], ["20px", "0px", "20px"]);

  return (
    <div className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{ opacity, y, scale, filter: useTransform(blur, (b) => `blur(${b})`) }}
        className="text-center px-6"
      >
        <p className="font-mono text-xs tracking-[0.6em] text-primary mb-6">
          VERSE · {String(idx + 1).padStart(2, "0")}
        </p>
        <h2 className="font-display italic text-6xl md:text-[10rem] text-gradient leading-none">
          {line.t}
        </h2>
        <p className="mt-8 font-script text-3xl text-accent">{line.sub}</p>
      </motion.div>
    </div>
  );
}
