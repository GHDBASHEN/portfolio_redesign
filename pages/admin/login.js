import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useTheme } from 'next-themes';
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Moon,
  ShieldCheck,
  Sun,
  User,
  AlertCircle,
  Loader2,
} from 'lucide-react';

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle colour theme"
      className="grid h-9 w-9 place-items-center rounded-full text-zinc-600 transition hover:bg-zinc-900/5 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white"
    >
      {mounted ? (
        isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />
      ) : (
        <span className="h-4 w-4" />
      )}
    </button>
  );
}

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const ref = useRef(null);
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const spotlight = useMotionTemplate`radial-gradient(550px circle at ${mx}px ${my}px, rgb(var(--accent) / 0.15), transparent 60%)`;

  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError('Please provide both username and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const from = router.query.from || '/admin';
        router.push(from);
      } else {
        const data = await response.json();
        setError(data.message || 'Invalid username or password.');
      }
    } catch {
      setError('An error occurred while connecting to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Portal — GHDB Ashen</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div
        ref={ref}
        onMouseMove={onMove}
        className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden px-4 py-12"
      >
        {/* Ambient background */}
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="bg-grid absolute inset-0" />
          <div className="aurora-blob left-[10%] top-[15%] h-[24rem] w-[24rem] bg-accent/35" />
          <div className="aurora-blob right-[10%] bottom-[15%] h-[22rem] w-[22rem] bg-signal/25 [animation-delay:-8s]" />
          <motion.div className="absolute inset-0" style={{ background: spotlight }} />
        </div>

        {/* Top bar controls */}
        <div className="fixed top-5 inset-x-5 flex items-center justify-between z-50 max-w-5xl mx-auto">
          <Link
            href="/"
            data-cursor="Return"
            className="glass flex items-center gap-2 rounded-full px-4 py-2 text-xs font-mono text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Portfolio
          </Link>

          <div className="glass rounded-full p-1 flex items-center gap-1">
            <ThemeToggle />
          </div>
        </div>

        {/* Login Box */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="hud-frame card relative w-full max-w-md overflow-hidden p-8 sm:p-10 shadow-glass"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-accent">
              <ShieldCheck className="h-4 w-4" />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
                // sys · authenticate
              </span>
            </div>
            <span className="font-mono text-[10px] text-zinc-400">v2.4</span>
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            Admin Console<span className="text-gradient">.</span>
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Enter authorized credentials to manage portfolio deployments, credentials and telemetry.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-600 dark:text-rose-400 font-mono"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <div>
              <label
                htmlFor="username"
                className="block font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5"
              >
                Username
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400">
                  <User className="h-4 w-4" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter administrator ID"
                  className="w-full rounded-2xl border border-black/10 bg-black/[0.02] py-3 pl-10 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 transition focus:border-accent focus:bg-white focus:outline-none focus:ring-1 focus:ring-accent dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-zinc-500 dark:focus:bg-ink-900"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5"
              >
                Access Key
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-2xl border border-black/10 bg-black/[0.02] py-3 pl-10 pr-11 text-sm text-zinc-900 placeholder:text-zinc-400 transition focus:border-accent focus:bg-white focus:outline-none focus:ring-1 focus:ring-accent dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-zinc-500 dark:focus:bg-ink-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                data-cursor="Authorize"
                className="btn btn-primary w-full h-12 gap-2 text-sm font-medium shadow-glow disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Authenticating...
                  </>
                ) : (
                  <>
                    Verify & Enter Console <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Telemetry info footer */}
          <div className="mt-8 border-t border-black/[0.06] dark:border-white/[0.06] pt-4 flex items-center justify-between font-mono text-[10px] text-zinc-400">
            <span>PORTAL: HTTPS // SECURE</span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> ACTIVE
            </span>
          </div>
        </motion.div>
      </div>
    </>
  );
}

// Bypass standard layout wrapper
LoginPage.getLayout = function getLayout(page) {
  return page;
};
