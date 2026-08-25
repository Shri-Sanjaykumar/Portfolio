import React, { useEffect } from 'react';
import { soundEffects } from '../utils/audio';

const MENU_ITEMS = [
  { id: 'tracker',    label: 'MAP TRACKER',         active: true },
  { id: 'activity',  label: 'ACTIVITY LOG'          },
  { id: 'projects',  label: 'PROJECTS & MISSIONS'   },
  { id: 'experience',label: 'EXPERIENCE (TFORCE)'   },
  { id: 'watch',     label: 'WEB WATCH 1.0'         },
  { id: 'skills',    label: 'SKILLS & ARCHITECTURE' },
  { id: 'leadership',label: 'EVENTS & LEADERSHIP'   },
  { id: 'education', label: 'EDUCATION (VIT)'       },
  { id: 'connect',   label: 'MESSAGE CENTER'        },
];

export default function NavigationOverlay({ isOpen, onClose, activeView = 'tracker', onSelectView }) {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === 'Escape') { soundEffects.close(); onClose(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="absolute inset-0 z-40 flex items-stretch"
      style={{ background: 'rgba(10,18,28,0.6)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      {/* Left panel — matching reference exactly */}
      <div
        className="flex flex-col animate-nav-slide h-full"
        style={{
          width: '300px',
          maxWidth: '85vw',
          background: '#0e1925',
          borderRight: '3px solid #000',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative corner dot pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          {Array.from({ length: 20 }).map((_, i) => (
            Array.from({ length: 12 }).map((__, j) => (
              <div
                key={`${i}-${j}`}
                className="absolute w-1 h-1 rounded-full bg-cyan-400"
                style={{ left: `${i * 5 + 2}%`, top: `${j * 8 + 2}%` }}
              />
            ))
          ))}
        </div>

        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 relative z-10"
          style={{ borderBottom: '2px solid #162433' }}
        >
          <div className="flex items-center gap-2.5">
            {/* Radar/compass icon */}
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: '#162433', border: '2px solid rgba(103,232,249,0.4)' }}
            >
              <svg viewBox="0 0 16 16" width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="6" fill="none" stroke="#67e8f9" strokeWidth="1.2"/>
                <line x1="8" y1="2" x2="8" y2="14" stroke="#67e8f9" strokeWidth="0.8"/>
                <line x1="2" y1="8" x2="14" y2="8" stroke="#67e8f9" strokeWidth="0.8"/>
                <circle cx="8" cy="8" r="1.5" fill="#67e8f9"/>
              </svg>
            </div>
            <span className="text-xs font-silk text-cyan-300 tracking-widest font-bold uppercase">
              NAVIGATION // RADAR
            </span>
          </div>
          <button
            onClick={() => { soundEffects.close(); onClose(); }}
            className="flex items-center gap-1.5 text-[10px] font-silk text-[#8cb0cc] hover:text-white cursor-pointer px-2.5 py-1.5 rounded-lg transition-colors"
            style={{ background: '#162433', border: '1px solid #2b4157' }}
          >
            ✕ CLOSE
          </button>
        </div>

        {/* Menu items */}
        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto" role="navigation">
          {MENU_ITEMS.map((item, idx) => {
            const isCurrent = activeView === item.id || (item.id === 'tracker' && activeView === 'tracker');
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundEffects.thwip();
                  onSelectView(item.id);
                  onClose();
                }}
                onMouseEnter={() => soundEffects.click()}
                className="w-full text-left flex items-center justify-between py-2.5 px-3 rounded-lg cursor-pointer transition-all duration-100 group"
                style={{
                  background: isCurrent ? 'rgba(245,167,66,0.12)' : 'transparent',
                  borderLeft: isCurrent ? '3px solid #f5a742' : '3px solid transparent',
                  color: isCurrent ? '#f5a742' : '#e2f0fb',
                  transform: isCurrent ? 'translateX(4px)' : 'translateX(0)',
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="text-[9px] font-pixel opacity-70"
                    style={{ color: '#67e8f9', minWidth: '16px' }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xs sm:text-sm font-silk font-bold tracking-wider uppercase">
                    {item.label}
                  </span>
                </div>
                {isCurrent && (
                  <span className="text-[#f5a742] font-bold text-sm">▶</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div
          className="px-5 py-3 relative z-10"
          style={{ borderTop: '2px solid #162433' }}
        >
          <div className="text-[10px] font-mono text-gray-300 font-bold">SHRI SANJAYKUMAR V</div>
          <div className="text-[9px] font-silk text-cyan-400 mt-0.5">M.TECH SE @ VIT</div>
        </div>
      </div>
    </div>
  );
}
