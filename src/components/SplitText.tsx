import { motion, type Variants } from "motion/react";

interface Props {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  from?: "up" | "down" | "blur" | "scale" | "flip";
}

export function SplitText({ text, className = "", delay = 0, stagger = 0.05, from = "up" }: Props) {
  const variants: Record<string, Variants> = {
    up:    { hidden: { y: "120%", opacity: 0 },             show: { y: 0, opacity: 1 } },
    down:  { hidden: { y: "-120%", opacity: 0 },            show: { y: 0, opacity: 1 } },
    blur:  { hidden: { opacity: 0, filter: "blur(30px)" },  show: { opacity: 1, filter: "blur(0px)" } },
    scale: { hidden: { scale: 0, opacity: 0, rotate: -180 },show: { scale: 1, opacity: 1, rotate: 0 } },
    flip:  { hidden: { rotateX: 90, opacity: 0 },           show: { rotateX: 0, opacity: 1 } },
  };
  const v = variants[from];

  return (
    <span className={`inline-block overflow-hidden ${className}`} style={{ perspective: 800 }}>
      {text.split("").map((c, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={v}
          transition={{
            duration: 0.9,
            delay: delay + i * stagger,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {c === " " ? "\u00A0" : c}
        </motion.span>
      ))}
    </span>
  );
}
