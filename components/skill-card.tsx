"use client";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

interface SkillCardProps {
  title: string;
  skills: {
    name: string;
    level: number;
  }[];
  className?: string;
}

export function SkillCard({ title, skills, className }: SkillCardProps) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <div className={cn(
      "bg-card rounded-lg p-6 shadow-md border border-border transition-all duration-300 hover:shadow-lg hover:border-primary/50",
      className
    )}>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        {skills.map((skill) => (
          <div 
            key={skill.name}
            className="transition-all duration-300 hover:translate-x-1"
            onMouseEnter={() => setHoveredSkill(skill.name)}
            onMouseLeave={() => setHoveredSkill(null)}
          >
            <div className="flex justify-between mb-1">
              <span className={cn(
                "transition-colors duration-300",
                hoveredSkill === skill.name ? "text-primary font-medium" : ""
              )}>{skill.name}</span>
              <span className="text-muted-foreground">{skill.level}%</span>
            </div>
            <Progress 
              value={skill.level} 
              className={cn(
                "h-2 transition-all duration-500",
                hoveredSkill === skill.name ? "h-3" : ""
              )} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}