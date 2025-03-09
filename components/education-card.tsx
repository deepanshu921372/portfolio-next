import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

interface EducationCardProps {
  degree: string;
  institution: string;
  location: string;
  duration: string;
  description: string;
  className?: string;
}

export function EducationCard({
  degree,
  institution,
  location,
  duration,
  description,
  className,
}: EducationCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-lg p-6 shadow-md border border-border transition-all duration-300 hover:shadow-lg hover:border-primary/50 hover:-translate-y-1",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-primary/10 text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground">
          <GraduationCap className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-semibold transition-colors duration-300 hover:text-primary">{degree}</h3>
          <p className="text-muted-foreground">{institution}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <span>{location}</span>
            <span>•</span>
            <span>{duration}</span>
          </div>
          <p className="mt-2">{description}</p>
        </div>
      </div>
    </div>
  );
}