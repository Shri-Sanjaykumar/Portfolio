import React, { useState, useEffect } from 'react';
import { soundEffects } from '../utils/audio';

export default function TacticalHUDGuide({ isOpen, onClose }) {
  const [step, setStep] = useState(0);

  if (!isOpen) return null;

  const handleDismiss = () => {
    try { soundEffects.click?.(); } catch {}
    onClose();
  };

  return (
    <div
      className="absolute inset-0 z-40 bg-black/65 backdrop-blur-[2px] flex flex-col justify-between p-4 sm:p-8 select-none pointer-events-auto animate-in fade-in duration-300"
      onClick={handleDismiss}
    >
      {/* ── 1. Top-Left Arrow -> NAV MENU ── */}
      <div className="absolute top-14 left-14 flex items-start gap-3 max-w-xs animate-bounce">
        <svg viewBox="0 0 40 40" width="36" height="36" className="text-[#e8a838] flex-shrink-0 -rotate-45">
          <path d="M20 5 L35 25 L25 25 L25 38 L15 38 L15 25 L5 25 Z" fill="currentColor" stroke="#000" strokeWidth="2" />
        </svg>
        <div className="bg-[#0f1a28] border-2 border-[#e8a838] p-2.5 rounded-lg shadow-xl">
          <div className="font-silk text-xs text-[#e8a838] font-bold uppercase">1. RADAR MENU</div>
          <div className="font-mono text-[10px] text-gray-200 mt-0.5">
            Click here to access Skills, Web Watch Projects, Experience, and About Me.
          </div>
        </div>
      </div>

      {/* ── 2. Top-Center -> GREEN PROJECT HUBS ── */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 max-w-sm text-center">
        <div className="bg-[#0f1a28] border-2 border-[#79a86b] p-3 rounded-lg shadow-2xl">
          <div className="font-silk text-xs text-[#a3d993] font-bold uppercase flex items-center justify-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#79a86b] animate-ping" />
            2. GREEN HUBS = LIVE PROJECTS
          </div>
          <div className="font-mono text-[11px] text-gray-200 mt-1 leading-relaxed">
            Click any green spider pin on the map to inspect its Holographic Lab Dossier &amp; GitHub code!
          </div>
        </div>
        <svg viewBox="0 0 40 40" width="32" height="32" className="text-[#79a86b] animate-bounce">
          <path d="M20 35 L5 15 L15 15 L15 2 L25 2 L25 15 L35 15 Z" fill="currentColor" stroke="#000" strokeWidth="2" />
        </svg>
      </div>

      {/* ── 3. Left-Side Tabs -> CONFIRMED / LABS FILTERS ── */}
      <div className="absolute top-44 left-14 flex items-center gap-3 max-w-xs">
        <svg viewBox="0 0 40 40" width="32" height="32" className="text-cyan-400 -rotate-90 animate-pulse">
          <path d="M20 5 L35 25 L25 25 L25 38 L15 38 L15 25 L5 25 Z" fill="currentColor" stroke="#000" strokeWidth="2" />
        </svg>
        <div className="bg-[#0f1a28] border-2 border-cyan-500/60 p-2.5 rounded-lg shadow-xl">
          <div className="font-silk text-[11px] text-cyan-300 font-bold uppercase">3. MAP FILTERS</div>
          <div className="font-mono text-[10px] text-gray-200 mt-0.5">
            Toggle Green (Confirmed) and Red (Research) signals on the globe.
          </div>
        </div>
      </div>

      {/* ── 4. Bottom-Right -> 3D SIMULATION RADAR ── */}
      <div className="absolute bottom-16 right-28 flex items-end gap-3 max-w-xs text-right">
        <div className="bg-[#0f1a28] border-2 border-[#38bdf8] p-2.5 rounded-lg shadow-xl">
          <div className="font-silk text-[11px] text-[#38bdf8] font-bold uppercase">4. 3D RADAR SCANNER</div>
          <div className="font-mono text-[10px] text-gray-200 mt-0.5">
            Simulates real-time telemetry. Click globe or target to center view!
          </div>
        </div>
        <svg viewBox="0 0 40 40" width="36" height="36" className="text-[#38bdf8] rotate-45 animate-bounce">
          <path d="M20 35 L5 15 L15 15 L15 2 L25 2 L25 15 L35 15 Z" fill="currentColor" stroke="#000" strokeWidth="2" />
        </svg>
      </div>

      {/* Center Dismiss CTA */}
      <div className="my-auto mx-auto z-50 text-center">
        <button
          onClick={handleDismiss}
          className="btn-arcade-yellow px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-widest rounded-xl shadow-[0_0_30px_rgba(232,168,56,0.6)] cursor-pointer hover:scale-105 transition-all"
        >
          START EXPLORING TRACKER 🕷️
        </button>
        <div className="font-mono text-[10px] text-gray-400 mt-2">
          Click anywhere or press ESC to dismiss guide
        </div>
      </div>
    </div>
  );
}
