"use client";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import Image from "next/image";

const services = [
  {
    title: "Jasa Pembuatan Website",
    icon: "/website.png",
    background: "/bg1.png",
  },
  {
    title: "Jasa Aplikasi Mobile",
    icon: "/mobile.png",
    background: "/bg2.png",
  },
  {
    title: "Jasa Landing Page",
    icon: "/landing-page.png",
    background: "/bg3.png",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      type: "spring",
      stiffness: 50,
    },
  }),
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function MyServices() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
      className="relative py-20 bg-gray-950 text-gray-100 rounded-3xl"
    >
      {/* Section Header */}
      <div id="services" className="text-center mb-12">
      <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
      My Services
        </h2>
        <p className="font-gotosans mt-4 text-gray-400 text-lg md:text-xl">
          Website, mobile application, and landing page creation services for
          your business and assignment needs.
        </p>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
      {services.map((service, index) => (
          <div key={index} className="relative group">
            {/* Background Asset */}
            <motion.img
              src="/chibii.png"
              alt="Background Asset"
              initial={{
                opacity: 0,
                scale: 0.8,
                x: index % 2 === 0 ? -20 : 50,
                y: -30,
              }}
              animate={{
                opacity: 0.19,
                scale: [0.5, 1, 1],
                rotate: [0, 1, -1, 1],
              }}
              whileInView={{ x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 5,
                ease: "easeOut",
                delay: index * 0.2,
                repeat: Infinity,
                repeatType: "mirror",
              }}
              className={`absolute ${
                index === 0
                  ? "top-[-130px] left-[101px] w-[150px]"
                  : index === 1
                  ? "top-[-210px] left-[29px] transform -translate-x-1/2 w-[200px]"
                  : "top-[-130px] right-[101px] w-[150px]"
              } pointer-events-none z-0`}
            />

            {/* Service Card */}
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              glareEnable
              glareBorderRadius="12px"
              className="w-full"
            >
              <motion.div
                custom={index}
                variants={cardVariants}
                className="relative rounded-xl overflow-hidden shadow-lg bg-white/10 backdrop-blur-md flex flex-col text-center border border-transparent hover:border-orange-200 hover:shadow-2xl transition-all duration-300"
              >
                {/* Icon di Tengah Atas */}
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 z-20">
                  <Image
                    src={service.icon}
                    alt={service.title}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-contain bg-white rounded-full shadow-md group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Overlay Content */}
                <div className="flex flex-col items-center justify-end px-6 pb-6 pt-16 z-10 h-64">
                  {/* Title */}
                  <h3 className="font-gotosans text-xl font-bold text-white mb-4 mt-6">
                    {service.title}
                  </h3>

                  {/* Link Button */}
                  <a
                    href={`https://zan-stein.vercel.app/`}
                    className="font-gotosans flex items-center justify-center gap-2 px-4 py-2 bg-orange-300 text-gray-950 rounded-full hover:bg-orange-200 transition-all"
                  >
                    See More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                </div>
              </motion.div>
            </Tilt>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
