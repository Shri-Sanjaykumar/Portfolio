import React, { useState, useEffect } from 'react';

export default function HologramRadar3D({ onGlobalClick, onCenterClick, isGlobal = true }) {
  const [telemetry, setTelemetry] = useState({ lat: '12.9692° N', lng: '79.1559° E', alt: '214M', sat: '8/12' });

  // Simulated live telemetry fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      const latOffset = (Math.random() * 0.005 - 0.0025).toFixed(4);
      const lngOffset = (Math.random() * 0.005 - 0.0025).toFixed(4);
      setTelemetry({
        lat: `${(12.9692 + parseFloat(latOffset)).toFixed(4)}° N`,
        lng: `${(79.1559 + parseFloat(lngOffset)).toFixed(4)}° E`,
        alt: `${Math.floor(212 + Math.random() * 6)}M`,
        sat: `${Math.floor(8 + Math.random() * 3)}/12`,
      });
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative flex flex-col items-end gap-1 select-none pointer-events-auto group"
      style={{
        perspective: '800px',
      }}
    >
      {/* Telemetry HUD Pill above radar */}
      <div className="bg-[#09131f]/90 backdrop-blur-md border border-cyan-500/40 px-2 py-0.5 rounded text-[8px] font-mono text-cyan-300 flex items-center gap-2 shadow-lg mb-0.5">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
        <span>{telemetry.lat}</span>
        <span>|</span>
        <span>{telemetry.lng}</span>
      </div>

      <div
        className="relative w-28 sm:w-32 h-28 sm:h-32 flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateX(18deg) rotateY(-12deg)',
        }}
      >
        {/* Holographic Projection Base Cone */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(2,132,199,0.05) 60%, transparent 80%)',
            boxShadow: '0 0 30px rgba(6,182,212,0.3), inset 0 0 20px rgba(6,182,212,0.25)',
          }}
        />

        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-2xl">
          {/* Outer Cyberpunk Ring */}
          <circle cx="60" cy="60" r="56" fill="#07111c" stroke="#1c3e5e" strokeWidth="2.5" />
          <circle cx="60" cy="60" r="54" fill="none" stroke="#255580" strokeWidth="1" strokeDasharray="4,3" />

          {/* Web Radial Angles */}
          {[0, 30, 60, 90, 120, 150].map((deg) => (
            <line
              key={deg}
              x1="60"
              y1="60"
              x2={60 + 52 * Math.cos((deg * Math.PI) / 180)}
              y2={60 + 52 * Math.sin((deg * Math.PI) / 180)}
              stroke="#152f47"
              strokeWidth="1.2"
              strokeDasharray="2,2"
            />
          ))}
          {[180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="60"
              y1="60"
              x2={60 + 52 * Math.cos((deg * Math.PI) / 180)}
              y2={60 + 52 * Math.sin((deg * Math.PI) / 180)}
              stroke="#152f47"
              strokeWidth="1.2"
              strokeDasharray="2,2"
            />
          ))}

          {/* Web Concentric Range Rings */}
          <circle cx="60" cy="60" r="18" fill="none" stroke="#1d4366" strokeWidth="1" />
          <circle cx="60" cy="60" r="34" fill="none" stroke="#1d4366" strokeWidth="1" />
          <circle cx="60" cy="60" r="50" fill="none" stroke="#2b6294" strokeWidth="1.5" />

          {/* Center Spider Icon Watermark in Hologram */}
          <g opacity="0.35" transform="translate(54, 54)">
            <ellipse cx="6" cy="7" rx="2.5" ry="3.5" fill="#38bdf8" />
            <circle cx="6" cy="3.5" r="2" fill="#38bdf8" />
          </g>

          {/* Live Simulated Active Node Blips */}
          <circle cx="82" cy="52" r="3.5" fill="#79a86b" className="animate-ping" />
          <circle cx="82" cy="52" r="2.5" fill="#a3d993" />
          <circle cx="38" cy="44" r="3" fill="#ef4444" className="animate-ping" />
          <circle cx="38" cy="44" r="2" fill="#f87171" />
          <circle cx="70" cy="78" r="2.5" fill="#38bdf8" />
          <circle cx="50" cy="66" r="2" fill="#eab308" />

          {/* Rotating Holographic 3D Sweep Fan */}
          <g className="animate-radar-sweep origin-center">
            <path
              d="M60,60 L110,60 A50,50 0 0,0 60,10 Z"
              fill="url(#holo-radar-gradient)"
              opacity="0.85"
            />
            <line x1="60" y1="60" x2="110" y2="60" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          <defs>
            <radialGradient id="holo-radar-gradient" cx="60" cy="60" r="50" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.05" />
              <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#00ff88" stopOpacity="0.75" />
            </radialGradient>
          </defs>
        </svg>

        {/* Action Controls Column */}
        <div className="absolute -right-2 top-2 flex flex-col gap-2 z-30">
          <button
            onClick={onGlobalClick}
            title="Global Recon View"
            className={`w-7 h-7 rounded-full border border-black flex items-center justify-center shadow-lg transition-all cursor-pointer ${
              isGlobal ? 'bg-[#7bb0d4] text-black font-bold scale-110 shadow-[0_0_10px_#7bb0d4]' : 'bg-[#142334] text-cyan-300 hover:bg-[#223952]'
            }`}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <line x1="3.6" y1="9" x2="20.4" y2="9" />
              <line x1="3.6" y1="15" x2="20.4" y2="15" />
              <ellipse cx="12" cy="12" rx="4" ry="9" />
            </svg>
          </button>

          <button
            onClick={onCenterClick}
            title="Center Map on VIT Vellore Hub"
            className="w-7 h-7 rounded-full border border-black bg-[#142334] hover:bg-[#223952] text-cyan-300 flex items-center justify-center shadow-lg transition-all cursor-pointer hover:scale-110 hover:shadow-[0_0_10px_#06b6d4]"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="8" />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
              <line x1="12" y1="2" x2="12" y2="6" />
              <line x1="12" y1="18" x2="12" y2="22" />
              <line x1="2" y1="12" x2="6" y2="12" />
              <line x1="18" y1="12" x2="22" y2="12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
