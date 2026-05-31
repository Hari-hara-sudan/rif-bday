import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Particles } from "@/components/Particles";
import { FloatingHearts } from "@/components/FloatingHearts";
import { MusicPlayer } from "@/components/MusicPlayer";
import { SplitText } from "@/components/SplitText";
import { Marquee } from "@/components/Marquee";
import { IntroCountdown } from "@/components/IntroCountdown";
import { PolaroidScatter } from "@/components/PolaroidScatter";
import { PhotoFlicker } from "@/components/PhotoFlicker";
import { HorizontalGallery } from "@/components/HorizontalGallery";
import { LyricScene } from "@/components/LyricScene";
import { photos, p1, p2, p3, p4, roses, cinema, nebula, stardust } from "@/lib/photos";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RIFA · the film · 01.06.2026" },
      { name: "description", content: "A scroll-driven love film for Rifa M R, on her birthday — directed by the boy who waited." },
    ],
  }),
  component: BirthdayPage,
});

function BirthdayPage() {
  const [intro, setIntro] = useState(true);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { damping: 40, stiffness: 200 });

  return (
    <main className="relative bg-cosmic text-foreground overflow-x-hidden">
      <AnimatePresence>{intro && <IntroCountdown onDone={() => setIntro(false)} />}</AnimatePresence>

      {/* film progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-accent to-primary z-[90] origin-left"
      />
      {/* top corner HUD */}
      <div className="fixed top-4 left-6 z-[80] font-mono text-[10px] tracking-[0.3em] uppercase text-foreground/50 mix-blend-difference">
        ▸ rifa · the film
      </div>
      <div className="fixed top-4 right-6 z-[80] font-mono text-[10px] tracking-[0.3em] uppercase text-foreground/50 mix-blend-difference">
        01·06·2026
      </div>

      <Particles density={70} />
      <FloatingHearts />
      <MusicPlayer />

      <Hero />
      <MarqueeBand />
      <Verse1 />
      <PolaroidAct />
      <PhotoFlicker
        photos={photos.slice(0, 8)}
        words={["MUUUU", "MINE", "MUSE", "ONLY", "ALWAYS", "FOREVER", "RIFA", "MUUUU"]}
      />
      <CinemaScene />
      <LyricScene />
      <HorizontalGallery photos={photos.slice(0, 7)} />
      <LetterScene />
      <Finale />
      <Credits />
    </main>
  );
}

/* ---------- 01 · HERO ---------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <img src={p1} alt="" className="w-full h-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 text-center px-6 w-full">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.6em" }}
          transition={{ duration: 2, delay: 0.4 }}
          className="font-mono text-[10px] uppercase text-primary mb-8"
        >
          a film for muuuu
        </motion.p>

        <h1 className="font-display text-7xl md:text-[14rem] lg:text-[20rem] leading-[0.85] text-gradient tracking-tighter">
          <SplitText text="RIFA" from="up" stagger={0.12} delay={0.3} />
        </h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1.4 }}
          className="h-px w-64 mx-auto my-10 bg-gradient-to-r from-transparent via-primary to-transparent origin-center"
        />

        <div className="font-display italic text-2xl md:text-4xl text-foreground/90">
          <SplitText text="happy birthday, my world." from="blur" delay={1.8} stagger={0.03} />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.4, 1] }}
          transition={{ delay: 3.5, duration: 3, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.5em] text-muted-foreground font-mono"
        >
          ▼ press scroll to play
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- 02 · MARQUEE BAND ---------- */
function MarqueeBand() {
  return (
    <section className="relative py-12 border-y border-primary/20 bg-background/60 backdrop-blur">
      <Marquee text="muuuu · happy birthday · rifa m r · 3 years · 01·06·2026 · my universe" speed={40} className="font-display italic text-5xl md:text-7xl text-gradient" />
      <Marquee text="purple forever · hindu boy + muslim girl · tamil hearts · one road · one hug · forever" speed={50} reverse className="mt-4 font-mono text-xs tracking-[0.4em] uppercase text-foreground/40" />
    </section>
  );
}

/* ---------- 03 · VERSE 1 (parallax narrative) ---------- */
function Verse1() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const textX = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section ref={ref} className="relative h-[140vh] overflow-hidden">
      <motion.img style={{ y: bgY }} src={p2} alt="" className="absolute inset-0 w-full h-[120%] object-cover -top-[10%] opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      <motion.div style={{ x: textX }} className="sticky top-0 h-screen flex flex-col justify-center px-6 md:px-24 max-w-5xl">
        <motion.p
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-mono text-[10px] tracking-[0.5em] text-primary mb-6 uppercase"
        >
          chapter · 01
        </motion.p>
        <h2 className="font-display italic text-5xl md:text-8xl text-gradient leading-[0.95]">
          <SplitText text="three years" from="up" stagger={0.04} />
        </h2>
        <h2 className="font-display italic text-5xl md:text-8xl text-foreground/90 leading-[0.95] mt-2">
          <SplitText text="one heartbeat." from="up" stagger={0.04} delay={0.3} />
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="mt-10 max-w-xl text-lg md:text-2xl text-foreground/70 leading-relaxed font-display italic"
        >
          A Hindu boy. A Muslim girl. Both Tamil. And somewhere in the middle of all that noise — just <span className="text-gradient not-italic font-medium">muuuu</span> and me.
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ---------- 04 · POLAROID ACT ---------- */
function PolaroidAct() {
  return (
    <section className="relative py-24">
      <div className="text-center mb-16 px-6">
        <p className="font-mono text-[10px] tracking-[0.5em] text-primary uppercase mb-4">act · 02 · the memories</p>
        <h2 className="font-display italic text-5xl md:text-7xl text-gradient">
          <SplitText text="our little polaroids" from="blur" stagger={0.04} />
        </h2>
      </div>
      <PolaroidScatter
        photos={photos.slice(0, 6)}
        captions={["first hello", "our song", "you laughing", "muuuu ♡", "that hug", "01.06"]}
      />
    </section>
  );
}

