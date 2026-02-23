'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { PersonalData } from '@/types/portfolio';

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  personalData: PersonalData;
}

const About = ({ personalData }: AboutProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 100%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    if (contentRef.current) {
      gsap.fromTo(contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 100%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, []);

  const paragraphs = personalData.about.split('\n\n');

  return (
    <section id="about" ref={sectionRef} className="about-section">
      <h2 className="section-title" data-text="ABOUT ME" ref={titleRef}>
        ABOUT ME
      </h2>
      <div className="about-content" ref={contentRef}>
        <div className="about-card">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="about-text">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
