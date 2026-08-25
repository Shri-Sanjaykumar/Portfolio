import React, { useState, useEffect } from 'react';
import { soundEffects } from '../utils/audio';

// Anchor positions corresponding to different active sections or interactions
const POSITIONS = {
  default:    { x: '50%', y: '10px',  scale: 1.15, rotate: 0,   webLength: 90,  img: '/spidey/spiderman-swinging.png' },
  activity:   { x: '82%', y: '20px',  scale: 1.25, rotate: -8,  webLength: 110, img: '/spidey/spiderman-crouch.png'   },
  skills:     { x: '85%', y: '30px',  scale: 1.3,  rotate: 12,  webLength: 120, img: '/spidey/spiderman-action.png'   },
  projects:   { x: '18%', y: '15px',  scale: 1.3,  rotate: -14, webLength: 100, img: '/spidey/spiderman-pose.png'     },
  internship: { x: '78%', y: '25px',  scale: 1.25, rotate: 10,  webLength: 115, img: '/spidey/spiderman-crawling.png' },
  about:      { x: '88%', y: '15px',  scale: 1.35, rotate: -6,  webLength: 95,  img: '/spidey/spiderman-sense.png'    },
  connect:    { x: '22%', y: '25px',  scale: 1.2,  rotate: 15,  webLength: 105, img: '/spidey/spiderman-cartoon-web.png' },
  dossier:    { x: '85%', y: '40px',  scale: 1.4,  rotate: -12, webLength: 130, img: '/spidey/spiderman-action.png'   },
};

export default function DynamicSpiderman3D({ activeSection = 'default', isDossierOpen = false, onTriggerToast }) {
  const [targetKey, setTargetKey] = useState('default');
  const [isZipping, setIsZipping] = useState(false);

  useEffect(() => {
    let key = 'default';
    if (isDossierOpen) key = 'dossier';
    else if (activeSection && POSITIONS[activeSection]) key = activeSection;

    if (key !== targetKey) {
      setIsZipping(true);
      try { soundEffects.thwip?.(); } catch {}
      setTargetKey(key);
      const timer = setTimeout(() => {
        setIsZipping(false);
      }, 650);
      return () => clearTimeout(timer);
    }
  }, [activeSection, isDossierOpen]);

  const cfg = POSITIONS[targetKey] || POSITIONS.default;

  const handleClickSpidey = () => {
    try { soundEffects.thwip?.(); soundEffects.marker?.(); } catch {}
    if (onTriggerToast) onTriggerToast('🕷️ SPIDER-SENSE ENGAGED: WEB BLAST!');
  };

  return (
    <div
      className="absolute top-0 z-30 pointer-events-auto cursor-pointer select-none transition-all duration-700 ease-out"
      style={{
        left: cfg.x,
        transform: `translateX(-50%) translateY(${cfg.y}) scale(${cfg.scale}) rotate(${cfg.rotate}deg)`,
        transformOrigin: 'top center',
        filter: isZipping
          ? 'drop-shadow(0 15px 35px rgba(0,229,255,0.7)) drop-shadow(0 0 25px rgba(220,38,38,0.8))'
          : 'drop-shadow(0 12px 30px rgba(0,0,0,0.95)) drop-shadow(0 0 15px rgba(220,38,38,0.35))',
      }}
      onClick={handleClickSpidey}
      title="Click Spider-Man for Web Blast!"
    >
      {/* 3D Web Line */}
      <div className="flex flex-col items-center">
        <svg
          viewBox="0 0 20 140"
          width="16"
          height={cfg.webLength}
          className="transition-all duration-700 ease-out"
        >
          {/* Main glowing white web strand */}
          <line
            x1="10"
            y1="0"
            x2="10"
            y2={cfg.webLength}
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{
              filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.9)) drop-shadow(0 0 8px rgba(6,182,212,0.6))',
            }}
          />
          {/* Subtle helix spiral strand */}
          <path
            d={`M10 0 Q14 20, 10 40 T10 80 T10 120`}
            fill="none"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="1.2"
          />
        </svg>

        {/* Big High-Res Background-Removed Spider-Man Model */}
        <div className={`relative ${isZipping ? 'scale-110' : 'animate-swing'} transition-transform duration-300`}>
          <img
            src={cfg.img}
            alt="Spider-Man"
            className="w-28 sm:w-36 md:w-44 h-40 sm:h-52 md:h-60 object-contain transition-all duration-500"
            style={{
              transform: isZipping ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
            }}
          />

          {/* Spider-Sense Tingling Halo on Hover */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 hover:opacity-100 transition-opacity">
            <span className="text-amber-400 font-pixel text-[10px] animate-ping">⚡</span>
            <span className="text-red-500 font-pixel text-[10px] animate-pulse">🕷️</span>
            <span className="text-amber-400 font-pixel text-[10px] animate-ping">⚡</span>
          </div>
        </div>
      </div>
    </div>
  );
}
