import React from 'react';
import { soundEffects } from '../utils/audio';

// Exact spideytracker.net menu style — dark panel with big text items
const MENU_ITEMS = [
  { id: 'tracker',    label: 'MAP TRACKER',           active: true },
  { id: 'activity',   label: 'ACTIVITY LOG'           },
  { id: 'projects',   label: 'PROJECTS & MISSIONS'    },
  { id: 'internship', label: 'EXPERIENCE (TFORCE)'    },
  { id: 'skills',     label: 'SKILLS & ARCHITECTURE'  },
  { id: 'about',      label: 'ABOUT ME'               },
  { id: 'connect',    label: 'CONNECT / MESSAGE CENTER'},
  { id: 'help',       label: 'HELP'                   },
];

export default function NavigationOverlay({ isOpen, onClose, activeView, onSelectView }) {
  if (!isOpen) return null;

  const handleClick = (id) => {
    try { soundEffects.thwip?.(); soundEffects.select?.(); } catch {}
    onSelectView(id);
    onClose();
  };

  return (
    // Backdrop — left portion is the panel, right is dimmed clickable
    <div
      className="absolute inset-0 z-40 flex"
      style={{ background: 'rgba(0,0,0,0.3)' }}
      onClick={onClose}
    >
      {/* ── LEFT PANEL — exact spideytracker layout ── */}
      <div
        className="h-full flex flex-col overflow-hidden"
        style={{
          width: 320,
          maxWidth: '85vw',
          background: 'rgba(8,16,28,0.97)',
          borderRight: '3px solid #000',
          animation: 'navSlideIn 0.2s ease-out',
        }}
        onClick={e => e.stopPropagation()}
      >
        <style>{`
          @keyframes navSlideIn {
            from { transform: translateX(-100%); opacity: 0; }
            to   { transform: translateX(0);     opacity: 1; }
          }
        `}</style>

        {/* Title row — matches spideytracker "ACTIVITY LOG ▌" header style */}
        <div className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: '1.5px solid rgba(30,61,90,0.6)' }}
        >
          <div className="flex items-center gap-2">
            {/* Mini spider icon */}
            <svg viewBox="0 0 16 16" width="14" height="14">
              <circle cx="8" cy="8" r="6" fill="none" stroke="#67e8f9" strokeWidth="1.2"/>
              <circle cx="8" cy="8" r="2" fill="#67e8f9"/>
              <line x1="8" y1="2" x2="8" y2="14" stroke="#67e8f9" strokeWidth="0.7"/>
              <line x1="2" y1="8" x2="14" y2="8" stroke="#67e8f9" strokeWidth="0.7"/>
            </svg>
            <span className="font-silk text-xs text-cyan-300 tracking-widest font-bold">
              NAVIGATION // RADAR
            </span>
          </div>
          <button
            onClick={() => { try { soundEffects.close?.(); } catch {} onClose(); }}
            className="font-silk text-[10px] text-gray-400 hover:text-white cursor-pointer flex items-center gap-1.5 transition-colors px-2 py-1"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6 }}
          >
            ✕ CLOSE
          </button>
        </div>

        {/* Menu items — big, spaced like spideytracker */}
        <nav className="flex-1 flex flex-col justify-center px-6 py-4 gap-1 overflow-y-auto">
          {MENU_ITEMS.map((item, idx) => {
            const isCurrent = activeView === item.id || (item.id === 'tracker' && !activeView);
            return (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                onMouseEnter={() => { try { soundEffects.click?.(); } catch {} }}
                className="w-full text-left flex items-center justify-between py-3 px-1 cursor-pointer transition-all duration-100 group"
                style={{
                  borderBottom: '1px solid rgba(30,61,90,0.35)',
                  color: isCurrent ? '#f5a742' : '#e2f0fb',
                }}
              >
                <div className="flex items-center gap-4">
                  <span className="font-silk text-[9px] opacity-50 w-5" style={{ color: '#67e8f9' }}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="font-silk text-sm sm:text-base tracking-wider font-bold uppercase transition-all group-hover:translate-x-1"
                    style={{ color: isCurrent ? '#f5a742' : 'inherit' }}
                  >
                    {item.label}
                  </span>
                </div>
                {isCurrent && (
                  <span className="font-silk text-base" style={{ color: '#f5a742' }}>▶</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4" style={{ borderTop: '1.5px solid rgba(30,61,90,0.6)' }}>
          <div className="font-mono text-[10px] text-gray-300 font-bold">SHRI SANJAYKUMAR V</div>
          <div className="font-silk text-[9px] text-cyan-400 mt-0.5 tracking-widest">M.TECH SE @ VIT</div>
        </div>
      </div>
    </div>
  );
}
