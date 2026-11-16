import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function SectionReveal({ children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.6'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.93, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [90, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.15, 1]);

  return (
    <motion.div ref={ref} style={{ scale, y, opacity }} className="origin-top will-change-transform">
      {children}
    </motion.div>
  );
}
