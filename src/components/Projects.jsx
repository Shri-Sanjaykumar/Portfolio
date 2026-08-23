import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/profile';

gsap.registerPlugin(ScrollTrigger);

function ProjectModal({ project, onClose }) {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(contentRef.current, { opacity: 0, y: 30, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out' });
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => { if (e.target === modalRef.current) onClose(); };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0a0a14] border border-white/10 rounded-2xl no-scrollbar"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 md:p-8 border-b border-white/8 bg-[#0a0a14]/95 backdrop-blur-sm">
          <div>
            <p className="text-xs text-gray-500 font-mono mb-1">{project.category}</p>
            <h2 id="modal-title" className="text-2xl font-bold text-white">{project.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/25 transition-all duration-200"
            aria-label="Close modal"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 space-y-8">
          {/* Description */}
          <section>
            <h3 className="text-xs text-indigo-400 font-mono tracking-[0.2em] uppercase mb-3">Overview</h3>
            <p className="text-gray-300 leading-relaxed">{project.description}</p>
          </section>

          {/* Problem / Approach */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white/[0.02] border border-white/8 rounded-xl p-5">
              <h3 className="text-xs text-gray-500 font-mono tracking-widest uppercase mb-3">Problem</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{project.problem}</p>
            </div>
            <div className="bg-white/[0.02] border border-white/8 rounded-xl p-5">
              <h3 className="text-xs text-gray-500 font-mono tracking-widest uppercase mb-3">Approach</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{project.approach}</p>
            </div>
          </div>

          {/* RAG Architecture for CampusLLM */}
          {project.architecture && project.architecture.stages && (
            <section>
              <h3 className="text-xs text-indigo-400 font-mono tracking-[0.2em] uppercase mb-4">Architecture — RAG Pipeline</h3>
              <div className="flex flex-wrap gap-2 items-center">
                {project.architecture.stages.map((stage, i) => (
                  <React.Fragment key={stage.label}>
                    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3 text-center min-w-[90px]">
                      <div className="text-white text-sm font-medium">{stage.label}</div>
                      <div className="text-gray-600 text-xs mt-1 leading-tight">{stage.desc}</div>
                    </div>
                    {i < project.architecture.stages.length - 1 && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-indigo-500 flex-shrink-0" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </section>
          )}

          {/* FinTrack architecture string */}
          {project.architecture && typeof project.architecture === 'string' && (
            <section>
              <h3 className="text-xs text-indigo-400 font-mono tracking-[0.2em] uppercase mb-3">System Architecture</h3>
              <div className="bg-white/[0.02] border border-white/8 rounded-xl px-5 py-4">
                <p className="text-gray-300 text-sm font-mono">{project.architecture}</p>
              </div>
            </section>
          )}

          {/* ML pipeline */}
          {project.pipeline && (
            <section>
              <h3 className="text-xs text-indigo-400 font-mono tracking-[0.2em] uppercase mb-4">ML Pipeline</h3>
              <div className="flex flex-wrap gap-2 items-center">
                {project.pipeline.map((step, i) => (
                  <React.Fragment key={step}>
                    <div className="bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300">{step}</div>
                    {i < project.pipeline.length - 1 && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3 text-gray-600 flex-shrink-0" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    )}
                  </React.Fragment>
                ))}
              </div>
              {project.models && (
                <div className="mt-4">
                  <div className="text-xs text-gray-500 font-mono mb-2">Models Compared</div>
                  <div className="flex flex-wrap gap-2">
                    {project.models.map(m => <span key={m} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-sm">{m}</span>)}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Cloud stack */}
          {project.stack && (
            <section>
              <h3 className="text-xs text-indigo-400 font-mono tracking-[0.2em] uppercase mb-4">System Architecture</h3>
              <div className="space-y-2">
                {project.stack.map(({ layer, tech }) => (
                  <div key={layer} className="flex items-center gap-4 bg-white/[0.02] border border-white/8 rounded-lg px-4 py-3">
                    <div className="text-gray-600 text-xs font-mono w-20 flex-shrink-0">{layer}</div>
                    <div className="text-white text-sm">{tech}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Highlights */}
          <section>
            <h3 className="text-xs text-indigo-400 font-mono tracking-[0.2em] uppercase mb-3">Engineering Highlights</h3>
            <ul className="space-y-2" aria-label="Engineering highlights">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 w-1 h-1 rounded-full bg-indigo-400 flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-400 text-sm">{h}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Result */}
          {project.result && (
            <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-xl p-5">
              <h3 className="text-xs text-indigo-400 font-mono tracking-[0.2em] uppercase mb-2">Result</h3>
              <p className="text-gray-300 text-sm">{project.result}</p>
            </div>
          )}

          {/* Tech stack */}
          <section>
            <h3 className="text-xs text-gray-500 font-mono tracking-widest uppercase mb-3">Technology Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span key={t} className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-gray-400 font-mono">{t}</span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, onClick }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    gsap.to(glowRef.current, {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
      duration: 0.3,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
  };

  return (
    <article
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`project-card relative group bg-white/[0.02] border border-white/8 rounded-2xl p-7 cursor-pointer overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04] ${
        project.featured ? 'md:col-span-2' : ''
      }`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
      aria-label={`View ${project.name} project details`}
    >
      {/* Glow */}
      <div
        ref={glowRef}
        className="absolute w-64 h-64 rounded-full blur-[80px] pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-0"
        style={{ background: `radial-gradient(circle, ${project.color}20 0%, transparent 70%)` }}
        aria-hidden="true"
      />

      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-5 right-5">
          <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono">Featured</span>
        </div>
      )}

      {/* Category */}
      <p className="text-xs font-mono tracking-[0.2em] uppercase mb-4" style={{ color: project.color }}>
        {project.id} — {project.category}
      </p>

      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-100 transition-colors duration-300">
        {project.name}
      </h3>

      <p className="text-gray-500 text-base leading-relaxed mb-6">
        {project.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2 mb-6" aria-label="Technologies">
        {project.tech.map(t => (
          <span key={t} className="text-xs px-3 py-1 rounded-full border border-white/8 text-gray-500 font-mono">
            {t}
          </span>
        ))}
      </div>

      {/* Result if available */}
      {project.result && (
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-5">
          <span className="w-1 h-1 rounded-full bg-emerald-400" aria-hidden="true" />
          <span className="text-emerald-400 text-xs font-mono">{project.result}</span>
        </div>
      )}

      {/* CTA */}
      <div className="flex items-center gap-2 text-sm font-medium" style={{ color: project.color }}>
        <span>View Case Study</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </div>
    </article>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current.querySelectorAll('.project-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', toggleActions: 'play none none reverse' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full py-28 px-5 md:px-8 bg-[#050508] overflow-hidden"
      aria-labelledby="projects-heading"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />

      <div className="max-w-6xl mx-auto">
        <p className="text-indigo-400 text-xs font-mono tracking-[0.25em] uppercase mb-4">Projects</p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
          <h2 id="projects-heading" className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Selected work.
          </h2>
          <p className="text-gray-500 text-base max-w-sm md:text-right leading-relaxed">
            Engineering projects across AI, cloud, full-stack, and machine learning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}
