import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, BrainCircuit, Layers, PenTool, Server } from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';
import SectionHeading from '@/components/ui/SectionHeading';

const SERVICES = [
  { icon: Layers, title: 'Full-Stack Web Development',
    body: 'Production-grade web apps with server rendering, clean APIs and data layers designed to scale.',
    stack: ['Next.js', 'Node.js', 'MongoDB'] },
  { icon: Server, title: 'Java Application Development',
    body: 'Robust services built on Spring Boot — layered architecture, clear contracts and enterprise-ready patterns.',
    stack: ['Java', 'Spring Boot', 'Enterprise Architecture'] },
  { icon: BrainCircuit, title: 'AI Developments',
    body: 'ML integrations, automated workflows and intelligent agents that remove busywork from real products.',
    stack: ['ML Integrations', 'Automation', 'Agents'] },
  { icon: PenTool, title: 'Responsive UI/UX Design',
    body: 'Intuitive, accessible interfaces with modern micro-interactions that feel right on every screen.',
    stack: ['Responsive', 'Micro-interactions', 'Accessibility'] },
];

function StackCard({ service, i, total, progress }) {
  const { icon: Icon, title, body, stack } = service;
  const isLast = i === total - 1;
  const scale = useTransform(progress, [i / total, 1], [1, 1 - (total - 1 - i) * 0.045]);
  const shade = useTransform(progress, [(i + 1) / total, 1], [0, isLast ? 0 : 0.5]);

  return (
    <div
      className="sticky flex items-start"
      style={{ top: `calc(7rem + ${i * 1.25}rem)`, height: isLast ? 'auto' : '62vh' }}
    >
      <motion.div style={{ scale }} className="relative w-full origin-top">
        <SpotlightCard innerClassName="flex min-h-[20rem] flex-col p-7 sm:p-9">
          <div className="flex items-start justify-between">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-accent/40 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative grid h-12 w-12 place-items-center rounded-2xl border border-black/10 bg-eco-50 transition-colors duration-500 group-hover:text-accent dark:border-white/10 dark:bg-ink-800">
                <Icon className="h-5 w-5" />
              </div>
            </div>
            <span className="font-mono text-5xl font-semibold tracking-tighter text-zinc-200 dark:text-white/[0.07]">
              {String(i + 1).padStart(2, '0')}
            </span>
          </div>
          <h3 className="mt-8 text-2xl font-semibold tracking-tight">{title}</h3>
          <p className="mt-3 max-w-md leading-relaxed text-zinc-600 dark:text-zinc-400">{body}</p>
          <div className="mt-auto flex items-end justify-between gap-4 pt-8">
            <ul className="flex flex-wrap gap-1.5">
              {stack.map((s) => <li key={s} className="chip">{s}</li>)}
            </ul>
            <ArrowUpRight className="h-5 w-5 shrink-0 text-zinc-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
          </div>
        </SpotlightCard>
        <motion.div
          aria-hidden
          style={{ opacity: shade }}
          className="pointer-events-none absolute inset-0 rounded-3xl bg-eco-200 dark:bg-ink-950"
        />
      </motion.div>
    </div>
  );
}

export default function ServicesSection() {
  const stackRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start start', 'end end'] });
  const [current, setCurrent] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setCurrent(Math.min(SERVICES.length - 1, Math.max(0, Math.floor(v * SERVICES.length))));
  });

  return (
    <section id="services" className="section">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            index="02"
            eyebrow="Services"
            title="What I can build for you."
            description="From the first schema to the final interaction — end-to-end engineering with an eye for detail."
          />
          <ol className="hidden space-y-1 lg:block">
            {SERVICES.map((s, i) => (
              <li key={s.title} className="relative flex items-center gap-4 py-2">
                <span className="font-mono text-xs text-zinc-400">{String(i + 1).padStart(2, '0')}</span>
                <span
                  className={`text-sm transition-colors duration-300 ${
                    i === current ? 'font-medium text-zinc-900 dark:text-white' : 'text-zinc-400 dark:text-zinc-500'
                  }`}
                >
                  {s.title}
                </span>
                {i === current && (
                  <motion.span
                    layoutId="service-marker"
                    className="absolute -left-4 h-5 w-[3px] rounded-full bg-accent shadow-[0_0_10px_rgb(var(--accent))]"
                  />
                )}
              </li>
            ))}
          </ol>
        </div>

        <div ref={stackRef} className="relative">
          {SERVICES.map((s, i) => (
            <StackCard key={s.title} service={s} i={i} total={SERVICES.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
