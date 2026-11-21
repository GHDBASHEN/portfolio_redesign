import { useState } from 'react';
import {
  ArrowUpRight,
  ChevronDown,
  Code2,
  ImageOff,
  Layers,
  Play,
  RotateCcw,
  RotateCw,
  Sparkles,
} from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import TiltCard from '@/components/ui/TiltCard';
import SmartImage from '@/components/ui/SmartImage';
import SectionHeading from '@/components/ui/SectionHeading';
import Magnetic from '@/components/ui/Magnetic';

const hostOf = (url) => {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return null; }
};

function ProjectStatusBadge({ status = 'Live' }) {
  if (status === 'Ongoing') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/35 bg-black/60 px-3 py-1 font-mono text-[11px] font-medium text-amber-300 backdrop-blur shadow-sm">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
        </span>
        Ongoing
      </span>
    );
  }

  if (status === 'Done (Not Hosted)') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 font-mono text-[11px] font-medium text-zinc-300 backdrop-blur shadow-sm">
        <span className="h-2 w-2 rounded-full bg-zinc-400" />
        Done · Not Hosted
      </span>
    );
  }

  // Default: Live
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/35 bg-black/60 px-3 py-1 font-mono text-[11px] font-medium text-emerald-400 backdrop-blur shadow-sm">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      Live
    </span>
  );
}

