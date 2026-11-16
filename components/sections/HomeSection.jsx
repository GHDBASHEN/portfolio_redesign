import { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Download } from 'lucide-react';
import Magnetic from '@/components/ui/Magnetic';
import { PROFILE } from '@/lib/profile';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } } };
const item = {
  hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const LINE_1 = ["Hi,", "I'm", 'Basith.'];
const LINE_2 = ['I', 'engineer', 'software', 'that', 'feels'];

const TELEMETRY = [
  ['LOC', 'Kalutara, LK'],
  ['EDU', 'BICT (Hons) · Ruhuna'],
  ['CGPA', `${PROFILE.cgpa.toFixed(2)} / ${PROFILE.cgpaMax.toFixed(2)}`],
  ['STACK', 'Next.js · Spring · AI'],
];

export default function HomeSection() {
  const ref = useRef(null);
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const spotlight = useMotionTemplate`radial-gradient(650px circle at ${mx}px ${my}px, rgb(var(--accent) / 0.14), transparent 60%)`;

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <section
      id="home"
      ref={ref}
      onMouseMove={onMove}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Ambient background */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0" />
        <div className="aurora-blob left-[8%] top-[12%] h-[28rem] w-[28rem] bg-accent/40" />
        <div className="aurora-blob right-[4%] top-[28%] h-[24rem] w-[24rem] bg-signal/30 [animation-delay:-7s]" />
        <div className="aurora-blob bottom-[-12%] left-[35%] h-[22rem] w-[22rem] bg-magenta/25 [animation-delay:-14s]" />
        <motion.div className="absolute inset-0" style={{ background: spotlight }} />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-zinc-50 dark:to-ink-950" />
      </div>

      <motion.div style={{ y, opacity }} className="mx-auto w-full max-w-6xl px-5 pb-16 pt-32 sm:px-8">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item}>
            <span className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pl-2 pr-4 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for opportunities
            </span>
          </motion.div>

          <h1 className="mt-8 text-[clamp(2.75rem,7.5vw,6.25rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
            <span className="block">
              {LINE_1.map((w) => (
                <motion.span key={w} variants={item} className="mr-[0.22em] inline-block">{w}</motion.span>
              ))}
            </span>
            <span className="block text-zinc-400 dark:text-zinc-500">
              {LINE_2.map((w) => (
                <motion.span key={w} variants={item} className="mr-[0.22em] inline-block">{w}</motion.span>
              ))}
              <motion.span variants={item} className="text-gradient inline-block">effortless.</motion.span>
            </span>
          </h1>

          <motion.p
            variants={item}
            className="mt-8 max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400"
          >
            Software engineer building full-stack web platforms, enterprise Java systems and
            AI-powered workflows — with interfaces people actually enjoy using.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Hire Me <ArrowUpRight className="h-4 w-4" />
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a href={PROFILE.cvPath} download className="btn btn-ghost">
                <Download className="h-4 w-4" /> Download CV
              </a>
            </Magnetic>
          </motion.div>

          <motion.dl
            variants={item}
            className="hud-frame mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-zinc-900/[0.08] bg-zinc-900/[0.06] dark:border-white/[0.08] dark:bg-white/[0.06] sm:grid-cols-4"
          >
            {TELEMETRY.map(([k, v]) => (
              <div key={k} className="bg-zinc-50/90 px-4 py-3.5 backdrop-blur dark:bg-ink-950/80">
                <dt className="font-mono text-[10px] tracking-[0.2em] text-accent">{k}</dt>
                <dd className="mt-1 truncate text-sm font-medium">{v}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.6 }, y: { repeat: Infinity, duration: 2, ease: 'easeInOut' } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
      >
        <ArrowDown className="h-5 w-5" />
      </motion.a>
    </section>
  );
}
