import { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';

const LenisContext = createContext(null);
export const useLenis = () => useContext(LenisContext);

// Layout position that ignores scroll-transition transforms
export function getDocumentTop(el) {
  let top = 0;
  for (let n = el; n; n = n.offsetParent) top += n.offsetTop;
  return top;
}

export function scrollToId(lenis, id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = id === 'home' ? 0 : getDocumentTop(el);
  if (lenis) lenis.scrollTo(top, { duration: 1.4 });
  else window.scrollTo({ top, behavior: 'smooth' });
  history.replaceState(null, '', id === 'home' ? window.location.pathname : `#${id}`);
}

export default function SmoothScroll({ children }) {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let frame;
    const raf = (time) => {
      instance.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    setLenis(instance);
    return () => {
      cancelAnimationFrame(frame);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  // Every in-page #anchor glides instead of jumping
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target instanceof Element ? e.target.closest('a[href^="#"]') : null;
      if (!link) return;
      const id = decodeURIComponent(link.getAttribute('href').slice(1));
      if (!id || !document.getElementById(id)) return;
      e.preventDefault();
      scrollToId(lenis, id);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [lenis]);

  // Deep links like /#projects land precisely
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const t = setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = getDocumentTop(el);
      if (lenis) lenis.scrollTo(top, { immediate: true });
      else window.scrollTo(0, top);
    }, 60);
    return () => clearTimeout(t);
  }, [lenis]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
