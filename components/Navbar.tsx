"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { Link as ScrollLink } from "react-scroll";

const navItems = [
  { label: "Home", to: "hero" },
  { label: "Services", to: "services" },
  { label: "About", to: "about" },
  { label: "Tech Stack", to: "techstack" },
  { label: "Projects", to: "projects" },
  { label: "Contact", to: "contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 w-full py-3 px-6 flex justify-between items-center transition-all duration-300 ${
        scrolling ? "bg-white/30 backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
    >
{/* Logo */}
<Link href="/">
  <motion.div
    className="cursor-pointer"
  >
    <img
      src="/logo-ts.png" // Ganti dengan path logo yang benar
      alt="Logo"
      className="w-14 h-auto" // Sesuaikan ukuran logo
    />
  </motion.div>
</Link>


      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-6">
        {navItems.map((item, index) => (
          <ScrollLink
            key={index}
            to={item.to}
            smooth={true}
            duration={500}
            spy={true}
            offset={-70}
            className="text-gray-800 text-lg font-medium cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-200 transition-all"
          >
            {item.label}
          </ScrollLink>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-3xl text-gray-800">
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setMenuOpen(false)}
            />

            {/* Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-[60px] right-6 w-[90%] max-w-[300px] bg-white/80 backdrop-blur-md p-5 rounded-lg shadow-lg flex flex-col items-center gap-4 z-50"
            >
              {navItems.map((item, index) => (
                <ScrollLink
                  key={index}
                  to={item.to}
                  smooth={true}
                  duration={500}
                  spy={true}
                  offset={-70}
                  className="text-gray-800 text-lg font-medium py-2 hover:text-indigo-600 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </ScrollLink>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
