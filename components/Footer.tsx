"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  PiGithubLogoBold,
  PiLinkedinLogoBold,
  PiInstagramLogoBold,
  PiArrowUpBold,
} from "react-icons/pi";
import { EMAIL, SOCIAL_LINKS } from "@/lib/site";

const socials = [
  { label: "GitHub", href: SOCIAL_LINKS.github, icon: PiGithubLogoBold },
  { label: "LinkedIn", href: SOCIAL_LINKS.linkedin, icon: PiLinkedinLogoBold },
  { label: "Instagram", href: SOCIAL_LINKS.instagram, icon: PiInstagramLogoBold },
];

const Footer = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="relative overflow-hidden border-t border-ink/[0.08] pt-14">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-10 px-5 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="max-w-[30ch] font-display text-2xl font-medium leading-snug tracking-tight text-ink">
            Crafting digital experiences with passion &amp; precision.
          </p>
          <a href={`mailto:${EMAIL}`} className="link-underline mt-4 text-ink-muted">
            {EMAIL}
          </a>
        </div>

        <div className="flex flex-col gap-5 md:items-end">
          <ul className="flex gap-2.5">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-2xl bg-white/70 text-lg text-ink ring-1 ring-ink/[0.06] transition-all duration-300 ease-spring hover:-translate-y-1 hover:rotate-6 hover:bg-ink hover:text-canvas"
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
          <p className="font-mono text-xs text-ink-faint">
            &copy; {new Date().getFullYear()} Zankikarin · Made in Bogor
          </p>
        </div>
      </div>

      <p
        aria-hidden
        className="pointer-events-none mt-10 select-none text-center font-display text-[26vw] font-bold leading-[0.72] tracking-[-0.07em] text-ink/[0.06]"
      >
        zan<span className="text-accent/40">.</span>
      </p>

      <AnimatePresence>
        {showButton && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-sticky grid h-12 w-12 place-items-center rounded-2xl bg-ink text-canvas shadow-lift transition-colors hover:bg-accent"
          >
            <PiArrowUpBold />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
