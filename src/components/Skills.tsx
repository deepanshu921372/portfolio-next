import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillsData } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

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
            start: 'top 100%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Skills items animate in early with stagger
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
  }, []);

  const getSpanClasses = (skill: typeof skillsData[0]) => {
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
            key={index}
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
