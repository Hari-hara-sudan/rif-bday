import { motion } from "motion/react";

export function Marquee({ text, speed = 30, reverse = false, className = "" }: { text: string; speed?: number; reverse?: boolean; className?: string }) {
  const items = Array(6).fill(text);
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {items.concat(items).map((t, i) => (
          <span key={i} className="mx-8 inline-flex items-center gap-8">
            <span>{t}</span>
            <span className="text-primary">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
