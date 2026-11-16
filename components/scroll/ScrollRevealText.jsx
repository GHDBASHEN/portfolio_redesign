import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function Word({ children, progress, range, highlight }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className={`mr-[0.25em] inline-block ${highlight ? 'text-gradient' : ''}`}>
      {children}
    </motion.span>
  );
}

export default function ScrollRevealText({ text, highlight = [], className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = text.split(' ');

  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => {
        const start = i / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]} highlight={highlight.includes(w)}>
            {w}
          </Word>
        );
      })}
    </p>
  );
}
