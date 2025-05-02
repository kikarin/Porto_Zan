// app/not-found.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IoMdAlert } from "react-icons/io";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full"
      >
        <div className="text-5xl text-orange-400 mb-4">
          <IoMdAlert />
        </div>
        <h1 className="text-2xl font-bold mb-2">Oops! Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          Halaman yang kamu cari tidak tersedia. Mungkin project-nya belum dibuat atau link-nya salah.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-orange-300 hover:bg-orange-400 text-gray-900 font-medium rounded-md transition"
        >
          Kembali ke Beranda
        </Link>
      </motion.div>
    </div>
  );
}
