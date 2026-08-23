import React, { useState, useEffect } from 'react';
import { PixelMascot } from './PixelIcons';
import { setSoundEnabled, soundEffects } from '../utils/audio';

export default function IntroScreen({ onStartTracking }) {
  const [bootIndex, setBootIndex] = useState(0);

  const bootLogs = [
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
    'CONNECTING TO VIT VELLORE HUB...'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setBootIndex((prev) => (prev < bootLogs.length ? prev + 1 : prev));
    }, 150);
    return () => clearInterval(timer);
  }, [bootLogs.length]);

  const handleChoice = (enableAudio) => {
    try {
      setSoundEnabled(enableAudio);
      if (enableAudio) {
        soundEffects.intro();
      } else {
        soundEffects.click();
      }
    } catch (e) {
      console.warn('Audio opt-in error:', e);
    }
    onStartTracking();
  };

  return (
    <div className="absolute inset-0 z-50 bg-[#0d1622]/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden scanline-overlay transition-opacity duration-300">
      {/* Background Subtle Radar Grid */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#4d82a4 1px, transparent 1px), linear-gradient(to right, #1b2e44 1px, transparent 1px), linear-gradient(to bottom, #1b2e44 1px, transparent 1px)',
          backgroundSize: '40px 40px, 40px 40px, 40px 40px'
        }}
      />

      {/* Boot Logs Terminal (Left Side Overlay - matching Screenshot 1) */}
      <div className="absolute left-6 top-10 bottom-10 hidden xl:flex flex-col justify-end text-left font-mono text-[9px] text-[#34516d] pointer-events-none max-w-xs space-y-1">
        {bootLogs.slice(0, bootIndex).map((log, idx) => (
          <div key={idx} className="transition-opacity duration-200">
            {log}
          </div>
        ))}
      </div>

      {/* Main Intro Center Card */}
      <div className="relative z-10 max-w-xl w-full flex flex-col items-center">
        {/* Hanging Web Line from Ceiling */}
        <div className="w-[1.5px] h-14 bg-white/70 shadow-[0_0_8px_white]" />
        
        {/* Hanging Pixel Mascot Animation */}
        <div className="animate-swing mb-5 -mt-1">
          <PixelMascot className="w-16 h-20 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]" />
        </div>

        {/* Welcome Message Heading */}
        <h2 className="text-xs sm:text-sm md:text-base font-silk text-[#e2f0fb] leading-relaxed tracking-wider mb-3 max-w-md">
          WELCOME TO THE <span className="text-cyan-400 font-bold">SANJAYKUMAR</span> TRACKER.
        </h2>

        <p className="text-[11px] sm:text-xs md:text-sm font-silk text-[#8cb0cc] leading-relaxed tracking-wide mb-5 max-w-lg">
          INTERACT WITH THE MAP TO VIEW
          <br />
          <span className="text-white font-bold">ENGINEERING MILESTONES &amp; PROJECTS</span>
          <br />
          ALL OVER THE WORLD.
        </p>

        {/* 8-bit Animated Progress Blocks */}
        <div className="flex items-center gap-1.5 mb-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="w-2.5 h-4 bg-cyan-400 border border-black shadow"
              style={{
                animation: `pulse 1.2s infinite ease-in-out ${i * 0.15}s`
              }}
            />
          ))}
        </div>

        {/* Audio Choice Prompts */}
        <p className="text-[10px] sm:text-[11px] font-silk text-[#5b83a3] uppercase tracking-widest mb-4">
          CHOOSE YOUR SETTINGS AND START TRACKING
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => handleChoice(true)}
            className="px-6 sm:px-8 py-2.5 sm:py-3 rounded border-2 border-black bg-[#4d82a4] hover:bg-[#689ec4] text-white font-silk text-xs tracking-widest uppercase transition-all shadow-[0_4px_0_#000] active:translate-y-1 active:shadow-none cursor-pointer"
          >
            SOUND ON
          </button>
          <button
            onClick={() => handleChoice(false)}
            className="px-6 sm:px-8 py-2.5 sm:py-3 rounded border-2 border-black bg-[#1b2b3a] hover:bg-[#283f54] text-gray-300 font-silk text-xs tracking-widest uppercase transition-all shadow-[0_4px_0_#000] active:translate-y-1 active:shadow-none cursor-pointer"
          >
            SOUND OFF
          </button>
        </div>
      </div>
    </div>
  );
}
