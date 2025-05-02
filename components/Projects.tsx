"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

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
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = [
    "All",
    "Enterprise Solutions",
    "Client Projects",
    "Academic Projects",
    "Professional Training",
    "Personal Development",
  ];

  useEffect(() => {
    async function fetchProjects() {
      try {
        const q = query(
          collection(db, "projects"),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(data);
      } catch (err: any) {
        setError("Gagal mengambil data proyek");
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error)
    return <div className="text-center text-red-600 py-20">{error}</div>;

  return (
    <section id="projects" className="py-20 text-gray-900">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="font-rubik text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-gray-600 bg-clip-text text-transparent">
            My Projects
          </h2>
          <p className="font-rubik mt-4 text-gray-600 text-lg md:text-xl">
            Here are some of the projects I've worked on.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-rubik flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 shadow-md ${
                selectedCategory === category
                  ? "bg-orange-300 text-gray-900 shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="font-rubik grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {projects
              .filter(
                (project) =>
                  selectedCategory === "All" ||
                  project.category === selectedCategory
              )
              .map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
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
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6 text-white text-center">
                      {/* Category Badge */}
                      <span className="absolute top-4 right-4 px-3 py-1 bg-orange-300 text-gray-900 rounded-full text-sm font-medium">
                        {project.category}
                      </span>

                      {/* Tech Icons */}
                      <div className="mt-7 flex flex-wrap justify-center gap-3 mb-4">
                        {project.techIcons.map((icon, i) => (
                          <div
                            key={i}
                            className="bg-white/70 backdrop-blur-md p-3 rounded-full shadow-md flex items-center justify-center w-14 h-14"
                          >
                            <Image
                              src={icon}
                              alt={`Tech icon ${i + 1}`}
                              width={190}
                              height={190}
                              className="object-contain"
                            />
                          </div>
                        ))}
                      </div>

                      {/* Judul & Deskripsi */}
                      <h3 className="text-2xl font-bold">{project.title}</h3>
                      <p className="text-sm text-gray-300  line-clamp-3">
                        {project.description}
                      </p>

                      {/* Tombol Dinamis & See Details */}
                      <div className="font-rubik mt-1 flex gap-4 items-center">
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
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
