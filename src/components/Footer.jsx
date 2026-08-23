import React from 'react';
import { profile } from '../data/profile';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/5 bg-[#050508] py-8 px-5 md:px-8" role="contentinfo">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-gray-600 text-sm">
          © {year} Shri Sanjaykumar V &mdash; Built with React &amp; Vite.
        </p>
        <nav aria-label="Footer navigation" className="flex items-center gap-6">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-300 text-sm transition-colors duration-200"
            aria-label="GitHub profile"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-300 text-sm transition-colors duration-200"
            aria-label="LinkedIn profile"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="text-gray-600 hover:text-gray-300 text-sm transition-colors duration-200"
            aria-label="Send email"
          >
            Email
          </a>
        </nav>
      </div>
    </footer>
  );
}
