import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profile } from '../data/profile';

gsap.registerPlugin(ScrollTrigger);

const interests = [
  'Generative AI', 'Large Language Models', 'Retrieval-Augmented Generation',
  'Vector Search', 'Machine Learning', 'Cloud Computing',
  'Backend Engineering', 'Full-Stack Development', 'System Design',
  'DevOps', 'Software Architecture',
];

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      });
      const items = sectionRef.current.querySelectorAll('.reveal-item');
      tl.fromTo(items, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-28 px-5 md:px-8 bg-[#050508] overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <p className="reveal-item text-indigo-400 text-xs font-mono tracking-[0.25em] uppercase mb-4">About</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left */}
          <div>
            <h2 id="about-heading" className="reveal-item text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-8">
              Turning complex problems
              <br />
              <span className="accent-gradient-text">into practical systems.</span>
            </h2>
            <div className="space-y-5">
              <p className="reveal-item text-gray-400 text-lg leading-relaxed font-light">
                I'm pursuing an M.Tech Integrated in Software Engineering at Vellore Institute of Technology
                with a <strong className="text-white font-medium">9.12/10.0 CGPA</strong>.
              </p>
              <p className="reveal-item text-gray-400 text-lg leading-relaxed font-light">
                My focus is on building intelligent, scalable software systems across Generative AI,
                cloud computing, backend engineering, and full-stack development. I'm drawn to problems
                at the intersection of applied AI and real-world software design.
              </p>
              <p className="reveal-item text-gray-400 text-lg leading-relaxed font-light">
                I've worked on enterprise RAG workflows, ML forecasting pipelines, cloud-deployed
                microservices, and AI-powered full-stack applications — and I approach each one
                with the same engineering rigour.
              </p>
            </div>

            {/* Profile quick-facts */}
            <div className="reveal-item mt-10 grid grid-cols-2 gap-5">
              {[
                { label: 'Institution', value: 'VIT, Vellore' },
                { label: 'Degree', value: 'M.Tech Integrated SE' },
                { label: 'CGPA', value: '9.12 / 10.0' },
                { label: 'Expected', value: '2028' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
                  <div className="text-gray-500 text-xs font-mono mb-1">{label}</div>
                  <div className="text-white font-medium text-sm">{value}</div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="reveal-item mt-8 flex flex-wrap gap-3">
              <a href={profile.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/25 text-sm transition-all duration-300"
                aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/25 text-sm transition-all duration-300"
                aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
              <a href={`mailto:${profile.email}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/25 text-sm transition-all duration-300"
                aria-label="Send email">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                Email
              </a>
            </div>
          </div>

          {/* Right: Interests */}
          <div>
            <h3 className="reveal-item text-xs text-gray-500 font-mono tracking-[0.2em] uppercase mb-6">Areas of Interest</h3>
            <div className="reveal-item flex flex-wrap gap-2.5">
              {interests.map(interest => (
                <span
                  key={interest}
                  className="px-3.5 py-1.5 rounded-lg border border-white/8 text-gray-400 text-sm hover:text-white hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-all duration-300 cursor-default"
                >
                  {interest}
                </span>
              ))}
            </div>

            {/* Profile image secondary */}
            <div className="reveal-item mt-10 relative rounded-2xl overflow-hidden border border-white/8 bg-white/[0.02] h-64 flex items-end">
              <img
                src={profile.images.profileAlt}
                alt="Shri Sanjaykumar V"
                className="absolute inset-0 w-full h-full object-cover object-top opacity-60"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/40 to-transparent" />
              <div className="relative z-10 p-6">
                <div className="text-white font-semibold">Shri Sanjaykumar V</div>
                <div className="text-gray-400 text-sm mt-0.5">Software Engineering Student, VIT</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
