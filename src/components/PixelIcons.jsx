import React from 'react';

// Pixel Logo Mask for Header Pill
export const PixelSpiderMask = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Oval Pixel Head */}
    <rect x="6" y="2" width="12" height="2" fill="#d9383a" />
    <rect x="4" y="4" width="16" height="2" fill="#d9383a" />
    <rect x="2" y="6" width="20" height="10" fill="#d9383a" />
    <rect x="4" y="16" width="16" height="4" fill="#d9383a" />
    <rect x="6" y="20" width="12" height="2" fill="#d9383a" />
    
    {/* Black Web Lines */}
    <rect x="11" y="2" width="2" height="20" fill="#000" />
    <rect x="4" y="11" width="16" height="2" fill="#000" />

    {/* Big White Angled Pixel Eyes */}
    <polygon points="5,8 9,8 10,13 6,13" fill="#ffffff" />
    <polygon points="15,8 19,8 18,13 14,13" fill="#ffffff" />
    
    {/* Black Eye Borders */}
    <path d="M5 7h4v1H5zm0 1H4v5h1v1h1v-1h4v-1h-1V9H8V8H5z" fill="#000" />
    <path d="M15 7h4v1h-4zm4 1h1v5h-1v1h-1v-1h-4v-1h1V9h1V8h3z" fill="#000" />
  </svg>
);

// Pixel Spider Marker for Confirmed / Rumored / Project nodes
export const PixelSpiderMarker = ({ color = 'green', size = 32, isHovered = false, isSelected = false }) => {
  const bgColors = {
    green: { fill: '#79a86b', light: '#a3d993', dark: '#3b5c32', spider: '#000000' },
    red: { fill: '#d94b4b', light: '#f27979', dark: '#731f1f', spider: '#ffffff' },
    white: { fill: '#e6e6e6', light: '#ffffff', dark: '#8c8c8c', spider: '#000000' },
    blue: { fill: '#4d82a4', light: '#7bb0d4', dark: '#1b3b52', spider: '#ffffff' }
  };
  const theme = bgColors[color] || bgColors.green;

  return (
    <div className={`relative flex items-center justify-center cursor-pointer transition-transform duration-150 ${isHovered || isSelected ? 'scale-125 z-30' : 'scale-100 z-10'}`} style={{ width: size, height: size }}>
      {/* Outer Pulse ring when selected */}
      {isSelected && (
        <div 
          className="absolute inset-0 rounded-full border-2 animate-marker-pulse pointer-events-none"
          style={{ borderColor: theme.light }}
        />
      )}
      
      {/* Pixel Badge Housing */}
      <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-md">
        {/* Pixel Circle Outline */}
        <rect x="6" y="1" width="12" height="2" fill="#000" />
        <rect x="3" y="3" width="3" height="2" fill="#000" />
        <rect x="18" y="3" width="3" height="2" fill="#000" />
        <rect x="1" y="5" width="2" height="14" fill="#000" />
        <rect x="21" y="5" width="2" height="14" fill="#000" />
        <rect x="3" y="19" width="3" height="2" fill="#000" />
        <rect x="18" y="19" width="3" height="2" fill="#000" />
        <rect x="6" y="21" width="12" height="2" fill="#000" />

        {/* Interior Fill */}
        <rect x="6" y="3" width="12" height="18" fill={theme.fill} />
        <rect x="3" y="5" width="18" height="14" fill={theme.fill} />
        {/* Top-Left Highlight */}
        <rect x="6" y="3" width="10" height="2" fill={theme.light} />
        <rect x="3" y="5" width="2" height="10" fill={theme.light} />
        
        {/* Pixel Spider Graphic inside */}
        {/* Spider Body */}
        <rect x="10" y="8" width="4" height="8" fill={theme.spider} />
        <rect x="11" y="7" width="2" height="1" fill={theme.spider} />
        {/* Legs Left */}
        <rect x="7" y="7" width="2" height="1" fill={theme.spider} />
        <rect x="6" y="8" width="1" height="2" fill={theme.spider} />
        <rect x="8" y="9" width="2" height="1" fill={theme.spider} />
        <rect x="6" y="11" width="4" height="1" fill={theme.spider} />
        <rect x="7" y="13" width="3" height="1" fill={theme.spider} />
        <rect x="6" y="14" width="1" height="2" fill={theme.spider} />
        {/* Legs Right */}
        <rect x="15" y="7" width="2" height="1" fill={theme.spider} />
        <rect x="17" y="8" width="1" height="2" fill={theme.spider} />
        <rect x="14" y="9" width="2" height="1" fill={theme.spider} />
        <rect x="14" y="11" width="4" height="1" fill={theme.spider} />
        <rect x="14" y="13" width="3" height="1" fill={theme.spider} />
        <rect x="17" y="14" width="1" height="2" fill={theme.spider} />
      </svg>
    </div>
  );
};

