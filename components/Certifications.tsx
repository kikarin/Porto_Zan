"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { PiXBold, PiMagnifyingGlassPlusBold } from "react-icons/pi";
import Container from "./Container";
import SectionHeader from "./ui/SectionHeader";

const certifications = [
  {
    title: "Prakerin di PT Bonet Utama",
    issuer: "PT Bonet Utama",
    date: "10 Mei 2025",
    logo: "/MUHAMMAD ILHAM FAUZAN.png",
  },
  {
    title: "Belajar Dasar AI",
    issuer: "Dicoding Indonesia",
    date: "16 Desember 2024",
    logo: "/dasar_ai.png",
  },
  {
    title: "Belajar Membuat Aplikasi Flutter",
    issuer: "Dicoding Indonesia",
    date: "30 November 2024",
    logo: "/flutter_pemula.png",
  },
  {
    title: "Memulai Pemrograman dengan Dart",
    issuer: "Dicoding Indonesia",
    date: "27 November 2024",
    logo: "/dart.png",
  },
  {
    title: "Project Based Learning",
    issuer: "PT Bonet Utama",
    date: "21 Oktober 2022",
    logo: "/bonet.jpg",
  },
];

const tilts = [-4, 3, -2, 5, -3];

export default function Certifications() {
  const [selected, setSelected] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const active = selected !== null ? certifications[selected] : null;

  useEffect(() => {
    if (selected === null) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selected]);

  return (
    <section id="certifications" className="relative scroll-mt-24 py-24 md:py-36">
      <Container>
        <SectionHeader
          index="05"
          eyebrow="Certifications"
          title={
            <>
              Receipts of <em className="font-normal italic text-accent">learning</em>
            </>
          }
          description="Bukti belajar dan pengalaman kerja nyata. Klik untuk melihat sertifikatnya."
        />

        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {certifications.map((cert, i) => (
            <motion.li
              key={cert.title}
              initial={{ opacity: 0, y: 60, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: tilts[i] }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 110, damping: 14, delay: i * 0.08 }}
              whileHover={{ rotate: 0, y: -10, scale: 1.04, zIndex: 10 }}
              className={`relative ${i % 2 === 1 ? "lg:mt-12" : ""}`}
            >
              <button
                type="button"
                onClick={() => setSelected(i)}
                aria-label={`Lihat sertifikat ${cert.title}`}
                data-cursor="Zoom"
                className="group block w-full rounded-2xl bg-white p-3 pb-5 text-left shadow-lift ring-1 ring-ink/5 transition-shadow duration-300 hover:shadow-[0_30px_60px_-20px_rgba(60,40,20,0.35)]"
              >
                <motion.div
                  layoutId={`cert-${i}`}
                  className="relative aspect-[4/3] overflow-hidden rounded-xl bg-sand"
                >
                  <Image
                    src={cert.logo}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 240px"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 grid place-items-center bg-ink/0 text-2xl text-white opacity-0 transition-all duration-300 group-hover:bg-ink/30 group-hover:opacity-100">
                    <PiMagnifyingGlassPlusBold />
                  </span>
                </motion.div>
                <div className="px-1 pt-4">
                  <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-ink">
                    {cert.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-ink-muted">{cert.issuer}</p>
                  <p className="mt-3 font-mono text-[11px] tabular-nums text-ink-faint">{cert.date}</p>
                </div>
              </button>
            </motion.li>
          ))}
        </ul>
      </Container>

      <AnimatePresence>
        {active && selected !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-modal flex items-center justify-center bg-ink/70 p-4 backdrop-blur-md md:p-10"
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
              <motion.div
                layoutId={`cert-${selected}`}
                className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white shadow-2xl"
              >
                <Image
                  src={active.logo}
                  alt={`Sertifikat ${active.title} dari ${active.issuer}`}
                  fill
                  sizes="(max-width: 1024px) 95vw, 900px"
                  className="object-contain"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.15 }}
                className="mt-4 flex items-center justify-between gap-4 text-canvas"
              >
                <div>
                  <p className="font-display text-xl font-semibold">{active.title}</p>
                  <p className="text-sm text-canvas/70">
                    {active.issuer} · {active.date}
                  </p>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Tutup"
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-canvas text-lg text-ink transition-transform duration-300 ease-spring hover:rotate-90"
                >
                  <PiXBold />
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
