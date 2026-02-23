'use client';

import { useEffect, useRef } from 'react';

const ScrollProgress = () => {
  const progressRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const updateProgress = () => {
      if (progressRef.current) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPosition = window.scrollY;
        const percentage = totalHeight > 0 ? (scrollPosition / totalHeight) * 100 : 0;
        progressRef.current.style.width = `${percentage}%`;
      }
    };

    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    updateProgress();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div className="scroll-progress-container">
      <div
        ref={progressRef}
        className="scroll-progress-bar"
        style={{ width: '0%' }}
      />
    </div>
  );
};

export default ScrollProgress;
