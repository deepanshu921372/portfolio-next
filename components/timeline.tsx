import { cn } from "@/lib/utils";
import { Briefcase } from "lucide-react";

interface TimelineItemProps {
  title: string;
  subtitle: string;
  date: string;
  description: string;
  technologies?: string[];
  isLeft?: boolean;
}

export function TimelineItem({
  title,
  subtitle,
  date,
  description,
  technologies,
  isLeft = true,
}: TimelineItemProps) {
  return (
    <div className="relative flex items-center justify-center md:justify-between group">

      <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white dark:bg-gray-950 border-4 border-primary items-center justify-center z-10 transition-all duration-300 group-hover:scale-110 hidden md:flex">
        <Briefcase className="h-5 w-5 text-black dark:text-primary" />
      </div>
      

      <div
        className={cn(
          "w-full md:w-5/12 bg-card rounded-lg p-6 shadow-md border border-border relative transition-all duration-300 group-hover:shadow-lg group-hover:border-primary/50",
          isLeft ? "md:mr-auto" : "md:ml-auto"
        )}
      >

        <div 
          className={cn(
            "hidden md:block absolute top-1/2 w-14 h-0.5 bg-primary dark:bg-primary -translate-y-1/2",
            isLeft ? "right-0 translate-x-full" : "left-0 -translate-x-full"
          )}
        ></div>
        
        <div className="mb-2">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-muted-foreground">{subtitle}</p>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>
        <p className="mb-4">{description}</p>
        {technologies && (
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs rounded-full bg-muted transition-colors duration-300 hover:bg-primary/20"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function Timeline({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">

      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-primary dark:bg-primary -translate-x-1/2 md:translate-x-0"></div>
      <div className="space-y-16">{children}</div>
    </div>
  );
}