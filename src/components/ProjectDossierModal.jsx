import React, { useEffect, useState } from 'react';
import { soundEffects } from '../utils/audio';

export default function ProjectDossierModal({ node, onClose }) {
  const [typedText, setTypedText] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try { soundEffects.open?.(); } catch {}
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        try { soundEffects.close?.(); } catch {}
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Dynamic Typewriter Effect for Problem / System Overview
  useEffect(() => {
    if (!node) return;
    const fullText = node.problem || node.shortDesc || '';
    setTypedText('');
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < fullText.length) {
        setTypedText((prev) => prev + fullText[idx]);
        idx++;
      } else {
        clearInterval(interval);
      }
    }, 15);
    return () => clearInterval(interval);
  }, [node]);

  if (!node) return null;

  const handleCopyLink = () => {
    if (node.githubUrl) {
      navigator.clipboard.writeText(node.githubUrl);
      setCopied(true);
      try { soundEffects.click?.(); } catch {}
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-8 select-none overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#0a121e] border-3 sm:border-4 border-black rounded-xl shadow-2xl p-4 sm:p-6 md:p-8 flex flex-col gap-5 my-auto text-left max-h-[92vh] overflow-y-auto scanline-overlay"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: '0 25px 60px rgba(0,0,0,0.95), 0 0 35px rgba(6, 182, 212, 0.4)',
        }}
      >
        {/* Transparent Action Spider-Man Watermark in Background */}
        <img
          src="/spidey/spiderman-action.png"
          alt=""
          className="absolute -right-8 -bottom-8 w-64 h-80 object-contain opacity-10 pointer-events-none filter drop-shadow-[0_0_20px_rgba(220,38,38,0.5)]"
        />

        {/* Modal Header: Terminal / Lab Dossier Pipeline */}
        <div className="flex items-start justify-between border-b-2 border-[#16293d] pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-[9px] font-pixel text-cyan-400 uppercase tracking-widest px-2 py-0.5 rounded bg-black border border-cyan-500/40">
                {node.codename || `LAB // ${node.name.toUpperCase()}`}
              </span>
              <span
                className={`text-[9px] font-pixel px-2 py-0.5 rounded border border-black font-bold uppercase ${
                  node.status === 'CONFIRMED'
                    ? 'bg-[#79a86b]/30 text-[#a3d993]'
                    : 'bg-[#5b99be]/30 text-[#8ec3e3]'
                }`}
              >
                {node.status}
              </span>
              <span className="text-[9px] font-mono text-amber-400 bg-amber-950/40 border border-amber-500/30 px-2 py-0.5 rounded">
                METRICS: SHIPPED
              </span>
            </div>

            <h2 className="text-base sm:text-2xl md:text-3xl font-silk font-bold text-white tracking-wider uppercase">
              {node.name}
            </h2>

            <div className="text-xs font-mono text-gray-300 mt-1 flex flex-wrap gap-x-4 gap-y-1">
              <span>📍 {node.region}</span>
              <span>📅 {node.date || node.year}</span>
              <span className="text-cyan-400">⚡ LAB RECON VALIDATED</span>
            </div>
          </div>

          <button
            onClick={() => {
              try { soundEffects.close?.(); } catch {}
              onClose();
            }}
            className="w-8 h-8 rounded border-2 border-black bg-[#1f3144] hover:bg-[#324d6b] text-white flex items-center justify-center font-silk text-sm cursor-pointer shadow transition-all hover:scale-105"
          >
            ✕
          </button>
        </div>

        {/* Main 2-Column Split: Image / Lab Specs Left + Dynamic Terminal Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Left Column: Image Banner + Tech Specs */}
          <div className="space-y-4">
            {node.thumbnail && (
              <div className="w-full h-44 sm:h-52 rounded-lg overflow-hidden border-2 border-[#1e3d5a] bg-black relative shadow-inner">
                <img
                  src={node.thumbnail}
                  alt={node.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-black/80 border border-cyan-400 font-silk text-[10px] text-cyan-300 uppercase tracking-wider">
                  {node.category}
                </div>
              </div>
            )}

            {/* Tech Stack Chips */}
            <div>
              <div className="text-[10px] font-silk text-cyan-400 uppercase tracking-wider mb-2">
                SYSTEM ARSENAL &amp; DEPENDENCIES
              </div>
              <div className="flex flex-wrap gap-1.5">
                {node.tech?.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-1 bg-[#122132] border border-[#223d59] text-cyan-300 text-[10px] font-mono rounded hover:bg-[#1a334e] transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Terminal Typewriter & Architecture Breakdown */}
          <div className="space-y-4 flex flex-col justify-between">
            {/* Dynamic Typewriter Terminal Box */}
            <div className="bg-[#060c14] border border-[#1b354d] p-3.5 rounded-lg font-mono text-xs text-green-400 shadow-inner min-h-[110px] relative">
              <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-[#13283a] text-[9px] text-[#4d7394]">
                <span>TERMINAL://LOG.STREAM</span>
                <span className="text-cyan-400 animate-pulse">● LIVE</span>
              </div>
              <p className="leading-relaxed whitespace-pre-wrap">
                {typedText}
                <span className="animate-cursor text-cyan-400 ml-1">█</span>
              </p>
            </div>

            {/* System Solution / Architecture Highlights */}
            {node.solution && (
              <div className="bg-[#0e1926] border border-[#1e344a] p-3.5 rounded-lg">
                <div className="text-[10px] font-silk text-amber-400 uppercase tracking-wider mb-1.5">
                  ARCHITECTURE &amp; RESOLUTION
                </div>
                <p className="text-xs font-mono text-gray-300 leading-relaxed">
                  {node.solution}
                </p>
              </div>
            )}

            {/* Key Engineering Deliverables */}
            {node.highlights && (
              <div className="space-y-1.5">
                <div className="text-[10px] font-silk text-cyan-400 uppercase tracking-wider">
                  SYSTEM HIGHLIGHTS
                </div>
                <ul className="space-y-1">
                  {node.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-[11px] font-mono text-gray-300">
                      <span className="text-cyan-400 font-bold">▸</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons: GitHub Repo, Live Demo & Copy */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#16293d]">
          {node.githubUrl && (
            <a
              href={node.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { try { soundEffects.click?.(); } catch {} }}
              className="btn-arcade-yellow px-5 py-2 text-xs font-bold tracking-wider flex items-center gap-2 rounded-lg cursor-pointer"
            >
              <span>🔗 VIEW GITHUB REPO</span>
              <span className="text-[10px]">↗</span>
            </a>
          )}
          {node.demoUrl && (
            <a
              href={node.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { try { soundEffects.click?.(); } catch {} }}
              className="px-4 py-2 rounded-lg border-2 border-black bg-[#1f3144] hover:bg-[#324d6b] text-cyan-300 font-silk text-xs font-bold tracking-wider flex items-center gap-2 shadow transition-all cursor-pointer"
            >
              <span>🌐 LIVE TARGET DEMO</span>
              <span className="text-[10px]">↗</span>
            </a>
          )}
          <button
            onClick={handleCopyLink}
            className="px-4 py-2 rounded-lg border-2 border-black bg-[#132230] hover:bg-[#1f3448] text-gray-300 font-silk text-xs tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ml-auto"
          >
            {copied ? '✓ COPIED!' : '📋 COPY REPO LINK'}
          </button>
        </div>
      </div>
    </div>
  );
}
