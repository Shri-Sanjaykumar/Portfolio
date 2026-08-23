import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { education } from '../data/profile';

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
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
      id="education"
      ref={sectionRef}
      className="relative w-full py-28 px-5 md:px-8 bg-[#050508] overflow-hidden"
      aria-labelledby="education-heading"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />
      <div className="max-w-6xl mx-auto">
        <p className="reveal-item text-indigo-400 text-xs font-mono tracking-[0.25em] uppercase mb-4">Education</p>
        <h2 id="education-heading" className="reveal-item text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-16">
          Academic foundation.
        </h2>

        {education.map((edu, i) => (
          <div
            key={i}
            className="reveal-item bg-white/[0.02] border border-white/8 rounded-2xl p-7 md:p-10 hover:border-white/15 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-10">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-indigo-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">{edu.institution}</h3>
                  <p className="text-indigo-300 mt-1 font-medium">{edu.degree}</p>
                  <p className="text-gray-600 text-sm mt-1 font-mono">{edu.period}</p>
                </div>
              </div>
              <div className="flex flex-col items-start md:items-end gap-2 flex-shrink-0">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">{edu.cgpa}</span>
                </div>
                <span className="text-gray-500 text-xs font-mono">CGPA</span>
                <span className="mt-1 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                  {edu.graduation}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-xs text-gray-500 font-mono tracking-[0.2em] uppercase mb-4">Relevant Coursework</h4>
              <div className="flex flex-wrap gap-2" role="list" aria-label="Relevant coursework">
                {edu.coursework.map(course => (
                  <span
                    key={course}
                    role="listitem"
                    className="px-3 py-1.5 rounded-lg border border-white/8 text-gray-500 text-sm hover:text-gray-300 hover:border-white/20 transition-colors duration-200 cursor-default"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
