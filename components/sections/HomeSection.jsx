import { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Download } from 'lucide-react';
import Magnetic from '@/components/ui/Magnetic';
import ProfilePortrait from '@/components/ui/ProfilePortrait';
import ParticleField from '@/components/ui/ParticleField';
import ProximityText from '@/components/ui/ProximityText';
import ScrambleText from '@/components/ui/ScrambleText';
import { GithubIcon, WhatsappIcon, FacebookIcon } from '@/components/ui/SocialIcons';
import { PROFILE } from '@/lib/profile';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } } };
const item = {
  hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};
const portraitIn = {
  hidden: { opacity: 0, y: 60, scale: 0.9, rotate: -3 },
  show: { opacity: 1, y: 0, scale: 1, rotate: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 } },
};

const LINE_1 = ["Hi,", "I'm", 'Ashen.'];
const LINE_2 = ['Engineering','ideas' ,'into', 'powerful' ,'digital'];
const TELEMETRY = [
  ['LOC', 'Kalutara, LK'],
  ['EDU', 'BICT (Hons) · Ruhuna'],
  ['CGPA', `${PROFILE.cgpa.toFixed(2)} / ${PROFILE.cgpaMax.toFixed(2)}`],
  ['STACK', 'Next.js · Spring · AI'],
];

export default function HomeSection({ ready = true }) {
  const ref = useRef(null);
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const spotlight = useMotionTemplate`radial-gradient(650px circle at ${mx}px ${my}px, rgb(var(--accent) / 0.14), transparent 60%)`;

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -80]); // opposite direction = depth
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const state = ready ? 'show' : 'hidden';

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
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0" />
        <ParticleField />
        <div className="aurora-blob left-[5%] top-[12%] h-[28rem] w-[28rem] bg-accent/40" />
        <div className="aurora-blob right-[2%] top-[20%] h-[26rem] w-[26rem] bg-signal/30 [animation-delay:-7s]" />
        <div className="aurora-blob bottom-[-12%] left-[35%] h-[22rem] w-[22rem] bg-magenta/25 [animation-delay:-14s]" />
        <motion.div className="absolute inset-0" style={{ background: spotlight }} />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-eco-200 dark:to-ink-950" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 pb-20 pt-28 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:pt-32">
        {/* Text column */}
        <motion.div style={{ y: textY, opacity }}>
          <motion.div variants={container} initial="hidden" animate={state}>
            <motion.div variants={item}>
              <span className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pl-2 pr-4 text-xs font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Available for opportunities
              </span>
            </motion.div>

            <h1 className="mt-8 text-[clamp(2.5rem,6.2vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
              <span className="block">
                {LINE_1.map((w) => (
                  <motion.span key={w} variants={item} className="mr-[0.22em] inline-block">
                    <ProximityText text={w} />
                  </motion.span>
                ))}
              </span>
              <span className="block text-zinc-400 dark:text-zinc-500">
                {LINE_2.map((w) => (
                  <motion.span key={w} variants={item} className="mr-[0.22em] inline-block">
                    <ProximityText text={w} />
                  </motion.span>
                ))}
                <motion.span variants={item} className="text-gradient inline-block">Solutions.</motion.span>
              </span>
            </h1>

            <motion.p variants={item} className="mt-7 max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              Software engineer building full-stack web platforms, enterprise Java systems and
              AI-powered workflows — with interfaces people actually enjoy using.
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="Let's talk"
                  className="btn btn-primary"
                >
                  Hire Me <ArrowUpRight className="h-4 w-4" />
                </a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a
                  href={PROFILE.cvPath}
                  download
                  data-cursor="Download"
                  className="btn btn-ghost"
                >
                  <Download className="h-4 w-4" /> Download CV
                </a>
              </Magnetic>

              {/* Quick social links */}
              <div className="flex items-center gap-2 pl-1">
                <Magnetic strength={0.3}>
                  <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    data-cursor="GitHub"
                    className="grid h-11 w-11 place-items-center rounded-2xl border border-zinc-900/10 bg-white/50 text-zinc-700 backdrop-blur transition hover:border-zinc-900/25 hover:bg-white hover:text-zinc-950 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300 dark:hover:border-white/25 dark:hover:bg-white/[0.08] dark:hover:text-white"
                  >
                    <GithubIcon className="h-4 w-4" />
                  </a>
                </Magnetic>
                <Magnetic strength={0.3}>
                  <a
                    href={PROFILE.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat on WhatsApp"
                    data-cursor="WhatsApp"
                    className="grid h-11 w-11 place-items-center rounded-2xl border border-zinc-900/10 bg-white/50 text-zinc-700 backdrop-blur transition hover:border-emerald-500/35 hover:bg-emerald-500/10 hover:text-emerald-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300 dark:hover:border-emerald-400/35 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400"
                  >
                    <WhatsappIcon className="h-4 w-4" />
                  </a>
                </Magnetic>
                <Magnetic strength={0.3}>
                  <a
                    href={PROFILE.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook Profile"
                    data-cursor="Facebook"
                    className="grid h-11 w-11 place-items-center rounded-2xl border border-zinc-900/10 bg-white/50 text-zinc-700 backdrop-blur transition hover:border-blue-500/35 hover:bg-blue-500/10 hover:text-blue-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300 dark:hover:border-blue-400/35 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                  >
                    <FacebookIcon className="h-4 w-4" />
                  </a>
                </Magnetic>
              </div>
            </motion.div>

            <motion.dl
              variants={item}
              className="hud-frame mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-zinc-900/[0.08] bg-zinc-900/[0.06] dark:border-white/[0.08] dark:bg-white/[0.06] sm:grid-cols-4"
            >
              {TELEMETRY.map(([k, v]) => (
                <div key={k} className="bg-eco-100/90 px-4 py-3.5 backdrop-blur dark:bg-ink-950/80">
                  <dt className="font-mono text-[10px] tracking-[0.2em] text-accent">{k}</dt>
                  <dd className="mt-1 truncate text-sm font-medium">
                    <ScrambleText text={v} trigger="view" />
                  </dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>
        </motion.div>

        {/* Portrait column — shows first on mobile */}
        <motion.div
          style={{ y: portraitY }}
          className="order-first mx-auto w-full max-w-[15rem] sm:max-w-[19rem] lg:order-none lg:max-w-none"
        >
          <motion.div variants={portraitIn} initial="hidden" animate={state}>
            <ProfilePortrait />
          </motion.div>
        </motion.div>
      </div>

      <p className="eyebrow absolute bottom-8 left-8 hidden lg:block">
        // move your cursor · click for a shockwave
      </p>

      <motion.a
        href="#about"
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1, y: [0, 8, 0] } : { opacity: 0 }}
        transition={{ opacity: { delay: 1.4 }, y: { repeat: Infinity, duration: 2, ease: 'easeInOut' } }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white sm:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">Scroll</span>
        <ArrowDown className="h-4 w-4" />
      </motion.a>
    </section>
  );
}
