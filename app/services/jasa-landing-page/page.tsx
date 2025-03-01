"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaWhatsapp, FaInstagram, FaArrowLeft } from "react-icons/fa";

export default function JasaLandingPage() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-start px-6 md:px-12 bg-gray-900 text-gray-100 pt-24 md:pt-32">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="font-gotosans text-4xl md:text-5xl font-bold mb-6 text-orange-400">
          🌐 Jasa Pembuatan Landing Page
        </h1>
        <p className="font-gotosans text-lg md:text-xl text-gray-300 max-w-xl mx-auto leading-relaxed">
          Kami menyediakan layanan pembuatan landing page yang profesional, responsif, dan menarik.  
          Cocok untuk keperluan marketing, branding, dan promosi produk Anda.  
          Anda bisa request desain dan fitur sesuai kebutuhan!
        </p>
      </motion.div>

      {/* Fitur */}
      <motion.div
        className="grid gap-6 md:grid-cols-2 mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="p-6 bg-gray-800 rounded-xl shadow-md hover:scale-105 transition-all">
          <h3 className="text-xl font-semibold mb-3">🎯 Desain Menarik</h3>
          <p className="font-gotosans text-gray-300">
            Landing page dengan desain modern dan interaktif untuk menarik perhatian pengunjung.
          </p>
        </div>
        <div className="p-6 bg-gray-800 rounded-xl shadow-md hover:scale-105 transition-all">
          <h3 className="text-xl font-semibold mb-3">⚡ Kecepatan Optimal</h3>
          <p className="font-gotosans text-gray-300">
            Performa optimal dengan waktu muat yang cepat, bahkan di perangkat seluler.
          </p>
        </div>
        <div className="p-6 bg-gray-800 rounded-xl shadow-md hover:scale-105 transition-all">
          <h3 className="text-xl font-semibold mb-3">🔗 Integrasi Mudah</h3>
          <p className="font-gotosans text-gray-300">
            Terintegrasi dengan WhatsApp, Instagram, dan layanan pihak ketiga sesuai kebutuhan.
          </p>
        </div>
        <div className="p-6 bg-gray-800 rounded-xl shadow-md hover:scale-105 transition-all">
          <h3 className="text-xl font-semibold mb-3">🛠️ Bebas Request Fitur</h3>
          <p className="font-gotosans text-gray-300">
            Anda bebas request fitur tambahan seperti formulir, live chat, dan lainnya.
          </p>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        className="flex flex-col md:flex-row gap-6 mb-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        {/* Tombol WhatsApp */}
        <Link
          href="https://wa.me/62XXXXXXXXXX"
          target="_blank"
          className="font-gotosans flex items-center gap-3 px-6 py-3 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition-all"
        >
          <FaWhatsapp className="text-2xl" />
          Hubungi via WhatsApp
        </Link>

        {/* Tombol Instagram */}
        <Link
          href="https://www.instagram.com/your_username"
          target="_blank"
          className="font-gotosans flex items-center gap-3 px-6 py-3 bg-pink-500 text-white rounded-full shadow-md hover:bg-pink-600 transition-all"
        >
          <FaInstagram className="text-2xl" />
          Hubungi via Instagram
        </Link>

        {/* Tombol Kembali */}
        <Link
          href="/"
          className="font-gotosans flex items-center gap-3 px-6 py-3 bg-gray-700 text-white rounded-full shadow-md hover:bg-gray-900 transition-all"
        >
          <FaArrowLeft className="text-xl" />
          Kembali
        </Link>
      </motion.div>
    </section>
  );
}
