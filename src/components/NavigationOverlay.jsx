import React from 'react';
import { soundEffects } from '../utils/audio';

export default function NavigationOverlay({
  isOpen = false,
  onClose,
  activeView = 'tracker',
  onSelectView
}) {
  if (!isOpen) return null;

  const menuItems = [
    { id: 'tracker', label: 'MAP TRACKER' },
    { id: 'activity', label: 'ACTIVITY LOG' },
    { id: 'projects', label: 'PROJECTS & MISSIONS' },
    { id: 'experience', label: 'EXPERIENCE (TFORCE)' },
    { id: 'watch', label: 'WEB WATCH 1.0' },
    { id: 'skills', label: 'SKILLS & ARCHITECTURE' },
    { id: 'leadership', label: 'EVENTS & LEADERSHIP' },
    { id: 'education', label: 'EDUCATION (VIT)' },
    { id: 'connect', label: 'MESSAGE CENTER' },
    { id: 'help', label: 'HELP & GUIDE' },
  ];

  const handleItemClick = (id) => {
    soundEffects.select();
    onSelectView(id);
    onClose();
  };

  return (
    <div
      className="absolute inset-0 z-40 bg-[#0d1622]/90 backdrop-blur-sm flex items-stretch p-4 sm:p-8 select-none scanline-overlay"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm flex flex-col justify-center gap-4 bg-[#121e2b]/95 border-2 border-black p-6 sm:p-8 rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#22384f] pb-3 mb-1">
          <span className="text-[10px] font-pixel text-cyan-400 uppercase tracking-widest">
            NAVIGATION
          </span>
          <button
            onClick={() => {
              soundEffects.close();
              onClose();
            }}
            className="text-[11px] font-silk text-[#8cb0cc] hover:text-white transition-colors cursor-pointer"
          >
            ✕ CLOSE
          </button>
        </div>

        <nav className="flex flex-col space-y-2.5" aria-label="Main menu">
          {menuItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                onMouseEnter={() => soundEffects.click()}
                className={`text-left font-silk text-xs sm:text-sm tracking-widest py-2 px-3 rounded transition-all duration-100 flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'text-[#f5a742] bg-[#f5a742]/15 font-bold translate-x-1'
                    : 'text-[#d8e8f8] hover:text-white hover:bg-[#20364d]/60'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <span className="text-[#f5a742] font-mono font-bold">▶</span>}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
