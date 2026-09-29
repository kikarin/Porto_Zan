"use client";

import Image from "next/image";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import {
  PiMapPinBold,
  PiBriefcaseBold,
  PiEnvelopeSimpleBold,
  PiGraduationCapBold,
  PiInstagramLogoBold,
  PiGithubLogoBold,
  PiLinkedinLogoBold,
  PiDownloadSimpleBold,
} from "react-icons/pi";
import Container from "./Container";
import Reveal from "./ui/Reveal";
import { CV_HREF, EMAIL, SOCIAL_LINKS } from "@/lib/site";

const facts = [
  { icon: PiBriefcaseBold, label: "Kerja", value: "CV Summit Citra Teknologi" },
  { icon: PiGraduationCapBold, label: "Kuliah", value: "Sistem Informasi, Universitas Terbuka" },
  { icon: PiMapPinBold, label: "Domisili", value: "Kota Bogor" },
  { icon: PiEnvelopeSimpleBold, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
];

const socials = [
  { label: "Instagram", href: SOCIAL_LINKS.instagram, icon: PiInstagramLogoBold },
  { label: "GitHub", href: SOCIAL_LINKS.github, icon: PiGithubLogoBold },
  { label: "LinkedIn", href: SOCIAL_LINKS.linkedin, icon: PiLinkedinLogoBold },
];

export default function AboutMe() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 md:py-36">
      <Container>
        <div className="grid items-start gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal className="relative mx-auto w-full max-w-sm lg:sticky lg:top-28">
            <Tilt
              tiltMaxAngleX={8}
              tiltMaxAngleY={8}
              glareEnable
              glareMaxOpacity={0.25}
              glareBorderRadius="28px"
              scale={1.02}
              transitionSpeed={1200}
            >
              <motion.figure
                initial={{ rotate: -4 }}
                whileHover={{ rotate: 0 }}
                transition={{ type: "spring", stiffness: 160, damping: 14 }}
                className="relative rounded-[28px] bg-white p-3 pb-16 shadow-lift ring-1 ring-ink/5"
              >
                <span
                  aria-hidden
                  className="absolute -top-3 left-1/2 z-raised h-7 w-28 -translate-x-1/2 rotate-[-3deg] rounded-sm bg-accent-200/80 shadow-sm"
                />
                <div className="relative aspect-[3/4] overflow-hidden rounded-[20px] bg-sand">
                  <Image
                    src="/new.jpeg"
                    alt="Portrait of Muhammad Ilham Pauzan"
                    fill
                    sizes="(max-width: 1024px) 90vw, 380px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="absolute inset-x-0 bottom-4 flex items-center justify-between px-6">
                  <span className="font-display text-xl font-semibold tracking-tight">Ilham Pauzan</span>
                  <span className="font-mono text-[11px] text-ink-muted">fullstack dev</span>
                </figcaption>
              </motion.figure>
            </Tilt>

            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: 12 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 12 }}
              className="absolute -right-4 top-10 z-raised grid h-24 w-24 place-items-center rounded-full bg-accent text-center font-display text-sm font-semibold leading-tight text-white shadow-accent md:-right-8"
            >
              20+
              <br />
              projects
            </motion.div>

            <ul className="mt-8 flex justify-center gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid h-12 w-12 place-items-center rounded-2xl bg-white/80 text-xl text-ink shadow-soft ring-1 ring-ink/5 transition-all duration-300 ease-spring hover:-translate-y-1 hover:rotate-6 hover:bg-ink hover:text-canvas"
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <div>
            <Reveal>
              <span className="eyebrow">
                <span className="text-accent-600">02</span>
                <span className="h-px w-8 bg-ink/20" />
                About me
              </span>
              <h2 className="section-title mt-5">
                Hi, I&apos;m <span className="text-accent">Ilham</span> — I like turning messy
                requirements into software that works.
              </h2>
            </Reveal>

            <Reveal delay={0.1} className="mt-8 max-w-[62ch] space-y-5 text-lg leading-relaxed text-ink-soft">
              <p>
                Saya <strong className="font-semibold text-ink">Fullstack Developer</strong> di CV Summit
                Citra Teknologi yang berfokus pada pengembangan aplikasi web dan mobile. Saat ini saya
                kuliah Sistem Informasi di Universitas Terbuka, setelah menyelesaikan SMK Negeri 4 Kota
                Bogor jurusan Pengembangan Perangkat Lunak dan Gim (PPLG).
              </p>
              <p>
                Saya terlibat dalam pengembangan dan maintenance sistem untuk instansi pemerintahan,
                perusahaan, dan klien, menggunakan Laravel, Vue.js, React, Next.js, Nuxt, Flutter, dan
                teknologi modern lainnya.
              </p>
              <p className="text-ink-muted">
                Saya terbiasa bekerja dengan existing system, membangun fitur baru, troubleshooting, dan
                beradaptasi dengan kebutuhan tiap project. Sejauh ini saya sudah terlibat di lebih dari
                20 proyek digital — dan masih terus belajar.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <dl className="mt-10 grid gap-px overflow-hidden rounded-3xl bg-ink/[0.07] ring-1 ring-ink/[0.07] sm:grid-cols-2">
                {facts.map(({ icon: Icon, label, value, href }) => (
                  <div
                    key={label}
                    className="group flex items-center gap-4 bg-canvas/95 p-5 transition-colors duration-200 hover:bg-white"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-50 text-lg text-accent-600 transition-transform duration-300 ease-spring group-hover:-rotate-12 group-hover:scale-110">
                      <Icon />
                    </span>
                    <div className="min-w-0">
                      <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
                        {label}
                      </dt>
                      <dd className="truncate font-medium text-ink">
                        {href ? (
                          <a href={href} className="hover:text-accent-600">
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a href={CV_HREF} download className="btn-primary group">
                <PiDownloadSimpleBold className="transition-transform duration-300 group-hover:translate-y-0.5" />
                Download CV
              </a>
              <a href="#contact" className="link-underline">
                Or just say hello
              </a>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
