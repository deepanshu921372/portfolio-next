'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const loadingRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(progressRef.current, {
      width: '100%',
      duration: 2,
      ease: 'power2.inOut',
      onComplete: () => {
        gsap.to(loadingRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            if (loadingRef.current) {
              loadingRef.current.style.display = 'none';
            }
            onComplete();
          },
        });
      },
    });
  }, [onComplete]);

  return (
    <div className="loading" ref={loadingRef}>
      <div className="loading-text">LOADING</div>
      <div className="loading-bar">
        <div className="loading-progress" ref={progressRef}></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
