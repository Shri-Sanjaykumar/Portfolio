import React, { useState, useEffect } from 'react';
import { setSoundEnabled, soundEffects } from '../utils/audio';

const BOOT_LINES = [
  'INITIALIZING SANJAYKUMAR TRACKER v4.2.0...',
  'BOOTING CORE SERVICES [OK]',
  'INITIALIZING MAP RENDER PIPELINE...',
  'LOADING BASE ASSETS: FRAME UI [OK]',
  'LOADING BASE ASSETS: TICKER MODULE [OK]',
  'STARTING EVENT BUS [OK]',
  'CALIBRATING SPRITESHEET RENDERER [OK]',
  'WARMING VECTOR & EMBEDDING CACHE...',
  'CHECKING FONT REGISTRY [OK]',
  'VALIDATING ROUTE HANDLERS [OK]',
  'CONNECTING TO VIT VELLORE HUB...',
];

export default function IntroScreen({ onStart }) {
  const [isClosing, setIsClosing] = useState(false);
  const [visibleLines, setVisibleLines] = useState([]);
  const [bootDone, setBootDone] = useState(false);

  // Boot log animation — add lines one-by-one
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < BOOT_LINES.length) {
        setVisibleLines((prev) => [...prev, BOOT_LINES[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setBootDone(true), 200);
      }
    }, 180);
    return () => clearInterval(interval);
  }, []);

  const handleSelectSound = (enableSound) => {
    setSoundEnabled(enableSound);
    if (enableSound) soundEffects.intro();
    setIsClosing(true);
    setTimeout(() => {
      onStart(enableSound);
    }, 350);
  };

  return (
    <div
      className={`absolute inset-0 z-50 bg-[#0d1622]/97 flex flex-col items-center justify-center select-none transition-all duration-350 overflow-hidden ${
        isClosing ? 'opacity-0 scale-[0.97] pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{ backdropFilter: 'blur(3px)' }}
    >
      {/* CRT scanlines via pseudo */}
      <div className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)'
        }}
      />

      {/* Boot log — lower-left corner (matches reference screenshot) */}
      <div className="absolute bottom-6 left-6 z-20 text-left pointer-events-none max-w-xs">
        {visibleLines.map((line, i) => (
          <div
            key={i}
            className="text-[8px] sm:text-[9px] font-mono text-[#3d6b8a] leading-relaxed tracking-wide"
          >
            {line}
          </div>
        ))}
        {!bootDone && (
          <span className="text-[8px] font-mono text-[#3d6b8a] animate-cursor">_</span>
        )}
      </div>

      {/* ============================================================
          MAIN INTRO CONTENT (CENTER)
          ============================================================ */}
      <div className="relative z-20 flex flex-col items-center w-full px-4">
        
        {/* Hanging Spider-Man (matching frame-020) */}
        <div className="flex flex-col items-center mb-5 animate-swing" style={{ transformOrigin: 'top center' }}>
          {/* Web line from top */}
          <div
            className="w-[2px] bg-white/90"
            style={{
              height: '70px',
              boxShadow: '0 0 6px rgba(255,255,255,0.6)',
            }}
          />
          {/* Spider-Man character */}
          <div className="relative w-20 h-28 sm:w-24 sm:h-36">
            <img
              src="/spidey/spiderman-hanging-transparent.png"
              alt="Hanging Spider-Man"
              className="w-full h-full object-contain"
              style={{ filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.95)) drop-shadow(0 0 12px rgba(220,38,38,0.3))' }}
              onError={(e) => {
                // Fallback to pixel mascot SVG
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            {/* Pixel mascot fallback */}
            <div className="w-full h-full items-center justify-center hidden">
              <svg viewBox="0 0 32 48" width="80" height="112" xmlns="http://www.w3.org/2000/svg">
                {/* Spider-Man pixel art */}
                <rect x="10" y="2" width="12" height="10" fill="#dc2626"/>
                <rect x="8" y="4" width="2" height="8" fill="#dc2626"/>
                <rect x="22" y="4" width="2" height="8" fill="#dc2626"/>
                <rect x="12" y="5" width="4" height="4" fill="#fff" rx="1"/>
                <rect x="18" y="5" width="4" height="4" fill="#fff" rx="1"/>
                <rect x="13" y="6" width="2" height="2" fill="#1e40af"/>
                <rect x="19" y="6" width="2" height="2" fill="#1e40af"/>
                <rect x="9" y="12" width="14" height="14" fill="#dc2626"/>
                <rect x="7" y="14" width="2" height="8" fill="#dc2626"/>
                <rect x="23" y="14" width="2" height="8" fill="#dc2626"/>
                <rect x="11" y="18" width="10" height="2" fill="#1e40af"/>
                <rect x="11" y="26" width="4" height="14" fill="#1e40af"/>
                <rect x="17" y="26" width="4" height="14" fill="#1e40af"/>
                <rect x="9" y="38" width="2" height="4" fill="#1e40af"/>
                <rect x="21" y="38" width="2" height="4" fill="#1e40af"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Welcome text */}
        <div className="text-center mb-4 px-4 max-w-lg">
          <p className="font-silk text-xs sm:text-sm text-[#e2f0fb] leading-relaxed tracking-wider uppercase font-bold">
            WELCOME TO THE{' '}
            <span className="text-cyan-300">SANJAYKUMAR</span>{' '}
            TRACKER.
          </p>
          <p className="font-silk text-xs sm:text-sm text-[#e2f0fb] leading-relaxed tracking-wider uppercase mt-1">
            INTERACT WITH THE MAP TO VIEW
          </p>
          <p className="font-silk text-xs sm:text-sm text-white leading-relaxed tracking-wider uppercase font-bold mt-0.5">
            ENGINEERING MILESTONES &amp; PROJECTS
          </p>
          <p className="font-silk text-xs sm:text-sm text-[#e2f0fb] leading-relaxed tracking-wider uppercase mt-0.5">
            ALL OVER THE WORLD.
          </p>
        </div>

        {/* 8-bit Audio Equalizer (9 bars, matching frame-020) */}
        <div className="flex items-end justify-center gap-[3px] mb-4" style={{ height: '28px' }}>
          {[1,2,3,4,5,6,7,8,9].map((n) => (
            <div
              key={n}
              className={`w-[6px] sm:w-[7px] bg-cyan-400 rounded-sm eq-bar-${n}`}
              style={{ height: '60%' }}
            />
          ))}
        </div>

        {/* Choose sound prompt */}
        <p className="font-silk text-[10px] sm:text-xs text-gray-400 tracking-widest uppercase mb-5">
          CHOOSE YOUR SETTINGS AND START TRACKING
        </p>

        {/* SOUND ON / SOUND OFF buttons */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={() => handleSelectSound(true)}
            className="btn-arcade-cyan px-6 sm:px-10 py-2.5 text-xs sm:text-sm font-silk font-bold uppercase tracking-wider rounded-lg cursor-pointer"
            style={{ minWidth: '120px' }}
          >
            SOUND ON
          </button>
          <button
            onClick={() => handleSelectSound(false)}
            className="px-6 sm:px-10 py-2.5 text-xs sm:text-sm font-silk font-bold uppercase tracking-wider rounded-lg border-3 border-black bg-[#1f3144] text-gray-300 hover:bg-[#2c455f] hover:text-white cursor-pointer transition-all"
            style={{
              minWidth: '120px',
              boxShadow: '0 4px 0 #000',
            }}
          >
            SOUND OFF
          </button>
        </div>
      </div>
    </div>
  );
}
