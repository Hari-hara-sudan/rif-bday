import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [needsTap, setNeedsTap] = useState(true);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.45;
    a.play().then(() => { setPlaying(true); setNeedsTap(false); }).catch(() => setNeedsTap(true));
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) { a.play(); setPlaying(true); setNeedsTap(false); }
    else { a.pause(); setPlaying(false); }
  };

  return (
    <>
      <audio ref={audioRef} loop src="/music/kanmaniye.mp3" />
      {needsTap && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={toggle}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-xl"
        >
          <div className="text-center space-y-6 px-6">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-7xl"
            >
              💜
            </motion.div>
            <h2 className="font-display text-4xl md:text-6xl text-gradient">For You, Rifa</h2>
            <p className="font-script text-2xl text-accent">tap to begin</p>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto">with Kanmani Anbodu by A.R. Rahman</p>
          </div>
        </motion.button>
      )}
      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-6 z-40 glass rounded-full w-14 h-14 flex items-center justify-center text-2xl shadow-glow"
        aria-label="toggle music"
      >
        {playing ? "♪" : "♫"}
      </motion.button>
    </>
  );
}
