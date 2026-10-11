"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  PiArrowUpRightBold,
  PiArrowRightBold,
  PiGithubLogoBold,
  PiDownloadSimpleBold,
  PiLockSimpleBold,
} from "react-icons/pi";
import type { Project } from "@/lib/projectService";
import { getProjectCategoryMeta } from "@/lib/projectCategories";

const TINTS = ["#ecdcc8", "#f3d6c4", "#e2dccf", "#efe3cf", "#e8d2c0", "#dcd3c3"];
const tintFor = (i: number) => TINTS[i % TINTS.length];
const pad = (n: number) => String(n).padStart(2, "0");

type YearLookup = (project: Project) => string | null;

const ctaBase = "btn !px-4 !py-2 text-sm";

export function ProjectCTA({ cta }: { cta: Project["cta"] }) {
  if (!cta) return null;
  switch (cta.type) {
    case "live":
    case "visit":
      return (
        <a href={cta.link} target="_blank" rel="noopener noreferrer" className={`${ctaBase} group/cta bg-ink text-canvas hover:bg-accent`}>
          {cta.label}
          <PiArrowUpRightBold className="transition-transform duration-300 group-hover/cta:rotate-45" />
        </a>
      );
    case "github":
      return (
        <a href={cta.link} target="_blank" rel="noopener noreferrer" className={`${ctaBase} bg-transparent text-ink ring-1 ring-ink/15 hover:bg-ink hover:text-canvas`}>
          <PiGithubLogoBold />
          {cta.label}
        </a>
      );
    case "download":
      return (
        <a href={cta.link} download className={`${ctaBase} bg-transparent text-ink ring-1 ring-ink/15 hover:bg-ink hover:text-canvas`}>
          <PiDownloadSimpleBold />
          {cta.label}
        </a>
      );
    case "private":
      return (
        <span className="inline-flex items-center gap-1.5 text-sm text-ink-faint" title="Kode dan demo tidak dipublikasikan">
          <PiLockSimpleBold />
          {cta.label}
        </span>
      );
    default:
      return null;
  }
}

