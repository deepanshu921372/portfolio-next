"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatedText } from "@/components/animated-text";
import { personalData } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Animate content in after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const scrollToAboutPage = () => {
    router.push("/about");
  };

  return (
    <div className="min-h-[90vh] flex flex-col">
      <section className="flex-1 flex flex-col items-center justify-center px-4 relative mt-12 sm:mt-12 md:mt-12">
        <div 
          className={cn(
            "text-center transform transition-all duration-1000 ease-out",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            {personalData.name}
          </h1>
          <div className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-8">
            <AnimatedText text={personalData.title} delay={150} />
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 mb-12">
            <Button 
              onClick={() => router.push("/projects")}
              size="lg"
              className="min-w-[180px] text-lg transition-all duration-300 hover:scale-105"
            >
              View Projects
            </Button>
            <Button 
              onClick={() => router.push("/contact")}
              variant="outline"
              size="lg"
              className="min-w-[180px] text-lg transition-all duration-300 hover:scale-105"
            >
              Contact Me
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12">
            <div className="bg-card rounded-lg p-6 shadow-md border border-border transform transition-all duration-500 hover:scale-105 hover:shadow-lg">
              <div className="text-4xl font-bold text-primary mb-2">1+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-md border border-border transform transition-all duration-500 hover:scale-105 hover:shadow-lg">
              <div className="text-4xl font-bold text-primary mb-2">5+</div>
              <div className="text-muted-foreground">Projects Completed</div>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-md border border-border transform transition-all duration-500 hover:scale-105 hover:shadow-lg">
              <div className="text-4xl font-bold text-primary mb-2">3+</div>
              <div className="text-muted-foreground">Happy Clients</div>
            </div>
          </div>
        </div>

        <button
          onClick={scrollToAboutPage}
          className={cn(
            "absolute bottom-8 animate-bounce transition-opacity duration-300",
            showScrollIndicator ? "opacity-100" : "opacity-0"
          )}
          aria-label="Scroll down"
        >
          <ChevronDown className="h-8 w-8" />
        </button>
      </section>
    </div>
  );
}