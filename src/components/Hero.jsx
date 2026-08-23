import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { profile } from '../data/profile';

export default function Hero() {
  const containerRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const imageRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(bgRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5, ease: 'power2.out' })
      .fromTo(badgeRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.8')
      .fromTo(headingRef.current.children, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' }, '-=0.5')
      .fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .fromTo(ctaRef.current.children, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, '-=0.5')
      .fromTo(imageRef.current, { opacity: 0, scale: 0.92, x: 30 }, { opacity: 1, scale: 1, x: 0, duration: 1.2, ease: 'power3.out' }, '-=1.2');
  }, []);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#050508]"
      aria-label="Hero section"
    >
      {/* Background layer */}
      <div ref={bgRef} className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />
        {/* Ambient glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-600/6 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-900/5 rounded-full blur-[150px]" />
      </div>

      {/* Top gradient overlay */}
      <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-[#050508] to-transparent z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-5 md:px-8 w-full pt-24 pb-12 min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
        
        {/* Left: Text */}
        <div className="flex-1 max-w-2xl">
          {/* Badge */}
          <div ref={badgeRef} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" aria-hidden="true" />
            <span className="text-indigo-300 text-xs font-medium tracking-wide font-mono">
              Open to opportunities · 2026
            </span>
          </div>

          {/* Heading */}
          <h1 ref={headingRef} className="flex flex-col gap-1 mb-6">
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.8rem] xl:text-[4.2rem] font-bold tracking-tight text-white leading-[1.08]">
              Building software
            </span>
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.8rem] xl:text-[4.2rem] font-bold tracking-tight leading-[1.08] accent-gradient-text">
              that solves
            </span>
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.8rem] xl:text-[4.2rem] font-bold tracking-tight text-white leading-[1.08]">
              meaningful problems.
            </span>
          </h1>

          {/* Supporting text */}
          <p ref={subRef} className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-lg mb-10">
            Software Engineering student focused on Generative AI, cloud systems,
            full-stack development and intelligent applications.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-wrap gap-3 items-center">
            <a
              href="#projects"
              className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]"
              aria-label="View my projects"
            >
              View Projects
            </a>
            <a
              href={profile.resume}
              download
              className="px-6 py-3 rounded-xl border border-white/15 text-white font-medium text-sm hover:bg-white/5 hover:border-white/30 transition-all duration-300"
              aria-label="Download Resume"
            >
              Resume ↓
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl border border-white/10 text-gray-400 font-medium text-sm hover:text-white hover:border-white/25 transition-all duration-300"
              aria-label="GitHub profile"
            >
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl border border-white/10 text-gray-400 font-medium text-sm hover:text-white hover:border-white/25 transition-all duration-300"
              aria-label="LinkedIn profile"
            >
              LinkedIn
            </a>
          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap gap-8">
            <div>
              <div className="text-2xl font-bold text-white">9.12<span className="text-gray-500 text-base">/10</span></div>
              <div className="text-gray-500 text-xs mt-1 tracking-wide">CGPA at VIT</div>
            </div>
            <div className="w-px bg-white/10" aria-hidden="true" />
            <div>
              <div className="text-2xl font-bold text-white">5+</div>
              <div className="text-gray-500 text-xs mt-1 tracking-wide">Projects Built</div>
            </div>
            <div className="w-px bg-white/10" aria-hidden="true" />
            <div>
              <div className="text-2xl font-bold text-white">200+</div>
              <div className="text-gray-500 text-xs mt-1 tracking-wide">Hackathon Participants Led</div>
            </div>
          </div>
        </div>

        {/* Right: Profile Image */}
        <div ref={imageRef} className="flex-shrink-0 relative">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[360px] lg:h-[420px]">
            {/* Glow behind image */}
            <div className="absolute inset-0 bg-indigo-600/20 rounded-2xl blur-3xl scale-110" aria-hidden="true" />
            {/* Image container */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-white/5">
              <img
                src={profile.images.profile}
                alt="Shri Sanjaykumar V — Software Engineer"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.classList.add('flex', 'items-center', 'justify-center');
                  const placeholder = document.createElement('div');
                  placeholder.className = 'text-center p-8';
                  placeholder.innerHTML = '<div class="text-4xl font-bold text-indigo-400">SS</div><div class="text-gray-500 text-sm mt-2">Photo loading</div>';
                  e.target.parentElement.appendChild(placeholder);
                }}
              />
            </div>
            {/* Decorative corner */}
            <div className="absolute -bottom-3 -right-3 w-24 h-24 border border-indigo-500/20 rounded-2xl" aria-hidden="true" />
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-[#0a0a14] border border-white/10 rounded-xl px-4 py-2.5 shadow-xl">
              <div className="text-xs text-gray-500 font-mono">Vellore, India</div>
              <div className="text-sm font-semibold text-white mt-0.5">VIT · M.Tech SE</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#050508] to-transparent z-10 pointer-events-none" />
    </section>
  );
}
