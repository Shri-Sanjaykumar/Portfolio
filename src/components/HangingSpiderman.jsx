import React, { useState } from 'react';
import { soundEffects } from '../utils/audio';

export default function HangingSpiderman({ onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    soundEffects.thwip();
    setIsFlipping(true);
    setTimeout(() => setIsFlipping(false), 800);
    if (onClick) onClick();
  };

  return (
    <div
      className="absolute top-0 right-14 sm:right-20 md:right-28 z-30 flex flex-col items-center cursor-pointer pointer-events-auto group origin-top animate-swing"
      onMouseEnter={() => {
        setIsHovered(true);
        soundEffects.click();
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      title="Click Spider-Man for Web Blast & Quest!"
    >
      {/* Web Line Hanging from Top Frame */}
      <div className="w-[2px] h-14 sm:h-20 md:h-24 bg-white/90 shadow-[0_0_8px_white] transition-all group-hover:h-12" />

      {/* Hanging Spiderman Figure (Transparent High-Res PNG) */}
      <div className={`relative transition-transform duration-300 ${isFlipping ? 'animate-spin' : isHovered ? 'scale-115 -translate-y-1' : 'scale-100'}`}>
        <div className="w-12 h-18 sm:w-16 sm:h-24 md:w-20 md:h-28 flex items-center justify-center filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]">
          <img
            src="/spidey/spiderman-hanging-transparent.png"
            alt="Hanging Spider-Man"
            className="w-full h-full object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
            onError={(e) => {
              // Fallback to webp
              e.target.src = '/spidey/spiderman-wallpaper-for-punch-hole-mobiles-v0-e15kvfqi4uy91.webp';
            }}
          />
        </div>

        {/* Spider-Sense Pulse when Hovered */}
        {isHovered && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 animate-bounce whitespace-nowrap">
            <span className="text-[11px] text-yellow-300 font-bold font-pixel">⚡</span>
            <span className="text-[9px] text-yellow-300 font-bold font-silk tracking-wider bg-black/90 px-1.5 py-0.5 rounded border border-yellow-400 shadow">
              SPIDER-SENSE!
            </span>
            <span className="text-[11px] text-yellow-300 font-bold font-pixel">⚡</span>
          </div>
        )}
      </div>
    </div>
  );
}
