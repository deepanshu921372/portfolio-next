import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";
import { projectsData } from "@/data/portfolio";

export default function ProjectsPage() {
  return (
    <div className="container py-16 px-4 md:px-6">
      <SectionHeading
        title="Projects"
        subtitle="Check out some of my recent work"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsData.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            image={project.image as unknown as string}
            technologies={project.technologies}
            githubLink={project.githubLink}
            liveLink={project.liveLink}
          />
        ))}
      </div>
    </div>
  );
}