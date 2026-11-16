import Reveal from './Reveal';
import ScrambleText from './ScrambleText';

export default function SectionHeading({ index, eyebrow, title, description }) {
  return (
    <Reveal className="mb-14 max-w-2xl">
      <p className="eyebrow flex items-center gap-3">
        <span className="text-accent">{index}</span>
        <span className="h-px w-8 bg-current opacity-30" />
        <ScrambleText text={eyebrow} trigger="view" />
      </p>
      <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">{title}</h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}
