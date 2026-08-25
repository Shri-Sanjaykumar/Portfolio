import React, { useState, useRef, useEffect } from 'react';
import { soundEffects } from '../utils/audio';

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
  const [isMuted, setIsMuted] = useState(true);
  const [videoStarted, setVideoStarted] = useState(false);

  // Autoplay video with muted=true (guaranteed to never get stuck on any browser)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setVideoStarted(true);
          })
          .catch((err) => {
            console.warn('Autoplay prevented, ready on gesture:', err);
            setVideoStarted(true);
          });
      }
    }

    // Safety fallback: if video hasn't ended after 14 seconds, automatically advance to boot sequence
    const safetyTimer = setTimeout(() => {
      setPhase((p) => (p === 'video' ? 'boot' : p));
    }, 14000);

    return () => clearTimeout(safetyTimer);
  }, []);

  // When video ends → go to boot phase
  const handleVideoEnd = () => {
    setPhase('boot');
  };

  // Run boot sequence after video ends
  useEffect(() => {
    if (phase !== 'boot') return;
    try { soundEffects.intro?.(); } catch {}
    let i = 0;
    const iv = setInterval(() => {
      if (i < BOOT_LINES.length) {
        setBootLines((prev) => [...prev, BOOT_LINES[i]]);
        i++;
      } else {
        clearInterval(iv);
        setBootDone(true);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => onComplete(), 700);
        }, 800);
      }
    }, 200);
    return () => clearInterval(iv);
  }, [phase, onComplete]);

  // Toggle audio on user click
  const toggleAudio = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      const next = !isMuted;
      videoRef.current.muted = next;
      setIsMuted(next);
    }
  };

  // Skip video
  const handleSkip = () => {
    if (phase === 'video') {
      if (videoRef.current) videoRef.current.pause();
      setPhase('boot');
    } else if (phase === 'boot' && bootDone) {
      setFadeOut(true);
      setTimeout(() => onComplete(), 300);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black cursor-pointer select-none overflow-hidden"
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.7s ease',
      }}
      onClick={handleSkip}
    >
      {phase === 'video' && (
        <div className="relative w-full h-full flex items-center justify-center bg-black">
          <video
            ref={videoRef}
            src="/intro.mp4"
            autoPlay
            muted={isMuted}
            playsInline
            onEnded={handleVideoEnd}
            className="w-full h-full object-cover sm:object-contain"
          />

          {/* Futuristic HUD overlay on video */}
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 sm:p-10">
            {/* Top HUD bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-cyan-500/40">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="font-silk text-[10px] sm:text-xs text-cyan-300 tracking-widest uppercase">
                  CINEMATIC // RECON LOG
                </span>
              </div>

              {/* Unmute / Audio Toggle */}
              <button
                onClick={toggleAudio}
                className="pointer-events-auto bg-black/70 hover:bg-black/90 backdrop-blur-md px-3 py-1.5 rounded border border-cyan-400 font-silk text-[10px] sm:text-xs text-cyan-300 flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>{isMuted ? '🔇 UNMUTE AUDIO' : '🔊 AUDIO ACTIVE'}</span>
              </button>
            </div>

            {/* Bottom HUD bar */}
            <div className="flex items-center justify-between">
              <div className="font-mono text-[9px] sm:text-[11px] text-gray-400 bg-black/60 px-3 py-1 rounded">
                SPIDEY TRACKER SYSTEM INITIALIZATION
              </div>

              {/* Skip Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSkip();
                }}
                className="pointer-events-auto btn-arcade-yellow px-4 sm:px-6 py-2 text-[10px] sm:text-xs font-bold rounded-lg cursor-pointer shadow-lg hover:scale-105 transition-all"
              >
                SKIP INTRO ⏭
              </button>
            </div>
          </div>
        </div>
      )}

      {phase === 'boot' && (
        <div
          className="w-full h-full flex flex-col items-center justify-center bg-[#0a1422] relative"
          style={{
            background: 'radial-gradient(ellipse at center, #0d1f35 0%, #060c14 100%)',
          }}
        >
          {/* CRT scanlines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.2) 2px,rgba(0,0,0,0.2) 4px)',
              zIndex: 1,
            }}
          />

          {/* Spider-Man silhouette */}
          <div className="relative z-10 mb-6 animate-pulse">
            <img
              src="/spidey/spiderman-swinging.png"
              alt=""
              className="w-24 h-36 object-contain"
              style={{ filter: 'drop-shadow(0 0 30px rgba(220,38,38,0.6))' }}
            />
          </div>

          {/* Boot log */}
          <div className="relative z-10 w-full max-w-md px-6 text-left space-y-1">
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
          <div className="relative z-10 mt-6 w-full max-w-md px-6">
            <div className="h-1.5 w-full rounded-full bg-[#0d1e2e] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-200"
                style={{
                  width: `${(bootLines.length / BOOT_LINES.length) * 100}%`,
                  background: 'linear-gradient(90deg, #1e40af, #06b6d4, #a3e635)',
                  boxShadow: '0 0 10px rgba(6,182,212,0.8)',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
