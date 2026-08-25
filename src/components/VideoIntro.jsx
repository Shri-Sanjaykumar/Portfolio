import React, { useState, useRef, useEffect } from 'react';

const BOOT_LINES = [
  'INITIALIZING SANJAYKUMAR TRACKER v4.2.0...',
  'BOOTING CORE SERVICES [OK]',
  'INITIALIZING MAP RENDER PIPELINE...',
  'LOADING BASE ASSETS: FRAME UI [OK]',
  'CALIBRATING SPRITESHEET RENDERER [OK]',
  'WARMING VECTOR & EMBEDDING CACHE...',
  'CHECKING FONT REGISTRY [OK]',
  'CONNECTING TO VIT VELLORE HUB...',
  'ALL SYSTEMS ONLINE. WELCOME.',
];

export default function VideoIntro({ onComplete }) {
  const videoRef = useRef(null);
  const [phase, setPhase] = useState('video'); // 'video' | 'boot' | 'done'
  const [bootLines, setBootLines] = useState([]);
  const [bootDone, setBootDone] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // When video ends → go to boot phase
  const handleVideoEnd = () => {
    setPhase('boot');
  };

  // Run boot sequence after video ends
  useEffect(() => {
    if (phase !== 'boot') return;
    let i = 0;
    const iv = setInterval(() => {
      if (i < BOOT_LINES.length) {
        setBootLines(prev => [...prev, BOOT_LINES[i]]);
        i++;
      } else {
        clearInterval(iv);
        setBootDone(true);
        // After showing all lines, fade out and call onComplete
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => onComplete(), 700);
        }, 800);
      }
    }, 220);
    return () => clearInterval(iv);
  }, [phase, onComplete]);

  // Allow skip on click or any key
  const handleSkip = () => {
    if (phase === 'video') {
      if (videoRef.current) videoRef.current.pause();
      setPhase('boot');
    } else if (phase === 'boot' && bootDone) {
      setFadeOut(true);
      setTimeout(() => onComplete(), 400);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black cursor-pointer select-none"
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.7s ease',
      }}
      onClick={handleSkip}
    >
      {phase === 'video' && (
        <>
          <video
            ref={videoRef}
            src="/intro.mp4"
            autoPlay
            muted={false}
            playsInline
            onEnded={handleVideoEnd}
            className="w-full h-full object-cover"
            style={{ position: 'absolute', inset: 0 }}
          />
          {/* Skip hint */}
          <div
            className="absolute bottom-8 right-8 z-10 text-white/50 font-silk text-xs tracking-widest border border-white/20 px-3 py-1.5 rounded"
            style={{ background: 'rgba(0,0,0,0.4)' }}
          >
            CLICK TO SKIP
          </div>
        </>
      )}

      {phase === 'boot' && (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#0a1422]"
          style={{
            background: 'radial-gradient(ellipse at center, #0d1f35 0%, #060c14 100%)',
          }}
        >
          {/* CRT scanlines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.2) 2px,rgba(0,0,0,0.2) 4px)',
              zIndex: 1,
            }}
          />

          {/* Spider-Man silhouette */}
          <div className="relative z-10 mb-8">
            <img
              src="/spidey/spiderman-swinging.png"
              alt=""
              className="w-24 h-36 object-contain"
              style={{ filter: 'drop-shadow(0 0 30px rgba(220,38,38,0.5))' }}
            />
          </div>

          {/* Boot log */}
          <div className="relative z-10 w-full max-w-md px-8 text-left space-y-0.5">
            {bootLines.map((line, i) => (
              <div
                key={i}
                className="text-[10px] sm:text-xs font-mono tracking-widest"
                style={{ color: i === bootLines.length - 1 ? '#67e8f9' : '#3d6b8a' }}
              >
                <span style={{ color: '#1e4d6b' }}>{'>'} </span>
                {line}
                {i === bootLines.length - 1 && !bootDone && (
                  <span className="ml-1 animate-cursor text-cyan-400">█</span>
                )}
                {i === bootLines.length - 1 && bootDone && (
                  <span className="ml-2 text-green-400">✓</span>
                )}
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="relative z-10 mt-6 w-full max-w-md px-8">
            <div className="h-1 w-full rounded-full" style={{ background: '#0d1e2e' }}>
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${(bootLines.length / BOOT_LINES.length) * 100}%`,
                  background: 'linear-gradient(90deg, #1e40af, #06b6d4)',
                  boxShadow: '0 0 8px rgba(6,182,212,0.6)',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
