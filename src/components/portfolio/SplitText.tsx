'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  children: string;
  className?: string;
  type?: 'chars' | 'words' | 'lines';
  animation?: 'fadeUp' | 'reveal' | 'wave' | 'glitch';
  delay?: number;
  stagger?: number;
  trigger?: boolean;
}

const SplitText = ({
  children,
  className = '',
  type = 'chars',
  animation = 'fadeUp',
  delay = 0,
  stagger = 0.03,
  trigger = true,
}: SplitTextProps) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll('.split-element');

    const getAnimation = () => {
      switch (animation) {
        case 'fadeUp':
          return {
            y: 50,
            opacity: 0,
            rotationX: -90,
          };
        case 'reveal':
          return {
            y: '100%',
            opacity: 0,
          };
        case 'wave':
          return {
            y: 20,
            opacity: 0,
            scale: 0.8,
          };
        case 'glitch':
          return {
            x: () => gsap.utils.random(-20, 20),
            y: () => gsap.utils.random(-20, 20),
            opacity: 0,
            skewX: () => gsap.utils.random(-20, 20),
          };
        default:
          return { y: 50, opacity: 0 };
      }
    };

    const animationConfig = {
      ...getAnimation(),
      duration: 0.8,
      stagger: stagger,
      delay: delay,
      ease: animation === 'glitch' ? 'power4.out' : 'back.out(1.7)',
    };

    if (trigger) {
      // Use fromTo to ensure proper initial and final states
      const fromState = getAnimation();
      gsap.fromTo(elements,
        fromState,
        {
          y: 0,
          x: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          skewX: 0,
          duration: 0.8,
          stagger: stagger,
          delay: delay,
          ease: animation === 'glitch' ? 'power4.out' : 'back.out(1.7)',
          scrollTrigger: {
            trigger: container,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    } else {
      const fromState = getAnimation();
      gsap.fromTo(elements, fromState, {
        y: 0,
        x: 0,
        opacity: 1,
        scale: 1,
        rotationX: 0,
        skewX: 0,
        duration: 0.8,
        stagger: stagger,
        delay: delay,
        ease: animation === 'glitch' ? 'power4.out' : 'back.out(1.7)',
      });
    }
  }, [animation, delay, stagger, trigger]);

  const splitContent = () => {
    if (type === 'chars') {
      return children.split('').map((char, index) => (
        <span
          key={index}
          className="split-element split-char"
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ));
    }

    if (type === 'words') {
      return children.split(' ').map((word, index) => (
        <span
          key={index}
          className="split-element split-word"
          style={{ display: 'inline-block', marginRight: '0.3em' }}
        >
          {word}
        </span>
      ));
    }

    return (
      <span className="split-element split-line" style={{ display: 'block' }}>
        {children}
      </span>
    );
  };

  return (
    <span className={`split-text ${className}`} ref={containerRef}>
      {splitContent()}
    </span>
  );
};

export default SplitText;
