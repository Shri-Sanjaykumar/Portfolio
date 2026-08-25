import React, { useEffect } from 'react';
import { soundEffects } from '../utils/audio';

export default function ProjectDossierModal({ node, onClose }) {
  useEffect(() => {
    soundEffects.open();
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        soundEffects.close();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!node) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-8 select-none overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#0c1622] border-3 sm:border-4 border-black rounded-xl shadow-2xl p-4 sm:p-6 md:p-8 flex flex-col gap-5 my-auto text-left max-h-[92vh] overflow-y-auto scanline-overlay"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: '0 20px 50px rgba(0,0,0,0.9), 0 0 20px rgba(77, 130, 164, 0.4)'
        }}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b-2 border-black pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[9px] font-pixel text-cyan-400 uppercase tracking-widest px-2 py-0.5 rounded bg-black border border-cyan-500/40">
                {node.codename || `MISSION // ${node.name.toUpperCase()}`}
              </span>
              <span className={`text-[9px] font-pixel px-2 py-0.5 rounded border border-black font-bold uppercase ${
                node.status === 'CONFIRMED' ? 'bg-[#79a86b]/30 text-[#a3d993]' : 'bg-[#5b99be]/30 text-[#8ec3e3]'
              }`}>
                {node.status}
              </span>
            </div>

            <h2 className="text-base sm:text-xl md:text-2xl font-silk font-bold text-white tracking-wider">
              {node.name}
            </h2>

            <div className="text-xs font-mono text-gray-300 mt-1 flex flex-wrap gap-x-4">
              <span>📍 {node.region}</span>
              <span>📅 {node.date || node.year}</span>
            </div>
          </div>

          <button
            onClick={() => {
              soundEffects.close();
              onClose();
            }}
            className="w-8 h-8 rounded border-2 border-black bg-[#1f3144] hover:bg-[#324d6b] text-white flex items-center justify-center font-silk text-sm cursor-pointer shadow"
          >
            ✕
          </button>
        </div>

        {/* Project AI Preview Banner Image */}
        {node.thumbnail && (
          <div className="w-full h-44 sm:h-56 md:h-64 rounded-lg overflow-hidden border-2 border-black bg-black relative shadow-inner flex-shrink-0">
            <img
              src={node.thumbnail}
              alt={node.name}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-black/80 border border-cyan-400 font-silk text-[10px] text-cyan-300 uppercase tracking-wider">
              {node.category}
            </div>
          </div>
        )}

        {/* Action Buttons: GitHub Repo & Demo Links */}
        <div className="flex flex-wrap items-center gap-3">
          {node.githubUrl && (
            <a
              href={node.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEffects.click()}
              className="px-4 py-2 rounded-lg border-2 border-black bg-[#24292e] hover:bg-[#2f363d] text-white font-silk text-xs font-bold tracking-wider flex items-center gap-2 shadow transition-transform active:scale-95 cursor-pointer"
            >
              <span>🔗 GITHUB REPOSITORY</span>
              <span className="text-cyan-400 text-[10px]">↗</span>
            </a>
          )}
          {node.demoUrl && (
            <a
              href={node.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEffects.click()}
              className="px-4 py-2 rounded-lg border-2 border-black bg-[#e8a838] hover:bg-[#ffd277] text-black font-silk text-xs font-bold tracking-wider flex items-center gap-2 shadow transition-transform active:scale-95 cursor-pointer"
            >
              <span>🚀 VIEW PROJECT / PROFILE</span>
              <span className="text-black text-[10px]">↗</span>
            </a>
          )}
        </div>

        {/* Confidentiality Notice if applicable */}
        {node.confidential && (
          <div className="p-3 bg-amber-950/40 border border-amber-500/40 rounded-lg flex items-start gap-2.5 text-xs font-mono text-amber-200">
            <span className="text-amber-400 font-bold">⚠️</span>
            <span>{node.confidentialNote}</span>
          </div>
        )}

        {/* Problem Statement */}
        {node.problem && (
          <div className="space-y-1.5">
            <div className="text-[10px] font-silk text-cyan-400 uppercase tracking-widest">
              [ 01 // PROBLEM STATEMENT ]
            </div>
            <p className="text-xs md:text-sm font-mono text-gray-200 leading-relaxed bg-[#111f2e] p-3.5 rounded-lg border border-[#1d334a]">
              {node.problem}
            </p>
          </div>
        )}

        {/* Technical Solution */}
        {node.solution && (
          <div className="space-y-1.5">
            <div className="text-[10px] font-silk text-cyan-400 uppercase tracking-widest">
              [ 02 // TECHNICAL APPROACH &amp; SOLUTION ]
            </div>
            <p className="text-xs md:text-sm font-mono text-gray-200 leading-relaxed bg-[#111f2e] p-3.5 rounded-lg border border-[#1d334a]">
              {node.solution}
            </p>
          </div>
        )}

        {/* Architecture Flow */}
        {node.architecture && (
          <div className="space-y-2">
            <div className="text-[10px] font-silk text-cyan-400 uppercase tracking-widest">
              [ 03 // ARCHITECTURE PIPELINE ]
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {node.architecture.map((arch) => (
                <div key={arch.step} className="bg-[#101c29] border border-[#20364c] p-3 rounded-lg flex flex-col justify-between shadow-sm">
                  <div className="flex items-center justify-between text-cyan-400 font-pixel text-[9px] mb-1">
                    <span>STEP {arch.step}</span>
                  </div>
                  <div className="font-silk text-xs font-bold text-white mb-1">
                    {arch.title}
                  </div>
                  <div className="text-[11px] font-mono text-gray-300 leading-tight">
                    {arch.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Engineering Highlights */}
        {node.highlights && (
          <div className="space-y-2">
            <div className="text-[10px] font-silk text-cyan-400 uppercase tracking-widest">
              [ 04 // ENGINEERING HIGHLIGHTS ]
            </div>
            <ul className="space-y-2 bg-[#111f2e] p-3.5 rounded-lg border border-[#1d334a]">
              {node.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs font-mono text-gray-200">
                  <span className="text-cyan-400 font-bold mt-0.5">■</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Measurable Results */}
        {node.result && (
          <div className="p-3.5 bg-[#79a86b]/15 border border-[#79a86b]/40 rounded-lg flex items-center justify-between">
            <span className="text-[10px] font-silk text-[#9dd48d] uppercase tracking-widest">
              MEASURABLE OUTCOME:
            </span>
            <span className="text-xs font-mono font-bold text-white">
              {node.result}
            </span>
          </div>
        )}

        {/* Tech Stack Badges */}
        {node.tech && (
          <div className="space-y-2">
            <div className="text-[10px] font-silk text-cyan-400 uppercase tracking-widest">
              [ 05 // TECHNOLOGIES &amp; TOOLS ]
            </div>
            <div className="flex flex-wrap gap-2">
              {node.tech.map((tool) => (
                <span
                  key={tool}
                  className="px-2.5 py-1 rounded bg-[#162536] border border-[#274059] text-gray-100 text-xs font-mono"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer Close Button */}
        <div className="pt-3 border-t border-[#1b2d40] flex justify-end">
          <button
            onClick={() => {
              soundEffects.close();
              onClose();
            }}
            className="px-6 py-2 rounded-lg border-2 border-black bg-[#e8a838] hover:bg-[#ffd277] text-black font-silk text-xs font-bold uppercase tracking-wider transition-colors shadow cursor-pointer"
          >
            CLOSE DOSSIER
          </button>
        </div>
      </div>
    </div>
  );
}
