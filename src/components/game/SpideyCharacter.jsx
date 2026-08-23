import React, { useEffect, useState, useRef } from 'react';
import { soundEffects } from '../../utils/audio';

export default function SpideyCharacter({
  actionState = 'idle', // 'idle' | 'running' | 'jumping' | 'landing' | 'swinging' | 'attack' | 'victory' | 'damage'
  onActionComplete,
  interactive = true,
  className = ''
}) {
  const [currentAction, setCurrentAction] = useState(actionState);
  const [posX, setPosX] = useState(50); // percentage 0 - 100
  const [facing, setFacing] = useState('right'); // 'left' | 'right'
  const [isGrounded, setIsGrounded] = useState(true);
  const [isSwinging, setIsSwinging] = useState(false);
  const [swingAngle, setSwingAngle] = useState(0);

  // Sync external actionState prop
  useEffect(() => {
    setCurrentAction(actionState);
  }, [actionState]);

  // Keyboard controls for playable character
  useEffect(() => {
    if (!interactive) return;

    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        setFacing('right');
        setCurrentAction('running');
        setPosX((p) => Math.min(92, p + 3));
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        setFacing('left');
        setCurrentAction('running');
        setPosX((p) => Math.max(8, p - 3));
      } else if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        if (isGrounded) {
          soundEffects.jump();
          setIsGrounded(false);
          setCurrentAction('jumping');
          setTimeout(() => {
            setCurrentAction('landing');
            soundEffects.land();
            setTimeout(() => {
              setIsGrounded(true);
              setCurrentAction('idle');
            }, 250);
          }, 600);
        }
      } else if (e.key === 'f' || e.key === 'F' || e.key === 'e' || e.key === 'E') {
        soundEffects.attack();
        setCurrentAction('attack');
        setTimeout(() => setCurrentAction('idle'), 400);
      } else if (e.key === 'r' || e.key === 'R') {
        soundEffects.thwip();
        setIsSwinging(true);
        setCurrentAction('swinging');
        setTimeout(() => {
          setIsSwinging(false);
          setCurrentAction('idle');
        }, 1200);
      }
    };

    const handleKeyUp = (e) => {
      if (['ArrowRight', 'ArrowLeft', 'a', 'd', 'A', 'D'].includes(e.key)) {
        if (isGrounded && currentAction === 'running') {
          setCurrentAction('idle');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [interactive, isGrounded, currentAction]);

  return (
    <div
      className={`relative select-none pointer-events-auto flex flex-col items-center transition-all duration-75 ${className}`}
      style={{
        left: interactive ? `${posX}%` : 'auto',
        transform: `translateX(-50%) ${facing === 'left' ? 'scaleX(-1)' : 'scaleX(1)'}`,
      }}
    >
      {/* Web Rope Line when swinging */}
      {(currentAction === 'swinging' || isSwinging) && (
        <svg
          className="absolute -top-36 left-1/2 -translate-x-1/2 w-48 h-40 pointer-events-none z-10"
          viewBox="0 0 100 100"
          fill="none"
        >
          <line
            x1="50"
            y1="0"
            x2="50"
            y2="100"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="2 1"
            className="drop-shadow-[0_0_6px_white]"
          />
        </svg>
      )}

      {/* Spider-Sense Lightning Icon when attacking / alert */}
      {currentAction === 'attack' && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-yellow-300 font-bold font-pixel text-xs animate-ping">
          ⚡ THWIP! ⚡
        </div>
      )}

      {/* Spidey Character Pixel Model */}
      <div
        className={`relative w-16 h-20 flex items-center justify-center filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] transition-transform ${
          currentAction === 'idle'
            ? 'animate-mascot'
            : currentAction === 'running'
            ? 'translate-y-[-2px] rotate-[-4deg]'
            : currentAction === 'jumping'
            ? 'translate-y-[-28px] rotate-[-12deg]'
            : currentAction === 'landing'
            ? 'translate-y-[4px] scale-y-80 scale-x-110'
            : currentAction === 'swinging'
            ? 'animate-swing origin-top'
            : currentAction === 'attack'
            ? 'scale-120 rotate-[15deg]'
            : currentAction === 'victory'
            ? 'scale-110 -translate-y-2'
            : currentAction === 'damage'
            ? 'animate-shake opacity-80 filter invert'
            : ''
        }`}
      >
        {/* Real Character Sprite with Fallback */}
        <img
          src="/spidey/HD-wallpaper-spiderman-in-white-background-spiderman.jpg"
          alt="Spider-Man Character"
          className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />

        {/* 8-Bit Pixel Character Sprite Fallback */}
        <div className="hidden w-14 h-18 bg-transparent flex-col items-center justify-center relative">
          {/* Head & Mask */}
          <div className="w-9 h-8 bg-red-600 rounded-md border-2 border-black relative flex items-center justify-center shadow">
            {/* White Spider Eyes with Black Outline */}
            <div className="flex gap-1.5 items-center">
              <div className="w-2.5 h-2 bg-white border border-black transform rotate-[-18deg]" />
              <div className="w-2.5 h-2 bg-white border border-black transform rotate-[18deg]" />
            </div>
            {/* Web line on forehead */}
            <div className="absolute top-0.5 w-0.5 h-2 bg-black/40" />
          </div>

          {/* Torso & Spider Emblem */}
          <div className="w-8 h-7 bg-blue-700 border-2 border-black rounded-sm relative flex items-center justify-center mt-[-1px]">
            <div className="w-3.5 h-5 bg-red-600 rounded-sm flex items-center justify-center">
              <div className="w-2 h-2 bg-black rounded-full" />
            </div>
          </div>

          {/* Legs */}
          <div className="flex gap-1 mt-[-1px]">
            <div className={`w-3 h-5 bg-blue-700 border-2 border-black rounded-b ${currentAction === 'running' ? 'rotate-[15deg]' : ''}`} />
            <div className={`w-3 h-5 bg-blue-700 border-2 border-black rounded-b ${currentAction === 'running' ? 'rotate-[-15deg]' : ''}`} />
          </div>
        </div>
      </div>

      {/* Dust particles when landing / running */}
      {currentAction === 'landing' && (
        <div className="absolute -bottom-2 flex gap-3 pointer-events-none">
          <span className="w-3 h-1.5 bg-white/70 rounded-full animate-ping" />
          <span className="w-3 h-1.5 bg-white/70 rounded-full animate-ping" />
        </div>
      )}
    </div>
  );
}
