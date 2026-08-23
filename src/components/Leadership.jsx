import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { leadership } from '../data/profile';

gsap.registerPlugin(ScrollTrigger);

export default function Leadership() {
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
      id="leadership"
      ref={sectionRef}
      className="relative w-full py-28 px-5 md:px-8 bg-[#060610] overflow-hidden"
      aria-labelledby="leadership-heading"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />
      <div className="max-w-6xl mx-auto">
        <p className="reveal-item text-indigo-400 text-xs font-mono tracking-[0.25em] uppercase mb-4">Leadership</p>
        <h2 id="leadership-heading" className="reveal-item text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
          Beyond the code.
        </h2>
        <p className="reveal-item text-gray-500 text-lg max-w-xl mb-16">
          Leadership, communication, and execution alongside technical work.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {leadership.map((item, i) => (
            <div
              key={i}
              className="reveal-item group bg-white/[0.02] border border-white/8 rounded-2xl p-7 hover:border-white/15 hover:bg-white/[0.03] transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-indigo-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base">{item.org}</h3>
                  <p className="text-indigo-300 text-sm mt-0.5">{item.role}</p>
                  <p className="text-gray-600 text-xs mt-1 font-mono">{item.period}</p>
                </div>
              </div>
              <ul className="space-y-3" aria-label="Key achievements">
                {item.achievements.map((a, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="mt-2 w-1 h-1 rounded-full bg-indigo-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-400 text-sm leading-relaxed">{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Key stats */}
        <div className="reveal-item mt-8 grid grid-cols-2 md:grid-cols-3 gap-5">
          {[
            { value: '200+', label: 'Hackathon Participants' },
            { value: '₹60L+', label: 'Non-monetary Sponsorships' },
            { value: '2×', label: '1,000+ Attendee Festivals' },
          ].map(({ value, label }) => (
            <div key={label} className="bg-white/[0.02] border border-white/8 rounded-xl p-5 text-center">
              <div className="text-2xl font-bold text-white mb-1">{value}</div>
              <div className="text-gray-500 text-xs">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
