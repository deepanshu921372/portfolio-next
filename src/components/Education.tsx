import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { educationData } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

    cardsRef.current.forEach((card, i) => {
      if (card) {
        gsap.fromTo(card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 100%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });
  }, []);

  return (
    <section id="education" className="education-section">
      <h2 className="section-title" data-text="EDUCATION" ref={titleRef}>
        EDUCATION
      </h2>
      <div className="education-grid">
        {educationData.map((edu, index) => (
          <div
            key={index}
            className="education-card"
            ref={(el) => { cardsRef.current[index] = el; }}
          >
            <div className="education-icon">🎓</div>
            <div className="education-content">
              <h3 className="education-degree">{edu.degree}</h3>
              <h4 className="education-institution">{edu.institution}</h4>
              <div className="education-meta">
                <span className="education-location">{edu.location}</span>
                <span className="education-duration">{edu.duration}</span>
              </div>
              <p className="education-description">{edu.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
