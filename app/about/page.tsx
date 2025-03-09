import { SectionHeading } from "@/components/section-heading";
import { EducationCard } from "@/components/education-card";
import { personalData, educationData } from "@/data/portfolio";

export default function AboutPage() {
  return (
    <div className="container py-16 px-4 md:px-6">
      <SectionHeading
        title="About Me"
        subtitle="Get to know more about me and my background"
      />

      <div className="max-w-3xl mx-auto mb-16">
        <p className="text-lg leading-relaxed text-justify mb-6">{personalData.about}</p>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-card rounded-lg p-4 shadow-sm">
            <p className="text-muted-foreground text-sm">Location</p>
            <p className="font-medium">{personalData.location}</p>
          </div>
          <div className="bg-card rounded-lg p-4 shadow-sm">
            <p className="text-muted-foreground text-sm">Email</p>
            <p className="font-medium">{personalData.email}</p>
          </div>
        </div>
      </div>

      <SectionHeading title="Education" />

      <div className="max-w-3xl mx-auto space-y-6">
        {educationData.map((education, index) => (
          <EducationCard
            key={index}
            degree={education.degree}
            institution={education.institution}
            location={education.location}
            duration={education.duration}
            description={education.description}
          />
        ))}
      </div>
    </div>
  );
}