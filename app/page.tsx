// app/page.tsx
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MyServices from "@/components/MyServices";
import TechStack from "@/components/TechStack";
import AboutMe from "@/components/AboutMe";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Container from "@/components/Container";

// 🔧 Tambahkan ini untuk SEO
export const metadata: Metadata = {
  title: "Zan Portfolio | Fullstack Developer",
  description: "Hi, I'm Zan — a passionate fullstack developer. Explore my projects, tech stack, certifications, and how to contact me.",
  openGraph: {
    title: "Zan Portfolio",
    description: "Explore my fullstack developer projects, tech stack, and certifications.",
    url: "https://your-domain.com", // ganti dengan domain kamu
    siteName: "Zan's Portfolio",
    images: [
      {
        url: "https://your-domain.com/og-home.jpg", // siapkan og:image (misal thumbnail dari Hero)
        width: 1200,
        height: 630,
        alt: "Zan's Portfolio Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zan Portfolio",
    description: "Visit Zan's portfolio website to explore his fullstack work and skills.",
    images: ["https://your-domain.com/og-home.jpg"],
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <Container>
        <Hero />
        <MyServices />
        <AboutMe />
        <TechStack />
        <Projects />
        <Certifications />
        <Contact />
      </Container>
    </>
  );
}
