import { SectionHeading } from "@/components/section-heading";
import { SkillCard } from "@/components/skill-card";
import { skillsData } from "@/data/portfolio";

export default function SkillsPage() {
  return (
    <div className="container py-16 px-4 md:px-6 lg:mt-[5%]">
      <SectionHeading
        title="Skills"
        subtitle="Technologies and tools I work with"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <SkillCard title="Frontend" skills={skillsData.frontend} />
        <SkillCard title="Backend and Database" skills={skillsData.backend} />
        <SkillCard title="Tools" skills={skillsData.tools} />
      </div>
    </div>
  );
}