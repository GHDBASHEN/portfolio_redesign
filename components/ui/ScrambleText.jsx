import { useCallback, useEffect, useRef, useState } from 'react';

const GLYPHS = '!<>-_\\/[]{}=+*^?#01ABCDEFX';

export function useScramble(text) {
  const [output, setOutput] = useState(text);
  const frame = useRef(0);

  useEffect(() => setOutput(text), [text]);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const run = useCallback(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    cancelAnimationFrame(frame.current);
    const queue = text.split('').map((ch, i) => ({
      ch,
      start: Math.floor(Math.random() * 6),
      end: 6 + Math.floor(i * 0.8 + Math.random() * 8),
    }));
    let f = 0;
    const tick = () => {
      let done = 0;
      const next = queue
        .map((q) => {
          if (f >= q.end) { done++; return q.ch; }
          if (f >= q.start && q.ch !== ' ') return GLYPHS[(Math.random() * GLYPHS.length) | 0];
          return q.ch;
        })
        .join('');
      setOutput(next);
      if (done < queue.length) { f++; frame.current = requestAnimationFrame(tick); }
    };
    tick();
  }, [text]);

  return [output, run];
}

/** trigger="hover" scrambles when the PARENT element is hovered; trigger="view" runs once on scroll-in. */
export default function ScrambleText({ text, className = '', trigger = 'hover' }) {
  const ref = useRef(null);
  const [output, run] = useScramble(text);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (trigger === 'hover') {
      const target = el.parentElement ?? el;
      target.addEventListener('mouseenter', run);
      return () => target.removeEventListener('mouseenter', run);
    }
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { run(); io.disconnect(); } },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [run, trigger]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{output}</span>
    </span>
  );
}
