import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import { Particles } from "@/components/Particles";
import { FloatingHearts } from "@/components/FloatingHearts";
import { MusicPlayer } from "@/components/MusicPlayer";
import nebula from "@/assets/nebula.jpg";
import cinema from "@/assets/cinema.jpg";
import roses from "@/assets/roses.jpg";
import stardust from "@/assets/stardust.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday, Rifa 💜" },
      { name: "description", content: "A love letter in pixels — for Rifa M R, on her birthday." },
    ],
  }),
  component: BirthdayPage,
});

function BirthdayPage() {
  return (
    <main className="relative bg-cosmic min-h-screen text-foreground">
      <Particles density={90} />
      <FloatingHearts />
      <MusicPlayer />
      <Hero />
      <Countdown />
      <ZoomReveal />
      <Story />
      <Cinema />
      <Letter />
      <Outro />
    </main>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <img src={nebula} alt="" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />
      </motion.div>

      <motion.div style={{ opacity, y: useTransform(scrollYProgress, [0, 1], [0, -100]) }} className="relative z-10 text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="font-script text-2xl md:text-3xl text-accent mb-6"
        >
          to the girl who owns my heart
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-7xl md:text-[10rem] lg:text-[14rem] leading-none text-gradient tracking-tight"
        >
          RIFA
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1.4 }}
          className="h-px w-48 mx-auto my-8 bg-gradient-to-r from-transparent via-primary to-transparent origin-center"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.6 }}
          className="font-display italic text-2xl md:text-4xl text-foreground/90"
        >
          Happy Birthday, my world.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 2 }}
          className="mt-4 text-sm tracking-[0.4em] text-muted-foreground uppercase"
        >
          01 · 06 · 2026
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -bottom-32 left-1/2 -translate-x-1/2 text-xs tracking-widest text-muted-foreground"
        >
          scroll · into · us ↓
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- COUNTDOWN / STATS ---------- */
function Countdown() {
  const stats = [
    { n: "3", l: "years of us" },
    { n: "1095", l: "days, & still falling" },
    { n: "∞", l: "reasons I love you" },
    { n: "1", l: "you" },
  ];
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
            className="text-center glass rounded-2xl p-8 hover:shadow-glow transition-shadow"
          >
            <div className="font-display text-6xl md:text-7xl text-gradient">{s.n}</div>
            <div className="mt-2 text-xs tracking-widest uppercase text-muted-foreground">{s.l}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- ZOOM REVEAL ---------- */
function ZoomReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1.1, 1.8]), { stiffness: 80, damping: 30 });
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale, rotate, opacity }} className="relative w-[60vw] max-w-2xl aspect-[3/4] rounded-3xl overflow-hidden shadow-glow">
          <img src={roses} alt="purple roses" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <p className="font-script text-3xl md:text-5xl text-gradient">purple, always</p>
          </div>
        </motion.div>
        <motion.p
          style={{ opacity }}
          className="absolute top-12 left-0 right-0 text-center font-display text-3xl md:text-5xl italic text-foreground/80 px-6"
        >
          every shade of violet reminds me of you
        </motion.p>
      </div>
    </section>
  );
}

/* ---------- STORY / TIMELINE ---------- */
const moments = [
  { year: "2023", title: "the first hello", text: "Two cultures, one language, one heartbeat. Tamil tied us before anything else did." },
  { year: "2024", title: "the in-between", text: "Late night calls, secret laughs, learning that love doesn't ask permission from religion." },
  { year: "2025", title: "the deepening", text: "A Muslim girl, a Hindu boy, both Tamil — proof that the soul speaks only one tongue: us." },
  { year: "2026", title: "your day", text: "Three years later, and you're still the only birthday I count down to." },
];

