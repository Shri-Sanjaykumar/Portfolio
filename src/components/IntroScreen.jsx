import React, { useState, useEffect } from 'react';
import { setSoundEnabled, soundEffects } from '../utils/audio';

const BOOT_LINES = [
  'INITIALIZING SANJAYKUMAR TRACKER v4.2.0...',
  'BOOTING CORE SERVICES [OK]',
  'LOADING BASE ASSETS: FRAME UI [OK]',
  'CALIBRATING SPRITESHEET RENDERER [OK]',
  'WARMING VECTOR & EMBEDDING CACHE [OK]',
  'VALIDATING ROUTE HANDLERS [OK]',
  'CONNECTING TO VIT VELLORE HUB... [OK]',
  'ALL SYSTEMS NOMINAL. WELCOME, AGENT.',
];

const EQ_BARS = 9;

export default function IntroScreen({ onStart }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [bootDone, setBootDone] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      if (i < BOOT_LINES.length) {
        setVisibleLines(prev => [...prev, BOOT_LINES[i]]);
        i++;
      } else {
        clearInterval(iv);
        setTimeout(() => setBootDone(true), 200);
      }
    }, 200);
    return () => clearInterval(iv);
  }, []);

  const handleSelect = (sound) => {
    setSoundEnabled(sound);
    if (sound) { try { soundEffects.intro?.(); } catch {} }
    setIsClosing(true);
    setTimeout(() => onStart(sound), 380);
  };

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center overflow-hidden select-none"
      style={{
        background: 'rgba(8,14,26,0.97)',
        opacity: isClosing ? 0 : 1,
        transform: isClosing ? 'scale(0.97)' : 'scale(1)',
        transition: 'opacity 0.38s ease, transform 0.38s ease',
        backdropFilter: 'blur(4px)',
      }}
    >
      {/* CRT scanlines */}
      <div className="absolute inset-0 pointer-events-none z-10"
        style={{ background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.18) 2px,rgba(0,0,0,0.18) 4px)' }}
      />

      {/* Boot log — lower-left, matching spideytracker reference */}
      <div className="absolute bottom-4 left-4 z-20 pointer-events-none max-w-xs">
        {visibleLines.map((line, i) => (
          <div key={i} className="font-mono leading-snug tracking-wide"
            style={{ fontSize: '8px', color: i === visibleLines.length - 1 ? '#4a8ab0' : '#2a5070' }}
          >
            {line}
          </div>
        ))}
        {!bootDone && <span className="font-mono animate-cursor" style={{fontSize:'8px',color:'#4a8ab0'}}>_</span>}
      </div>

      {/* MAIN CENTER CONTENT */}
      <div className="relative z-20 flex flex-col items-center gap-4 px-4 w-full max-w-md text-center">

        {/* Hanging Spidey */}
        <div className="flex flex-col items-center animate-swing" style={{ transformOrigin: 'top center', marginTop: -30 }}>
          <div className="w-px bg-white/90" style={{ height: 80, boxShadow: '0 0 5px rgba(255,255,255,0.6)' }}/>
          <div className="relative">
            <img
              src="/spidey/spiderman-swinging.png"
              alt="Spider-Man"
              className="object-contain"
              style={{ width: 88, height: 140, filter: 'drop-shadow(0 6px 24px rgba(0,0,0,1)) drop-shadow(0 0 10px rgba(220,38,38,0.3))' }}
              onError={e => { e.target.style.display = 'none'; }}
            />
          </div>
        </div>

        {/* Welcome text — exactly like spideytracker reference */}
        <div className="space-y-0.5">
          <p className="font-silk text-xs sm:text-sm text-white font-bold tracking-wider uppercase">
            WELCOME TO THE{' '}
            <span style={{ color: '#67e8f9' }}>SANJAYKUMAR</span>{' '}
            TRACKER.
          </p>
          <p className="font-silk text-xs sm:text-sm text-[#c8dfe8] tracking-wider uppercase">
            INTERACT WITH THE MAP TO VIEW
          </p>
          <p className="font-silk text-xs sm:text-sm text-white font-bold tracking-wider uppercase">
            ENGINEERING MILESTONES & PROJECTS
          </p>
          <p className="font-silk text-xs sm:text-sm text-[#c8dfe8] tracking-wider uppercase">
            ALL OVER THE WORLD.
          </p>
        </div>

        {/* Equalizer bars — matching spideytracker exactly */}
        <div className="flex items-end justify-center gap-[4px]" style={{ height: 30 }}>
          {Array.from({ length: EQ_BARS }).map((_, i) => (
            <div key={i}
              className={`w-[7px] rounded-sm eq-bar-${i + 1}`}
              style={{ background: '#67e8f9', height: '55%' }}
            />
          ))}
        </div>

        {/* Prompt */}
        <p className="font-silk text-[9px] sm:text-[10px] tracking-widest uppercase"
          style={{ color: '#6b7280' }}
        >
          CHOOSE YOUR SETTINGS AND START TRACKING
        </p>

        {/* Sound buttons — matching spideytracker button style */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleSelect(true)}
            className="btn-arcade-green px-6 sm:px-10 py-2.5 font-silk text-xs font-bold uppercase tracking-wider rounded-lg cursor-pointer"
            style={{ minWidth: 120, color: '#000' }}
          >
            SOUND ON
          </button>
          <button
            onClick={() => handleSelect(false)}
            className="font-silk text-xs font-bold uppercase tracking-wider rounded-lg cursor-pointer transition-all hover:text-white"
            style={{
              minWidth: 120,
              padding: '10px 24px',
              background: '#0e1d2e',
              border: '3px solid #000',
              boxShadow: '0 4px 0 #000',
              color: '#c8dfe8',
            }}
          >
            SOUND OFF
          </button>
        </div>
      </div>
    </div>
  );
}
