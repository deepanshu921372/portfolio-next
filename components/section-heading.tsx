"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  className,
}: SectionHeadingProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn(
      "text-center mb-12 transition-all duration-1000 ease-out",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
      className
    )}>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2 relative inline-block">
        {title}
        <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary transform scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"></span>
      </h2>
      {subtitle && (
        <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}