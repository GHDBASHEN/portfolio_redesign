import { useEffect, useRef } from 'react';

export default function ProximityText({ text, radius = 140, lift = 10, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const letters = Array.from(ref.current.querySelectorAll('[data-ch]'));
    letters.forEach((el) => {
      el.style.transition = 'transform 0.25s ease-out, color 0.25s, text-shadow 0.25s';
    });
    let mx = -9999, my = -9999, frame = 0;

    const update = () => {
      frame = 0;
      for (const el of letters) {
        const r = el.getBoundingClientRect();
        const d = Math.hypot(mx - (r.left + r.width / 2), my - (r.top + r.height / 2));
        const t = Math.max(0, 1 - d / radius);
        const e = t * t * (3 - 2 * t); // smoothstep falloff
        if (e < 0.01) {
          el.style.transform = '';
          el.style.color = '';
          el.style.textShadow = '';
          continue;
        }
        el.style.transform = `translateY(${-lift * e}px) scale(${1 + 0.12 * e})`;
        el.style.color = `color-mix(in srgb, rgb(var(--accent)) ${Math.round(e * 100)}%, currentColor)`;
        el.style.textShadow = `0 0 ${18 * e}px rgb(var(--accent) / ${0.6 * e})`;
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const onMove = (e) => { mx = e.clientX; my = e.clientY; schedule(); };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', schedule);
    };
  }, [radius, lift]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      {text.split('').map((c, i) => (
        <span key={i} data-ch aria-hidden className="inline-block will-change-transform">
          {c === ' ' ? '\u00A0' : c}
        </span>
      ))}
    </span>
  );
}
