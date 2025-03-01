import Navbar from "@/components/Navbar";
import Hero from "../components/Hero";
import MyServices from "../components/MyServices";
import TechStack from "../components/TechStack";
import AboutMe from "../components/AboutMe";
import Projects from "../components/Projects";
import Certifications from "../components/Certifications";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <MyServices />
      <AboutMe />
      <TechStack />
      <Projects />
      <Certifications />
      <Contact />
    </>
  );
}
