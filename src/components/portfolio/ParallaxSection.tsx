'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  id?: string;
}

const ParallaxSection = ({ children, className = '', speed = 0.5, id }: ParallaxSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    gsap.to(content, {
      y: () => -100 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    gsap.from(content, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [speed]);

  return (
    <div className={`parallax-section ${className}`} ref={sectionRef} id={id}>
      <div className="parallax-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;
