import { motion } from "motion/react";

export function PolaroidScatter({ photos, captions = [] }: { photos: string[]; captions?: string[] }) {
  // pre-defined scatter positions (looks intentional, not random)
  const positions = [
    { x: "-30%", y: "-10%", r: -12, z: 1 },
    { x: "10%",  y: "-20%", r: 8,   z: 2 },
    { x: "-20%", y: "20%",  r: 15,  z: 3 },
    { x: "30%",  y: "15%",  r: -7,  z: 4 },
    { x: "-5%",  y: "0%",   r: -2,  z: 5 },
    { x: "25%",  y: "-5%",  r: 20,  z: 6 },
  ];

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-visible">
      {photos.slice(0, 6).map((src, i) => {
        const pos = positions[i];
        return (
          <motion.div
            key={i}
            className="absolute w-56 md:w-72 bg-white p-3 pb-12 shadow-soft pointer-events-auto"
            style={{ zIndex: pos.z }}
            initial={{ x: 0, y: 600, rotate: 0, opacity: 0, scale: 0.3 }}
            whileInView={{
              x: pos.x,
              y: pos.y,
              rotate: pos.r,
              opacity: 1,
              scale: 1,
            }}
            viewport={{ once: true, margin: "-150px" }}
            transition={{
              duration: 1.1,
              delay: i * 0.15,
              type: "spring",
              damping: 14,
              stiffness: 80,
            }}
            whileHover={{ scale: 1.08, rotate: 0, zIndex: 50, transition: { duration: 0.3 } }}
          >
            <img src={src} alt="" className="w-full aspect-square object-cover" loading="lazy" />
            <p className="absolute bottom-2 left-0 right-0 text-center font-script text-xl text-black/70">
              {captions[i] ?? "muuuu"}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
