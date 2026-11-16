import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { ArrowUpRight, Award, FolderGit2, Layers, Mail, Moon, Sun, Terminal, User } from 'lucide-react';
import { PROFILE } from '@/lib/profile';
import { useActiveSection } from '@/lib/sections';
import ScrambleText from '@/components/ui/ScrambleText';

export const NAV = [
  { id: 'home', label: 'Home', icon: Terminal },
  { id: 'about', label: 'About', icon: User },
  { id: 'services', label: 'Services', icon: Layers },
  { id: 'projects', label: 'Work', icon: FolderGit2 },
  { id: 'credentials', label: 'Credentials', icon: Award },
  { id: 'contact', label: 'Contact', icon: Mail },
];

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle colour theme"
      className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full text-zinc-600 transition hover:bg-zinc-900/5 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white"
    >
      {mounted && (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? 'moon' : 'sun'}
            initial={{ y: -18, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 18, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.25 }}
          >
            {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </motion.span>
        </AnimatePresence>
      )}
    </button>
  );
}

export default function Header() {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav
        aria-label="Primary"
        className={`glass flex items-center gap-0.5 rounded-full p-1.5 transition-shadow duration-500 ${scrolled ? 'shadow-glass' : ''}`}
      >
        <a
          href="#home"
          aria-label="Back to top"
          className="mr-1 grid h-9 w-9 place-items-center rounded-full bg-eco-ink font-mono text-[11px] font-bold text-eco-50 dark:bg-white dark:text-zinc-900"
        >
          BA
        </a>

        {NAV.map(({ id, label, icon: Icon }) => (
          <a
            key={id}
            href={`#${id}`}
            aria-label={label}
            aria-current={active === id ? 'true' : undefined}
            className={`relative flex h-9 items-center rounded-full px-2.5 text-sm transition-colors md:px-3.5 ${
              active === id
                ? 'text-eco-ink dark:text-white'
                : 'text-zinc-600 hover:text-eco-ink dark:text-zinc-400 dark:hover:text-white'
            }`}
          >
            {active === id && (
              <motion.span
                layoutId="nav-active"
                className="absolute inset-0 rounded-full bg-black/[0.06] ring-1 ring-black/10 dark:bg-white/10 dark:ring-white/15"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <Icon className="relative h-4 w-4 md:hidden" />
            <ScrambleText text={label} className="relative hidden md:inline" />
          </a>
        ))}

        <span className="mx-1 h-5 w-px bg-zinc-900/10 dark:bg-white/10" />
        <ThemeToggle />
        <a
          href={PROFILE.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="Hire me"
          className="ml-1 hidden h-9 items-center gap-1 rounded-full bg-accent px-4 text-sm font-medium text-white transition hover:brightness-110 lg:inline-flex"
        >
          Hire me <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </nav>
    </motion.header>
  );
}
