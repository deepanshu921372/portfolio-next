import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../data/portfolio';
import ProjectImage from './ProjectImage';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Simple fade in for title - triggers very early
    if (titleRef.current) {
      gsap.fromTo(titleRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 100%', // Start when element is at bottom of viewport
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Cards animate in early
    cardsRef.current.forEach((card) => {
      if (card) {
        gsap.fromTo(card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 100%', // Start when card is at bottom of viewport
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });
  }, []);

  return (
    <section id="projects">
      <h2 className="section-title" data-text="PROJECTS" ref={titleRef}>
        PROJECTS
      </h2>
      <div className="projects-container">
        {projectsData.map((project, index) => (
          <div
            key={index}
            className="project-card"
            ref={(el) => { cardsRef.current[index] = el; }}
          >
            <div className="project-visual">
              <ProjectImage
                src={project.image}
                alt={project.title}
                emoji={project.emoji}
              />
            </div>
            <div className="project-info">
              <div className="project-number">{project.number}</div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
              <div className="tech-stack">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-item">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="project-links">
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  Live Demo
                </a>
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link secondary"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
