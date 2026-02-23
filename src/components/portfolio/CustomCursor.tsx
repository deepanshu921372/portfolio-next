'use client';

import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTrailRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const updateCursor = () => {
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.2;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.2;

      if (cursorRef.current) {
        cursorRef.current.style.left = cursorPos.current.x + 'px';
        cursorRef.current.style.top = cursorPos.current.y + 'px';
      }

      if (cursorTrailRef.current) {
        cursorTrailRef.current.style.left = mousePos.current.x + 'px';
        cursorTrailRef.current.style.top = mousePos.current.y + 'px';
      }

      requestAnimationFrame(updateCursor);
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = 'translate(-50%, -50%) scale(2)';
        cursorRef.current.style.background = 'rgba(255, 0, 255, 0.5)';
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorRef.current.style.background = 'rgba(0, 255, 255, 0.5)';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    updateCursor();

    const interactiveElements = document.querySelectorAll(
      'button, .bento-item, .holo-card, .tech-item, .contact-btn, .cta-button, a'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor-trail" ref={cursorTrailRef}></div>
    </>
  );
};

export default CustomCursor;
