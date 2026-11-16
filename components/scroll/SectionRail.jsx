import { useCallback, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { SECTIONS, useActiveSection } from '@/lib/sections';
import { scrollToId, useLenis } from './SmoothScroll';

export default function SectionRail() {
  const active = useActiveSection();
  const lenis = useLenis();
  const { scrollYProgress } = useScroll();
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  const index = Math.max(0, SECTIONS.findIndex((s) => s.id === active));
  const next = SECTIONS[index + 1];

  const go = useCallback(
    (dir) => {
      const target = SECTIONS[Math.min(Math.max(index + dir, 0), SECTIONS.length - 1)];
      scrollToId(lenis, target.id);
    },
    [index, lenis]
  );

  useEffect(() => {
    const onKey = (e) => {
      const t = e.target;
      if (t instanceof Element && t.closest('input, textarea, select, [contenteditable="true"]')) return;
      if (document.querySelector('[role="dialog"]')) return;
      const k = e.key.toLowerCase();
      if (k === 'j' || (e.altKey && e.key === 'ArrowDown')) { e.preventDefault(); go(1); }
      if (k === 'k' || (e.altKey && e.key === 'ArrowUp')) { e.preventDefault(); go(-1); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  return (
    <>
      {/* Right-side rail (desktop) */}
      <nav aria-label="Section progress" className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
        <div className="relative flex flex-col items-end gap-5 py-1">
          <span className="absolute bottom-0 right-[3px] top-0 w-px bg-zinc-900/10 dark:bg-white/10" />
          <motion.span
            style={{ scaleY: fill }}
            className="absolute bottom-0 right-[3px] top-0 w-px origin-top bg-gradient-to-b from-accent to-signal"
          />
          {SECTIONS.map((s, i) => {
            const isActive = s.id === active;
            return (
              <button
                key={s.id}
                onClick={() => scrollToId(lenis, s.id)}
                aria-label={`Go to ${s.label}`}
                aria-current={isActive ? 'true' : undefined}
                className="group relative flex items-center gap-3"
              >
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                    isActive
                      ? 'translate-x-0 text-accent opacity-100'
                      : 'translate-x-2 text-zinc-500 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                  }`}
                >
                  {String(i).padStart(2, '0')} {s.label}
                </span>
                <span className="relative grid h-[7px] w-[7px] place-items-center">
                  <span className="h-[7px] w-[7px] rounded-full bg-zinc-300 transition-colors group-hover:bg-zinc-500 dark:bg-zinc-700 dark:group-hover:bg-zinc-400" />
                  {isActive && (
                    <motion.span
                      layoutId="rail-dot"
                      className="absolute h-[11px] w-[11px] rounded-full bg-accent shadow-[0_0_14px_rgb(var(--accent)/0.9)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Next-section pill (all screens) */}
      <motion.button
        onClick={() => (next ? go(1) : scrollToId(lenis, 'home'))}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="glass fixed bottom-5 right-5 z-40 flex h-11 items-center gap-2 overflow-hidden rounded-full pl-4 pr-2 text-sm font-medium shadow-glass"
        aria-label={next ? `Next section: ${next.label}` : 'Back to top'}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={next?.id ?? 'top'}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {next ? (
              <><span className="hidden text-zinc-500 sm:inline">Next · </span>{next.label}</>
            ) : (
              'Back to top'
            )}
          </motion.span>
        </AnimatePresence>
        <span className="grid h-7 w-7 place-items-center rounded-full bg-eco-ink text-eco-50 dark:bg-white dark:text-zinc-900">
          {next ? <ArrowDown className="h-3.5 w-3.5" /> : <ArrowUp className="h-3.5 w-3.5" />}
        </span>
      </motion.button>
    </>
  );
}
