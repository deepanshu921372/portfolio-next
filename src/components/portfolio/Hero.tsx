'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { PersonalData } from '@/types/portfolio';
import MagneticButton from './MagneticButton';
import TypedText from './TypedText';

const roles = [
  'Full Stack Developer',
  'AI Innovator',
  'React Specialist',
  'Problem Solver',
  'Tech Enthusiast',
];

interface HeroProps {
  personalData: PersonalData;
}

const Hero = ({ personalData }: HeroProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial states
    if (titleRef.current) {
      const spans = titleRef.current.querySelectorAll('span');
      gsap.set(spans, { y: 100, opacity: 0, rotationX: -45 });

      // Animate title
      gsap.to(spans, {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        delay: 0.2,
      });
    }

    gsap.set(subtitleRef.current, { y: 50, opacity: 0 });
    gsap.set(buttonRef.current, { y: 50, opacity: 0 });

    gsap.to(subtitleRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      delay: 0.6,
      ease: 'power3.out',
    });

    gsap.to(buttonRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      delay: 0.9,
      ease: 'power3.out',
    });
  }, []);

  const handleExploreClick = () => {
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <h1 className="hero-title" ref={titleRef}>
          <span data-text={personalData.firstName}>{personalData.firstName}</span>
          <br />
          <span data-text={personalData.lastName}>{personalData.lastName}</span>
        </h1>
        <div className="hero-subtitle" ref={subtitleRef}>
          <TypedText texts={roles} typingSpeed={80} deletingSpeed={40} pauseDuration={2500} />
        </div>
        <div ref={buttonRef}>
          <MagneticButton className="cta-button" onClick={handleExploreClick}>
            Explore My Work
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

export default Hero;
