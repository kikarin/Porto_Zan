"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Data Proyek
const projects = [
  {
    id: "9",
    title: "ZanStein Solution",
    description:
      "Platform jasa digital yang memudahkan pelanggan dalam melakukan pemesanan layanan coding secara efisien.",
    img: "/zanstein.png",
    techIcons: ["/next.svg", "/firebase.png"],
    cta: {
      type: "visit",
      label: "Visit Web",
      link: "",
    },
    date: "2025-03",
  },
  {
    id: "8",
    title: "Webview Pindai",
    description:
      "Aplikasi Webview Flutter untuk absensi aman dan bebas manipulasi.",
    img: "/pindai_330.png",
    techIcons: ["/flutter.png"],
    cta: {
      type: "private",
      label: "Private",
      link: "",
    },
    date: "2025-02",
  },
  {
    id: "7",
    title: "SageSolution Website",
    description:
      "Platform digital perusahaan untuk menyajikan informasi bisnis dan layanan dengan tampilan modern dan responsif.",
    img: "/sage_330.png",
    techIcons: ["/laravel.png", "/next.svg", "/postgresql.svg", "/golang.png"],
    cta: {
      type: "live",
      label: "Live Demo",
      link: "https://sagesolution-company.vercel.app/",
    },
    date: "2025-02",
  },
  {
    id: "6",
    title: "RTIK Website",
    description:
      "Platform informasi Relawan TIK dengan tampilan modern dan navigasi intuitif untuk mempermudah akses informasi komunitas.",
    img: "/rtik_330.png",
    techIcons: ["/laravel.png", "/next.svg", "/postgresql.svg", "/golang.png"],
    cta: {
      type: "visit",
      label: "Visit Web",
      link: "https://relawantik.pindai.dev/",
    },
    date: "2025-01",
  },
  {
    id: "5",
    title: "Aplikasi Payment",
    description:
      "Desain antarmuka aplikasi pembayaran yang responsif dan user-friendly.",
    img: "/payment_330.png",
    techIcons: ["/flutter.png"],
    cta: {
      type: "download",
      label: "Unduh",
      link: "/app-release.apk",
    },
    date: "2024-11",
  },
  {
    id: "4",
    title: "Gallery Sekolah",
    description:
      "Aplikasi gallery sekolah berbasis mobile dan web dengan sistem multi-role dan multiplatform",
    img: "/ujikom_330.png",
    techIcons: ["/flutter.png", "/laravel.png", "/mysql.png"],
    cta: {
      type: "github",
      label: "github",
      link: "https://github.com/kikarin",
    },
    date: "2024-11",
  },
  {
    id: "3",
    title: "Jasa Pembuatan Website",
    description:
      "Menerima jasa pembuatan website ujikom dengan sistem multi-role. Dikerjakan secara profesional, siap pakai, dan membantu menyelesaikan proyek mereka dengan hasil terbaik.",
    img: "/jasa_ujikom_330.png",
    techIcons: ["/laravel.png", "/mysql.png"],
    cta: {
      type: "private",
      label: "private",
      link: "#",
    },
    date: "2024-10",
  },
  {
    id: "2",
    title: "Game Sederhana",
    description:
      "Kumpulan game interaktif yang dibuat menggunakan JavaScript, menampilkan mekanisme sederhana untuk eksplorasi dan pengembangan keterampilan dalam pemrograman.",
    img: "/game_330.png",
    techIcons: ["/js.webp"],
    cta: {
      type: "github",
      label: "github",
      link: "#",
    },
    date: "2023-08",
  },
  {
    id: "1",
    title: "Website Hotel",
    description:
      "Sistem manajemen hotel yang dibangun dengan API Laravel dan frontend Next.js, dirancang untuk memudahkan reservasi dan pengelolaan kamar secara efisien.",
    img: "/hotel.png",
    techIcons: ["/laravel.png", "/next.svg", "/mysql.png"],
    cta: {
      type: "github",
      label: "github",
      link: "https://github.com/kikarin/pelatihan-hotel-2022",
    },
    date: "2022-10",
  },
];

// Animasi untuk card proyek
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

// Fungsi untuk menampilkan CTA secara dinamis
const renderCTA = (cta: { type: string; label: string; link: string }) => {
  const baseClass =
    "px-4 py-2 rounded-full font-medium shadow-md transition-all";
  switch (cta.type) {
    case "live":
      return (
        <a
          href={cta.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseClass} bg-orange-300 text-gray-950 hover:bg-orange-200`}
        >
          {cta.label}
        </a>
      );
    case "github":
      return (
        <a
          href={cta.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseClass} bg-gray-900 text-gray-100 hover:bg-gray-800`}
        >
          {cta.label}
        </a>
      );
    case "private":
      return (
        <button
          disabled
          className={`${baseClass} bg-gray-300 text-gray-600 cursor-not-allowed`}
        >
          {cta.label}
        </button>
      );
    case "visit":
      return (
        <a
          href={cta.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseClass} bg-blue-600 text-white hover:bg-blue-700`}
        >
          {cta.label}
        </a>
      );
    case "download":
      return (
        <a
          href={cta.link}
          download
          className={`${baseClass} bg-green-500 text-white hover:bg-green-600`}
        >
          {cta.label}
        </a>
      );
    default:
      return null;
  }
};

export default function Projects() {
  const [] = useState(null);
  return (
<section id="projects" className="py-20 text-gray-900">
  <div className="container"> {/* Menggunakan container utama */}
    {/* Section Header */}
    <div className="text-center mb-12">
      <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-gray-600 bg-clip-text text-transparent">
        My Projects
      </h2>
      <p className="font-gotosans mt-4 text-gray-600 text-lg md:text-xl">
        Here are some of the projects I’ve worked on.
      </p>
    </div>

    {/* Projects Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          custom={index}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative w-full h-72 rounded-xl overflow-hidden shadow-lg transition-all duration-300 group flex flex-col bg-gradient-to-r from-gray-800 via-gray-900 to-gray-700"
        >
          {/* Gambar Project */}
          <div className="relative w-full h-full cursor-pointer">
            <Image
              src={project.img}
              alt={`Image for ${project.title}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              priority
              sizes="(max-width: 768px) 100vw, 800px"
            />

            {/* Overlay dan Konten Hover */}
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6 text-white text-center">
              {/* Tech Icons */}
              <div className="flex gap-3 mb-4">
                {project.techIcons.map((icon, i) => (
                  <Image
                    key={i}
                    src={icon}
                    alt={`Tech icon ${i + 1}`}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                ))}
              </div>

              {/* Judul & Deskripsi */}
              <h3 className="text-2xl font-bold">{project.title}</h3>
              <p className="text-sm text-gray-300 mt-2">{project.description}</p>

              {/* Tombol Dinamis & See Details */}
              <div className="font-gotosans mt-4 flex gap-4 items-center">
                {renderCTA(project.cta)}
                <Link
                  href={`/projects/${project.id}`}
                  className="px-4 py-2 bg-white text-gray-900 rounded-full font-medium shadow-md hover:bg-gray-200 transition-all"
                  prefetch={false}
                >
                  See Details
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>
  );
}
