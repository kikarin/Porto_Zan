"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { HiEye, HiEyeOff } from "react-icons/hi";
import Image from "next/image";

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
  {
    name: "Node.js",
    img: "/nodejs.png",
    category: "FraFramework & Librarymework",
  },
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
  "Styling",
  "Database",
  "Framework & Library",
  "API",
  "Version Control",
  "Deployment",
];

export default function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isVisible, setIsVisible] = useState(false);

  const categoryCounts = useMemo(() => {
    return techStack.reduce((acc, tech) => {
      acc[tech.category] = (acc[tech.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, []);

  return (
    <section id="techstack" className="py-20 text-gray-100 relative">
      {/* Tombol Show/Hide */}
      <div className="flex justify-center mb-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsVisible(!isVisible)}
          className="font-rubik flex items-center gap-2 px-6 py-2 bg-gray-900 text-gray-300 rounded-full shadow-md hover:bg-orange-300 hover:text-gray-900 transition-all"
          aria-label={isVisible ? "Hide Tech Stack" : "Show Tech Stack"}
        >
          {isVisible ? <HiEyeOff size={20} /> : <HiEye size={20} />}
          {isVisible ? "Hide Tech Stack" : "Show Tech Stack"}
        </motion.button>
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            {/* Judul */}
            <div className="text-center mb-10">
              <h2 className="mt-4 font-rubik text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-800 via-gray-900 to-gray-600 bg-clip-text text-transparent drop-shadow-lg">
                My Tech Stack
              </h2>
              <p className="font-rubik mt-4 text-gray-600 text-lg md:text-xl">
                Technologies I use to craft amazing projects.
              </p>
            </div>

            {/* Filter Button */}
            <div className="font-rubik flex flex-wrap justify-center gap-4 mb-8">
              {categories.map((category) => {
                const count =
                  category === "All"
                    ? techStack.length
                    : categoryCounts[category] || 0;

                return (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.1 }}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition ${selectedCategory === category
                        ? "bg-orange-300 text-gray-900 shadow-lg"
                        : "bg-gray-800 text-gray-300 hover:bg-orange-300 hover:text-gray-900"
                      }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category} ({count})
                  </motion.button>
                );
              })}
            </div>

            {/* Grid Tech Stack */}
            <div className="flex justify-center">
              <motion.div
                layout
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
              >
                <AnimatePresence>
                  {techStack
                    .filter(
                      (tech) =>
                        selectedCategory === "All" ||
                        tech.category === selectedCategory
                    )
                    .map((tech, index) => (
                      <Tilt
                        key={index}
                        tiltMaxAngleX={5}
                        tiltMaxAngleY={5}
                        glareEnable={false}
                        className="w-full"
                      >
                        <motion.div
                          key={tech.name}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="relative flex flex-col items-center p-4 w-[150px] md:w-[180px] h-[160px] md:h-[180px] rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 hover:from-orange-400 hover:to-orange-300 transition-all duration-300 shadow-lg group overflow-hidden"
                        >
                          <div className="relative w-20 h-20 mb-4">
                            {/* Shadow Bulat */}
                            <div className="absolute inset-0 rounded-full bg-orange-100 opacity-30 blur-xl" />
                            {/* Icon */}
                            <Image
                              src={tech.img}
                              alt={`${tech.name} logo`}
                              width={64}
                              height={64}
                              className="relative w-20 h-20 object-contain transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                          <h3 className="font-gotosans mt-3 text-sm md:text-lg font-semibold text-gray-100 group-hover:text-gray-900 transition-colors duration-300">
                            {tech.name}
                          </h3>
                        </motion.div>
                      </Tilt>
                    ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
