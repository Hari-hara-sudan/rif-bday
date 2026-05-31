import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export function IntroCountdown({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(3);
  useEffect(() => {
    if (n === 0) {
      const t = setTimeout(onDone, 600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setN((v) => v - 1), 800);
    return () => clearTimeout(t);
  }, [n, onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
      exit={{ opacity: 0, scale: 1.5, filter: "blur(40px)" }}
      transition={{ duration: 0.8 }}
    >
      {/* concentric rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-primary/30"
          initial={{ width: 0, height: 0, opacity: 0 }}
          animate={{ width: ["0px", "120vw"], height: ["0px", "120vw"], opacity: [0.6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
        />
      ))}
      <AnimatePresence mode="wait">
        {n > 0 ? (
          <motion.div
            key={n}
            initial={{ scale: 0.2, opacity: 0, rotate: -90, filter: "blur(40px)" }}
            animate={{ scale: 1, opacity: 1, rotate: 0, filter: "blur(0px)" }}
            exit={{ scale: 3, opacity: 0, filter: "blur(60px)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[20rem] text-gradient leading-none"
          >
            {n}
          </motion.div>
        ) : (
          <motion.div
            key="go"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="font-script text-9xl text-gradient"
          >
            muuuu ♡
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
