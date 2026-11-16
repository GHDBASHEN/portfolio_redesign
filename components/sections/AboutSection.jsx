import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileDown, GraduationCap, MapPin } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import SpotlightCard from '@/components/ui/SpotlightCard';
import SectionHeading from '@/components/ui/SectionHeading';
import Magnetic from '@/components/ui/Magnetic';
import { PROFILE, SKILLS } from '@/lib/profile';

function LocalTime() {
  const [time, setTime] = useState(null); // client-only → no hydration mismatch
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: PROFILE.timezone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="font-mono tabular-nums">{time ?? '--:--:--'}</span>;
}

function CgpaRing() {
  const ratio = PROFILE.cgpa / PROFILE.cgpaMax;
  return (
    <div className="relative h-28 w-28 shrink-0">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <defs>
          <linearGradient id="cgpa-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgb(124 92 255)" />
            <stop offset="100%" stopColor="rgb(34 211 238)" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="52" fill="none" strokeWidth="8" className="stroke-zinc-900/10 dark:stroke-white/10" />
        <motion.circle
          cx="60" cy="60" r="52" fill="none" stroke="url(#cgpa-grad)" strokeWidth="8" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: ratio }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <p className="text-2xl font-semibold tracking-tight">{PROFILE.cgpa.toFixed(2)}</p>
          <p className="font-mono text-[10px] text-zinc-500">/ {PROFILE.cgpaMax.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="section">
      <SectionHeading
        index="01"
        eyebrow="About & Telemetry"
        title={<>Engineer by training. <span className="text-zinc-400 dark:text-zinc-500">Builder by instinct.</span></>}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
        {/* Bio */}
        <Reveal className="md:col-span-4 md:row-span-2">
          <SpotlightCard className="h-full" innerClassName="p-7 sm:p-9">
            <p className="eyebrow">// bio</p>
            <p className="mt-6 text-2xl font-medium leading-snug tracking-tight sm:text-[1.7rem]">
              I&apos;m <span className="text-gradient">{PROFILE.fullName}</span> — a software engineer from
              Sri Lanka who cares about the full journey from database schema to the last pixel.
            </p>
            <p className="mt-6 max-w-xl leading-relaxed text-zinc-600 dark:text-zinc-400">
              I build full-stack products with Next.js and Node.js, design dependable services with Java
              and Spring Boot, and integrate machine learning and intelligent agents where they make a
              real difference. I like clean architecture, fast interfaces and shipping things that last.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="chip">Full-Stack</span>
              <span className="chip">Enterprise Java</span>
              <span className="chip">AI Systems</span>
              <span className="chip">UI Engineering</span>
            </div>
          </SpotlightCard>
        </Reveal>

        {/* Credentials */}
        <Reveal delay={0.05} className="md:col-span-2">
          <SpotlightCard className="h-full" innerClassName="p-6">
            <div className="flex items-center gap-2 text-zinc-500">
              <GraduationCap className="h-4 w-4" />
              <p className="eyebrow">Credentials</p>
            </div>
            <div className="mt-5 flex items-center gap-5">
              <CgpaRing />
              <div>
                <p className="font-semibold leading-tight">{PROFILE.degree}</p>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{PROFILE.university}</p>
              </div>
            </div>
          </SpotlightCard>
        </Reveal>

        {/* Telemetry */}
        <Reveal delay={0.1} className="md:col-span-2">
          <SpotlightCard className="h-full" innerClassName="p-6">
            <div className="flex items-center gap-2 text-zinc-500">
              <MapPin className="h-4 w-4" />
              <p className="eyebrow">Telemetry</p>
            </div>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="font-mono text-xs text-zinc-500">LOC</dt>
                <dd className="font-medium">{PROFILE.location}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="font-mono text-xs text-zinc-500">TIME</dt>
                <dd className="font-medium"><LocalTime /> <span className="text-zinc-500">IST</span></dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="font-mono text-xs text-zinc-500">COMMS</dt>
                <dd className="truncate">
                  <a href={`mailto:${PROFILE.email}`} className="font-medium hover:text-accent">{PROFILE.email}</a>
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="font-mono text-xs text-zinc-500">STATUS</dt>
                <dd className="flex items-center gap-2 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Open to work
                </dd>
              </div>
            </dl>
          </SpotlightCard>
        </Reveal>

        {/* Stack */}
        <Reveal delay={0.05} className="md:col-span-4">
          <SpotlightCard className="h-full" innerClassName="p-6 sm:p-7">
            <p className="eyebrow">// stack</p>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {SKILLS.map(({ group, items }) => (
                <div key={group}>
                  <p className="mb-2 text-sm font-medium">{group}</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {items.map((s) => <li key={s} className="chip">{s}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </Reveal>

        {/* CV */}
        <Reveal delay={0.1} className="md:col-span-2">
          <SpotlightCard className="h-full" innerClassName="flex h-full flex-col justify-between gap-6 p-6">
            <div>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/10 text-accent ring-1 ring-accent/20">
                <FileDown className="h-5 w-5" />
              </div>
              <p className="mt-5 text-lg font-semibold">Curriculum Vitae</p>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Full history, projects and references. PDF.</p>
            </div>
            <Magnetic strength={0.2} className="self-start">
              <a href={PROFILE.cvPath} download className="btn btn-primary h-11">
                Download CV
              </a>
            </Magnetic>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}
