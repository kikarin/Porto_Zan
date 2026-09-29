"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PiArrowUpRightBold } from "react-icons/pi";
import Container from "./Container";
import SectionHeader from "./ui/SectionHeader";
import Reveal from "./ui/Reveal";
import { trackSpotlight } from "./ui/spotlight";

const SERVICE_URL = "https://zan-stein.vercel.app/";

const services = [
  {
    no: "01",
    title: "Jasa Pembuatan Website",
    icon: "/website.png",
    description:
      "Company profile, sistem informasi, dashboard admin, sampai toko online. Dibangun dengan Laravel, Next.js, atau Nuxt — disesuaikan dengan kebutuhan dan budget Anda.",
    tags: ["Laravel", "Next.js", "Dashboard admin", "SEO-ready"],
    featured: true,
  },
  {
    no: "02",
    title: "Jasa Aplikasi Mobile",
    icon: "/mobile.png",
    description:
      "Aplikasi Android dengan Flutter, dari MVP sampai aplikasi yang terhubung ke API dan Firebase.",
    tags: ["Flutter", "Firebase", "REST API"],
  },
  {
    no: "03",
    title: "Jasa Landing Page",
    icon: "/landing-page.png",
    description:
      "Satu halaman yang fokus membuat pengunjung bertindak: daftar, beli, atau menghubungi Anda.",
    tags: ["Responsive", "Cepat dimuat", "Animasi halus"],
  },
];

export default function MyServices() {
  return (
    <section id="services" className="relative scroll-mt-24 pb-24 pt-28 md:pb-36 md:pt-40">
      <Container>
        <SectionHeader
          index="01"
          eyebrow="Services"
          title={
            <>
              Things I can <em className="font-normal italic text-accent">build</em> for you
            </>
          }
          description="Website, aplikasi mobile, dan landing page untuk kebutuhan bisnis maupun tugas akademik."
        />

        <div className="grid gap-5 md:grid-cols-2 md:grid-rows-2">
          {services.map((service, i) => (
            <Reveal
              key={service.title}
              delay={i * 0.08}
              className={`h-full ${service.featured ? "md:row-span-2" : ""}`}
            >
              <a
                href={SERVICE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={trackSpotlight}
                data-cursor="Open"
                className={`spotlight group relative flex h-full flex-col overflow-hidden rounded-[2rem] p-7 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-lift md:p-9 ${
                  service.featured
                    ? "min-h-[420px] bg-sand shadow-soft md:min-h-full"
                    : "surface min-h-[240px]"
                }`}
              >
                <div className="flex items-start justify-between">
                  <motion.span
                    whileHover={{ rotate: [0, -12, 10, 0], transition: { duration: 0.5 } }}
                    className={`grid place-items-center rounded-2xl bg-white shadow-soft transition-transform duration-500 ease-spring group-hover:-rotate-6 group-hover:scale-110 ${
                      service.featured ? "h-20 w-20" : "h-14 w-14"
                    }`}
                  >
                    <Image
                      src={service.icon}
                      alt=""
                      width={56}
                      height={56}
                      className={service.featured ? "h-12 w-12" : "h-8 w-8"}
                    />
                  </motion.span>
                  <span className="font-mono text-xs text-ink-faint">{service.no}</span>
                </div>

                <div className={service.featured ? "mt-auto pt-16" : "mt-auto pt-8"}>
                  <h3
                    className={`font-display font-semibold tracking-[-0.03em] text-ink ${
                      service.featured ? "text-4xl md:text-5xl" : "text-2xl md:text-[1.75rem]"
                    }`}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={`mt-3 max-w-[46ch] leading-relaxed text-ink-muted ${
                      service.featured ? "text-lg" : "text-[0.95rem]"
                    }`}
                  >
                    {service.description}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <ul className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-lg bg-white/70 px-2.5 py-1 font-mono text-[11px] text-ink-soft ring-1 ring-ink/5"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-canvas transition-all duration-300 ease-spring group-hover:rotate-45 group-hover:bg-accent">
                      <PiArrowUpRightBold aria-hidden />
                      <span className="sr-only">Lihat detail {service.title}</span>
                    </span>
                  </div>
                </div>

                {service.featured && (
                  <Image
                    src="/chibii.png"
                    alt=""
                    width={220}
                    height={220}
                    className="pointer-events-none absolute -right-6 top-10 w-36 rotate-6 opacity-90 drop-shadow-xl transition-transform duration-700 ease-spring group-hover:-translate-y-2 group-hover:rotate-[-4deg] md:w-48"
                  />
                )}
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
