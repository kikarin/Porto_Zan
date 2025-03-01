"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaInstagram, FaGithub, FaLinkedin,} from "react-icons/fa";

export default function ProfileCard() {
  return (
    <div className="profile-container">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 0.1, ease: "easeOut" }}
        className="profile-card"
      >
        {/* Foto Profil */}
        <motion.div
          className="profile-img-wrapper"
          initial={{ width: "100px", height: "100px", borderRadius: "50%" }}
          whileHover={{
            width: "100%",
            height: "100%",
            borderRadius: "10px",
          }}
          animate={{ width: "100px", height: "100px", borderRadius: "50%" }}
          transition={{ duration: 0.5 }}
        >
          <div className="profile-img">
            <Image
              src="/about.jpg"
              alt="Profile Picture"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Nama */}
        <motion.h2
          className="font-gotosans profile-name"
          initial={{ opacity: 1 }}
          whileHover={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Ilham Pauzan<br />
          <span className="text-gray-700">Fullstack Developer</span>
        </motion.h2>

        {/* Ikon Media Sosial */}
        <p className="profile-icons">
          <a href="https://instagram.com/zankikarin" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="icon" />
          </a>
          <a href="https://github.com/kikarin" target="_blank" rel="noopener noreferrer">
            <FaGithub className="icon" />
          </a>
          <a href="https://linkedin.com/in/m-ilham-pauzan" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="icon" />
          </a>
        </p>
      </motion.div>
    </div>
  );
}
