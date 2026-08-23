import React from 'react';
import { PixelSpiderMarker, PixelStarMarker } from './PixelIcons';
import { soundEffects } from '../utils/audio';

export default function HelpOverlay({ isOpen = false, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="absolute inset-0 z-40 bg-[#0d1622]/90 backdrop-blur-sm flex flex-col justify-between p-6 md:p-10 select-none cursor-pointer scanline-overlay"
      onClick={() => {
        soundEffects.close();
        onClose();
      }}
    >
      {/* Top Banner Guide Text (Screenshot 9) */}
      <div className="text-center max-w-lg mx-auto mt-6">
        <h2 className="text-xs md:text-sm font-silk font-bold text-[#f5a742] tracking-wider leading-relaxed">
          WELCOME! HERE'S A HANDY GUIDE TO
          <br />
          HELP YOU NAVIGATE THE EXPERIENCE.
        </h2>
      </div>

      {/* Center Legend & Callout Items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto w-full my-auto items-center">
        {/* Confirmed Sighting Legend */}
        <div className="bg-[#101c29]/90 border-2 border-black p-4 rounded-lg flex items-center gap-4 shadow-lg">
          <PixelSpiderMarker color="green" size={32} />
          <div>
            <div className="text-xs font-silk font-bold text-[#9dd48d]">
              CONFIRMED SIGHTING
            </div>
            <div className="text-[10px] font-mono text-gray-400 mt-0.5">
              Completed Engineering Projects &amp; Work
            </div>
          </div>
        </div>

        {/* Rumored Sighting Legend */}
        <div className="bg-[#101c29]/90 border-2 border-black p-4 rounded-lg flex items-center gap-4 shadow-lg">
          <PixelSpiderMarker color="red" size={32} />
          <div>
            <div className="text-xs font-silk font-bold text-[#f27979]">
              RUMORED SIGHTING
            </div>
            <div className="text-[10px] font-mono text-gray-400 mt-0.5">
              Ongoing Research &amp; Exploratory Lab
            </div>
          </div>
        </div>

        {/* Event / Leadership Legend */}
        <div className="bg-[#101c29]/90 border-2 border-black p-4 rounded-lg flex items-center gap-4 shadow-lg">
          <PixelStarMarker size={32} />
          <div>
            <div className="text-xs font-silk font-bold text-[#8ec3e3]">
              EVENT / MILESTONE
            </div>
            <div className="text-[10px] font-mono text-gray-400 mt-0.5">
              Leadership &amp; Education Hubs (VIT Vellore)
            </div>
          </div>
        </div>
      </div>

      {/* Screen Controls Annotation Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto w-full text-center text-[10px] font-silk text-cyan-300">
        <div className="bg-black/60 border border-cyan-500/30 p-2 rounded">
          ↖ TOP-LEFT: MENU OVERLAY
        </div>
        <div className="bg-black/60 border border-cyan-500/30 p-2 rounded">
          ← LEFT: FILTER TOGGLES
        </div>
        <div className="bg-black/60 border border-cyan-500/30 p-2 rounded">
          ↗ TOP-RIGHT: CONNECT DRAWER
        </div>
        <div className="bg-black/60 border border-cyan-500/30 p-2 rounded">
          ↘ RADAR: GLOBAL &amp; LOCAL VIEW
        </div>
      </div>

      {/* Bottom Dismiss Prompt */}
      <div className="text-center mt-6">
        <div className="inline-block px-6 py-2 bg-black/80 border border-white/20 rounded font-silk text-xs text-white tracking-widest animate-pulse">
          ■ TAP ANYWHERE TO CLOSE GUIDE ■
        </div>
      </div>
    </div>
  );
}
