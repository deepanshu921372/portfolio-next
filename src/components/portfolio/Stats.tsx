'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { StatData } from '@/types/portfolio';

gsap.registerPlugin(ScrollTrigger);

interface StatsProps {
  statsData: StatData[];
}

const Stats = ({ statsData }: StatsProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const numbersRef = useRef<(HTMLDivElement | null)[]>([]);

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

    numbersRef.current.forEach((num, index) => {
      if (num && statsData[index]) {
        const target = statsData[index].number;

        ScrollTrigger.create({
          trigger: num,
          start: 'top 100%',
          onEnter: () => {
            gsap.to(num, {
              innerHTML: target,
              duration: 2,
              snap: { innerHTML: 1 },
              ease: 'power2.out',
            });
          },
        });
      }
    });
  }, [statsData]);

  return (
    <div className="stats-section">
      <h2 className="section-title" data-text="IMPACT" ref={titleRef}>
        IMPACT
      </h2>
      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <div className="stat-box" key={stat._id || index}>
            <div
              className="stat-number"
              ref={(el) => { numbersRef.current[index] = el; }}
            >
              0
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
