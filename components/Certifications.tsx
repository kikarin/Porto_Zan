"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaSearchPlus } from "react-icons/fa";
import Image from "next/image";

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

  const openModal = (img: string) => {
    setSelectedImage(img);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  return (
    <section id="certifications" className="py-20 bg-gray-100 text-gray-900">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Certifications & Achievements
          </h2>
          <p className="font-gotosans mt-4 text-gray-600 text-lg md:text-xl">
            Proof of my skills and dedication to continuous learning.
          </p>
        </motion.div>

        {/* Certificate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl p-6 flex flex-col items-center text-center transition-all group cursor-pointer"
              onClick={() => openModal(cert.logo)}
            >
              {/* Gambar dengan Overlay Icon */}
              <div className="relative w-44 h-20 mb-4 group-hover:scale-105 transition-transform">
                <Image
                  src={cert.logo}
                  alt={cert.title}
                  width={176} // Sesuai dengan 44 * 4 (1rem = 4px)
                  height={80} // Sesuai dengan 20 * 4
                  className="w-full h-full object-contain rounded-md"
                />
                {/* Overlay untuk tanda interaktif */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                  <FaSearchPlus className="text-white text-3xl" />
                </div>
              </div>

              <h3 className="font-gotosans text-xl font-semibold mb-2">
                {cert.title}
              </h3>
              <p className="font-gotosans text-gray-700 mb-1">{cert.issuer}</p>
              <p className="font-gotosans text-sm text-gray-500">{cert.date}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal for full image preview */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <motion.img
            src={selectedImage}
            alt="Full Certificate"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-full max-h-[90%] rounded-lg shadow-xl cursor-pointer"
          />
          <button
            className="absolute top-4 right-4 text-white text-3xl font-bold bg-red-600 w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-500"
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
          >
            ✖
          </button>
        </div>
      )}
    </section>
  );
}