// Pixel Star Marker for Events / Leadership / Education
export const PixelStarMarker = ({ size = 32, isHovered = false, isSelected = false }) => (
  <div className={`relative flex items-center justify-center cursor-pointer transition-transform duration-150 ${isHovered || isSelected ? 'scale-125 z-30' : 'scale-100 z-10'}`} style={{ width: size, height: size }}>
    {isSelected && (
      <div className="absolute inset-0 rounded-full border-2 border-cyan-300 animate-marker-pulse pointer-events-none" />
    )}
    <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-md">
      {/* Black Outline */}
      <rect x="6" y="1" width="12" height="2" fill="#000" />
      <rect x="3" y="3" width="3" height="2" fill="#000" />
      <rect x="18" y="3" width="3" height="2" fill="#000" />
      <rect x="1" y="5" width="2" height="14" fill="#000" />
      <rect x="21" y="5" width="2" height="14" fill="#000" />
      <rect x="3" y="19" width="3" height="2" fill="#000" />
      <rect x="18" y="19" width="3" height="2" fill="#000" />
      <rect x="6" y="21" width="12" height="2" fill="#000" />

      {/* Light Blue Fill */}
      <rect x="6" y="3" width="12" height="18" fill="#5b99be" />
      <rect x="3" y="5" width="18" height="14" fill="#5b99be" />
      <rect x="6" y="3" width="10" height="2" fill="#8ec3e3" />
      <rect x="3" y="5" width="2" height="10" fill="#8ec3e3" />

      {/* Pixel Star */}
      <rect x="11" y="6" width="2" height="12" fill="#000" />
      <rect x="6" y="11" width="12" height="2" fill="#000" />
      <rect x="8" y="8" width="8" height="8" fill="#000" />
      <rect x="10" y="7" width="4" height="10" fill="#000" />
      <rect x="7" y="10" width="10" height="4" fill="#000" />
    </svg>
  </div>
);

// Pixel Mascot (Hanging / Clinging Coder Mascot)
export const PixelMascot = ({ className = "w-12 h-14" }) => (
  <svg viewBox="0 0 32 36" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Head Outline */}
    <rect x="10" y="2" width="12" height="2" fill="#000" />
    <rect x="8" y="4" width="16" height="2" fill="#000" />
    <rect x="6" y="6" width="20" height="10" fill="#000" />
    <rect x="8" y="16" width="16" height="2" fill="#000" />
    
    {/* Red Mask */}
    <rect x="10" y="4" width="12" height="12" fill="#e03b3b" />
    <rect x="8" y="6" width="16" height="8" fill="#e03b3b" />
    {/* Mask Web */}
    <rect x="15" y="4" width="2" height="12" fill="#000" />
    <rect x="8" y="10" width="16" height="2" fill="#000" />

    {/* Eyes */}
    <polygon points="9,8 13,8 14,12 10,12" fill="#ffffff" />
    <polygon points="19,8 23,8 22,12 18,12" fill="#ffffff" />

    {/* Body / Suit */}
    <rect x="10" y="18" width="12" height="10" fill="#000" />
    <rect x="12" y="18" width="8" height="8" fill="#e03b3b" />
    <rect x="10" y="20" width="2" height="6" fill="#3568a8" />
    <rect x="20" y="20" width="2" height="6" fill="#3568a8" />
    {/* Chest Spider */}
    <rect x="15" y="21" width="2" height="3" fill="#000" />
    <rect x="14" y="22" width="4" height="1" fill="#000" />

    {/* Clinging Hands */}
    <rect x="4" y="18" width="6" height="4" fill="#000" />
    <rect x="5" y="19" width="4" height="2" fill="#e03b3b" />
    <rect x="22" y="18" width="6" height="4" fill="#000" />
    <rect x="23" y="19" width="4" height="2" fill="#e03b3b" />

    {/* Legs / Feet */}
    <rect x="8" y="28" width="6" height="6" fill="#000" />
    <rect x="9" y="29" width="4" height="3" fill="#3568a8" />
    <rect x="9" y="32" width="4" height="2" fill="#e03b3b" />
    
    <rect x="18" y="28" width="6" height="6" fill="#000" />
    <rect x="19" y="29" width="4" height="3" fill="#3568a8" />
    <rect x="19" y="32" width="4" height="2" fill="#e03b3b" />
  </svg>
);

