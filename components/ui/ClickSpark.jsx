import { useEffect, useRef } from 'react';

export default function ClickSpark({ count = 10, radius = 28, duration = 420 }) {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let sparks = [];
    let frame = 0;
    let accent = '124,92,255';

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      sparks = sparks.filter((s) => now - s.start < duration);
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      for (const s of sparks) {
        const p = (now - s.start) / duration;
        const e = 1 - Math.pow(1 - p, 3);
        const d = e * radius;
        const len = (1 - e) * 12;
        ctx.strokeStyle = `rgba(${accent},${1 - p})`;
        ctx.beginPath();
        ctx.moveTo(s.x + Math.cos(s.a) * d, s.y + Math.sin(s.a) * d);
        ctx.lineTo(s.x + Math.cos(s.a) * (d + len), s.y + Math.sin(s.a) * (d + len));
        ctx.stroke();
      }
      frame = sparks.length ? requestAnimationFrame(draw) : 0;
    };

    const onDown = (e) => {
      const v = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
      if (v) accent = v.split(/\s+/).join(',');
      const now = performance.now();
      for (let i = 0; i < count; i++) {
        sparks.push({ x: e.clientX, y: e.clientY, a: (Math.PI * 2 * i) / count, start: now });
      }
      if (!frame) frame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointerdown', onDown);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerdown', onDown);
    };
  }, [count, radius, duration]);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-[399] h-full w-full" />;
}
