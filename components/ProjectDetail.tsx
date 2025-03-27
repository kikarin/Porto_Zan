"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";

// Data Proyek
const projects = [
  {
    id: "9",
    title: "ZanStein Solution",
    description:
      "ZanStein Solution adalah platform digital yang mempermudah pelanggan dalam memesan layanan coding secara efisien. Dibangun menggunakan Next.js dan Firebase, website ini menawarkan performa tinggi dengan sistem autentikasi yang aman. Selain kemudahan dalam pemesanan, platform ini juga memiliki fitur Voucher Diskon yang memungkinkan pelanggan mendapatkan harga terbaik untuk layanan yang mereka butuhkan.Dengan UI yang modern dan responsif, serta alur pemesanan yang intuitif, ZanStein Solution memberikan pengalaman pengguna yang optimal dalam mencari dan memesan layanan coding berkualitas.",
    img: "/zanstein.png",
    techIcons: ["/next.svg", "/firebase.png", "/tailwind.png"],
    date: "2025-03",
  },
  {
    id: "8",
    title: "Webview Pindai – Secure WebView for Attendance System",
    description:
      "Saya mengembangkan Webview Pindai menggunakan Flutter untuk mengakses sistem absensi berbasis PWA di PT Bonet Utama. saya juga menambahkan fitur keamanan untuk mendeteksi dan memblokir pengguna yang menggunakan Fake GPS atau perangkat yang telah di-root, memastikan keakuratan data absensi perusahaan.",
    img: "/pindai.png",
    techIcons: ["/flutter.png"],
    date: "2025-02",
  },
  {
    id: "7",
    title: "SageSolution Website",
    description:
      "Saya mengembangkan website profil perusahaan SageSolution sebagai bagian dari tugas saya di PT Bonet Utama. Website ini dirancang untuk menampilkan informasi bisnis dan layanan secara profesional serta responsif di berbagai perangkat. Dalam proyek ini, saya membangun frontend yang modern dan ringan, serta mengembangkan sistem CMS yang memungkinkan pengelolaan konten dengan mudah. Dengan struktur yang efisien dan teknologi yang tepat, website ini memberikan pengalaman pengguna yang optimal serta memperkuat citra profesional perusahaan.",
    img: "/sage.png",
    techIcons: [
      "/next.svg",
      "/tailwind.png",
      "/laravel.png",
      "/postgresql.svg",
      "/golang.png",
    ],
    date: "2025-02",
  },
  {
    id: "6",
    title: "RTIK Website",
    description:
      "Sebagian dari tugas saya di PT Bonet Utama, saya mengembangkan website RTIK untuk menampilkan informasi komunitas Relawan TIK. Proyek ini menjadi pengalaman pertama saya dalam menggunakan Next.js, metode Repository Pattern, dan PostgreSQL, yang saya pelajari dan terapkan dengan cepat. Saya bertanggung jawab atas pengembangan frontend serta integrasi CMS untuk memastikan pengelolaan konten yang efisien dan pengalaman pengguna yang optimal.",
    img: "/rtik.png",
    techIcons: [
      "/next.svg",
      "/tailwind.png",
      "/laravel.png",
      "/postgresql.svg",
      "/golang.png",
    ],
    date: "2025-01",
  },
  {
    id: "5",
    title: "Aplikasi Payment",
    description:
      "Saya mengembangkan tampilan aplikasi payment menggunakan Flutter sebagai bagian dari pembelajaran di Dicoding. Proyek ini berfokus pada desain antarmuka yang responsif dan user-friendly. Hasil pekerjaan saya mendapatkan nilai bintang 5 dari Dicoding, sebagai bentuk apresiasi atas kualitas tampilan yang dibuat.",
    img: "/payment.png",
    techIcons: ["/flutter.png"],
    date: "2024-11",
  },
  {
    id: "4",
    title: "Gallery Sekolah",
    description:
      "Saya mengerjakan proyek fullstack pertama saya dalam Uji Kompetensi Keahlian (Ujikom) dengan mengembangkan aplikasi mobile dan website yang mendukung multi-role dan multiplatform. Saya menggunakan Flutter untuk mobile serta Laravel untuk website dan API, dengan fitur CRUD yang dapat diakses di kedua platform mobile maupun website. Untuk API dan website, saat itu saya memanfaatkan server yang disediakan di sekolah untuk melakukan deploy ke Ubuntu Server dengan perantara FileZilla sebagai nilai tambah.",
    img: "/ujikom.png",
    techIcons: [
      "/flutter.png",
      "/laravel.png",
      "/bootstrap.png",
      "/mysql.png",
      "/ubuntu.png",
      "/FileZilla.png",
    ],
    date: "2024-11",
  },
  {
    id: "3",
    title: "Jasa Pembuatan Website Ujikom",
    description:
      "Sebagian dari pengalaman saya di bidang pengembangan web, saya membuka jasa pembuatan website untuk ujikom dengan teknologi Laravel. Saya telah menyelesaikan 18 proyek dengan sistem multi-role, memastikan setiap website dapat digunakan sesuai kebutuhan pengguna yang berbeda. Website yang saya kembangkan siap digunakan tanpa perlu pengaturan tambahan, sehingga peserta ujikom dapat fokus pada pemahaman konsep tanpa hambatan teknis. Dengan pengalaman menyelesaikan hampir 20 proyek, saya berkomitmen memberikan hasil yang berkualitas dan membantu peserta ujikom meraih nilai terbaik.",
    img: "/jasa_ujikom.png",
    techIcons: ["/laravel.png", "/bootstrap.png", "/mysql.png"],
    date: "2024-10",
  },
  {
    id: "2",
    title: "Game Sederhana",
    description:
      "Sebagian dari eksplorasi saya dalam pengembangan web interaktif, saya telah membuat beberapa game sederhana menggunakan JavaScript. Proyek ini bertujuan untuk memperdalam pemahaman tentang logika pemrograman, manipulasi DOM, serta animasi berbasis JavaScript.",
    img: "/game.png",
    techIcons: ["/js.webp"],
    date: "2023-08",
  },
  {
    id: "1",
    title: "Website Hotel",
    description:
      "Sebagian dari pelatihan di PT Bonet Utama saat saya kelas 10, saya mengembangkan website hotel yang berfungsi sebagai sistem reservasi dan manajemen kamar. Proyek ini menggunakan Laravel sebagai backend API, Next.js sebagai frontend, serta MySQL sebagai database utama Pelatihan ini memberikan saya pengalaman langsung dalam membangun aplikasi fullstack serta integrasi antara frontend dan backend yang optimal.",
    img: "/hotel.png",
    techIcons: ["/laravel.png", "/bootstrap.png", "/mysql.png"],
    date: "2022-10",
  },
];

