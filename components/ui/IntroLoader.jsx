import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLenis } from '@/components/scroll/SmoothScroll';
import { PROFILE } from '@/lib/profile';

const easeOut = (t) => 1 - Math.pow(1 - t, 3);

export default function IntroLoader({ onDone }) {
  const [show, setShow] = useState(true);
  const [count, setCount] = useState(0);
  const lenis = useLenis();

  useEffect(() => {
    if (show) lenis?.stop();
    else lenis?.start();
  }, [show, lenis]);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem('intro-seen') === '1'; } catch {}
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (seen || reduce) {
      setShow(false);
      onDone();
      return;
    }
    try { sessionStorage.setItem('intro-seen', '1'); } catch {}

    let frame;
    let timeout;
    const start = performance.now();
    const DURATION = 1100;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / DURATION);
      setCount(Math.round(easeOut(p) * 100));
      if (p < 1) frame = requestAnimationFrame(tick);
      else timeout = setTimeout(() => { setShow(false); onDone(); }, 220);
    };
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); clearTimeout(timeout); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <noscript><style>{'.intro-overlay{display:none!important}'}</style></noscript>
      <AnimatePresence>
        {show && (
          <motion.div
            className="intro-overlay fixed inset-0 z-[300] flex flex-col justify-between bg-ink-950 p-6 text-white sm:p-10"
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">
              Initialising portfolio
            </p>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(3rem,12vw,9rem)] font-semibold leading-none tracking-[-0.05em]"
              >
                {PROFILE.name}<span className="text-gradient">.</span>
              </motion.h2>
            </div>
            <div>
              <div className="h-px w-full bg-white/10">
                <div
                  className="h-px bg-gradient-to-r from-accent via-signal to-magenta"
                  style={{ width: `${count}%` }}
                />
              </div>
              <p className="mt-3 text-right font-mono text-sm tabular-nums text-white/70">
                {String(count).padStart(3, '0')}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
