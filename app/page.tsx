import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MyServices from "@/components/MyServices";
import TechStack from "@/components/TechStack";
import AboutMe from "@/components/AboutMe";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Container from "@/components/Container"; 

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
