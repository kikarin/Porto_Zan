"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaWhatsapp, FaInstagram, FaArrowLeft } from "react-icons/fa";

export default function JasaPembuatanAplikasiMobile() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-start px-6 md:px-12 bg-gray-950 text-gray-100 pt-24 md:pt-32">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="font-gotosans text-4xl md:text-5xl font-bold mb-6 text-orange-300">
          📱 Jasa Pembuatan Aplikasi Mobile
        </h1>
        <p className="font-gotosans text-lg md:text-xl text-gray-300 max-w-xl mx-auto leading-relaxed">
          Kami menyediakan jasa pembuatan aplikasi mobile berbasis Flutter dan
          React Native. Aplikasi responsif dengan fitur lengkap seperti
          autentikasi, database, notifikasi, dan desain UI/UX modern.
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
          <h3 className="text-xl font-semibold mb-3">⚡ Performa Cepat</h3>
          <p className="font-gotosans text-gray-300">
            Aplikasi dioptimalkan untuk memberikan performa terbaik dengan waktu
            respons yang cepat.
          </p>
        </div>
        <div className="p-6 bg-gray-800 rounded-xl shadow-md hover:scale-105 transition-all">
          <h3 className="text-xl font-semibold mb-3">🛠️ Fitur Lengkap</h3>
          <p className="font-gotosans text-gray-300">
            Autentikasi, notifikasi push, dan integrasi dengan berbagai layanan
            pihak ketiga.
          </p>
        </div>
        <div className="p-6 bg-gray-800 rounded-xl shadow-md hover:scale-105 transition-all">
          <h3 className="text-xl font-semibold mb-3">🎨 Desain Modern</h3>
          <p className="font-gotosans text-gray-300">
            Desain UI/UX yang responsif dan menarik di berbagai perangkat.
          </p>
        </div>
        <div className="p-6 bg-gray-800 rounded-xl shadow-md hover:scale-105 transition-all">
          <h3 className="text-xl font-semibold mb-3">🔗 Integrasi API</h3>
          <p className="font-gotosans text-gray-300">
            Mudah diintegrasikan dengan layanan pihak ketiga seperti Firebase,
            Stripe, dan lainnya. Anda juga bebas request fitur integrasi sesuai
            kebutuhan aplikasi Anda!
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
        <button
          onClick={() => window.history.back()}
          className="font-gotosans flex items-center gap-3 px-6 py-3 bg-gray-700 text-white rounded-full shadow-md hover:bg-gray-900 transition-all"
        >
          <FaArrowLeft className="text-xl" />
          Kembali
        </button>
      </motion.div>
    </section>
  );
}
