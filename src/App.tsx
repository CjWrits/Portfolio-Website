import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import EasterEggs from './components/easterEggs/EasterEggs';
import NotFound from './components/NotFound';

function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleToggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  // Check if current route is homepage
  const isHome = pathname === '/' || pathname === '' || pathname.toLowerCase() === '/index.html';

  if (!isHome) {
    return (
      <NotFound
        onReturnHome={() => {
          window.history.pushState({}, '', '/');
          setPathname('/');
        }}
      />
    );
  }

  return (
    <div className="overflow-x-hidden">
      <EasterEggs
        isCommandPaletteOpen={isCommandPaletteOpen}
        onCloseCommandPalette={() => setIsCommandPaletteOpen(false)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        isFlipped={isFlipped}
        onToggleFlip={handleToggleFlip}
      />
      <LoadingScreen />
      <Navbar
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onTriggerFlip={handleToggleFlip}
        isFlipped={isFlipped}
      />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