export default function ProjectDetail({ projectId }: { projectId: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const project = projects.find((p) => p.id === projectId);
  if (!project) {
    return (
      <div className="text-center text-red-600">Proyek tidak ditemukan.</div>
    );
  }

  // Navigasi prev dan next (dibalik logikanya)
  const currentId = parseInt(projectId);
  const nextId = currentId > 1 ? currentId - 1 : null; // Next sekarang justru berkurang
  const prevId = currentId < projects.length ? currentId + 1 : null; // Prev sekarang bertambah

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-6 md:px-12 py-10 bg-gradient-to-br from-blue-50 to-gray-100 text-gray-900">
      {/* Gambar Proyek */}
      <div
        className="relative w-full max-w-4xl cursor-pointer group mb-12 rounded-2xl overflow-hidden shadow-2xl border border-gray-300 hover:scale-[1.05] transition-transform duration-700"
        onClick={() => setIsModalOpen(true)}
      >
        <Image
          src={project.img}
          alt={project.title}
          width={1600}
          height={800}
          className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-700">
          <span className="text-white font-bold text-2xl drop-shadow-md animate-pulse">
            🔍 Klik untuk memperbesar
          </span>
        </div>
      </div>

      {/* Deskripsi Singkat */}
      <div className="max-w-4xl text-left bg-white p-10 rounded-xl shadow-xl border border-gray-300 hover:shadow-2xl transition-shadow duration-500">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-900 tracking-tight">
          {project.title}
        </h1>

        <p className="font-gotosans text-lg text-gray-700 mb-5 leading-relaxed">
          {project.description}
        </p>

        {/* Tanggal Proyek */}
        <div className="mb-4">
          <p className="text-gray-600 text-sm flex items-center gap-2">
          <FaRegCalendarAlt /> Tanggal Proyek:{" "}
            <span className="font-medium">
              {new Date(project.date).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </p>
        </div>

        {/* Framework yang Digunakan */}
        <div className="mb-6">
          <h3 className="font-gotosans text-2xl font-semibold mb-4 flex items-center gap-2">
            <IoSettingsOutline />
            technology used:
          </h3>
          <div className="flex flex-wrap gap-6">
            {project.techIcons.map((icon, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-xl shadow-md hover:scale-105 hover:bg-gray-200 transition-transform duration-500"
              >
                <Image
                  src={icon}
                  alt={`Tech icon ${i + 1}`}
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Tombol Prev dan Next di dalam border */}
        <div className="flex justify-between mt-6 border-t pt-6">
          {/* Tombol Prev */}
          <button
            onClick={() => prevId && router.push(`/projects/${prevId}`)}
            disabled={!prevId}
            className={`px-6 py-3 rounded-lg font-medium shadow-md transition-all duration-500 ${
              prevId
                ? "bg-gray-700 text-white hover:scale-110 hover:bg-blue-800"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            ← Prev
          </button>

          {/* Tombol Next */}
          <button
            onClick={() => nextId && router.push(`/projects/${nextId}`)}
            disabled={!nextId}
            className={`px-6 py-3 rounded-lg font-medium shadow-md transition-all duration-500 ${
              nextId
                ? "bg-blue-600 text-white hover:scale-110 hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Next →
          </button>
        </div>
      </div>

      {/* Tombol Kembali ke Halaman Utama */}
      <button
        onClick={() => (window.location.href = "/")}
        className="font-gotosans mt-6 px-6 py-3 bg-gray-900 text-white font-medium rounded-lg shadow-lg hover:scale-110 hover:bg-blue-800 transition-all duration-500"
      >
        ← Kembali ke Halaman Utama
      </button>

      {/* Modal untuk Full-Image View */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center cursor-zoom-out animate-fadeIn transition-all duration-500"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Wrapper Modal untuk menangani event bubbling */}
          <div
            className="relative p-4 max-w-[95vw] max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} // Mencegah event bubbling
          >
            <Image
              src={project.img}
              alt={project.title}
              width={1600}
              height={900}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-xl scale-95 hover:scale-100 transition-transform duration-500"
            />
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-3xl text-white bg-red-600 w-12 h-12 rounded-full flex items-center justify-center hover:bg-red-700 hover:rotate-90 transition-all duration-500"
              aria-label="Tutup"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