// Pixel Audio / Speaker Icon
export const PixelSpeaker = ({ isOn = false, className = "w-5 h-5" }) => (
  <svg viewBox="0 0 20 20" className={className} fill="currentColor">
    {/* Speaker Horn */}
    <rect x="3" y="7" width="4" height="6" />
    <polygon points="7,7 12,3 12,17 7,13" />
    {/* Sound Waves */}
    {isOn ? (
      <>
        <rect x="14" y="6" width="1.5" height="8" />
        <rect x="17" y="4" width="1.5" height="12" />
      </>
    ) : (
      <>
        {/* Muted X */}
        <polygon points="14,8 15,7 18,10 17,11" />
        <polygon points="18,8 17,7 14,10 15,11" />
      </>
    )}
  </svg>
);

// Pixel Radar Widget SVG for Bottom Right
export const PixelRadarWidget = ({ onGlobalClick, onCenterClick, isGlobal = false }) => (
  <div className="relative w-28 h-28 flex items-center justify-center select-none">
    {/* Radar Web Background */}
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
      <circle cx="50" cy="50" r="46" fill="#0c1622" stroke="#253a4f" strokeWidth="2" />
      
      {/* Spiderweb Radial Lines */}
      {[0, 30, 60, 90, 120, 150].map((deg) => (
        <line
          key={deg}
          x1="50"
          y1="50"
          x2={50 + 44 * Math.cos((deg * Math.PI) / 180)}
          y2={50 + 44 * Math.sin((deg * Math.PI) / 180)}
          stroke="#1e3348"
          strokeWidth="1"
          strokeDasharray="2,2"
        />
      ))}
      {[180, 210, 240, 270, 300, 330].map((deg) => (
        <line
          key={deg}
          x1="50"
          y1="50"
          x2={50 + 44 * Math.cos((deg * Math.PI) / 180)}
          y2={50 + 44 * Math.sin((deg * Math.PI) / 180)}
          stroke="#1e3348"
          strokeWidth="1"
          strokeDasharray="2,2"
        />
      ))}

      {/* Concentric Web Rings */}
      <circle cx="50" cy="50" r="14" fill="none" stroke="#2b4764" strokeWidth="1" />
      <circle cx="50" cy="50" r="28" fill="none" stroke="#2b4764" strokeWidth="1" />
      <circle cx="50" cy="50" r="42" fill="none" stroke="#3b5d80" strokeWidth="1.5" />

      {/* Blips */}
      <circle cx="68" cy="45" r="2.5" fill="#79a86b" className="animate-ping" />
      <circle cx="68" cy="45" r="2" fill="#a3d993" />
      <circle cx="32" cy="38" r="2" fill="#d94b4b" />
      <circle cx="58" cy="65" r="2" fill="#8ec3e3" />

      {/* Rotating Radar Sweep Beam */}
      <g className="animate-radar-sweep origin-center">
        <path
          d="M50,50 L92,50 A42,42 0 0,0 50,8 Z"
          fill="url(#radar-glow)"
          opacity="0.65"
        />
        <line x1="50" y1="50" x2="92" y2="50" stroke="#7bb0d4" strokeWidth="1.5" />
      </g>

      <defs>
        <radialGradient id="radar-glow" cx="50" cy="50" r="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4d82a4" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#8ec3e3" stopOpacity="0.5" />
        </radialGradient>
      </defs>
    </svg>

    {/* Buttons overlaid on the radar corner */}
    <div className="absolute right-1 top-2 flex flex-col gap-1.5 z-20">
      {/* Global View Button */}
      <button
        onClick={onGlobalClick}
        title="Zoom to Global View"
        className={`w-6 h-6 rounded-full border border-black flex items-center justify-center text-[10px] font-bold shadow-md transition-all ${
          isGlobal ? 'bg-[#7bb0d4] text-black' : 'bg-[#1b2b3a] text-cyan-300 hover:bg-[#2c445c]'
        }`}
      >
        🌐
      </button>

      {/* Center Map / Local View Button */}
      <button
        onClick={onCenterClick}
        title="Center to VIT Vellore / India Hub"
        className="w-6 h-6 rounded-full border border-black bg-[#1b2b3a] text-cyan-300 hover:bg-[#2c445c] flex items-center justify-center text-[10px] font-bold shadow-md transition-all"
      >
        🎯
      </button>
    </div>
  </div>
);
