import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { personalData } from '../data/portfolio';
import MagneticButton from './MagneticButton';
import TypedText from './TypedText';

const roles = [
  'Full Stack Developer',
  'AI Innovator',
  'React Specialist',
  'Problem Solver',
  'Tech Enthusiast',
];

const Hero = () => {
  const subtitleRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(subtitleRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: 'power3.out',
    });

    gsap.from(buttonRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.8,
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
        <h1 className="hero-title">
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
