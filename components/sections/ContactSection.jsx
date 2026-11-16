import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Check, Copy, Lock } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import Magnetic from '@/components/ui/Magnetic';
import { PROFILE } from '@/lib/profile';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* clipboard unavailable — mailto link still works */ }
  };

  return (
    <>
      <section id="contact" className="section">
        <Reveal>
          <div className="hud-frame relative isolate overflow-hidden rounded-[2rem] border border-zinc-900/[0.08] px-6 py-20 text-center dark:border-white/[0.08] sm:px-12">
            <div aria-hidden className="absolute inset-0 -z-10">
              <div className="bg-grid absolute inset-0" />
              <div className="aurora-blob left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 bg-accent/35" />
            </div>
            <p className="eyebrow">05 — Contact</p>
            <h2 className="mx-auto mt-5 max-w-3xl text-[clamp(2.25rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
              Let&apos;s build something <span className="text-gradient">remarkable.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-zinc-600 dark:text-zinc-400">
              Open to internships, full-time roles and freelance projects. I usually reply within a day.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Magnetic>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="Let's talk"
                  className="btn btn-primary"
                >
                  Hire Me on LinkedIn <ArrowUpRight className="h-4 w-4" />
                </a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <button
                  onClick={copy}
                  data-cursor="Copy"
                  className="btn btn-ghost font-mono"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Copied!' : PROFILE.email}
                </button>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-zinc-900/[0.08] px-5 py-8 font-mono text-[11px] text-zinc-500 dark:border-white/[0.08] sm:flex-row sm:px-8">
        <p>© {new Date().getFullYear()} {PROFILE.fullName}</p>
        <div className="flex items-center gap-4">
          <p>{PROFILE.location} · Built with Next.js</p>
          <span className="h-3 w-px bg-zinc-900/10 dark:bg-white/10" />
          <Link
            href="/admin/login"
            data-cursor="Admin"
            className="inline-flex items-center gap-1 transition-colors hover:text-accent"
          >
            <Lock className="h-3 w-3" /> Admin
          </Link>
        </div>
      </footer>
    </>
  );
}
