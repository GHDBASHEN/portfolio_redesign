import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BadgeCheck, ExternalLink, Maximize2, Trophy } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import SmartImage from '@/components/ui/SmartImage';
import SectionHeading from '@/components/ui/SectionHeading';

const formatDate = (value) => {
  if (!value) return '';
  const d = new Date(value);
  return Number.isNaN(d.getTime())
    ? String(value)
    : d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
};

// UI-layer adapters: the schemas stay untouched
const fromCertificate = (c) => ({
  id: c._id, kind: 'certificate', title: c.title, org: c.issuer, date: formatDate(c.issueDate),
  description: c.description, imageUrl: c.imageUrl, link: c.certificateUrl,
});
const fromAward = (a) => ({
  id: a._id, kind: 'award', title: a.title, org: a.organization, date: a.year ? String(a.year) : '',
  description: a.description, imageUrl: a.imageUrl, link: null,
});

export default function CredentialsSection({ certificates = [], awards = [] }) {
  const [tab, setTab] = useState('certificates');
  const [selected, setSelected] = useState(null);
  const close = useCallback(() => setSelected(null), []);

  const tabs = [
    { id: 'certificates', label: 'Certificates', icon: BadgeCheck, count: certificates.length },
    { id: 'awards', label: 'Awards', icon: Trophy, count: awards.length },
  ];
  const items = useMemo(
    () => (tab === 'certificates' ? certificates.map(fromCertificate) : awards.map(fromAward)),
    [tab, certificates, awards]
  );

  return (
    <section id="credentials" className="section">
      <SectionHeading
        index="04"
        eyebrow="Credentials"
        title="Certified. Recognised."
        description="Select any entry to preview the original."
      />

      <div role="tablist" className="glass mb-10 inline-flex rounded-full p-1">
        {tabs.map(({ id, label, icon: Icon, count }) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors ${
              tab === id ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            {tab === id && (
              <motion.span
                layoutId="cred-tab"
                className="absolute inset-0 rounded-full bg-white shadow-sm ring-1 ring-zinc-900/10 dark:bg-white/10 dark:ring-white/15"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <Icon className="relative h-4 w-4" />
            <span className="relative">{label}</span>
            <span className="relative font-mono text-[11px] text-zinc-400">{count}</span>
          </button>
        ))}
      </div>

      <div className="relative">
        <div
          aria-hidden
          className="absolute bottom-4 left-[11px] top-4 w-px bg-gradient-to-b from-accent/70 via-zinc-900/10 to-transparent dark:via-white/10 sm:left-[15px]"
        />
        <AnimatePresence mode="wait">
          <motion.ol
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            {items.length === 0 && <li className="pl-10 text-zinc-500 sm:pl-12">Nothing here yet.</li>}
            {items.map((it, i) => (
              <motion.li
                key={it.id}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.05, 0.4), duration: 0.5 }}
                className="relative pl-10 sm:pl-12"
              >
                <span className="absolute left-[6px] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-accent bg-zinc-50 shadow-[0_0_12px_rgb(var(--accent)/0.7)] dark:bg-ink-950 sm:left-[10px]" />
                <button
                  onClick={() => setSelected(it)}
                  className="card group flex w-full items-center gap-4 p-3 text-left transition-colors duration-300 hover:border-accent/40 sm:gap-5 sm:p-4"
                >
                  <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-ink-800 sm:h-20 sm:w-28">
                    {it.imageUrl && (
                      <SmartImage src={it.imageUrl} alt="" fill sizes="112px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[11px] text-zinc-500">{it.date}</p>
                    <h3 className="mt-0.5 truncate font-semibold">{it.title}</h3>
                    <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">{it.org}</p>
                  </div>
                  <Maximize2 className="mr-2 h-4 w-4 shrink-0 text-zinc-400 transition-colors group-hover:text-accent" />
                </button>
              </motion.li>
            ))}
          </motion.ol>
        </AnimatePresence>
      </div>

      <Modal open={!!selected} onClose={close} labelledBy="cred-title">
        {selected && (
          <>
            {selected.imageUrl && (
              <div className="bg-zinc-100 dark:bg-black/40">
                <SmartImage
                  src={selected.imageUrl}
                  alt={selected.title}
                  width={1600}
                  height={1100}
                  sizes="(min-width: 1024px) 56rem, 95vw"
                  className="mx-auto h-auto max-h-[60vh] w-auto object-contain"
                />
              </div>
            )}
            <div className="p-6 sm:p-8">
              <p className="eyebrow">{selected.kind} · {selected.date}</p>
              <h3 id="cred-title" className="mt-2 text-2xl font-semibold tracking-tight">{selected.title}</h3>
              <p className="mt-1 text-zinc-500 dark:text-zinc-400">{selected.org}</p>
              {selected.description && (
                <p className="mt-4 leading-relaxed text-zinc-700 dark:text-zinc-300">{selected.description}</p>
              )}
              {selected.link && (
                <a href={selected.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-6 h-11">
                  Verify credential <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </>
        )}
      </Modal>
    </section>
  );
}
