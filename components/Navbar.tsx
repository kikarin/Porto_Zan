"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PiListBold, PiXBold, PiArrowUpRightBold } from "react-icons/pi";
import Magnetic from "./ui/Magnetic";

const navItems = [
  { label: "Home", to: "hero" },
  { label: "Services", to: "services" },
  { label: "About", to: "about" },
  { label: "Stack", to: "techstack" },
  { label: "Work", to: "projects" },
  { label: "Contact", to: "contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.to))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-modal -translate-y-24 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-canvas transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="fixed inset-x-0 top-0 z-nav"
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-5 pt-4 sm:px-8"
        >
          <Link
            href="/"
            aria-label="Zan — back to top"
            className="group flex items-center gap-2.5 rounded-2xl"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/80 shadow-soft ring-1 ring-ink/5 backdrop-blur transition-transform duration-300 ease-spring group-hover:-rotate-6 group-hover:scale-105">
              <Image src="/logo-ts.png" alt="" width={32} height={32} className="h-7 w-auto" />
            </span>
            <span className="hidden font-display text-lg font-semibold tracking-tight sm:inline">
              zan<span className="text-accent">.</span>
            </span>
          </Link>

          <ul
            className={`isolate hidden items-center gap-1 rounded-full p-1.5 transition-all duration-300 md:flex ${
              scrolled
                ? "bg-white/75 shadow-soft ring-1 ring-ink/[0.06] backdrop-blur-xl"
                : "bg-white/40 ring-1 ring-ink/[0.04] backdrop-blur"
            }`}
          >
            {navItems.map((item) => {
              const isActive = active === item.to;
              return (
                <li key={item.to}>
                  <a
                    href={`#${item.to}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive ? "text-canvas" : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-ink"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Magnetic className="hidden md:inline-flex">
              <a href="#contact" className="btn-accent group !px-5 !py-2.5 text-sm">
                Let&apos;s talk
                <PiArrowUpRightBold className="transition-transform duration-200 group-hover:rotate-45" />
              </a>
            </Magnetic>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="relative z-overlay grid h-11 w-11 place-items-center rounded-2xl bg-white/80 text-xl text-ink shadow-soft ring-1 ring-ink/5 backdrop-blur transition-transform active:scale-95 md:hidden"
            >
              {menuOpen ? <PiXBold /> : <PiListBold />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "circle(0% at calc(100% - 42px) 38px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 42px) 38px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 42px) 38px)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[45] flex flex-col justify-between bg-canvas px-6 pb-10 pt-28 md:hidden"
          >
            <ul className="space-y-1">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.to}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.05, type: "spring", stiffness: 140, damping: 18 }}
                >
                  <a
                    href={`#${item.to}`}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-baseline gap-4 py-2"
                  >
                    <span className="font-mono text-xs text-ink-faint">0{i + 1}</span>
                    <span
                      className={`font-display text-5xl font-semibold tracking-tight transition-colors ${
                        active === item.to ? "text-accent" : "text-ink group-hover:text-accent"
                      }`}
                    >
                      {item.label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.a
              href="mailto:milhampauzan@gmail.com"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-ink-muted"
            >
              milhampauzan@gmail.com
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
