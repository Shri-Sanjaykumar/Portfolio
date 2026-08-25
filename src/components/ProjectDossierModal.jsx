import React, { useEffect, useState } from 'react';
import { trackerNodes } from '../data/portfolioData';
import { soundEffects } from '../utils/audio';

export default function ProjectDossierModal({ node, onClose, onSelectNode }) {
  const [currentNode, setCurrentNode] = useState(node);
  const [typedText, setTypedText] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCurrentNode(node);
  }, [node]);

  useEffect(() => {
    try { soundEffects.open?.(); } catch {}
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        try { soundEffects.close?.(); } catch {}
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentNode, onClose]);

  // Dynamic Typewriter Effect for System Overview
  useEffect(() => {
    if (!currentNode) return;
    const fullText = currentNode.problem || currentNode.shortDesc || '';
    setTypedText('');
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < fullText.length) {
        setTypedText((prev) => prev + fullText[idx]);
        idx++;
      } else {
        clearInterval(interval);
      }
    }, 14);
    return () => clearInterval(interval);
  }, [currentNode]);

  if (!currentNode) return null;

  // Next and Previous navigation across all nodes
  const currentIndex = trackerNodes.findIndex((n) => n.id === currentNode.id);
  const handlePrev = () => {
    try { soundEffects.click?.(); } catch {}
    const prevIdx = (currentIndex - 1 + trackerNodes.length) % trackerNodes.length;
    const nextNode = trackerNodes[prevIdx];
    setCurrentNode(nextNode);
    if (onSelectNode) onSelectNode(nextNode);
  };
  const handleNext = () => {
    try { soundEffects.click?.(); } catch {}
    const nextIdx = (currentIndex + 1) % trackerNodes.length;
    const nextNode = trackerNodes[nextIdx];
    setCurrentNode(nextNode);
    if (onSelectNode) onSelectNode(nextNode);
  };

  const handleCopyLink = () => {
    if (currentNode.githubUrl) {
      navigator.clipboard.writeText(currentNode.githubUrl);
      setCopied(true);
      try { soundEffects.click?.(); } catch {}
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const isGreenProject = currentNode.status === 'CONFIRMED' || currentNode.category?.includes('PROJECT') || currentNode.category?.includes('AI');

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-8 select-none overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#09121d] border-3 sm:border-4 border-black rounded-xl shadow-2xl p-4 sm:p-6 md:p-8 flex flex-col gap-5 my-auto text-left max-h-[92vh] overflow-y-auto scanline-overlay"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: '0 25px 60px rgba(0,0,0,0.95), 0 0 35px rgba(6, 182, 212, 0.4)',
        }}
      >
        {/* Transparent Background-Removed Action Spider-Man Watermark */}
        <img
          src="/spidey/spiderman-action.png"
          alt=""
          className="absolute -right-6 -bottom-6 w-64 h-80 object-contain opacity-10 pointer-events-none filter drop-shadow-[0_0_20px_rgba(220,38,38,0.5)]"
        />

        {/* Modal Header Bar */}
        <div className="flex items-start justify-between border-b-2 border-[#16293d] pb-4">
          <div className="flex-1 pr-4 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-[9px] font-pixel text-cyan-400 uppercase tracking-widest px-2 py-0.5 rounded bg-black border border-cyan-500/40">
                {currentNode.codename || `MISSION // ${currentNode.name.toUpperCase()}`}
              </span>
              <span
                className={`text-[9px] font-pixel px-2 py-0.5 rounded border border-black font-bold uppercase ${
                  isGreenProject
                    ? 'bg-[#79a86b]/30 text-[#a3d993]'
                    : 'bg-[#5b99be]/30 text-[#8ec3e3]'
                }`}
              >
                {currentNode.status}
              </span>
              <span className="text-[9px] font-mono text-amber-400 bg-amber-950/40 border border-amber-500/30 px-2 py-0.5 rounded">
                MISSION {currentIndex + 1} OF {trackerNodes.length}
              </span>
            </div>

            <h2 className="text-base sm:text-2xl md:text-3xl font-silk font-bold text-white tracking-wider uppercase truncate">
              {currentNode.name}
            </h2>

            <div className="text-xs font-mono text-gray-300 mt-1 flex flex-wrap gap-x-4 gap-y-1">
              <span>📍 {currentNode.region}</span>
              <span>📅 {currentNode.date || currentNode.year}</span>
              <span className="text-cyan-400">⚡ ACTIVE MISSION DOSSIER</span>
            </div>
          </div>

          {/* Header Controls: Prev / Next + Close */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handlePrev}
              title="Previous Mission (Left Arrow)"
              className="px-2.5 py-1 rounded bg-[#101c2b] border border-[#233f5c] hover:border-cyan-400 text-white font-silk text-xs cursor-pointer transition-all hover:scale-105"
            >
              ‹ PREV
            </button>
            <button
              onClick={handleNext}
              title="Next Mission (Right Arrow)"
              className="px-2.5 py-1 rounded bg-[#101c2b] border border-[#233f5c] hover:border-cyan-400 text-white font-silk text-xs cursor-pointer transition-all hover:scale-105"
            >
              NEXT ›
            </button>
            <button
              onClick={() => {
                try { soundEffects.close?.(); } catch {}
                onClose();
              }}
              className="w-8 h-8 rounded border-2 border-black bg-[#1f3144] hover:bg-[#324d6b] text-white flex items-center justify-center font-silk text-sm cursor-pointer shadow transition-all hover:scale-105 ml-1"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Main 2-Column Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Left Column: Image Banner + Tech Arsenal */}
          <div className="space-y-4">
            {currentNode.thumbnail && (
              <div className="w-full h-44 sm:h-56 rounded-lg overflow-hidden border-2 border-[#1e3d5a] bg-black relative shadow-inner">
                <img
                  src={currentNode.thumbnail}
                  alt={currentNode.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-black/80 border border-cyan-400 font-silk text-[10px] text-cyan-300 uppercase tracking-wider">
                  {currentNode.category}
                </div>
              </div>
            )}

            {/* Tech Stack Chips */}
            <div>
              <div className="text-[10px] font-silk text-cyan-400 uppercase tracking-wider mb-2">
                SYSTEM ARSENAL &amp; DEPENDENCIES
              </div>
              <div className="flex flex-wrap gap-1.5">
                {currentNode.tech?.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 bg-[#122132] border border-[#223d59] text-cyan-300 text-[11px] font-mono rounded hover:bg-[#1a334e] transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Terminal Typewriter & Resolution */}
          <div className="space-y-4 flex flex-col justify-between">
            {/* Dynamic Typewriter Terminal Box */}
            <div className="bg-[#050b12] border border-[#1b354d] p-3.5 rounded-lg font-mono text-xs text-green-400 shadow-inner min-h-[110px] relative">
              <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-[#13283a] text-[9px] text-[#4d7394]">
                <span>TERMINAL://MISSION_STREAM</span>
                <span className="text-cyan-400 animate-pulse">● LIVE</span>
              </div>
              <p className="leading-relaxed whitespace-pre-wrap font-mono text-xs text-gray-200">
                {typedText}
                <span className="animate-cursor text-cyan-400 ml-1">█</span>
              </p>
            </div>

            {/* Architecture Resolution */}
            {currentNode.solution && (
              <div className="bg-[#0e1926] border border-[#1e344a] p-3.5 rounded-lg">
                <div className="text-[10px] font-silk text-amber-400 uppercase tracking-wider mb-1.5">
                  ARCHITECTURE &amp; RESOLUTION
                </div>
                <p className="text-xs font-mono text-gray-300 leading-relaxed">
                  {currentNode.solution}
                </p>
              </div>
            )}

            {/* Key Deliverables List */}
            {currentNode.highlights && (
              <div className="space-y-1.5">
                <div className="text-[10px] font-silk text-cyan-400 uppercase tracking-wider">
                  SYSTEM HIGHLIGHTS
                </div>
                <ul className="space-y-1">
                  {currentNode.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs font-mono text-gray-300">
                      <span className="text-cyan-400 font-bold">▸</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#16293d]">
          {currentNode.githubUrl && (
            <a
              href={currentNode.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { try { soundEffects.click?.(); } catch {} }}
              className="btn-arcade-yellow px-5 py-2 text-xs font-bold tracking-wider flex items-center gap-2 rounded-lg cursor-pointer shadow-lg hover:scale-105 transition-all"
            >
              <span>🔗 VIEW GITHUB REPOSITORY</span>
              <span className="text-[10px]">↗</span>
            </a>
          )}
          {currentNode.demoUrl && (
            <a
              href={currentNode.demoUrl}
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
