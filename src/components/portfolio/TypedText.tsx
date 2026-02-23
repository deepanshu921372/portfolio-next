'use client';

import { useState, useEffect } from 'react';

interface TypedTextProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

const TypedText = ({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  className = '',
}: TypedTextProps) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];

    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimeout);
    }

    if (isDeleting) {
      if (displayText === '') {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
        return;
      }

      const deleteTimeout = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
      }, deletingSpeed);
      return () => clearTimeout(deleteTimeout);
    }

    if (displayText === currentText) {
      setIsPaused(true);
      return;
    }

    const typeTimeout = setTimeout(() => {
      setDisplayText(currentText.slice(0, displayText.length + 1));
    }, typingSpeed);

    return () => clearTimeout(typeTimeout);
  }, [displayText, textIndex, isDeleting, isPaused, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={`typed-text ${className}`}>
      {displayText}
      <span className="typed-cursor">|</span>
    </span>
  );
};

export default TypedText;
