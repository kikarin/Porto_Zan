import Reveal from "./Reveal";

type SectionHeaderProps = {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  aside?: React.ReactNode;
};

export default function SectionHeader({ index, eyebrow, title, description, aside }: SectionHeaderProps) {
  return (
    <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-[1fr_auto] md:items-end">
      <Reveal>
        <span className="eyebrow">
          <span className="text-accent-600">{index}</span>
          <span className="h-px w-8 bg-ink/20" />
          {eyebrow}
        </span>
        <h2 className="section-title mt-5">{title}</h2>
        {description && (
          <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-ink-muted">{description}</p>
        )}
      </Reveal>
      {aside && <Reveal delay={0.1}>{aside}</Reveal>}
    </div>
  );
}