function Story() {
  return (
    <section className="relative py-32 px-6">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="font-display text-5xl md:text-7xl text-center text-gradient mb-24"
      >
        our little forever
      </motion.h2>

      <div className="max-w-4xl mx-auto relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary to-transparent md:-translate-x-1/2" />
        {moments.map((m, i) => (
          <motion.div
            key={m.year}
            initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className={`relative mb-20 md:w-1/2 ${i % 2 === 0 ? "md:pr-12" : "md:ml-auto md:pl-12"}`}
          >
            <div className="absolute left-4 md:left-auto top-3 w-3 h-3 rounded-full bg-primary animate-pulse-glow"
              style={ i % 2 === 0 ? { right: "-6px" } : { left: "-6px" }} />
            <div className="ml-12 md:ml-0 glass rounded-2xl p-8">
              <div className="font-script text-3xl text-accent mb-2">{m.year}</div>
              <h3 className="font-display text-3xl md:text-4xl mb-3">{m.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{m.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- CINEMA PARALLAX ---------- */
function Cinema() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["40%", "-40%"]);

  return (
    <section ref={ref} className="relative h-[140vh] overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 -top-20 -bottom-20">
        <img src={cinema} alt="" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background" />
      </motion.div>

      <motion.div style={{ y: textY }} className="relative z-10 h-screen flex items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          <p className="font-script text-3xl text-accent mb-6">AGS Cinemas, Chennai</p>
          <h2 className="font-display text-4xl md:text-7xl italic leading-tight text-foreground mb-8">
            "I sat through the whole movie. Waiting. Hoping."
          </h2>
          <div className="h-px w-32 mx-auto bg-primary mb-8" />
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-display italic">
            Then you found out. And you ran. You crossed the road like the world wasn't moving —
            and you hugged me like you'd never let go.
          </p>
          <p className="mt-8 font-script text-2xl text-gradient">
            That was the moment I knew. Forever.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- LETTER ---------- */
function Letter() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} className="relative py-40 px-6 overflow-hidden">
      <motion.img
        style={{ y }}
        src={stardust}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen"
        loading="lazy"
      />
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="relative max-w-3xl mx-auto glass rounded-3xl p-10 md:p-16 shadow-glow"
      >
        <p className="font-script text-3xl text-accent mb-8">Rifa,</p>
        <div className="space-y-6 font-display text-xl md:text-2xl leading-relaxed italic text-foreground/95">
          <p>
            You are a Muslim girl. I am a Hindu boy. We are both Tamil — and somewhere
            in the middle of all of that, we are simply <span className="text-gradient not-italic font-medium">us</span>.
          </p>
          <p>
            Three years of you. Three years of stolen smiles, of fights that ended in
            longer hugs, of "I'll never leave" whispered into late-night calls.
          </p>
          <p>
            They say love can't cross some lines. We crossed a road in Chennai instead.
            That's all the proof I'll ever need.
          </p>
          <p className="font-script text-3xl md:text-4xl text-gradient not-italic">
            Kanmani anbodu kaadhalan… naan unnodu saran aagiren.
          </p>
        </div>
        <div className="mt-10 text-right">
          <p className="font-script text-2xl text-accent">— forever yours</p>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- OUTRO ---------- */
function Outro() {
  return (
    <section className="relative py-40 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      >
        <p className="font-script text-3xl text-accent mb-6">make a wish</p>
        <h2 className="font-display text-6xl md:text-9xl text-gradient leading-none">
          Happy<br />Birthday
        </h2>
        <p className="mt-10 font-display italic text-2xl text-foreground/80">
          Rifa M R · my universe · my home
        </p>
        <div className="mt-12 flex justify-center gap-3 text-3xl">
          {["💜", "✨", "🌙", "✨", "💜"].map((e, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            >
              {e}
            </motion.span>
          ))}
        </div>
        <p className="mt-20 text-xs tracking-[0.3em] uppercase text-muted-foreground">
          made with every heartbeat · 01.06.2026
        </p>
      </motion.div>
    </section>
  );
}
