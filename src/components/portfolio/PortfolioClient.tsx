'use client';

import { useState, useCallback } from 'react';
import type { PortfolioData } from '@/types/portfolio';
import LoadingScreen from './LoadingScreen';
import WebGLBackground from './WebGLBackground';
import CustomCursor from './CustomCursor';
import Navbar from './Navbar';
import ScrollProgress from './ScrollProgress';
import NoiseOverlay from './NoiseOverlay';
import EasterEgg from './EasterEgg';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Stats from './Stats';
import Projects from './Projects';
import Journey from './Journey';
import Education from './Education';
import ContactForm from './ContactForm';
import Footer from './Footer';

interface PortfolioClientProps {
  data: PortfolioData;
}

export default function PortfolioClient({ data }: PortfolioClientProps) {
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
          <Navbar personalData={data.personal} />
          <ScrollProgress />
          <EasterEgg />

          <div className="content">
            <Hero personalData={data.personal} />
            <About personalData={data.personal} />
            <Skills skillsData={data.skills} />
            <Stats statsData={data.stats} />
            <Projects projectsData={data.projects} />
            <Journey journeyData={data.journey} />
            <Education educationData={data.education} />
            <ContactForm personalData={data.personal} />
            <Footer personalData={data.personal} />
          </div>
        </>
      )}
    </>
  );
}
