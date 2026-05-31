import { motion } from "motion/react";

export function HorizontalGallery({ photos, small = false, medium = false, direction = "ltr" }: { photos: string[], small?: boolean, medium?: boolean, direction?: "ltr" | "rtl" }) {
  // Duplicate photos many times for seamless infinite scroll
  const allPhotos = [...photos, ...photos, ...photos, ...photos, ...photos];
  const photoWidth = small ? "w-[40vw] md:w-[25vw]" : medium ? "w-[55vw] md:w-[35vw]" : "w-[70vw] md:w-[40vw]";

  return (
    <section className="relative h-screen overflow-hidden">
      <div className="h-screen flex items-center overflow-hidden">
        <motion.div
          animate={{ x: direction === "ltr" ? "-50%" : "50%" }}
          transition={{
            duration: 80,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-8 px-8"
        >
          {allPhotos.map((src, i) => (
            <motion.div
              key={i}
              className={`relative shrink-0 ${photoWidth} aspect-[3/4] rounded-3xl overflow-hidden shadow-glow`}
              whileHover={{ scale: 1.02 }}
            >
              <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-script text-2xl text-accent">frame {String((i % photos.length) + 1).padStart(2, "0")}</p>
                <p className="font-display italic text-3xl text-foreground/90">muuuu, always</p>
              </div>
              <div className="absolute top-4 right-4 font-mono text-[10px] tracking-widest text-foreground/50">
                01.06.2026
              </div>
            </motion.div>
          ))}
        </motion.div>
        

      </div>
    </section>
  );
}
