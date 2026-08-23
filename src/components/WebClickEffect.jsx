import React, { useState, useEffect } from 'react';
import { soundEffects } from '../utils/audio';

export default function WebClickEffect() {
  const [webs, setWebs] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      // Don't trigger on input fields if user is typing
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      soundEffects.thwip();

      const newWeb = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        size: Math.floor(Math.random() * 20) + 70, // 70px to 90px
      };

      setWebs((prev) => [...prev.slice(-6), newWeb]);

      setTimeout(() => {
        setWebs((prev) => prev.filter((w) => w.id !== newWeb.id));
      }, 600);
    };

    window.addEventListener('pointerdown', handleClick);
    return () => window.removeEventListener('pointerdown', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {webs.map((web) => (
        <div
          key={web.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-web-expand"
          style={{
            left: `${web.x}px`,
            top: `${web.y}px`,
            width: `${web.size}px`,
            height: `${web.size}px`,
          }}
        >
          {/* Animated SVG Spider Web */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] opacity-90"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
          >
            {/* Radial Spokes */}
            <line x1="50" y1="50" x2="50" y2="5" strokeLinecap="round" />
            <line x1="50" y1="50" x2="85" y2="15" strokeLinecap="round" />
            <line x1="50" y1="50" x2="95" y2="50" strokeLinecap="round" />
            <line x1="50" y1="50" x2="85" y2="85" strokeLinecap="round" />
            <line x1="50" y1="50" x2="50" y2="95" strokeLinecap="round" />
            <line x1="50" y1="50" x2="15" y2="85" strokeLinecap="round" />
            <line x1="50" y1="50" x2="5" y2="50" strokeLinecap="round" />
            <line x1="50" y1="50" x2="15" y2="15" strokeLinecap="round" />

            {/* Concentric Web Rings (Quadratic Beziers) */}
            <path d="M 50,20 Q 65,25 70,30 Q 75,40 75,50 Q 75,60 70,70 Q 60,75 50,80 Q 40,75 30,70 Q 25,60 25,50 Q 25,40 30,30 Q 35,25 50,20" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" />
            <path d="M 50,10 Q 75,18 85,25 Q 92,38 90,50 Q 92,62 85,75 Q 75,82 50,90 Q 25,82 15,75 Q 8,62 10,50 Q 8,38 15,25 Q 25,18 50,10" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" />

            {/* Central Web Node */}
            <circle cx="50" cy="50" r="3" fill="#ff3b30" stroke="black" strokeWidth="1" />
          </svg>
        </div>
      ))}
    </div>
  );
}
