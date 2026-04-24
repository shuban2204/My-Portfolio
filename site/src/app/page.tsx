import Nav from "@/components/nav";
import Hero from "@/components/hero";
import About from "@/components/about";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Research from "@/components/research";
import TechStack from "@/components/tech-stack";
import Achievements from "@/components/achievements";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Spotlight from "@/components/spotlight";

export default function Home() {
  return (
    <>
      <Spotlight />
      <div aria-hidden className="noise" />
      <Nav />
      <main className="relative">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Research />
        <TechStack />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
