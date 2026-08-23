import React, { useState, useEffect } from 'react';
import { soundEffects } from '../utils/audio';

export default function CinematicIntro({ onComplete }) {
  const [step, setStep] = useState(0);

  const logs = [
    { text: 'INITIALIZING SANJAYKUMAR SIGNAL NETWORK...', delay: 400 },
    { text: 'CALIBRATING TACTICAL RADAR GRID...', delay: 800 },
    { text: 'SEARCHING FOR DEVELOPER SIGNAL...', delay: 1200 },
    { text: 'SIGNAL DETECTED [LAT: 12.9692°N, LNG: 79.1559°E]', delay: 1600 },
    { text: 'IDENTITY VERIFIED: SHRI SANJAYKUMAR V', delay: 2000 },
    { text: 'PORTFOLIO NETWORK ONLINE ■', delay: 2400 },
  ];

  useEffect(() => {
    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    const timers = logs.map((log, index) => {
      return setTimeout(() => {
        setStep(index + 1);
        soundEffects.click();
      }, log.delay);
    });

    const finishTimer = setTimeout(() => {
      soundEffects.intro();
      onComplete();
    }, 2800);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(finishTimer);
    };
  }, []);

  const handleSkip = () => {
    soundEffects.select();
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070d14] flex flex-col items-center justify-center p-6 select-none overflow-hidden scanline-overlay transition-opacity duration-300">
      {/* Background Subtle Radar Grid */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#4d82a4 1px, transparent 1px), linear-gradient(to right, #152433 1px, transparent 1px), linear-gradient(to bottom, #152433 1px, transparent 1px)',
          backgroundSize: '40px 40px, 40px 40px, 40px 40px'
        }}
      />

      {/* Rotating Radar Scanner Sweep */}
      <div className="absolute w-72 h-72 rounded-full border border-cyan-500/20 flex items-center justify-center pointer-events-none opacity-40 animate-pulse">
        <div className="w-48 h-48 rounded-full border border-cyan-500/30" />
        <div className="w-24 h-24 rounded-full border border-cyan-500/40" />
        <div className="absolute inset-0 animate-radar-sweep origin-center">
          <div className="w-1/2 h-1/2 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-tl-full" />
        </div>
      </div>

      {/* Terminal Boot Container */}
      <div className="relative z-10 w-full max-w-lg bg-[#0d1622]/90 border-2 border-black rounded-xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(0,229,255,0.15)] flex flex-col items-center text-center">
        {/* Top Header */}
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#1b2b3d] w-full justify-between text-[10px] font-pixel text-[#4d7394]">
          <span>SANJAYKUMAR // BOOT SEQUENCE</span>
          <span className="text-cyan-400 animate-ping">● LIVE</span>
        </div>

        {/* Hanging Web / Spider Logo */}
        <div className="w-12 h-12 rounded-full bg-[#142334] border-2 border-cyan-400/60 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(0,229,255,0.3)]">
          <img
            src="/spidey/spiderman-face-transparent.png"
            alt="Spider Mask"
            className="w-8 h-8 object-contain filter drop-shadow"
          />
        </div>

        {/* Streaming Boot Terminal Lines */}
        <div className="w-full text-left font-mono text-xs sm:text-sm space-y-2 min-h-[140px]">
          {logs.slice(0, step).map((log, idx) => {
            const isLatest = idx === step - 1;
            return (
              <div
                key={idx}
                className={`transition-all duration-150 flex items-center gap-2 ${
                  isLatest ? 'text-cyan-300 font-bold' : 'text-gray-400'
                }`}
              >
                <span className="text-[10px] text-cyan-500 font-pixel">▶</span>
                <span>{log.text}</span>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-black/60 rounded-full border border-[#20364c] mt-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-[#79a86b] to-yellow-400 transition-all duration-300"
            style={{ width: `${Math.min(100, (step / logs.length) * 100)}%` }}
          />
        </div>

        {/* Skip Intro Button */}
        <button
          onClick={handleSkip}
          className="mt-5 px-5 py-1.5 rounded border border-[#2a435e] bg-[#132232] hover:bg-[#1f354c] text-gray-300 hover:text-white font-silk text-[11px] uppercase tracking-widest transition-all cursor-pointer shadow active:scale-95"
        >
          [ SKIP INITIALIZATION ⏩ ]
        </button>
      </div>
    </div>
  );
}
