"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { PiArrowDownRightBold, PiDownloadSimpleBold, PiHandPointingBold } from "react-icons/pi";
import Container from "./Container";
import Magnetic from "./ui/Magnetic";
import { CV_HREF } from "@/lib/site";

const rotatingWords = ["Laravel", "Next.js", "Flutter", "Vue.js", "React"];

const stickers = [
  { label: "Laravel", img: "/laravel.png", className: "left-[2%] top-[30%]", rotate: -10 },
  { label: "Node.js", img: "/nodejs.png", className: "right-[0%] top-[18%]", rotate: 8 },
  { label: "Flutter", img: "/flutter.png", className: "right-[4%] bottom-[22%]", rotate: -6 },
];

const marqueeItems = [
  "Web apps",
  "Mobile apps",
  "Landing pages",
  "Dashboards",
  "REST APIs",
  "Company profiles",
  "Maintenance",
  "Troubleshooting",
];

function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % rotatingWords.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-flex h-[1.15em] min-w-[5.2ch] items-center overflow-hidden rounded-2xl bg-accent px-3 align-middle text-white shadow-accent">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={rotatingWords[index]}
          initial={{ y: "110%", rotate: 6 }}
          animate={{ y: "0%", rotate: 0 }}
          exit={{ y: "-110%", rotate: -6 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="block"
        >
          {rotatingWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function HeroWordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end center"] });
  const clipPath = useTransform(scrollYProgress, [0.1, 0.9], ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]);
  const x = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none relative mt-8 -mb-[11vw] select-none overflow-hidden text-center md:mt-4"
    >
      <motion.div
        style={{ x }}
        className="relative inline-block font-display text-[34vw] font-bold leading-[0.78] tracking-[-0.075em]"
      >
        <span className="block text-transparent" style={{ WebkitTextStroke: "1.5px rgba(29, 26, 22, 0.2)" }}>
          kikarin.
        </span>
        <motion.span style={{ clipPath }} className="absolute inset-0 block text-ink/[0.07]">
          kikarin<span className="text-accent/40">.</span>
        </motion.span>
      </motion.div>
    </div>
  );
}

