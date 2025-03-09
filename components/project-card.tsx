import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubLink: string;
  liveLink: string;
  className?: string;
}

export function ProjectCard({
  title,
  description,
  image,
  technologies,
  githubLink,
  liveLink,
  className,
}: ProjectCardProps) {
  return (
    <div
      className={cn(
        "group bg-card rounded-lg overflow-hidden shadow-md border border-border transition-all duration-500 hover:shadow-lg hover:border-primary/50 hover:-translate-y-1",
        className
      )}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 transition-colors duration-300 group-hover:text-primary">{title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs rounded-full bg-muted transition-colors duration-300 hover:bg-primary/20"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm" className="transition-transform duration-300 hover:scale-105">
            <Link href={githubLink} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              Code
            </Link>
          </Button>
          <Button asChild size="sm" className="transition-transform duration-300 hover:scale-105">
            <Link href={liveLink} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Demo
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}