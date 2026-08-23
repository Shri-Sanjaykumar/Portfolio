import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { profile } from '../data/profile';

const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Leadership', href: '#leadership' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const mobileMenuRef = useRef(null);
  const mobileLinksRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section detection
  useEffect(() => {
    const sectionIds = NAV_LINKS.map(l => l.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
    );
  }, []);

  useEffect(() => {
    if (!mobileMenuRef.current) return;
    if (isMobileMenuOpen) {
      gsap.to(mobileMenuRef.current, { clipPath: 'circle(150% at 95% 5%)', duration: 0.7, ease: 'power3.inOut' });
      gsap.fromTo(mobileLinksRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power3.out', delay: 0.2 }
      );
    } else {
      gsap.to(mobileMenuRef.current, { clipPath: 'circle(0% at 95% 5%)', duration: 0.5, ease: 'power3.inOut' });
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? 'bg-[#050508]/80 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-5'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group" aria-label="Home">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center group-hover:bg-indigo-500/20 transition-all duration-300">
              <span className="text-indigo-400 font-bold text-sm font-mono">S</span>
            </div>
            <span className="text-white font-semibold text-sm tracking-wide hidden sm:block">
              Shri Sanjaykumar
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                ref={el => linksRef.current[i] = el}
                className={`relative text-sm font-medium transition-colors duration-300 group ${
                  activeSection === link.href.replace('#', '') ? 'text-white' : 'text-gray-500 hover:text-gray-200'
                }`}
                aria-current={activeSection === link.href.replace('#', '') ? 'page' : undefined}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-[1px] bg-indigo-400 transition-all duration-300 ${
                  activeSection === link.href.replace('#', '') ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={profile.resume}
              download
              className="px-4 py-2 text-sm font-medium text-indigo-300 border border-indigo-400/30 rounded-lg hover:bg-indigo-400/10 hover:border-indigo-400/60 transition-all duration-300"
              aria-label="Download Resume"
            >
              Resume
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-all duration-300"
              aria-label="Contact Shri Sanjaykumar"
            >
              Contact
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white p-2 z-50 relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`w-full h-[1.5px] bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[7.5px]' : ''}`} />
              <span className={`w-full h-[1.5px] bg-white transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-[1.5px] bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7.5px]' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 bg-[#050508]/97 backdrop-blur-2xl z-40 flex flex-col justify-center items-center"
        style={{ clipPath: 'circle(0% at 95% 5%)' }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <nav className="flex flex-col gap-7 text-center">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              ref={el => mobileLinksRef.current[i] = el}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-light text-gray-400 hover:text-white transition-colors tracking-wide"
            >
              {link.name}
            </a>
          ))}
          <div className="flex flex-col gap-3 mt-4 pt-6 border-t border-white/10">
            <a
              href={profile.resume}
              download
              className="px-8 py-3 rounded-xl border border-indigo-400/40 text-indigo-300 hover:bg-indigo-400/10 transition-all duration-300 text-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Download Resume
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="px-8 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition-all duration-300 text-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
