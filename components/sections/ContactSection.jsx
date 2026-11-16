import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Check, Copy, Lock, Mail, MessageCircle } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import Magnetic from '@/components/ui/Magnetic';
import { GithubIcon, FacebookIcon, WhatsappIcon, LinkedinIcon } from '@/components/ui/SocialIcons';
import { PROFILE } from '@/lib/profile';

const CONTACT_CHANNELS = [
  {
    id: 'whatsapp',
    channel: 'CHANNEL // 01',
    name: 'WhatsApp',
    value: PROFILE.phoneFormatted,
    actionText: 'Message Directly',
    href: PROFILE.whatsapp,
    icon: WhatsappIcon,
    cursor: 'WhatsApp',
    glow: 'hover:border-emerald-500/40 hover:bg-emerald-500/[0.04]',
    badgeColor: 'bg-emerald-500',
    iconColor: 'text-emerald-500',
  },
  {
    id: 'github',
    channel: 'CHANNEL // 02',
    name: 'GitHub',
    value: '@GHDBASHEN',
    actionText: 'Explore Repos',
    href: PROFILE.github,
    icon: GithubIcon,
    cursor: 'GitHub',
    glow: 'hover:border-accent/40 hover:bg-accent/[0.04]',
    badgeColor: 'bg-accent',
    iconColor: 'text-zinc-900 dark:text-white',
  },
  {
    id: 'facebook',
    channel: 'CHANNEL // 03',
    name: 'Facebook',
    value: 'ghdb.ashen.9',
    actionText: 'Connect on FB',
    href: PROFILE.facebook,
    icon: FacebookIcon,
    cursor: 'Facebook',
    glow: 'hover:border-blue-500/40 hover:bg-blue-500/[0.04]',
    badgeColor: 'bg-blue-500',
    iconColor: 'text-blue-500',
  },
  {
    id: 'email',
    channel: 'CHANNEL // 04',
    name: 'Direct Email',
    value: PROFILE.email,
    actionText: 'Send Email',
    href: `mailto:${PROFILE.email}`,
    icon: Mail,
    cursor: 'Email me',
    glow: 'hover:border-signal/40 hover:bg-signal/[0.04]',
    badgeColor: 'bg-signal',
    iconColor: 'text-signal',
  },
];

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — mailto link still works */
    }
  };

  return (
    <>
      <section id="contact" className="section">
        <Reveal>
          <div className="hud-frame relative isolate overflow-hidden rounded-[2rem] border border-zinc-900/[0.08] px-6 py-16 text-center dark:border-white/[0.08] sm:px-12 sm:py-20">
            <div aria-hidden className="absolute inset-0 -z-10">
              <div className="bg-grid absolute inset-0" />
              <div className="aurora-blob left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 bg-accent/35" />
            </div>

            <p className="eyebrow">05 — Contact & Inquiries</p>
            <h2 className="mx-auto mt-5 max-w-3xl text-[clamp(2.25rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
              Let&apos;s build something <span className="text-gradient">remarkable.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
              Open to engineering roles, enterprise consulting, and technical collaborations. Reach out
              directly through any channel below.
            </p>

            {/* Quick action buttons */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Magnetic>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="LinkedIn"
                  className="btn btn-primary"
                >
                  <LinkedinIcon className="h-4 w-4" />
                  Hire Me on LinkedIn <ArrowUpRight className="h-4 w-4" />
                </a>
              </Magnetic>

              <Magnetic strength={0.25}>
                <a
                  href={PROFILE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="WhatsApp"
                  className="btn btn-ghost text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300"
                >
                  <WhatsappIcon className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
              </Magnetic>

              <Magnetic strength={0.25}>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="GitHub"
                  className="btn btn-ghost"
                >
                  <GithubIcon className="h-4 w-4" />
                  GitHub Profile
                </a>
              </Magnetic>

              <Magnetic strength={0.25}>
                <a
                  href={PROFILE.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="Facebook"
                  className="btn btn-ghost text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <FacebookIcon className="h-4 w-4" />
                  Facebook
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

            {/* Structured telemetry contact channels grid */}
            <div className="mt-14 grid grid-cols-1 gap-3.5 text-left sm:grid-cols-2 lg:grid-cols-4">
              {CONTACT_CHANNELS.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    data-cursor={item.cursor}
                    className={`group relative overflow-hidden rounded-2xl border border-zinc-900/[0.08] bg-white/40 p-5 backdrop-blur-md transition-all duration-300 dark:border-white/[0.08] dark:bg-white/[0.03] ${item.glow} hover:-translate-y-1 hover:shadow-lg`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] tracking-wider text-zinc-500 dark:text-zinc-400">
                        {item.channel}
                      </span>
                      <span className={`h-1.5 w-1.5 rounded-full ${item.badgeColor}`} />
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl border border-zinc-900/10 bg-white/70 shadow-sm dark:border-white/10 dark:bg-white/[0.06]">
                        <Icon className={`h-5 w-5 ${item.iconColor}`} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-white">
                          {item.name}
                        </p>
                        <p className="truncate font-mono text-xs text-zinc-500 dark:text-zinc-400">
                          {item.value}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-zinc-900/[0.06] pt-3 text-xs font-medium text-zinc-600 transition group-hover:text-accent dark:border-white/[0.06] dark:text-zinc-400 dark:group-hover:text-accent">
                      <span>{item.actionText}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-zinc-900/[0.08] px-5 py-8 font-mono text-[11px] text-zinc-500 dark:border-white/[0.08] sm:flex-row sm:px-8">
        <p>© {new Date().getFullYear()} {PROFILE.fullName}</p>

        {/* Footer social links */}
        <div className="flex items-center gap-2">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            data-cursor="GitHub"
            className="grid h-8 w-8 place-items-center rounded-full text-zinc-600 transition hover:bg-zinc-900/5 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href={PROFILE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            data-cursor="WhatsApp"
            className="grid h-8 w-8 place-items-center rounded-full text-zinc-600 transition hover:bg-zinc-900/5 hover:text-emerald-500 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-emerald-400"
          >
            <WhatsappIcon className="h-4 w-4" />
          </a>
          <a
            href={PROFILE.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            data-cursor="Facebook"
            className="grid h-8 w-8 place-items-center rounded-full text-zinc-600 transition hover:bg-zinc-900/5 hover:text-blue-500 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-blue-400"
          >
            <FacebookIcon className="h-4 w-4" />
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            data-cursor="LinkedIn"
            className="grid h-8 w-8 place-items-center rounded-full text-zinc-600 transition hover:bg-zinc-900/5 hover:text-accent dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-accent"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
        </div>

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