export default function Hero({ showWordmark = false }: { showWordmark?: boolean }) {
  const [revealed, setRevealed] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-[100dvh] scroll-mt-24 flex-col justify-between overflow-hidden pt-28 md:pt-32"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
          <motion.div style={{ y: textY }} className="relative z-raised">
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 12, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              whileHover={{ rotate: 0, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 16 }}
              className="group inline-flex items-stretch overflow-hidden rounded-xl bg-ink text-sm text-canvas shadow-lift"
            >
              <span className="flex items-center gap-2.5 py-2 pl-3 pr-3.5 font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-emerald-400" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Available for freelance
              </span>
              <span className="flex items-center border-l border-dashed border-canvas/20 bg-accent px-3 font-mono text-[11px] uppercase tracking-[0.12em] text-white transition-colors group-hover:bg-accent-600">
                Bogor, ID
              </span>
            </motion.a>

            <h1 className="mt-7 font-display font-semibold tracking-[-0.045em] text-ink">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 90, damping: 16 }}
                className="block text-2xl font-normal tracking-tight text-ink-muted md:text-3xl"
              >
                Hello! I&apos;m
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 90, damping: 16 }}
                className="relative mt-1 block text-[clamp(3.4rem,10vw,7.5rem)] leading-[0.88]"
              >
                Ilham{" "}
                <span className="relative inline-block">
                  Pauzan
                  <svg
                    aria-hidden
                    viewBox="0 0 300 24"
                    preserveAspectRatio="none"
                    className="absolute -bottom-2 left-0 h-4 w-full text-accent md:-bottom-3 md:h-5"
                  >
                    <motion.path
                      d="M3 16 C 60 4, 110 22, 160 12 S 260 4, 297 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="6"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.9, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </svg>
                </span>
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, type: "spring", stiffness: 90, damping: 16 }}
                className="mt-6 block text-[clamp(1.6rem,3.6vw,2.6rem)] font-medium leading-[1.15] tracking-[-0.03em] text-ink-soft"
              >
                Fullstack developer who ships with <RotatingWord />
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-7 max-w-[52ch] text-lg leading-relaxed text-ink-muted"
            >
              Membangun solusi digital dengan pendekatan kolaboratif — aplikasi web dan mobile yang
              responsif, cepat, dan enak dipakai.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4"
            >
              <Magnetic>
                <a href="#projects" className="btn-primary group">
                  See my work
                  <PiArrowDownRightBold className="transition-transform duration-300 ease-spring group-hover:rotate-[-45deg]" />
                </a>
              </Magnetic>
              <a href={CV_HREF} download className="link-underline">
                <PiDownloadSimpleBold />
                Download CV
              </a>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
              className="mt-12 grid max-w-md grid-cols-3 divide-x divide-ink/10 border-t border-ink/10 pt-6"
            >
              {[
                { value: "20+", label: "Projects shipped" },
                { value: "5", label: "Certifications" },
                { value: "2", label: "Web & mobile" },
              ].map((stat, i) => (
                <div key={stat.label} className={i === 0 ? "pr-4" : "px-4"}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-3xl font-semibold tabular-nums tracking-tight text-ink md:text-4xl">
                    {stat.value}
                  </dd>
                  <dd className="mt-1 text-xs leading-snug text-ink-muted">{stat.label}</dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          <motion.div
            ref={stageRef}
            style={{ y: photoY }}
            initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.25, type: "spring", stiffness: 70, damping: 16 }}
            className="relative mx-auto aspect-square w-full max-w-[560px]"
          >
            <motion.div
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[6%] rounded-full border-2 border-dashed border-accent/25"
            />

            <button
              type="button"
              onMouseEnter={() => setRevealed(true)}
              onMouseLeave={() => setRevealed(false)}
              onFocus={() => setRevealed(true)}
              onBlur={() => setRevealed(false)}
              onClick={() => setRevealed((v) => !v)}
              aria-label="Reveal my toolbox"
              aria-pressed={revealed}
              data-cursor="Peek"
              className="absolute inset-0 cursor-pointer rounded-full"
            >
              <Image
                src="/gua.png"
                alt="Ilham Pauzan wearing a beige overshirt, hands in pockets"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 560px"
                className="object-contain"
              />
              <motion.span
                className="absolute inset-0"
                initial={false}
                animate={{
                  opacity: revealed ? 1 : 0,
                  scale: revealed ? 0.30 : 0.94,
                  x: -44,
                  y: -44,
                  filter: revealed ? "blur(0px)" : "blur(8px)",
                }}
                transition={{ type: "spring", stiffness: 160, damping: 18 }}
              >
                <Image
                  src="/asset.png"
                  alt=""
                  fill
                  sizes="(max-width: 720px) 10vw, 560px"
                  className="object-contain"
                />
              </motion.span>
            </button>

            {stickers.map((sticker, i) => (
              <motion.div
                key={sticker.label}
                data-cursor="Drag"
                drag
                dragConstraints={stageRef}
                dragElastic={0.35}
                dragTransition={{ bounceStiffness: 300, bounceDamping: 14 }}
                whileHover={{ scale: 1.08, rotate: 0 }}
                whileDrag={{ scale: 1.15, rotate: 0, cursor: "grabbing" }}
                initial={{ opacity: 0, scale: 0.4, rotate: sticker.rotate }}
                animate={{ opacity: 1, scale: 1, rotate: sticker.rotate }}
                transition={{ delay: 0.9 + i * 0.12, type: "spring", stiffness: 220, damping: 14 }}
                className={`absolute z-raised flex cursor-grab touch-none items-center gap-2 rounded-2xl bg-white/90 py-2 pl-2 pr-4 shadow-lift ring-1 ring-ink/5 backdrop-blur ${sticker.className}`}
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-canvas">
                  <Image src={sticker.img} alt="" width={24} height={24} className="h-6 w-6 object-contain" />
                </span>
                <span className="text-sm font-semibold text-ink">{sticker.label}</span>
              </motion.div>
            ))}

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="absolute bottom-[6%] left-[4%] hidden items-center gap-1.5 font-mono text-[11px] text-ink-muted sm:flex"
            >
              <PiHandPointingBold className="animate-wiggle text-accent" />
              psst — drag the stickers
            </motion.span>
          </motion.div>
        </div>
      </Container>

      {showWordmark && <HeroWordmark />}

      <div
        className={`relative -rotate-[1.5deg] bg-accent py-4 text-white shadow-accent ${
          showWordmark ? "" : "mt-14 md:mt-10"
        }`}
      >
        <div className="mask-fade-x flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10 hover:[animation-play-state:paused]">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-10 whitespace-nowrap font-display text-2xl font-medium tracking-tight md:text-3xl"
              >
                {item}
                <span aria-hidden className="text-accent-200">✺</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
