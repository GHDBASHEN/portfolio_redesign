import { useRef } from 'react';
import {
  motion, useAnimationFrame, useMotionValue, useReducedMotion,
  useScroll, useSpring, useTransform, useVelocity,
} from 'framer-motion';

const wrap = (min, max, v) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

function Row({ items, baseVelocity, outline }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = dir.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * f;
    baseX.set(baseX.get() + move);
  });

  const content = [...items, ...items];
  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div style={{ x }} className="flex shrink-0">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {content.map((t, i) => (
              <span key={i} className="flex items-center">
                <span className={`px-6 text-4xl font-semibold tracking-[-0.03em] sm:text-6xl ${outline ? 'text-outline' : ''}`}>
                  {t}
                </span>
                <span className="text-2xl text-accent">✦</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function VelocityMarquee({ items, baseVelocity = 2 }) {
  return (
    <div
      aria-hidden
      className="relative -rotate-[1.5deg] space-y-2 border-y border-black/[0.08] bg-eco-100/50 py-6 backdrop-blur-sm [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] dark:border-white/[0.08] dark:bg-white/[0.015]"
    >
      <Row items={items} baseVelocity={-baseVelocity} />
      <Row items={items} baseVelocity={baseVelocity} outline />
    </div>
  );
}
