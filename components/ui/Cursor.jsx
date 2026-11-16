import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';

const SIZES = { default: 32, hover: 56, label: 92, hidden: 0 };
const FILLS = {
  default: 'rgba(124, 92, 255, 0)',
  hover: 'rgba(124, 92, 255, 0.12)',
  label: 'rgba(124, 92, 255, 0.92)',
  hidden: 'rgba(124, 92, 255, 0)',
};

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState('default');
  const [label, setLabel] = useState('');
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 450, damping: 35, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 450, damping: 35, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e) => {
      const t = e.target instanceof Element ? e.target : null;
      const labelled = t?.closest('[data-cursor]');
      if (labelled) { setMode('label'); setLabel(labelled.getAttribute('data-cursor')); return; }
      if (t?.closest('input, textarea, select, [contenteditable="true"]')) { setMode('hidden'); return; }
      if (t?.closest('a, button, [role="tab"]')) { setMode('hover'); return; }
      setMode('default');
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);
    const root = document.documentElement;

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerover', over);
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    root.addEventListener('mouseleave', leave);
    root.addEventListener('mouseenter', enter);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      root.removeEventListener('mouseleave', leave);
      root.removeEventListener('mouseenter', enter);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible && mode !== 'label' && mode !== 'hidden' ? 1 : 0 }}
        className="pointer-events-none fixed left-0 top-0 z-[400] h-1.5 w-1.5 rounded-full bg-accent"
      />
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: SIZES[mode],
          height: SIZES[mode],
          backgroundColor: FILLS[mode],
          scale: pressed ? 0.82 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="pointer-events-none fixed left-0 top-0 z-[400] grid place-items-center rounded-full border border-accent/60"
      >
        <AnimatePresence>
          {mode === 'label' && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="whitespace-nowrap font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-white"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
