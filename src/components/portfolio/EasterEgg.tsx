'use client';

import { useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];

const EasterEgg = () => {
  const [inputSequence, setInputSequence] = useState<string[]>([]);
  const [isActivated, setIsActivated] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const activateEasterEgg = useCallback(() => {
    setIsActivated(true);
    setShowMessage(true);

    const colors = ['#0ff', '#f0f', '#ff0', '#0f0', '#f00', '#00f'];
    const confettiCount = 150;

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-20px';
      document.body.appendChild(confetti);

      gsap.to(confetti, {
        y: window.innerHeight + 100,
        x: (Math.random() - 0.5) * 400,
        rotation: Math.random() * 720,
        duration: Math.random() * 3 + 2,
        ease: 'power1.out',
        onComplete: () => confetti.remove(),
      });
    }

    const canvas = document.createElement('canvas');
    canvas.className = 'matrix-canvas';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (ctx) {
      const chars = 'DEEPANSHU01';
      const fontSize = 14;
      const columns = canvas.width / fontSize;
      const drops: number[] = [];

      for (let i = 0; i < columns; i++) {
        drops[i] = 1;
      }

      let frameCount = 0;
      const maxFrames = 300;

      const drawMatrix = () => {
        if (frameCount >= maxFrames) {
          canvas.remove();
          return;
        }

        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0ff';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);

          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }

        frameCount++;
        requestAnimationFrame(drawMatrix);
      };

      drawMatrix();
    }

    setTimeout(() => {
      setShowMessage(false);
      setIsActivated(false);
    }, 5000);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...inputSequence, e.code].slice(-10);
      setInputSequence(newSequence);

      if (newSequence.join(',') === KONAMI_CODE.join(',')) {
        activateEasterEgg();
        setInputSequence([]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputSequence, activateEasterEgg]);

  const [clickCount, setClickCount] = useState(0);
  const [lastClick, setLastClick] = useState(0);

  useEffect(() => {
    const handleLogoClick = () => {
      const now = Date.now();
      if (now - lastClick < 500) {
        const newCount = clickCount + 1;
        setClickCount(newCount);
        if (newCount >= 5) {
          activateEasterEgg();
          setClickCount(0);
        }
      } else {
        setClickCount(1);
      }
      setLastClick(now);
    };

    const logo = document.querySelector('.nav-logo');
    logo?.addEventListener('click', handleLogoClick);

    return () => logo?.removeEventListener('click', handleLogoClick);
  }, [clickCount, lastClick, activateEasterEgg]);

  if (!showMessage) return null;

  return (
    <div className={`easter-egg-overlay ${isActivated ? 'active' : ''}`}>
      <div className="easter-egg-message">
        <h2>You Found It!</h2>
        <p>You&apos;re awesome! Thanks for exploring.</p>
        <div className="easter-egg-emoji">🎉🚀✨</div>
      </div>
    </div>
  );
};

export default EasterEgg;
