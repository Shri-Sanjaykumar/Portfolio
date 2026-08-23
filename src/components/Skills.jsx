import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../data/profile';

gsap.registerPlugin(ScrollTrigger);

const categoryColors = {
  'Languages': '#818cf8',
  'Computer Science': '#a78bfa',
  'Software Engineering': '#34d399',
  'Cloud & DevOps': '#60a5fa',
  'Generative AI & ML': '#f472b6',
  'Web & Data': '#fb923c',
  'Enterprise Technologies': '#fbbf24',
};

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current.querySelectorAll('.reveal-item');
      gsap.fromTo(items, { opacity: 0, y: 25 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', toggleActions: 'play none none reverse' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full py-28 px-5 md:px-8 bg-[#060610] overflow-hidden"
      aria-labelledby="skills-heading"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />
      <div className="max-w-6xl mx-auto">
        <p className="reveal-item text-indigo-400 text-xs font-mono tracking-[0.25em] uppercase mb-4">Skills</p>
        <h2 id="skills-heading" className="reveal-item text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-16">
          Technical capabilities.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {Object.entries(skills).map(([category, items]) => (
            <div
              key={category}
              className="reveal-item group bg-white/[0.02] border border-white/8 rounded-2xl p-6 hover:border-white/15 transition-all duration-300"
            >
              <div className="flex items-center gap-2.5 mb-5">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: categoryColors[category] || '#818cf8' }}
                  aria-hidden="true"
                />
                <h3 className="text-sm font-semibold text-white tracking-wide">{category}</h3>
              </div>
              <div className="flex flex-wrap gap-2" role="list" aria-label={`${category} skills`}>
                {items.map(skill => (
                  <span
                    key={skill}
                    role="listitem"
                    className="px-2.5 py-1 rounded-lg border border-white/8 text-gray-500 text-xs hover:text-gray-200 hover:border-white/20 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
