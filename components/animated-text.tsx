"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function AnimatedText({
  text,
  className,
  delay = 100,
}: AnimatedTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, delay, text]);

  return (
    <span className={cn("relative", className)}>
      {displayedText}
      <span className={cn(
        "animate-pulse transition-opacity duration-300",
        isComplete ? "opacity-50" : "opacity-100"
      )}>|</span>
    </span>
  );
}