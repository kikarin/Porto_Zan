"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PiArrowLeftBold } from "react-icons/pi";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center px-6 py-24 text-center">
      <motion.p
        drag
        dragConstraints={{ left: -80, right: 80, top: -40, bottom: 40 }}
        dragElastic={0.4}
        initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: -4 }}
        whileHover={{ rotate: 3 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
        className="cursor-grab select-none font-display text-[clamp(7rem,28vw,16rem)] font-bold leading-none tracking-[-0.07em] text-ink active:cursor-grabbing"
      >
        4<span className="text-accent">0</span>4
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Halaman tidak ditemukan
        </h1>
        <p className="mx-auto mt-3 max-w-[44ch] text-lg text-ink-muted">
          Halaman yang kamu cari tidak tersedia. Mungkin project-nya belum dibuat atau link-nya salah.
        </p>
        <Link href="/" className="btn-primary group mt-10">
          <PiArrowLeftBold className="transition-transform duration-300 group-hover:-translate-x-1" />
          Kembali ke beranda
        </Link>
      </motion.div>
    </main>
  );
}
