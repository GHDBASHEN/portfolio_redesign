import { useEffect, useRef } from 'react';

export default function ParticleField({
  density = 0.00008,
  maxParticles = 130,
  linkDistance = 120,
  mouseRadius = 170,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mouse = { x: -9999, y: -9999 };
    let w = 0, h = 0, particles = [], frame = 0;
    let accent = '124,92,255', isDark = true;

    const readTheme = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
      if (v) accent = v.split(/\s+/).join(',');
      isDark = document.documentElement.classList.contains('dark');
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(maxParticles, Math.floor(w * h * density));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: 0,
        vy: 0,
        bx: (Math.random() - 0.5) * 0.25, // gentle base drift
        by: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.3 + 0.5,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const dotA = isDark ? 0.7 : 0.45;
      const lineA = isDark ? 0.22 : 0.16;
      const tether = mouseRadius * 1.3;

      // Physics: repel from cursor + friction + wrap edges
      for (const p of particles) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < mouseRadius && d > 0.1) {
          const f = (1 - d / mouseRadius) * 0.5;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.x += p.vx + p.bx;
        p.y += p.vy + p.by;
        if (p.x < -10) p.x = w + 10; else if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10; else if (p.y > h + 10) p.y = -10;
      }

      // Links between particles + tethers to cursor
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkDistance * linkDistance) {
            ctx.strokeStyle = `rgba(${accent},${(1 - Math.sqrt(d2) / linkDistance) * lineA})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (md < tether) {
          ctx.strokeStyle = `rgba(${accent},${(1 - md / tether) * 0.5})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // Dots (brighter + bigger near cursor)
      for (const p of particles) {
        const boost = Math.max(0, 1 - Math.hypot(p.x - mouse.x, p.y - mouse.y) / tether);
        ctx.fillStyle = `rgba(${accent},${Math.min(1, dotA + boost * 0.3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + boost * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const start = () => {
      if (frame) return;
      const loop = () => { draw(); frame = requestAnimationFrame(loop); };
      frame = requestAnimationFrame(loop);
    };
    const stop = () => { cancelAnimationFrame(frame); frame = 0; };

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const onUp = (e) => { if (e.pointerType === 'touch') onLeave(); };
    const onDown = (e) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      if (x < 0 || y < 0 || x > w || y > h) return;
      for (const p of particles) {                       // shockwave
        const dx = p.x - x, dy = p.y - y;
        const d = Math.hypot(dx, dy) || 1;
        if (d < 260) {
          const f = (1 - d / 260) * 9;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
      }
    };

    readTheme();
    resize();
    if (reduce) { draw(); return; } // static constellation

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    io.observe(canvas);
    const mo = new MutationObserver(readTheme);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [density, maxParticles, linkDistance, mouseRadius]);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}
