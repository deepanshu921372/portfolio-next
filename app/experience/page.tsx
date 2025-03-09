import { SectionHeading } from "@/components/section-heading";
import { Timeline, TimelineItem } from "@/components/timeline";
import { experienceData } from "@/data/portfolio";

export default function ExperiencePage() {
  return (
    <div className="container py-16 px-4 md:px-6">
      <SectionHeading
        title="Work Experience"
        subtitle="My professional journey and career path"
      />

      <div className="max-w-4xl mx-auto">
        <Timeline>
          {experienceData.map((experience, index) => (
            <TimelineItem
              key={index}
              title={experience.position}
              subtitle={`${experience.company}, ${experience.location}`}
              date={experience.duration}
              description={experience.description}
              technologies={experience.technologies}
              isLeft={index % 2 === 0}
            />
          ))}
        </Timeline>
      </div>
    </div>
  );
}