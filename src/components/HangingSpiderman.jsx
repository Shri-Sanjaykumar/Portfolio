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
      className="absolute top-0 right-16 sm:right-24 z-30 flex flex-col items-center cursor-pointer pointer-events-auto group origin-top animate-swing"
      onMouseEnter={() => {
        setIsHovered(true);
        soundEffects.click();
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      title="Click Spider-Man for web blast!"
    >
      {/* Web Line Hanging from Top Frame */}
      <div className="w-[2px] h-14 sm:h-20 bg-white/80 shadow-[0_0_8px_white] transition-all group-hover:h-12" />

      {/* Hanging Spiderman Figure */}
      <div className={`relative transition-transform duration-300 ${isFlipping ? 'animate-spin' : isHovered ? 'scale-115' : 'scale-100'}`}>
        {/* Real Hanging Spidey Asset */}
        <div className="w-12 h-16 sm:w-14 sm:h-20 flex items-center justify-center filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]">
          <img
            src="/spidey/spiderman-wallpaper-for-punch-hole-mobiles-v0-e15kvfqi4uy91.webp"
            alt="Hanging Spider-Man"
            className="w-full h-full object-contain filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]"
            onError={(e) => {
              // Fallback to stylized SVG
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          {/* Fallback SVG if image not loaded */}
          <div className="hidden w-12 h-16 bg-red-600 rounded-full border-2 border-black flex flex-col items-center justify-center p-1">
            <div className="flex gap-2">
              <div className="w-2.5 h-1.5 bg-white border border-black rotate-[-20deg]" />
              <div className="w-2.5 h-1.5 bg-white border border-black rotate-[20deg]" />
            </div>
            <div className="w-4 h-5 bg-blue-700 mt-1 rounded border border-black" />
          </div>
        </div>

        {/* Spider-Sense Pulse when Hovered */}
        {isHovered && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 animate-bounce">
            <span className="text-[10px] text-yellow-300 font-bold font-pixel">⚡</span>
            <span className="text-[8px] text-yellow-300 font-bold font-silk tracking-wider bg-black/80 px-1 rounded border border-yellow-400">
              THWIP!
            </span>
            <span className="text-[10px] text-yellow-300 font-bold font-pixel">⚡</span>
          </div>
        )}
      </div>
    </div>
  );
}
