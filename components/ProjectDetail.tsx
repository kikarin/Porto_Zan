"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  PiArrowLeftBold,
  PiArrowRightBold,
  PiCaretLeftBold,
  PiCaretRightBold,
  PiXBold,
  PiCalendarBlankBold,
  PiImagesBold,
  PiStackBold,
  PiArrowUpRightBold,
  PiMagnifyingGlassPlusBold,
  PiFolderDashedBold,
} from "react-icons/pi";
import Container from "./Container";
import Reveal from "./ui/Reveal";
import Magnetic from "./ui/Magnetic";
import type { ProjectDetail } from "../lib/projectDetailService";

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("id-ID", { month: "long", year: "numeric" });
}

function SpinningBadge() {
  return (
    <motion.div
      aria-hidden
      animate={{ rotate: 360 }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      className="relative h-28 w-28 shrink-0 md:h-32 md:w-32"
    >
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-ink font-mono text-[9.5px] uppercase tracking-[0.3em]">
          <textPath href="#badge-circle">case study · case study · case study ·</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 m-auto grid h-10 w-10 place-items-center rounded-full bg-accent text-white">
        <PiArrowUpRightBold />
      </span>
    </motion.div>
  );
}

export default function ProjectDetail({
  projectDetail,
  allProjectIds,
}: {
  projectDetail: ProjectDetail | null;
  allProjectIds: string[];
}) {
  const images: string[] = Array.isArray(projectDetail?.images) ? projectDetail!.images : [];

  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const isModalOpen = modalIndex !== null;
  const modalImg =
    modalIndex !== null && modalIndex >= 0 && modalIndex < images.length ? images[modalIndex] : null;

  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  const resetTransform = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setLastPosition({ x: 0, y: 0 });
  }, []);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    let newScale = scale - e.deltaY * 0.001;
    newScale = Math.min(Math.max(newScale, 1), 3);
    setScale(newScale);
  };

  const handleDoubleClick = () => {
    if (scale > 1) resetTransform();
    else setScale(2);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    setLastPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setPosition({ x: e.clientX - lastPosition.x, y: e.clientY - lastPosition.y });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const touch = e.touches[0];
    setLastPosition({ x: touch.clientX - position.x, y: touch.clientY - position.y });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    setPosition({ x: touch.clientX - lastPosition.x, y: touch.clientY - lastPosition.y });
  };

  const handleTouchEnd = () => setIsDragging(false);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const openModal = useCallback(
    (idx: number) => {
      resetTransform();
      setModalIndex(idx);
    },
    [resetTransform]
  );

  const closeModal = useCallback(() => {
    setModalIndex(null);
    resetTransform();
  }, [resetTransform]);

  const showPrev = useCallback(() => {
    setModalIndex((prev) => {
      if (prev === null || prev <= 0) return prev;
      resetTransform();
      return prev - 1;
    });
  }, [resetTransform]);

  const showNext = useCallback(() => {
    setModalIndex((prev) => {
      if (prev === null || prev >= images.length - 1) return prev;
      resetTransform();
      return prev + 1;
    });
  }, [images.length, resetTransform]);

  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        showPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        showNext();
      } else if (e.key === "Escape") {
        e.preventDefault();
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, showPrev, showNext, closeModal]);

  if (!projectDetail) {
    return (
      <main className="flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center">
        <span className="grid h-20 w-20 place-items-center rounded-3xl bg-sand text-4xl text-ink-muted">
          <PiFolderDashedBold />
        </span>
        <h1 className="mt-8 font-display text-4xl font-semibold tracking-tight">Proyek tidak ditemukan</h1>
        <p className="mt-3 max-w-[42ch] text-lg text-ink-muted">
          Detail project ini belum tersedia atau link-nya sudah berubah.
        </p>
        <Link href="/#projects" className="btn-primary group mt-10">
          <PiArrowLeftBold className="transition-transform duration-300 group-hover:-translate-x-1" />
          Lihat semua project
        </Link>
      </main>
    );
  }

  const currentIndex = allProjectIds.indexOf(projectDetail.projectId);
  const nextId =
    currentIndex >= 0 && currentIndex < allProjectIds.length - 1 ? allProjectIds[currentIndex + 1] : null;
  const prevId = currentIndex > 0 ? allProjectIds[currentIndex - 1] : null;

  const hasPrev = modalIndex !== null && modalIndex > 0;
  const hasNext = modalIndex !== null && modalIndex < images.length - 1;
  const descriptionHasHtml = /<\/?[a-z][\s\S]*>/i.test(projectDetail.desc);
  const techIcons = Array.isArray(projectDetail.techIcons) ? projectDetail.techIcons : [];
  const dateLabel = projectDetail.date ? formatDate(projectDetail.date) : null;
  const counter =
    currentIndex >= 0
      ? `${String(currentIndex + 1).padStart(2, "0")} / ${String(allProjectIds.length).padStart(2, "0")}`
      : null;

  const bentoImages = images.slice(0, 3);
  const extraCount = images.length - bentoImages.length;
  const bentoLayout =
    images.length >= 3
      ? "md:grid-cols-3 md:grid-rows-2 md:aspect-[16/8]"
      : images.length === 2
        ? "md:grid-cols-2 md:aspect-[16/7]"
        : "md:aspect-[16/8]";

  return (
    <main className="min-h-[100dvh] pb-24 md:pb-32">
      <header className="sticky top-0 z-nav pt-4">
        <Container>
          <nav
            aria-label="Project navigation"
            className="flex items-center justify-between gap-3 rounded-full bg-white/75 p-1.5 shadow-soft ring-1 ring-ink/[0.06] backdrop-blur-xl"
          >
            <Link
              href="/#projects"
              className="group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-sand"
            >
              <PiArrowLeftBold className="transition-transform duration-300 ease-spring group-hover:-translate-x-1" />
              All work
            </Link>

            <div className="flex items-center gap-1.5">
              {counter && (
                <span className="hidden px-2 font-mono text-xs tabular-nums text-ink-muted sm:inline">{counter}</span>
              )}
              {prevId ? (
                <Link
                  href={`/projects/${prevId}`}
                  aria-label="Project sebelumnya"
                  className="grid h-10 w-10 place-items-center rounded-full bg-sand text-ink transition-all duration-300 ease-spring hover:-translate-x-0.5 hover:bg-ink hover:text-canvas"
                >
                  <PiCaretLeftBold />
                </Link>
              ) : (
                <span aria-hidden className="grid h-10 w-10 place-items-center rounded-full text-ink-faint/60">
                  <PiCaretLeftBold />
                </span>
              )}
              {nextId ? (
                <Link
                  href={`/projects/${nextId}`}
                  aria-label="Project berikutnya"
                  className="grid h-10 w-10 place-items-center rounded-full bg-ink text-canvas transition-all duration-300 ease-spring hover:translate-x-0.5 hover:bg-accent"
                >
                  <PiCaretRightBold />
                </Link>
              ) : (
                <span aria-hidden className="grid h-10 w-10 place-items-center rounded-full text-ink-faint/60">
                  <PiCaretRightBold />
                </span>
              )}
            </div>
          </nav>
        </Container>
      </header>

      <Container>
        <section className="flex flex-col gap-8 pb-12 pt-14 md:flex-row md:items-end md:justify-between md:pt-20">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="eyebrow"
            >
              <span className="text-accent-600">Case study</span>
              {dateLabel && (
                <>
                  <span className="h-px w-8 bg-ink/20" />
                  {dateLabel}
                </>
              )}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 90, damping: 16 }}
              className="mt-5 max-w-[18ch] font-display text-[clamp(2.75rem,7.5vw,6rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-ink"
            >
              {projectDetail.title}
            </motion.h1>

            {techIcons.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-2.5">
                {techIcons.map((icon, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    whileHover={{ y: -4, rotate: idx % 2 === 0 ? -8 : 8, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.25 + idx * 0.05 }}
                    className="grid h-14 w-14 place-items-center rounded-2xl bg-white p-3 shadow-soft ring-1 ring-ink/5"
                  >
                    <Image src={icon} alt="" width={36} height={36} className="h-full w-full object-contain" />
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 160, damping: 14 }}
            className="hidden md:block"
          >
            <SpinningBadge />
          </motion.div>
        </section>

        {images.length > 0 ? (
          <>
            <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:hidden">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => openModal(idx)}
                  aria-label={`Perbesar gambar ${idx + 1}`}
                  className="relative aspect-[4/3] w-[85%] shrink-0 snap-center overflow-hidden rounded-3xl bg-sand"
                >
                  <Image
                    src={img}
                    alt={`${projectDetail.title} — tampilan ${idx + 1}`}
                    fill
                    sizes="85vw"
                    className="object-cover"
                    priority={idx === 0}
                  />
                  <span className="absolute bottom-3 right-3 rounded-lg bg-white/90 px-2 py-1 font-mono text-[11px] tabular-nums text-ink">
                    {idx + 1}/{images.length}
                  </span>
                </button>
              ))}
            </div>

            <Reveal className={`hidden gap-4 md:grid ${bentoLayout}`}>
              {bentoImages.map((img, idx) => {
                const isMain = idx === 0 && images.length >= 3;
                const showExtra = idx === bentoImages.length - 1 && extraCount > 0;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => openModal(idx)}
                    data-cursor="Zoom"
                    aria-label={`Perbesar gambar ${idx + 1}`}
                    className={`group relative h-full min-h-0 overflow-hidden rounded-[2rem] bg-sand shadow-soft ring-1 ring-ink/5 ${
                      isMain ? "md:col-span-2 md:row-span-2" : ""
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${projectDetail.title} — tampilan ${idx + 1}`}
                      fill
                      sizes={isMain ? "(max-width: 1240px) 66vw, 820px" : "(max-width: 1240px) 33vw, 410px"}
                      className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]"
                      priority={idx === 0}
                    />
                    <span className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/15" />
                    {showExtra ? (
                      <span className="absolute inset-0 grid place-items-center bg-ink/55 backdrop-blur-[2px] transition-colors group-hover:bg-ink/65">
                        <span className="text-center text-canvas">
                          <span className="block font-display text-5xl font-semibold tracking-tight">+{extraCount}</span>
                          <span className="font-mono text-xs uppercase tracking-[0.14em] text-canvas/80">more shots</span>
                        </span>
                      </span>
                    ) : (
                      <span className="absolute bottom-4 right-4 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-white/90 text-ink opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <PiMagnifyingGlassPlusBold />
                      </span>
                    )}
                  </button>
                );
              })}
            </Reveal>
          </>
        ) : (
          <div className="flex flex-col items-center rounded-[2rem] border-2 border-dashed border-ink/10 py-16 text-center">
            <PiImagesBold className="text-3xl text-ink-faint" />
            <p className="mt-3 text-ink-muted">Belum ada screenshot untuk project ini.</p>
          </div>
        )}

        <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-[1fr_340px] lg:gap-20">
          <Reveal>
            <h2 className="eyebrow mb-6">
              <span className="text-accent-600">01</span>
              <span className="h-px w-8 bg-ink/20" />
              The story
            </h2>
            {descriptionHasHtml ? (
              <div
                className="project-description max-w-[68ch]"
                dangerouslySetInnerHTML={{ __html: projectDetail.desc }}
              />
            ) : (
              <p className="project-description max-w-[68ch] whitespace-pre-wrap">{projectDetail.desc}</p>
            )}
          </Reveal>

          <Reveal delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
            <aside className="space-y-4">
              <dl className="overflow-hidden rounded-[1.75rem] bg-white/70 ring-1 ring-ink/[0.06] backdrop-blur-sm">
                {[
                  { icon: PiCalendarBlankBold, label: "Timeline", value: dateLabel ?? "—" },
                  { icon: PiImagesBold, label: "Gallery", value: `${images.length} screenshot` },
                  { icon: PiStackBold, label: "Tech", value: `${techIcons.length} tools` },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="group flex items-center gap-4 border-b border-ink/[0.06] p-5 last:border-b-0"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-50 text-accent-600 transition-transform duration-300 ease-spring group-hover:-rotate-12 group-hover:scale-110">
                      <Icon />
                    </span>
                    <div>
                      <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">{label}</dt>
                      <dd className="font-medium capitalize text-ink">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>

              <div className="relative overflow-hidden rounded-[1.75rem] bg-sand p-6">
                <p className="relative font-display text-2xl font-semibold leading-tight tracking-tight">
                  Punya project serupa?
                </p>
                <p className="relative mt-2 text-sm text-ink-muted">
                  Ceritakan kebutuhan Anda, kita bahas bareng solusinya.
                </p>
                <Magnetic className="relative mt-5">
                  <Link href="/#contact" className="btn-accent group !px-5 !py-2.5 text-sm">
                    Ngobrol yuk
                    <PiArrowUpRightBold className="transition-transform duration-300 group-hover:rotate-45" />
                  </Link>
                </Magnetic>
              </div>
            </aside>
          </Reveal>
        </div>

        <nav aria-label="Project lain" className="mt-24 grid gap-4 border-t border-ink/10 pt-10 md:grid-cols-2">
          {[
            { id: prevId, dir: "prev" as const, label: "Previous project", empty: "Ini project pertama" },
            { id: nextId, dir: "next" as const, label: "Next project", empty: "Ini project terakhir" },
          ].map(({ id, dir, label, empty }) =>
            id ? (
              <Link
                key={dir}
                href={`/projects/${id}`}
                className={`group relative overflow-hidden rounded-[2rem] p-8 transition-colors duration-300 md:p-10 ${
                  dir === "next" ? "bg-ink text-canvas hover:bg-accent md:text-right" : "bg-white/70 ring-1 ring-ink/[0.06] hover:bg-white"
                }`}
              >
                <span className={`font-mono text-xs uppercase tracking-[0.14em] ${dir === "next" ? "text-canvas/60" : "text-ink-faint"}`}>
                  {label}
                </span>
                <span
                  className={`mt-3 flex items-center gap-4 font-display text-4xl font-semibold tracking-tight md:text-5xl ${
                    dir === "next" ? "md:justify-end" : ""
                  }`}
                >
                  {dir === "prev" && (
                    <PiArrowLeftBold className="transition-transform duration-500 ease-spring group-hover:-translate-x-2" />
                  )}
                  {dir === "prev" ? "Sebelumnya" : "Selanjutnya"}
                  {dir === "next" && (
                    <PiArrowRightBold className="transition-transform duration-500 ease-spring group-hover:translate-x-2" />
                  )}
                </span>
              </Link>
            ) : (
              <div
                key={dir}
                className={`rounded-[2rem] border-2 border-dashed border-ink/10 p-8 text-ink-faint md:p-10 ${
                  dir === "next" ? "md:text-right" : ""
                }`}
              >
                <span className="font-mono text-xs uppercase tracking-[0.14em]">{label}</span>
                <p className="mt-3 font-display text-2xl font-medium tracking-tight">{empty}</p>
              </div>
            )
          )}
        </nav>
      </Container>

      <AnimatePresence>
        {isModalOpen && modalImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${projectDetail.title} — gambar ${(modalIndex ?? 0) + 1}`}
            className="fixed inset-0 z-modal flex flex-col bg-ink/90 backdrop-blur-md"
            onClick={closeModal}
          >
            <div className="flex items-center justify-between gap-4 p-4 text-canvas md:p-6" onClick={(e) => e.stopPropagation()}>
              <p className="hidden font-mono text-xs text-canvas/60 md:block">
                Scroll untuk zoom · drag untuk geser · double click untuk reset
              </p>
              {images.length > 1 && modalIndex !== null && (
                <span className="font-mono text-sm tabular-nums">
                  {String(modalIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                </span>
              )}
              <button
                type="button"
                onClick={closeModal}
                aria-label="Tutup"
                className="grid h-12 w-12 place-items-center rounded-full bg-canvas text-lg text-ink transition-transform duration-300 ease-spring hover:rotate-90"
              >
                <PiXBold />
              </button>
            </div>

            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              className="relative mx-auto min-h-0 w-full max-w-7xl flex-1 overflow-hidden px-4 md:px-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="relative h-full w-full cursor-grab active:cursor-grabbing"
                style={{
                  transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
                  transformOrigin: "center center",
                  transition: isDragging ? "none" : "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onWheel={handleWheel}
                onDoubleClick={handleDoubleClick}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchEnd}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={modalIndex}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={modalImg}
                      alt={`${projectDetail.title} — gambar ${(modalIndex ?? 0) + 1}`}
                      fill
                      priority
                      sizes="100vw"
                      className="select-none rounded-xl object-contain"
                      draggable={false}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPrev}
                    disabled={!hasPrev}
                    aria-label="Gambar sebelumnya"
                    className="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-canvas text-ink shadow-lift transition-all duration-300 ease-spring hover:-translate-x-0.5 hover:scale-105 disabled:pointer-events-none disabled:opacity-25 md:left-4"
                  >
                    <PiCaretLeftBold />
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    disabled={!hasNext}
                    aria-label="Gambar berikutnya"
                    className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-canvas text-ink shadow-lift transition-all duration-300 ease-spring hover:translate-x-0.5 hover:scale-105 disabled:pointer-events-none disabled:opacity-25 md:right-4"
                  >
                    <PiCaretRightBold />
                  </button>
                </>
              )}
            </motion.div>

            {images.length > 1 && (
              <div className="flex justify-center p-4 md:p-6" onClick={(e) => e.stopPropagation()}>
                <div className="flex max-w-full gap-2 overflow-x-auto rounded-2xl bg-canvas/10 p-2 [scrollbar-width:none]">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => openModal(idx)}
                      aria-label={`Lihat gambar ${idx + 1}`}
                      aria-current={idx === modalIndex ? "true" : undefined}
                      className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-lg transition-all duration-300 ${
                        idx === modalIndex ? "ring-2 ring-accent ring-offset-2 ring-offset-ink" : "opacity-50 hover:opacity-100"
                      }`}
                    >
                      <Image src={img} alt="" fill sizes="64px" className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
