import { ArrowUpRight, BrainCircuit, Layers, PenTool, Server } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import SpotlightCard from '@/components/ui/SpotlightCard';
import SectionHeading from '@/components/ui/SectionHeading';

const SERVICES = [
  {
    icon: Layers,
    title: 'Full-Stack Web Development',
    body: 'Production-grade web apps with server rendering, clean APIs and data layers designed to scale.',
    stack: ['Next.js', 'Node.js', 'MongoDB'],
  },
  {
    icon: Server,
    title: 'Java Application Development',
    body: 'Robust services built on Spring Boot — layered architecture, clear contracts and enterprise-ready patterns.',
    stack: ['Java', 'Spring Boot', 'Enterprise Architecture'],
  },
  {
    icon: BrainCircuit,
    title: 'AI Developments',
    body: 'ML integrations, automated workflows and intelligent agents that remove busywork from real products.',
    stack: ['ML Integrations', 'Automation', 'Agents'],
  },
  {
    icon: PenTool,
    title: 'Responsive UI/UX Design',
    body: 'Intuitive, accessible interfaces with modern micro-interactions that feel right on every screen.',
    stack: ['Responsive', 'Micro-interactions', 'Accessibility'],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="section">
      <SectionHeading
        index="02"
        eyebrow="Services"
        title="What I can build for you."
        description="From the first schema to the final interaction — end-to-end engineering with an eye for detail."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {SERVICES.map(({ icon: Icon, title, body, stack }, i) => (
          <Reveal key={title} delay={(i % 2) * 0.08}>
            <SpotlightCard className="h-full" innerClassName="flex h-full flex-col p-7 sm:p-8">
              <div className="flex items-start justify-between">
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl bg-accent/40 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative grid h-12 w-12 place-items-center rounded-2xl border border-zinc-900/10 bg-zinc-50 text-zinc-900 transition-colors duration-500 group-hover:text-accent dark:border-white/10 dark:bg-ink-800 dark:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <span className="font-mono text-xs text-zinc-400">{String(i + 1).padStart(2, '0')}</span>
              </div>

              <h3 className="mt-8 text-xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400">{body}</p>

              <div className="mt-auto flex items-end justify-between gap-4 pt-8">
                <ul className="flex flex-wrap gap-1.5">
                  {stack.map((s) => <li key={s} className="chip">{s}</li>)}
                </ul>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-zinc-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