export function GroupLabel({ index, title, note }: { index: string; title: string; note?: string }) {
  return (
    <div className="mb-8 flex items-baseline gap-4">
      <span className="font-mono text-xs tabular-nums text-accent-600">{index}</span>
      <h3 className="font-display text-xl font-semibold italic tracking-[-0.02em] text-ink">{title}</h3>
      <span className="h-px flex-1 translate-y-[-0.3em] bg-ink/15" />
      {note && <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">{note}</span>}
    </div>
  );
}

/* Highlights: split cards that stick and stack while scrolling */
function StackCard({
  project,
  index,
  total,
  progress,
  getYear,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  getYear: YearLookup;
}) {
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const year = getYear(project);

  return (
    <div className="sticky top-24 md:top-28" style={{ paddingTop: `${index * 1.25}rem` }}>
      <motion.article
        style={{ scale, backgroundColor: tintFor(index) }}
        className="grid origin-top overflow-hidden rounded-[2rem] shadow-lift md:h-[min(76dvh,600px)] md:grid-cols-[0.9fr_1.1fr] md:rounded-[2.5rem]"
      >
        <div className="flex flex-col p-7 md:p-12">
          <div className="flex items-center gap-3 font-mono text-xs tabular-nums text-ink-muted">
            <span>{pad(index + 1)} / {pad(total)}</span>
            <span className="h-px w-6 bg-ink/20" />
            <span className="uppercase tracking-[0.14em]">{getProjectCategoryMeta(project.category).label}</span>
            {year && <span className="ml-auto rotate-[-4deg] rounded-md bg-accent px-2 py-0.5 font-semibold text-white">{year}</span>}
          </div>
          <h3 className="mt-6 font-display text-4xl font-semibold leading-[0.95] tracking-[-0.045em] text-ink text-balance md:text-6xl">
            {project.title}
          </h3>
          <p className="mt-5 line-clamp-3 max-w-[45ch] text-ink-soft">{project.description}</p>
          {project.techIcons?.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-3 md:mt-auto md:pt-8" aria-label="Tech stack">
              {project.techIcons.slice(0, 6).map((icon, i) => (
                <li
                  key={i}
                  className="grid h-12 w-12 place-items-center rounded-2xl bg-canvas/70 p-2.5 transition-transform duration-300 ease-spring hover:-rotate-6 hover:scale-110 md:h-14 md:w-14 md:p-3"
                >
                  <Image src={icon} alt="" width={36} height={36} className="h-full w-full object-contain" />
                </li>
              ))}
            </ul>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href={`/projects/${project.id}`} prefetch className="btn btn-primary">
              Lihat case study <PiArrowUpRightBold />
            </Link>
            <ProjectCTA cta={project.cta} />
          </div>
        </div>
        <Link
          href={`/projects/${project.id}`}
          data-cursor="View"
          aria-label={`Buka ${project.title}`}
          className="group relative order-first block aspect-[16/10] md:order-none md:aspect-auto"
        >
          <div className="absolute inset-4 overflow-hidden rounded-2xl shadow-lift md:inset-y-10 md:-right-10 md:left-0 md:rounded-l-3xl md:rounded-r-none">
            <Image
              src={project.img}
              alt={`Tampilan project ${project.title}`}
              fill
              className="object-cover object-left-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 700px"
              priority={index === 0}
            />
          </div>
        </Link>
      </motion.article>
    </div>
  );
}

export function ProjectStack({ projects, getYear }: { projects: Project[]; getYear: YearLookup }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className="relative space-y-8 md:space-y-16">
      {projects.map((p, i) => (
        <StackCard key={p.id} project={p} index={i} total={projects.length} progress={scrollYProgress} getYear={getYear} />
      ))}
    </div>
  );
}

/* More work: big rows, screenshot follows the cursor on hover */
export function ProjectList({ projects, startIndex, getYear }: { projects: Project[]; startIndex: number; getYear: YearLookup }) {
  const [active, setActive] = useState<number | null>(null);
  const x = useSpring(0, { stiffness: 220, damping: 24 });
  const y = useSpring(0, { stiffness: 220, damping: 24 });

  return (
    <div
      onMouseMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
    >
      <ul className="border-t border-ink/15">
        {projects.map((p, i) => {
          const year = getYear(p);
          return (
            <li
              key={p.id}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-ink/15 py-6 md:grid-cols-[4rem_1fr_13rem_auto] md:gap-6 md:py-7"
            >
              <Link
                href={`/projects/${p.id}`}
                prefetch
                aria-label={`Buka ${p.title}`}
                className="relative block h-14 w-20 overflow-hidden rounded-lg bg-sand md:hidden"
              >
                <Image src={p.img} alt="" fill className="object-cover" sizes="80px" />
              </Link>
              <Link
                href={`/projects/${p.id}`}
                prefetch
                className="hidden font-mono text-sm tabular-nums text-ink-faint transition-colors group-hover:text-accent-600 md:block"
              >
                {pad(startIndex + i + 1)}
              </Link>
              <Link href={`/projects/${p.id}`} prefetch className="col-span-2 min-w-0 md:col-span-1">
                <span className="block font-display text-2xl font-semibold tracking-[-0.04em] text-ink transition-transform duration-500 ease-spring group-hover:translate-x-3 md:text-5xl">
                  {p.title}
                </span>
                <span className="mt-1.5 block font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted transition-transform delay-75 duration-500 ease-spring group-hover:translate-x-3">
                  {getProjectCategoryMeta(p.category).label}
                  {year && ` · ${year}`}
                </span>
              </Link>
              <Link href={`/projects/${p.id}`} prefetch className="hidden items-center gap-2.5 md:flex">
                {p.techIcons?.slice(0, 5).map((icon, k) => (
                  <Image
                    key={k}
                    src={icon}
                    alt=""
                    width={28}
                    height={28}
                    className="h-7 w-7 object-contain grayscale transition duration-300 group-hover:grayscale-0"
                  />
                ))}
              </Link>
              <span className="col-span-3 flex items-center justify-end gap-3 md:col-span-1">
                <ProjectCTA cta={p.cta} />
                <Link
                  href={`/projects/${p.id}`}
                  prefetch
                  aria-label={`Buka case study ${p.title}`}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full ring-1 ring-ink/15 transition-all duration-300 group-hover:rotate-45 group-hover:bg-accent group-hover:text-white group-hover:ring-accent"
                >
                  <PiArrowUpRightBold />
                </Link>
              </span>
            </li>
          );
        })}
      </ul>

      <motion.div aria-hidden style={{ x, y }} className="pointer-events-none fixed left-0 top-0 z-overlay hidden md:block">
        <AnimatePresence>
          {active !== null && projects[active] && (
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: -4 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 4 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="relative -ml-40 -mt-28 aspect-[16/10] w-80 overflow-hidden rounded-2xl shadow-lift ring-4 ring-canvas"
            >
              <Image src={projects[active].img} alt="" fill className="object-cover" sizes="320px" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/* Archive: screenshot in a tilted browser frame, icons in a magnifying dock */
function DockIcon({ src, mouseX }: { src: string; mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLLIElement>(null);
  const distance = useTransform(mouseX, (mx) => {
    const b = ref.current?.getBoundingClientRect();
    return b ? mx - b.left - b.width / 2 : 999;
  });
  const size = useSpring(useTransform(distance, [-110, 0, 110], [40, 60, 40]), { stiffness: 300, damping: 20 });
  return (
    <motion.li ref={ref} style={{ width: size, height: size }} className="grid place-items-center rounded-2xl bg-canvas/90 p-2 shadow-soft">
      <Image src={src} alt="" width={48} height={48} className="h-full w-full object-contain" />
    </motion.li>
  );
}

export function DeviceCard({ project, index, getYear }: { project: Project; index: number; getYear: YearLookup }) {
  const mouseX = useMotionValue(Infinity);
  const year = getYear(project);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ type: "spring", stiffness: 160, damping: 20 }}
      className="group flex flex-col"
    >
      <Link
        href={`/projects/${project.id}`}
        prefetch
        data-cursor="View"
        className="relative block overflow-hidden rounded-[2rem] px-6 pb-20 pt-8"
        style={{ backgroundColor: tintFor(index) }}
      >
        <span className="pointer-events-none absolute -right-4 -top-8 font-display text-[9rem] font-bold leading-none tracking-[-0.06em] text-ink/[0.06]">
          {pad(index + 1)}
        </span>
        <div className="relative mx-auto rotate-[-2.5deg] overflow-hidden rounded-xl bg-canvas shadow-lift ring-1 ring-ink/10 transition-transform duration-500 ease-spring group-hover:-translate-y-2 group-hover:rotate-0">
          <div className="flex items-center gap-1.5 border-b border-ink/10 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-ink/20" />
            <span className="h-2 w-2 rounded-full bg-ink/20" />
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="ml-2 min-w-0 truncate rounded-md bg-sand px-2 py-0.5 font-mono text-[10px] text-ink-muted">
              {project.title.toLowerCase().replace(/\s+/g, "-")}.app
            </span>
            {year && <span className="ml-auto shrink-0 font-mono text-[10px] tabular-nums text-ink-muted">{year}</span>}
          </div>
          <div className="relative aspect-[16/10] bg-sand">
            <Image
              src={project.img}
              alt={`Tampilan project ${project.title}`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        </div>
      </Link>

      {project.techIcons?.length > 0 && (
        <ul
          aria-label="Tech stack"
          onMouseMove={(e) => mouseX.set(e.clientX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="relative z-raised mx-auto -mt-10 flex h-[4.5rem] max-w-full items-end gap-2 rounded-3xl bg-white/60 px-3 pb-2 shadow-lift ring-1 ring-white/70 backdrop-blur-md"
        >
          {project.techIcons.slice(0, 6).map((icon, i) => (
            <DockIcon key={i} src={icon} mouseX={mouseX} />
          ))}
        </ul>
      )}

      <div className="flex flex-1 flex-col px-2 pt-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">{getProjectCategoryMeta(project.category).label}</p>
        <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.03em] text-ink">{project.title}</h3>
        <p className="mt-2 line-clamp-2 text-ink-muted">{project.description}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
          <ProjectCTA cta={project.cta} />
          <Link
            href={`/projects/${project.id}`}
            prefetch
            className="group/link ml-auto inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-accent-600"
          >
            See details
            <PiArrowRightBold className="transition-transform duration-300 ease-spring group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
