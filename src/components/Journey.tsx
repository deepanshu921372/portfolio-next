import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { journeyData } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const Journey = () => {
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
            start: 'top 100%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Journey cards animate in early
    cardsRef.current.forEach((card, i) => {
      if (card) {
        gsap.fromTo(card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.1,
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
    <div className="holographic-section" id="journey">
      <h2 className="section-title" data-text="JOURNEY" ref={titleRef}>
        JOURNEY
      </h2>
      <div className="holo-grid">
        {journeyData.map((item, index) => (
          <div
            key={index}
            className="holo-card"
            ref={(el) => { cardsRef.current[index] = el; }}
          >
            <span className="holo-icon">{item.icon}</span>
            <h3 className="holo-title">{item.title}</h3>
            <p className="holo-text">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journey;
