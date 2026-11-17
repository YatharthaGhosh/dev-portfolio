import { MotionConfig } from "motion/react";
import Backdrop from "./components/Backdrop";
import Navbar from "./components/Navbar";
import Hero from "./components/hero/Hero";
import Projects from "./components/projects/Projects";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    // reducedMotion="user" turns off movement animations for visitors who ask their OS for less motion.
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Backdrop />
      <Navbar />
      <main id="main">
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