/* ---------- CINEMA SCENE ---------- */
function CinemaScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.3, 1, 1.2]);

  return (
    <section ref={ref} className="relative h-[160vh] overflow-hidden">
      <motion.div style={{ y: bgY, scale }} className="absolute inset-0 -top-20 -bottom-20">
        <img src={cinema} alt="" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-background/60" />
      </motion.div>

      <div className="sticky top-0 h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-mono text-[10px] tracking-[0.5em] text-primary uppercase mb-8"
          >
            scene · ags cinemas · chennai
          </motion.p>
          <h2 className="font-display italic text-4xl md:text-8xl leading-[0.95] text-foreground mb-10">
            <SplitText text="i sat through" from="up" stagger={0.05} />
            <br />
            <span className="text-gradient">
              <SplitText text="the whole movie." from="up" stagger={0.05} delay={0.4} />
            </span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="h-px w-40 mx-auto bg-primary mb-10 origin-center"
          />
          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(20px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, delay: 1 }}
            className="text-lg md:text-2xl text-foreground/85 leading-relaxed font-display italic max-w-2xl mx-auto"
          >
            Then you found out. And you ran. Crossed the road like the world wasn't moving — and hugged me like you'd never let go.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.6 }}
            className="mt-12 font-script text-3xl md:text-5xl text-gradient"
          >
            that was the moment. forever.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

/* ---------- LETTER ---------- */
function LetterScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={ref} className="relative py-40 px-6 overflow-hidden">
      <motion.img src={stardust} alt="" style={{ y }} className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen" loading="lazy" />
      <motion.div
        style={{ rotate }}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.4 }}
        className="relative max-w-3xl mx-auto"
      >
        <div className="glass rounded-3xl p-10 md:p-16 shadow-glow">
          <p className="font-mono text-[10px] tracking-[0.5em] text-primary uppercase mb-6">letter · no. 01</p>
          <p className="font-script text-4xl text-accent mb-8">muuuu,</p>
          <div className="space-y-6 font-display text-xl md:text-2xl leading-relaxed italic text-foreground/95">
            <p>
              <SplitText text="three years. " from="up" stagger={0.02} />
              <SplitText text="three lifetimes inside them." from="up" stagger={0.02} delay={0.3} />
            </p>
            <p>
              They drew lines. Religions. Roads. Whole cities of reasons we shouldn't.
              You crossed all of them in one breath.
            </p>
            <p className="font-script text-3xl md:text-5xl text-gradient not-italic pt-4">
              Kanmaniye… unnodu saran aagiren.
            </p>
          </div>
          <p className="mt-10 text-right font-script text-2xl text-accent">— forever yours</p>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- FINALE ---------- */
function Finale() {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-40 px-6 text-center overflow-hidden">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, type: "spring", damping: 14 }}
        className="relative"
      >
        {/* radiating rings */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40"
            initial={{ width: 0, height: 0, opacity: 0 }}
            whileInView={{ width: ["0px", "150vw"], height: ["0px", "150vw"], opacity: [0.5, 0] }}
            viewport={{ once: true }}
            transition={{ duration: 4, delay: i * 0.6, repeat: Infinity, ease: "easeOut" }}
          />
        ))}
        <p className="font-script text-3xl text-accent mb-6">make a wish, muuuu</p>
        <h2 className="font-display text-7xl md:text-[14rem] text-gradient leading-[0.85]">
          <SplitText text="Happy" from="scale" stagger={0.08} />
          <br />
          <SplitText text="Birthday" from="scale" stagger={0.06} delay={0.5} />
        </h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-12 font-display italic text-2xl text-foreground/80"
        >
          Rifa M R · my universe · my home
        </motion.p>
        <div className="mt-12 flex justify-center gap-3 text-4xl">
          {["💜", "✨", "🌙", "✨", "💜"].map((e, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            >
              {e}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- CREDITS (scrolls like film credits) ---------- */
function Credits() {
  return (
    <section className="relative py-32 px-6 overflow-hidden border-t border-primary/20">
      <Marquee text="directed by · the boy who waited at AGS cinemas" speed={35} className="font-display italic text-3xl md:text-5xl text-foreground/60" />
      <div className="max-w-2xl mx-auto mt-20 text-center space-y-6 font-mono text-xs tracking-[0.3em] uppercase text-foreground/50">
        <p>starring</p>
        <p className="font-display italic text-4xl text-gradient normal-case tracking-normal">Rifa M R</p>
        <div className="h-px w-32 mx-auto bg-primary/30" />
        <p>soundtrack</p>
        <p className="font-display italic text-xl text-foreground/80 normal-case tracking-normal">Kanmaniye — A.R. Rahman</p>
        <div className="h-px w-32 mx-auto bg-primary/30" />
        <p>love</p>
        <p className="font-script text-3xl text-accent normal-case tracking-normal">3 years and counting</p>
      </div>
      <p className="mt-24 text-center text-[10px] tracking-[0.4em] uppercase text-muted-foreground font-mono">
        made with every heartbeat · 01·06·2026 · for muuuu
      </p>
    </section>
  );
}
