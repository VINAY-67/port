import { useState, useCallback } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Services from "./components/Features.jsx";
import Projects from "./components/Projects.jsx";
import Story from "./components/Story.jsx";
import Skills from "./components/Skills.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const handleLoadComplete = useCallback(() => setLoaded(true), []);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}
      <div className="min-h-screen bg-[#fdf8f8] text-[#1c1b1b]">
        <Navbar loaded={loaded} />
        <main>
          <Hero loaded={loaded} />
          <Services />
          <Projects />
          <Story />
          <Skills />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
