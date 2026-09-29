"use client";

import { useEffect, useState } from "react";

const SECTION_TONES: Record<string, string> = {
  hero: "#f6f1e9",
  services: "#efe6d8",
  about: "#f6f1e9",
  techstack: "#f4e8de",
  projects: "#ebe1d1",
  certifications: "#f6f1e9",
  contact: "#f7e3d5",
};

export default function SectionTones() {
  const [tone, setTone] = useState(SECTION_TONES.hero);

  useEffect(() => {
    const sections = Object.keys(SECTION_TONES)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setTone(SECTION_TONES[entry.target.id]);
        });
      },
      { rootMargin: "-45% 0px -55% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden
      style={{ backgroundColor: tone }}
      className="pointer-events-none fixed inset-0 -z-[6] transition-colors duration-700 ease-out"
    />
  );
}
