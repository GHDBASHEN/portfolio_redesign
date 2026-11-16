import { ArrowUpRight, ImageOff } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import TiltCard from '@/components/ui/TiltCard';
import SmartImage from '@/components/ui/SmartImage';
import SectionHeading from '@/components/ui/SectionHeading';

const hostOf = (url) => {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return null; }
};

function ProjectCard({ project, index, featured }) {
  const host = hostOf(project.projectUrl);
  const tags = Array.isArray(project.tags) ? project.tags : []; // optional, additive field
  const year = project.createdAt ? new Date(project.createdAt).getFullYear() : null;

  return (
    <Reveal delay={(index % 2) * 0.08} className={featured ? 'md:col-span-2' : ''}>
      <TiltCard className="card overflow-hidden" max={featured ? 3.5 : 6}>
        <article className={`flex h-full flex-col ${featured ? 'md:grid md:grid-cols-[1.35fr_1fr]' : ''}`}>
          <a
            href={project.projectUrl || '#'}
            target={project.projectUrl ? '_blank' : undefined}
            rel={project.projectUrl ? 'noopener noreferrer' : undefined}
            data-cursor="Visit"
            className="block"
          >
            <div
              className={`relative overflow-hidden bg-eco-200 dark:bg-ink-800 ${
                featured ? 'aspect-[16/10] md:aspect-auto md:min-h-[24rem]' : 'aspect-[16/10]'
              }`}
            >
              {project.imageUrl ? (
                <SmartImage
                  src={project.imageUrl}
                  alt={`${project.name} preview`}
                  fill
                  sizes={featured ? '(min-width: 768px) 60vw, 100vw' : '(min-width: 768px) 50vw, 100vw'}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  priority={index === 0}
                />
              ) : (
                <div className="grid h-full place-items-center text-zinc-400"><ImageOff className="h-6 w-6" /></div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono text-[11px] text-white backdrop-blur">
                {String(index + 1).padStart(2, '0')}{featured && ' · Featured'}
              </span>
            </div>
          </a>

          <div className="flex flex-1 flex-col p-6 sm:p-7">
            <div className="flex items-center justify-between gap-3 font-mono text-[11px] text-zinc-500">
              <span className="truncate">{host ?? 'project'}</span>
              {year && <span>{year}</span>}
            </div>
            <h3 className={`mt-3 font-semibold tracking-tight ${featured ? 'text-2xl' : 'text-xl'}`}>{project.name}</h3>
            <p className={`mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 ${featured ? 'line-clamp-5' : 'line-clamp-3'}`}>
              {project.description}
            </p>
            {tags.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {tags.map((t) => <li key={t} className="chip">{t}</li>)}
              </ul>
            )}
            {project.projectUrl && (
              <div className="mt-auto pt-6">
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-accent"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  Visit live deployment
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            )}
          </div>
        </article>
      </TiltCard>
    </Reveal>
  );
}

export default function ProjectsSection({ projects = [] }) {
  return (
    <section id="projects" className="section">
      <SectionHeading
        index="03"
        eyebrow="Selected Work"
        title="Projects in production."
        description="Real deployments — ordered exactly as curated in the admin dashboard."
      />
      {projects.length === 0 ? (
        <p className="card p-10 text-center text-zinc-500">Projects are on their way.</p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p._id} project={p} index={i} featured={i === 0} />
          ))}
        </div>
      )}
    </section>
  );
}
