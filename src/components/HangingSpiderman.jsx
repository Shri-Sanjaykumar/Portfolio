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
      className="absolute top-0 right-16 sm:right-24 md:right-36 z-30 flex flex-col items-center cursor-pointer pointer-events-auto group origin-top animate-swing"
      onMouseEnter={() => {
        setIsHovered(true);
        soundEffects.click();
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      title="Click Spider-Man for Web Blast & 3D Spatial Network!"
    >
      {/* Long Glowing Web Line Hanging from Top Frame */}
      <div className="w-[2.5px] h-20 sm:h-28 md:h-36 bg-white/95 shadow-[0_0_12px_white] transition-all group-hover:h-16" />

      {/* Large Hanging Spiderman Figure (Transparent High-Res PNG) */}
      <div className={`relative transition-transform duration-300 ${isFlipping ? 'animate-spin' : isHovered ? 'scale-115 -translate-y-2' : 'scale-100'}`}>
        <div className="w-24 h-36 sm:w-32 sm:h-48 md:w-40 md:h-60 flex items-center justify-center filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.95)]">
          <img
            src="/spidey/spiderman-hanging-transparent.png"
            alt="Hanging Spider-Man"
            className="w-full h-full object-contain filter drop-shadow-[0_6px_16px_rgba(0,0,0,0.85)]"
            onError={(e) => {
              e.target.src = '/spidey/spiderman-wallpaper-for-punch-hole-mobiles-v0-e15kvfqi4uy91.webp';
            }}
          />
        </div>

        {/* Prominent Spider-Sense Pulse when Hovered */}
        {isHovered && (
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 animate-bounce whitespace-nowrap z-40">
            <span className="text-xs text-yellow-300 font-bold font-pixel">⚡</span>
            <span className="text-[10px] sm:text-xs text-yellow-300 font-bold font-silk tracking-widest bg-black/95 px-3 py-1 rounded-md border-2 border-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.6)]">
              SPIDER-SENSE!
            </span>
            <span className="text-xs text-yellow-300 font-bold font-pixel">⚡</span>
          </div>
        )}
      </div>
    </div>
  );
}