function ProjectCard({ project, index, featured }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const status = project.status || 'Live';
  const hasProjectUrl = Boolean(project.projectUrl && project.projectUrl.trim() !== '' && project.projectUrl !== '#');
  const hasVideoUrl = Boolean(project.videoUrl && project.videoUrl.trim() !== '');
  const primaryUrl = hasProjectUrl ? project.projectUrl : (hasVideoUrl ? project.videoUrl : null);

  const host = hasProjectUrl ? hostOf(project.projectUrl) : (hasVideoUrl ? hostOf(project.videoUrl) : null);
  const tags = Array.isArray(project.tags) ? project.tags : [];
  const techStack = Array.isArray(project.techStack) && project.techStack.length > 0
    ? project.techStack
    : (tags.length > 0 ? tags : []);
  const contribution = project.contribution || '';
  const year = project.createdAt ? new Date(project.createdAt).getFullYear() : null;

  return (
    <Reveal delay={(index % 2) * 0.08} className={featured ? 'md:col-span-2' : ''}>
      <div className="relative h-full w-full [perspective:1400px]">
        <div
          className="relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] [transform-style:preserve-3d]"
          style={{
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Front Face */}
          <div
            className="h-full w-full [backface-visibility:hidden] [-webkit-backface-visibility:hidden]"
            style={{ pointerEvents: isFlipped ? 'none' : 'auto' }}
          >
            <TiltCard className="card overflow-hidden h-full" max={featured ? 3.5 : 6} disabled={isFlipped}>
              <article className={`flex h-full flex-col ${featured ? 'md:grid md:grid-cols-2' : ''}`}>
                {/* Thumbnail preview */}
                {primaryUrl ? (
                  <a
                    href={primaryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor={hasProjectUrl ? (status === 'Live' ? 'Visit' : 'Open') : 'Watch'}
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono text-[11px] text-white backdrop-blur">
                        {String(index + 1).padStart(2, '0')}{featured && ' · Featured'}
                      </span>

                      {/* Status indicator badge */}
                      <div className="absolute right-4 top-4">
                        <ProjectStatusBadge status={status} />
                      </div>
                    </div>
                  </a>
                ) : (
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
                        className="object-cover"
                        priority={index === 0}
                      />
                    ) : (
                      <div className="grid h-full place-items-center text-zinc-400"><ImageOff className="h-6 w-6" /></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono text-[11px] text-white backdrop-blur">
                      {String(index + 1).padStart(2, '0')}{featured && ' · Featured'}
                    </span>

                    {/* Status indicator badge */}
                    <div className="absolute right-4 top-4">
                      <ProjectStatusBadge status={status} />
                    </div>
                  </div>
                )}

                {/* Details & actions */}
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-3 font-mono text-[11px] text-zinc-500">
                    <span className="truncate">{host ?? (status === 'Done (Not Hosted)' ? 'completed' : 'project')}</span>
                    {year && <span>{year}</span>}
                  </div>

                  <h3 className={`mt-3 font-semibold tracking-tight ${featured ? 'text-2xl' : 'text-xl'}`}>
                    {project.name}
                  </h3>

                  <p className={`mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 ${featured ? 'line-clamp-5' : 'line-clamp-3'}`}>
                    {project.description}
                  </p>

                  {tags.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {tags.map((t) => <li key={t} className="chip">{t}</li>)}
                    </ul>
                  )}

                  {/* Actions footer */}
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-2.5 pt-6 border-t border-zinc-900/[0.06] dark:border-white/[0.06]">
                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                      {hasProjectUrl && (
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor={status === 'Live' ? 'Visit' : 'Open'}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium transition-colors hover:text-accent shrink-0"
                        >
                          {status === 'Live' && (
                            <span className="relative flex h-2 w-2">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                            </span>
                          )}
                          <span>
                            {status === 'Live'
                              ? 'Visit live'
                              : status === 'Ongoing'
                              ? 'Ongoing build'
                              : 'View project'}
                          </span>
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </a>
                      )}

                      {hasVideoUrl && (
                        <a
                          href={project.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="Play Demo"
                          className="btn btn-ghost inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-accent hover:border-accent/40 hover:bg-accent/10 shrink-0"
                        >
                          <Play className="h-3 w-3 fill-current" />
                          <span>Watch Demo</span>
                        </a>
                      )}
                    </div>

                    {/* Turn back button */}
                    <button
                      type="button"
                      onClick={() => setIsFlipped(true)}
                      data-cursor="Details"
                      className="btn btn-ghost inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:text-accent dark:hover:text-accent hover:border-accent/40 hover:bg-accent/10 transition-colors shrink-0 whitespace-nowrap"
                      aria-label={`View tech stack and contribution for ${project.name}`}
                    >
                      <Layers className="h-3.5 w-3.5 text-accent" />
                      <span>Tech &amp; Contribution</span>
                      <RotateCw className="h-3 w-3 opacity-60 transition-transform duration-300 group-hover:rotate-45" />
                    </button>
                  </div>
                </div>
              </article>
            </TiltCard>
          </div>

          {/* Back Face */}
          <div
            className="absolute inset-0 h-full w-full [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)]"
            style={{ pointerEvents: isFlipped ? 'auto' : 'none' }}
          >
            <div className="card h-full overflow-hidden flex flex-col bg-eco-100/95 dark:bg-ink-900/95 backdrop-blur-xl border border-black/[0.08] dark:border-white/10 shadow-2xl">
              {/* Back Header */}
              <div className="flex items-center justify-between gap-4 p-5 sm:p-6 border-b border-zinc-900/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02] shrink-0">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="eyebrow text-accent flex items-center gap-1.5 text-[10px]">
                      <Layers className="h-3 w-3" /> Tech Stack &amp; Contribution
                    </span>
                    <span className="text-zinc-400">·</span>
                    <span className="font-mono text-[11px] text-zinc-500">{year || 'Project'}</span>
                  </div>
                  <h3 className="mt-1 font-semibold tracking-tight text-lg sm:text-xl text-zinc-900 dark:text-zinc-100 truncate">
                    {project.name}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setIsFlipped(false)}
                  data-cursor="Flip Back"
                  className="btn btn-ghost inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-accent hover:border-accent/40 hover:bg-accent/10 transition-colors shrink-0"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Overview</span>
                </button>
              </div>

              {/* Back Content Scrollable Area */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
                <div className={featured ? 'md:grid md:grid-cols-2 md:gap-8 space-y-6 md:space-y-0' : 'space-y-6'}>
                  {/* Tech Stack */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Code2 className="h-4 w-4 text-accent" />
                      <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                        Tech Stack &amp; Tools
                      </h4>
                    </div>

                    {techStack.length > 0 ? (
                      <ul className="flex flex-wrap gap-2">
                        {techStack.map((tech) => (
                          <li
                            key={tech}
                            className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/5 px-3 py-1 font-mono text-[11px] font-medium text-zinc-800 dark:text-zinc-200"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                            {tech}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-zinc-500 italic">No specific tech stack listed yet.</p>
                    )}
                  </div>

                  {/* Contribution */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="h-4 w-4 text-accent" />
                      <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                        My Contribution &amp; Responsibilities
                      </h4>
                    </div>

                    {contribution && contribution.trim() !== '' ? (
                      <div className="space-y-2.5 text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                        {contribution
                          .split('\n')
                          .map((line) => line.trim())
                          .filter(Boolean)
                          .map((line, idx) => (
                            <div key={idx} className="flex items-start gap-2.5">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                              <span className="flex-1">{line.replace(/^[-*•]\s*/, '')}</span>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <p className="text-xs text-zinc-500 italic">
                        Contribution details being updated in admin.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Back Footer */}
              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5 border-t border-zinc-900/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02] shrink-0">
                <div className="flex flex-wrap items-center gap-4">
                  {hasProjectUrl && (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-accent dark:hover:text-accent transition-colors"
                    >
                      <span>Visit deployment</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {hasVideoUrl && (
                    <a
                      href={project.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-accent hover:border-accent/40 hover:bg-accent/10"
                    >
                      <Play className="h-3 w-3 fill-current" />
                      <span>Watch Demo</span>
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setIsFlipped(false)}
                  data-cursor="Flip Back"
                  className="btn btn-ghost inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors shrink-0"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Flip back</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function ProjectsSection({ projects = [] }) {
  const [showAll, setShowAll] = useState(false);
  const hasMore = projects.length > 3;
  const displayedProjects = showAll || !hasMore ? projects : projects.slice(0, 3);

  const handleToggle = () => {
    if (showAll) {
      const el = document.getElementById('projects');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setShowAll((prev) => !prev);
  };

  return (
    <section id="projects" className="section">
      <SectionHeading
        index="03"
        eyebrow="Selected Work"
        title="Projects & deployments."
        description="Live production systems, ongoing builds, and specialized engineering works."
      />
      {projects.length === 0 ? (
        <p className="card p-10 text-center text-zinc-500">Projects are on their way.</p>
      ) : (
        <>
          <div className="grid gap-5 md:grid-cols-2">
            {displayedProjects.map((p, i) => (
              <ProjectCard key={p._id || i} project={p} index={i} featured={i === 0} />
            ))}
          </div>

          {hasMore && (
            <div className="mt-10 flex justify-center">
              <Magnetic strength={0.25}>
                <button
                  type="button"
                  onClick={handleToggle}
                  data-cursor={showAll ? 'Collapse' : 'See More'}
                  className="btn btn-ghost group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all hover:border-accent/40 hover:bg-accent/10 hover:text-accent shadow-sm"
                  aria-expanded={showAll}
                >
                  <span>{showAll ? 'See less' : 'See more'}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-y-0.5 ${
                      showAll ? 'rotate-180 group-hover:-translate-y-0.5' : ''
                    }`}
                  />
                </button>
              </Magnetic>
            </div>
          )}
        </>
      )}
    </section>
  );
}
