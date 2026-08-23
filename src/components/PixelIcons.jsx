import React from 'react';

// Transparent High-Res Spider-Man Mask Logo for Header Pill & Overlays
export const PixelSpiderMask = ({ className = "w-6 h-6" }) => (
  <div className={`relative inline-flex items-center justify-center ${className}`}>
    <img
      src="/spidey/spiderman-face-transparent.png"
      alt="Spider-Man Mask"
      className="w-full h-full object-contain filter drop-shadow-[0_2px_6px_rgba(230,50,50,0.6)]"
      onError={(e) => {
        e.target.style.display = 'none';
        if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
      }}
    />
    {/* SVG Fallback */}
    <svg viewBox="0 0 24 24" className="hidden w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="2" width="12" height="2" fill="#d9383a" />
      <rect x="4" y="4" width="16" height="2" fill="#d9383a" />
      <rect x="2" y="6" width="20" height="10" fill="#d9383a" />
      <rect x="4" y="16" width="16" height="4" fill="#d9383a" />
      <rect x="6" y="20" width="12" height="2" fill="#d9383a" />
      <rect x="11" y="2" width="2" height="20" fill="#000" />
      <rect x="4" y="11" width="16" height="2" fill="#000" />
      <polygon points="5,8 9,8 10,13 6,13" fill="#ffffff" />
      <polygon points="15,8 19,8 18,13 14,13" fill="#ffffff" />
    </svg>
  </div>
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
      {isSelected && (
        <div 
          className="absolute inset-0 rounded-full border-2 animate-marker-pulse pointer-events-none"
          style={{ borderColor: theme.light }}
        />
      )}
      
      <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-md">
        <rect x="6" y="1" width="12" height="2" fill="#000" />
        <rect x="3" y="3" width="3" height="2" fill="#000" />
        <rect x="18" y="3" width="3" height="2" fill="#000" />
        <rect x="1" y="5" width="2" height="14" fill="#000" />
        <rect x="21" y="5" width="2" height="14" fill="#000" />
        <rect x="3" y="19" width="3" height="2" fill="#000" />
        <rect x="18" y="19" width="3" height="2" fill="#000" />
        <rect x="6" y="21" width="12" height="2" fill="#000" />

        <rect x="6" y="3" width="12" height="18" fill={theme.fill} />
        <rect x="3" y="5" width="18" height="14" fill={theme.fill} />
        <rect x="6" y="3" width="10" height="2" fill={theme.light} />
        <rect x="3" y="5" width="2" height="10" fill={theme.light} />
        
        <rect x="10" y="8" width="4" height="8" fill={theme.spider} />
        <rect x="11" y="7" width="2" height="1" fill={theme.spider} />
        <rect x="7" y="7" width="2" height="1" fill={theme.spider} />
        <rect x="6" y="8" width="1" height="2" fill={theme.spider} />
        <rect x="8" y="9" width="2" height="1" fill={theme.spider} />
        <rect x="6" y="11" width="4" height="1" fill={theme.spider} />
        <rect x="7" y="13" width="3" height="1" fill={theme.spider} />
        <rect x="6" y="14" width="1" height="2" fill={theme.spider} />
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
      <rect x="6" y="1" width="12" height="2" fill="#000" />
      <rect x="3" y="3" width="3" height="2" fill="#000" />
      <rect x="18" y="3" width="3" height="2" fill="#000" />
      <rect x="1" y="5" width="2" height="14" fill="#000" />
      <rect x="21" y="5" width="2" height="14" fill="#000" />
      <rect x="3" y="19" width="3" height="2" fill="#000" />
      <rect x="18" y="19" width="3" height="2" fill="#000" />
      <rect x="6" y="21" width="12" height="2" fill="#000" />

      <rect x="6" y="3" width="12" height="18" fill="#5b99be" />
      <rect x="3" y="5" width="18" height="14" fill="#5b99be" />
      <rect x="6" y="3" width="10" height="2" fill="#8ec3e3" />
      <rect x="3" y="5" width="2" height="10" fill="#8ec3e3" />

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
  <div className={`relative flex items-center justify-center ${className}`}>
    <img
      src="/spidey/spiderman-face-transparent.png"
      alt="Spider Mascot"
      className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
      onError={(e) => {
        e.target.style.display = 'none';
        if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
      }}
    />
    <svg viewBox="0 0 32 36" className="hidden w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="2" width="12" height="2" fill="#000" />
      <rect x="8" y="4" width="16" height="2" fill="#000" />
      <rect x="6" y="6" width="20" height="10" fill="#000" />
      <rect x="8" y="16" width="16" height="2" fill="#000" />
      <rect x="10" y="4" width="12" height="12" fill="#e03b3b" />
      <rect x="8" y="6" width="16" height="8" fill="#e03b3b" />
      <polygon points="9,8 13,8 14,12 10,12" fill="#ffffff" />
      <polygon points="19,8 23,8 22,12 18,12" fill="#ffffff" />
    </svg>
  </div>
);

// Pixel Audio / Speaker Icon
export const PixelSpeaker = ({ isOn = false, className = "w-5 h-5" }) => (
  <svg viewBox="0 0 20 20" className={className} fill="currentColor">
    <rect x="3" y="7" width="4" height="6" />
    <polygon points="7,7 12,3 12,17 7,13" />
    {isOn ? (
      <>
        <rect x="14" y="6" width="1.5" height="8" />
        <rect x="17" y="4" width="1.5" height="12" />
      </>
    ) : (
      <>
        <polygon points="14,8 15,7 18,10 17,11" />
        <polygon points="18,8 17,7 14,10 15,11" />
      </>
    )}
  </svg>
);

// Pixel Radar Widget SVG for Bottom Right
export const PixelRadarWidget = ({ onGlobalClick, onCenterClick, isGlobal = false }) => (
  <div className="relative w-28 h-28 flex items-center justify-center select-none">
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
      <circle cx="50" cy="50" r="46" fill="#0c1622" stroke="#253a4f" strokeWidth="2" />
      
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

      <circle cx="50" cy="50" r="14" fill="none" stroke="#2b4764" strokeWidth="1" />
      <circle cx="50" cy="50" r="28" fill="none" stroke="#2b4764" strokeWidth="1" />
      <circle cx="50" cy="50" r="42" fill="none" stroke="#3b5d80" strokeWidth="1.5" />

      <circle cx="68" cy="45" r="2.5" fill="#79a86b" className="animate-ping" />
      <circle cx="68" cy="45" r="2" fill="#a3d993" />
      <circle cx="32" cy="38" r="2" fill="#d94b4b" />
      <circle cx="58" cy="65" r="2" fill="#8ec3e3" />

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

    <div className="absolute right-1 top-2 flex flex-col gap-1.5 z-20">
      <button
        onClick={onGlobalClick}
        title="Zoom to Global View"
        className={`w-6 h-6 rounded-full border border-black flex items-center justify-center text-[10px] font-bold shadow-md transition-all ${
          isGlobal ? 'bg-[#7bb0d4] text-black' : 'bg-[#1b2b3a] text-cyan-300 hover:bg-[#2c445c]'
        }`}
      >
        🌐
      </button>

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
