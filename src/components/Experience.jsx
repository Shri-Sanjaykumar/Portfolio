import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience } from '../data/profile';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current.querySelectorAll('.reveal-item');
      gsap.fromTo(items, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', toggleActions: 'play none none reverse' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full py-28 px-5 md:px-8 bg-[#060610] overflow-hidden"
      aria-labelledby="experience-heading"
    >
      {/* Subtle section separator */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />

      <div className="max-w-6xl mx-auto">
        <p className="reveal-item text-indigo-400 text-xs font-mono tracking-[0.25em] uppercase mb-4">Experience</p>
        <h2 id="experience-heading" className="reveal-item text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-16">
          Where I've worked.
        </h2>

        <div className="space-y-6">
          {experience.map((exp, i) => (
            <div
              key={i}
              className="reveal-item group relative bg-white/[0.02] border border-white/8 rounded-2xl p-7 md:p-10 hover:border-indigo-500/20 hover:bg-indigo-500/[0.02] transition-all duration-500"
            >
              {/* Top */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-indigo-400" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">{exp.company}</h3>
                      {exp.formerName && <p className="text-gray-600 text-xs mt-0.5">{exp.formerName}</p>}
                    </div>
                  </div>
                  <p className="text-indigo-300 font-medium mt-3">{exp.role}</p>
                  <p className="text-gray-500 text-sm mt-1">{exp.location}</p>
                </div>
                <div className="flex items-start">
                  <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-mono whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>
              </div>

              {/* Responsibilities */}
              <ul className="space-y-3 mb-8" aria-label="Responsibilities">
                {exp.responsibilities.map((r, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-indigo-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-400 text-base leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>

              {/* Confidential note */}
              {exp.confidential && (
                <div className="mb-8 px-4 py-3 rounded-lg bg-amber-500/5 border border-amber-500/15 flex items-start gap-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  <span className="text-amber-300/80 text-sm">{exp.confidentialNote}</span>
                </div>
              )}

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2" aria-label="Technologies used">
                {exp.tech.map(t => (
                  <span key={t} className="text-xs px-3 py-1 rounded-full border border-white/10 text-gray-400 font-mono">
                    {t}
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
