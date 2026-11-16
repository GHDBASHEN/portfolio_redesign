import { useRef } from 'react';

export default function SpotlightCard({ children, className = '', innerClassName = '' }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--x', `${e.clientX - r.left}px`);
    ref.current.style.setProperty('--y', `${e.clientY - r.top}px`);
  };

  return (
    <div ref={ref} onMouseMove={onMove} className={`spotlight group rounded-3xl p-px ${className}`}>
      <div className={`spotlight-inner ${innerClassName}`}>
        <div className="spotlight-fill" aria-hidden />
        <div className="relative h-full">{children}</div>
      </div>
    </div>
  );
}
