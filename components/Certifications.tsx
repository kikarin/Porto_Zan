"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const certifications = [
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

export default function Certifications() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="certifications" className="py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
            Certifications & Achievements
          </h2>
          <p className="font-gotosans mt-4 text-gray-400 text-lg md:text-xl">
            Proof of my skills and dedication to continuous learning.
          </p>
        </motion.div>

        {/* Certificate Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="glass w-full max-w-xs mx-auto p-4 flex flex-col items-center justify-between text-center transition-transform hover:scale-105 backdrop-blur-md border border-white/20 shadow-lg"
            >
              {/* Gambar Sertifikat */}
              <div
                className="relative w-36 h-24 mb-3 cursor-pointer transition-transform duration-300 hover:scale-110"
                onClick={() => setSelectedImage(cert.logo)}
              >
                <Image
                  src={cert.logo}
                  alt={cert.title}
                  width={144}
                  height={96}
                  className="w-full h-full object-contain rounded-md"
                />
              </div>

              {/* Nama Sertifikat */}
              <h3 className="text-lg font-semibold">{cert.title}</h3>
              <p className="text-sm text-gray-300">{cert.issuer}</p>
              <p className="text-xs text-gray-400">{cert.date}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative p-6 bg-white rounded-lg"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-black text-2xl font-bold"
            >
              ×
            </button>
            <Image
              src={selectedImage}
              alt="Certificate"
              width={600}
              height={400}
              className="max-w-full h-auto rounded-lg"
            />
          </motion.div>
        </div>
      )}
    </section>
  );
}
