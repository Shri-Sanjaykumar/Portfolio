import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { engineeringPrinciples } from '../data/profile';

gsap.registerPlugin(ScrollTrigger);

export default function Engineering() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current.querySelectorAll('.reveal-item');
      gsap.fromTo(items, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', toggleActions: 'play none none reverse' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-28 px-5 md:px-8 bg-[#050508] overflow-hidden"
      aria-labelledby="engineering-heading"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />
      <div className="max-w-6xl mx-auto">
        <p className="reveal-item text-indigo-400 text-xs font-mono tracking-[0.25em] uppercase mb-4">Engineering DNA</p>
        <h2 id="engineering-heading" className="reveal-item text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
          How I build.
        </h2>
        <p className="reveal-item text-gray-500 text-lg max-w-xl mb-16">
          The principles that shape how I approach every problem, system, and product.
        </p>

        <div className="space-y-5">
          {engineeringPrinciples.map((p) => (
            <div
              key={p.number}
              className="reveal-item group flex flex-col sm:flex-row sm:items-start gap-5 bg-white/[0.02] border border-white/8 rounded-2xl px-7 py-6 hover:border-indigo-500/20 hover:bg-indigo-500/[0.02] transition-all duration-500"
            >
              <div className="flex-shrink-0">
                <span className="text-3xl font-bold text-white/10 font-mono group-hover:text-indigo-500/30 transition-colors duration-300">
                  {p.number}
                </span>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-2">{p.title}</h3>
                <p className="text-gray-500 leading-relaxed">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
