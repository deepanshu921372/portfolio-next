'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { SkillData } from '@/types/portfolio';

gsap.registerPlugin(ScrollTrigger);

interface SkillsProps {
  skillsData: SkillData[];
}

const Skills = ({ skillsData }: SkillsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

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

    itemsRef.current.forEach((item, i) => {
      if (item) {
        gsap.fromTo(item,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: i * 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 100%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });
  }, [skillsData]);

  const getSpanClasses = (skill: SkillData) => {
    const classes = ['bento-item'];
    if (skill.span?.col === 2) classes.push('span-col-2');
    if (skill.span?.col === 3) classes.push('span-col-3');
    if (skill.span?.row === 2) classes.push('span-row-2');
    return classes.join(' ');
  };

  return (
    <section id="skills" ref={sectionRef}>
      <h2 className="section-title" data-text="SKILLS" ref={titleRef}>
        SKILLS
      </h2>
      <div className="bento-grid">
        {skillsData.map((skill, index) => (
          <div
            key={skill._id || index}
            className={getSpanClasses(skill)}
            ref={(el) => { itemsRef.current[index] = el; }}
          >
            <span className="bento-icon">{skill.icon}</span>
            <h3 className="bento-title">{skill.title}</h3>
            <p className="bento-desc">{skill.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
