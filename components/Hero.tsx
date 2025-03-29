"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import SplitText from "./SplitText";
import TrueFocus from "./TrueFocus";
import { Parallax } from "react-scroll-parallax";

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  const containerRef = useRef(null);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col items-center justify-between overflow-hidden"
      ref={containerRef} // Pastikan containerRef dipasang di section
    >
      {/* Animasi Text Utama */}
      <motion.div
        className="text-center mt-16 md:mt-20 px-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <SplitText
          text="Hello!"
          className="text-6xl sm:text-6xl md:text-7xl font-bold text-gray-900 leading-tight"
          delay={100}
          animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
          animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
          threshold={0.2}
          rootMargin="-50px"
        />
        <div className="mt-4 text-gray-700 text-4xl sm:text-4xl">
          <TrueFocus
            sentence="I'm Ilham Pauzan, Fullstack Developer"
            manualMode={true}
            blurAmount={4}
            borderColor="orange"
            glowColor="rgba(255, 0, 0, 0.6)"
            animationDuration={0.5}
            pauseBetweenAnimations={0.2}
          />
        </div>
      </motion.div>

      {/* Grid Layout */}
      <div className="relative w-full max-w-6xl flex flex-col md:flex-row justify-between items-center flex-grow mt-10">
        {/* Kiri: Testimonial */}
        <motion.div
          className="relative flex justify-center w-full md:w-1/3 text-center md:text-left px-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <Parallax speed={6}>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-500 max-w-md">
            &quot;Membangun solusi digital inovatif dengan pendekatan
            kolaboratif. siap membantu bisnis Anda melalui pengembangan aplikasi
            berbasis web dan mobile yang responsif dan berkinerja tinggi.&quot;
            </p>
            </Parallax>
        </motion.div>

        {/* Tengah: Gambar */}
        <motion.div
          className="relative w-[250px] sm:w-[300px] md:w-[400px] lg:w-[650px] mx-auto mt-[-20px] sm:mt-[-40px] md:mt-[-50px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div className="relative w-full flex justify-center">
            {/* Gambar Utama */}
            <Parallax translateY={[-40, 60]}>
            <Image
              src="/gua.png"
              alt="Profile Picture"
              width={500}
              height={500}
              className="object-contain rounded-xl"
            />
            </Parallax>

            {/* Hover & Click Effect */}
            <motion.div
              className="absolute inset-0 flex justify-center"
              onHoverStart={() => !isMobile && setIsHovered(true)}
              onHoverEnd={() => !isMobile && setIsHovered(false)}
              onClick={() => isMobile && setIsHovered((prev) => !prev)} // Toggle di mobile
              animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1.05 : 1,
                filter: isHovered ? "blur(0px)" : "blur(10px)",
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
            <Parallax translateY={[-40, 60]}>
            <Image
                src="/asset.png"
                alt="Profile Hover"
                width={500}
                height={500}
                className="object-contain transition-transform duration-500 rounded-xl"
                />
              </Parallax>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Kanan: Experience & Projects */}
        <motion.div
          className="w-full md:w-1/3 text-center md:text-right px-4 text-gray-500 mt-6 md:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <Parallax speed={6}>
            <div className="flex justify-center md:justify-end items-center gap-2 mb-2">
              <span className="text-yellow-400 text-2xl sm:text-3xl md:text-4xl">
                ★★★★★
              </span>
            </div>
            <div className="font-bold text-xl sm:text-2xl md:text-3xl">
              20+ Projects
            </div>
            <div className="text-md sm:text-lg md:text-xl">
              Delivered Successfully
            </div>
          </Parallax>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
