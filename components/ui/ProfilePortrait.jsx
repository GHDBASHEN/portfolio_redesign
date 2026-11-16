import { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import SmartImage from '@/components/ui/SmartImage';
import { PROFILE } from '@/lib/profile';

const CHIPS = [
  { label: 'Next.js', className: '-left-8 top-10' },
  { label: 'Spring Boot', className: '-right-8 top-[38%]' },
  { label: 'AI · ML', className: '-left-6 bottom-28' },
];

export default function ProfilePortrait() {
  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 150, damping: 18 };
  const rotateX = useSpring(useTransform(py, [0, 1], [9, -9]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-9, 9]), spring);
  const imgX = useSpring(useTransform(px, [0, 1], [-10, 10]), spring);
  const imgY = useSpring(useTransform(py, [0, 1], [-6, 6]), spring);

  const lensX = useTransform(px, (v) => `${v * 100}%`);
  const lensY = useTransform(py, (v) => `${v * 100}%`);
  const lens = useMotionTemplate`radial-gradient(120px circle at ${lensX} ${lensY}, #000 40%, transparent 100%)`;

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => { px.set(0.5); py.set(0.5); };

  return (
    <div className="relative w-full" style={{ perspective: 1200 }}>
      <motion.div
        ref={ref}
        data-cursor="hi!"
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group/portrait relative aspect-[4/5]"
      >
        {/* Ambient glow + animated gradient border */}
        <div aria-hidden className="portrait-ring absolute -inset-6 rounded-[3rem] opacity-40 blur-3xl dark:opacity-50" />
        <div aria-hidden className="portrait-ring absolute -inset-[1.5px] rounded-[2rem]" />

        <div className="hud-frame relative h-full overflow-hidden rounded-[calc(2rem-1.5px)] bg-ink-900">
          <motion.div
            style={{ x: imgX, y: imgY, scale: 1.04, transformOrigin: 'top center' }}
            className="absolute -top-1 -bottom-6 -inset-x-2"
          >
            <SmartImage
              src={PROFILE.photo}
              alt={`Portrait of ${PROFILE.name}`}
              fill
              priority
              sizes="(min-width: 1024px) 28rem, 80vw"
              className="object-cover object-top"
            />
          </motion.div>

          <motion.div
            aria-hidden
            style={{ WebkitMaskImage: lens, maskImage: lens }}
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/portrait:opacity-100"
          >
            <div className="absolute inset-0 bg-accent/40 mix-blend-color" />
            <div className="absolute inset-0 bg-signal/10 mix-blend-screen" />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(255,255,255,.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.22) 1px, transparent 1px)',
                backgroundSize: '14px 14px',
              }}
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent" />
          <div aria-hidden className="scanline" />

          <div className="absolute inset-x-4 top-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
            <span>BA // 001</span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> Online
            </span>
          </div>

          <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/10 bg-black/40 p-4 text-white backdrop-blur-md">
            <p className="text-lg font-semibold tracking-tight">{PROFILE.name}</p>
            <div className="mt-0.5 flex items-center justify-between gap-2 text-xs text-white/70">
              <span>{PROFILE.role}</span>
              <span className="font-mono">{PROFILE.location.split(',')[0]}, LK</span>
            </div>
          </div>
        </div>

        {CHIPS.map((c, i) => (
          <motion.div
            key={c.label}
            style={{ z: 60 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
            className={`glass absolute hidden items-center gap-2 rounded-full px-3.5 py-2 font-mono text-[11px] font-medium shadow-glass sm:flex ${c.className}`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgb(var(--accent))]" />
            {c.label}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
