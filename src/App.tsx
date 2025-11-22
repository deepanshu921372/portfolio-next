import { useState, useCallback } from 'react';
import LoadingScreen from './components/LoadingScreen';
import WebGLBackground from './components/WebGLBackground';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import NoiseOverlay from './components/NoiseOverlay';
import EasterEgg from './components/EasterEgg';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Stats from './components/Stats';
import Projects from './components/Projects';
import Journey from './components/Journey';
import Education from './components/Education';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import './styles/index.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <LoadingScreen onComplete={handleLoadComplete} />

      {isLoaded && (
        <>
          <WebGLBackground />
          <NoiseOverlay />
          <div className="glitch-overlay"></div>
          <CustomCursor />
          <Navbar />
          <ScrollProgress />
          <EasterEgg />

          <div className="content">
            <Hero />
            <About />
            <Skills />
            <Stats />
            <Projects />
            <Journey />
            <Education />
            <ContactForm />
            <Footer />
          </div>
        </>
      )}
    </>
  );
}

export default App;
