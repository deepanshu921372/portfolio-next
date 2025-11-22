import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { detailedSkillsData } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const DetailedSkills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const categoriesRef = useRef<(HTMLDivElement | null)[]>([]);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
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
            start: 'top 100%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    categoriesRef.current.forEach((category, i) => {
      if (category) {
        gsap.fromTo(category,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: category,
              start: 'top 100%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    barsRef.current.forEach((bar) => {
      if (bar) {
        const level = bar.getAttribute('data-level') || '0';
        gsap.fromTo(bar,
          { width: '0%' },
          {
            width: `${level}%`,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 100%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });
  }, []);

  const categories = [
    { key: 'frontend', title: 'Frontend', icon: '⚛️' },
    { key: 'backend', title: 'Backend', icon: '🚀' },
    { key: 'tools', title: 'Tools & DevOps', icon: '⚙️' },
  ];

  let barIndex = 0;

  return (
    <section id="detailed-skills" ref={sectionRef} className="detailed-skills-section">
      <h2 className="section-title" data-text="EXPERTISE" ref={titleRef}>
        EXPERTISE
      </h2>
      <div className="skills-categories">
        {categories.map((category, catIndex) => (
          <div
            key={category.key}
            className="skill-category"
            ref={(el) => { categoriesRef.current[catIndex] = el; }}
          >
            <div className="category-header">
              <span className="category-icon">{category.icon}</span>
              <h3 className="category-title">{category.title}</h3>
            </div>
            <div className="skills-list">
              {detailedSkillsData[category.key as keyof typeof detailedSkillsData].map((skill) => {
                const currentBarIndex = barIndex++;
                return (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                    <div className="skill-bar-bg">
                      <div
                        className="skill-bar-fill"
                        data-level={skill.level}
                        ref={(el) => { barsRef.current[currentBarIndex] = el; }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DetailedSkills;
