"use client";
import { motion } from "framer-motion";
import {
  HiOutlineMail,
  HiOutlineLocationMarker,
  HiOutlineBriefcase,
} from "react-icons/hi";
import ProfileCard from "./ProfileCard";
import Container from "./Container";
import { Parallax } from "react-scroll-parallax";

export default function AboutMe() {
  return (
    <section id="about" className="py-2 mt-24 text-gray-900">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <h2 className="font-rubik text-5xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="font-rubik mt-4 text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            I am a vocational high school student majoring in{" "}
            <span className="font-semibold text-gray-700">PPLG</span>{" "}
            Pengembangan Perangkat Lunak dan Gim.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 items-center text-center md:text-left">
          <Parallax translateX={[-30, 40]}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex justify-center md:justify-start"
            >
              <ProfileCard />
            </motion.div>
          </Parallax>

          {/* Deskripsi & Informasi */}
          <Parallax translateX={[10, -5]}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center md:text-left bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-300"
            >
              <h3 className="font-rubik text-3xl font-bold text-gray-800">
                <span className="text-orange-300">Hi, I&apos;m </span> Muhammad
                Ilham Pauzan
              </h3>

              {/* Deskripsi Diri */}
              <p className="font-rubik mt-4 text-lg text-gray-700 leading-relaxed text-justify md:text-left">
                Saya adalah lulusan SMK Negeri 4 Kota Bogor dari jurusan
                Pengembangan Perangkat Lunak dan Gim (PPLG), dengan fokus pada
                pengembangan aplikasi web dan mobile. Saya telah menyelesaikan
                program magang di PT Bonet Utama, sebuah perusahaan software
                house, di mana saya terlibat dalam berbagai proyek nyata
                menggunakan Laravel, Flutter, Next.js, Golang dan teknologi modern
                lainnya. Saya memiliki kemampuan belajar yang cepat dan mampu
                beradaptasi dengan berbagai tools dan framework baru. Dengan
                pengalaman dalam membangun lebih dari 20 proyek digital untuk
                instansi pendidikan, pemerintahan, dan klien freelance, saya
                terus mengasah keterampilan teknis dan siap menghadapi tantangan
                industri teknologi ke depannya.
              </p>

              {/* Informasi Singkat dengan Ikon */}
              <div className="mt-6 space-y-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  <HiOutlineLocationMarker className="text-2xl text-orange-300" />
                  <p className="font-rubik text-gray-800">
                    Berdomisili di Kota Bogor
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  <HiOutlineBriefcase className="text-2xl text-orange-300" />
                  <p className="font-rubik text-gray-800">
                    Freelance
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  <HiOutlineMail className="text-2xl text-orange-300" />
                  <p className="font-rubik text-gray-800">
                    milhampauzan@gmail.com
                  </p>
                </motion.div>
              </div>

              {/* Tombol */}
              <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
                <motion.a
                  href="/CV_English_Muhammad Ilham Pauzan (Fullstack Developer) 
                  .pdf"
                  download
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="font-rubik px-6 py-3 bg-orange-300 text-gray-900 rounded-lg font-medium shadow-md hover:bg-orange-200 transition-all"
                >
                  Download CV
                </motion.a>
                <motion.a
                  href="mailto:milhampauzan@gmail.com"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="font-rubik px-6 py-3 bg-gray-800 text-gray-300 rounded-lg font-medium shadow-md hover:bg-gray-600 transition-all"
                >
                  Contact Me
                </motion.a>
              </div>
            </motion.div>
          </Parallax>
        </div>
      </Container>
    </section>
  );
}
