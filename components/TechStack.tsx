"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Container from "./Container";
import SectionHeader from "./ui/SectionHeader";
import Reveal from "./ui/Reveal";

const techStack = [
  { name: "HTML", img: "/html.webp", category: "Language" },
  { name: "CSS", img: "/css.webp", category: "Language" },
  { name: "JavaScript", img: "/js.webp", category: "Language" },
  { name: "TypeScript", img: "/ts.png", category: "Language" },
  { name: "PHP", img: "/php.webp", category: "Language" },
  { name: "Python", img: "/python.webp", category: "Language" },
  { name: "Dart", img: "/dart.webp", category: "Language" },
  { name: "Java", img: "/java.png", category: "Language" },
  { name: "C++", img: "/c++.png", category: "Language" },
  { name: "Golang", img: "/golang.png", category: "Language" },
  { name: "Tailwind CSS", img: "/tailwind.png", category: "Styling" },
  { name: "Bootstrap", img: "/bootstrap.png", category: "Styling" },
  { name: "Chakra UI", img: "/chakra.png", category: "Styling" },
  { name: "React.js", img: "/react.png", category: "Framework & Library" },
  { name: "Vite", img: "/vite.svg", category: "Framework & Library" },
  { name: "Laravel", img: "/laravel.png", category: "Framework & Library" },
  { name: "Flutter", img: "/flutter.png", category: "Framework & Library" },
  { name: "Express.js", img: "/express.png", category: "Framework & Library" },
  { name: "Next.js", img: "/next.svg", category: "Framework & Library" },
  { name: "Vue.js", img: "/vuejs.png", category: "Framework & Library" },
  { name: "Node.js", img: "/nodejs.png", category: "Framework & Library" },
  { name: "Three.js", img: "/three.png", category: "Framework & Library" },
  { name: "Postman", img: "/postman.png", category: "API" },
  { name: "MySQL", img: "/mysql.png", category: "Database" },
  { name: "PostgreSQL", img: "/postgresql.svg", category: "Database" },
  { name: "MariaDB", img: "/mariadb.png", category: "Database" },
  { name: "Firebase", img: "/firebase.png", category: "Database" },
  { name: "GitHub", img: "/github.png", category: "Version Control" },
  { name: "GitLab", img: "/gitlab.png", category: "Version Control" },
  { name: "Bitbucket", img: "/bitbucket.svg", category: "Version Control" },
  { name: "Git Bash", img: "/git.png", category: "Version Control" },
  { name: "Vercel", img: "/vercel1868.jpg", category: "Deployment" },
  { name: "Ubuntu Server", img: "/ubuntu.png", category: "Deployment" },
];

const categories = [
  "All",
  "Language",
  "Framework & Library",
  "Styling",
  "Database",
  "API",
  "Version Control",
  "Deployment",
];

export default function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categoryCounts = useMemo(
    () =>
      techStack.reduce<Record<string, number>>((acc, tech) => {
        acc[tech.category] = (acc[tech.category] || 0) + 1;
        return acc;
      }, {}),
    []
  );

  const filtered = useMemo(
    () =>
      techStack.filter((tech) => selectedCategory === "All" || tech.category === selectedCategory),
    [selectedCategory]
  );

  return (
    <section id="techstack" className="relative scroll-mt-24 py-24 md:py-36">
      <Container>
        <SectionHeader
          index="03"
          eyebrow="Toolbox"
          title={
            <>
              My daily <em className="font-normal italic text-accent">toolbox</em>
            </>
          }
          description="Bahasa, framework, dan tools yang saya pakai untuk membangun project dari nol sampai deploy."
          aside={
            <p className="font-display text-7xl font-semibold tabular-nums leading-none tracking-tighter text-ink/10 md:text-8xl">
              {String(techStack.length).padStart(2, "0")}
            </p>
          }
        />

        <Reveal className="-mx-5 mb-10 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:px-0">
          <div role="tablist" aria-label="Filter tech stack" className="isolate flex w-max gap-1.5 rounded-full bg-sand p-1.5">
            {categories.map((category) => {
              const count = category === "All" ? techStack.length : categoryCounts[category] || 0;
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(category)}
                  className={`relative flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive ? "text-canvas" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="tech-tab"
                      className="absolute inset-0 -z-10 rounded-full bg-ink"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{category}</span>
                  <span
                    className={`relative font-mono text-[11px] tabular-nums ${
                      isActive ? "text-accent-200" : "text-ink-faint"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <motion.ul layout className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((tech, i) => (
              <motion.li
                key={tech.name}
                layout
                initial={{ opacity: 0, scale: 0.85, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ y: -6, rotate: i % 2 === 0 ? -3 : 3 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: Math.min(i * 0.02, 0.3) }}
                className="group relative flex flex-col items-center gap-3 rounded-3xl bg-white/70 px-3 pb-4 pt-6 shadow-soft ring-1 ring-ink/[0.05] backdrop-blur-sm transition-shadow duration-300 hover:shadow-lift"
              >
                <span className="relative grid h-16 w-16 place-items-center">
                  <Image
                    src={tech.img}
                    alt=""
                    width={56}
                    height={56}
                    className="relative h-12 w-12 object-contain transition-transform duration-500 ease-spring group-hover:scale-110"
                  />
                </span>
                <span className="text-center text-sm font-semibold text-ink">{tech.name}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">
                  {tech.category === "Framework & Library" ? "Framework" : tech.category}
                </span>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </Container>
    </section>
  );
}
