"use client";
import { motion } from "framer-motion";
import {
  HiOutlineMail,
  HiOutlineLocationMarker,
  HiOutlineBriefcase,
} from "react-icons/hi";
import ProfileCard from "./ProfileCard";

export default function AboutMe() {
  return (
    <section id="about" className="py-2 mt-24 text-gray-900">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="font-gotosans mt-4 text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            I am a vocational high school student majoring in{" "}
            <span className="font-semibold text-gray-700">PPLG</span>{" "}
            Pengembangan Perangkat Lunak dan Gim.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Kartu Profil */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center"
          >
            <ProfileCard />
          </motion.div>

          {/* Deskripsi & Informasi */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center md:text-left bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-300"
          >
            <h3 className="font-gotosans text-3xl font-bold text-gray-800">
              <span className="text-orange-300">Hi, I&apos;m </span> Muhammad
              Ilham Pauzan
            </h3>
            
            {/* Deskripsi Diri */}
            <p className="font-gotosans mt-4 text-lg text-gray-700 leading-relaxed">
              Saya adalah siswa kelas 12 sekaligus programmer yang saat ini
              magang di PT Bonet Utama, sebuah perusahaan software house. Saya
              memiliki kemampuan belajar dan beradaptasi dengan cepat terhadap
              teknologi atau framework yang baru saya kenal, memungkinkan saya
              menyelesaikan proyek dengan efisien. Dengan fokus pada
              pengembangan web dan mobile, saya terus mengasah keterampilan
              untuk menghadapi tantangan di industri teknologi.
            </p>

            {/* Informasi Singkat dengan Ikon */}
            <div className="mt-6 space-y-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <HiOutlineLocationMarker className="text-2xl text-orange-300" />
                <p className="font-gotosans text-gray-800">
                  Berdomisili di Kota Bogor
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <HiOutlineBriefcase className="text-2xl text-orange-300" />
                <p className="font-gotosans text-gray-800">
                  Sedang magang di PT Bonet Utama
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <HiOutlineMail className="text-2xl text-orange-300" />
                <p className="font-gotosans text-gray-800">
                  milhampauzan@gmail.com
                </p>
              </motion.div>
            </div>

            {/* Tombol */}
            <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="font-gotosans px-6 py-3 bg-orange-300 text-gray-900 rounded-lg font-medium shadow-md hover:bg-orange-200 transition-all"
              >
                Download CV
              </motion.a>
              <motion.a
                href="mailto:milhampauzan@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="font-gotosans px-6 py-3 bg-gray-800 text-gray-300 rounded-lg font-medium shadow-md hover:bg-gray-600 transition-all"
              >
                Contact Me
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
