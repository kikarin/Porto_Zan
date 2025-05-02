import { FaGithub, FaLinkedin, FaArrowUp, FaInstagram } from "react-icons/fa";
import { useEffect, useState } from "react";

const Footer = () => {
  const [showButton, setShowButton] = useState(false);

  // Cek scroll position buat munculin tombol "Back to Top"
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="font-rubik p-10 bg-gray-100 dark:bg-gray-900 dark:text-white relative">
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center gap-5">
        {/* Garis pemisah dengan efek subtle */}
        <div className="w-full border-t border-gray-300 dark:border-gray-700 opacity-50"></div>

        {/* Social Media Icons */}
        <div className="flex gap-5">
          <a
            href="https://github.com/kikarin"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-gray-400 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-300"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://linkedin.com/in/m-ilham-pauzan"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-gray-400 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-300"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://instagram.com/zankikarin"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-gray-400 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-300"
          >
            <FaInstagram size={24} />
          </a>
        </div>

        {/* Tagline atau Credit */}
        <p className="text-sm text-gray-500 dark:text-gray-400 italic opacity-80 transition duration-700">
          &quot;Crafting Digital Experiences with Passion &amp; Precision.&quot;
        </p>

        {/* Copyright Text */}
        <p className="text-xs text-gray-400 dark:text-gray-500">
          &copy; {new Date().getFullYear()} Zankikarin. All rights reserved.
        </p>

        {/* Tombol Back to Top */}
        {showButton && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 p-3 bg-gray-800 dark:bg-gray-700 text-white rounded-full shadow-lg 
            hover:bg-gray-600 dark:hover:bg-gray-500 hover:scale-110 transition-all duration-300 ease-in-out opacity-80 
            hover:opacity-100 flex items-center justify-center"
          >
            <FaArrowUp size={20} />
          </button>
        )}
      </div>
    </footer>
  );
};

export default Footer;
