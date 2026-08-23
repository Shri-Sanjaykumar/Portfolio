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
    { id: 'tracker', label: 'TRACKER (MAP VIEW)' },
    { id: 'activity', label: 'ACTIVITY LOG' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'watch', label: 'ENGINEERING WATCH' },
    { id: 'skills', label: 'SKILLS & ARCHITECTURE' },
    { id: 'leadership', label: 'LEADERSHIP' },
    { id: 'education', label: 'EDUCATION' },
    { id: 'connect', label: 'CONNECT WITH ME' },
    { id: 'help', label: 'HELP / GUIDE' },
  ];

  const handleItemClick = (id) => {
    soundEffects.select();
    onSelectView(id);
    onClose();
  };

  return (
    <div 
      className="absolute inset-0 z-40 bg-[#0d1622]/90 backdrop-blur-md flex items-center p-6 md:p-12 select-none"
      onClick={onClose}
    >
      <div 
        className="max-w-md w-full flex flex-col gap-5 bg-[#0f1926]/95 border-2 border-black p-6 md:p-8 rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#22384f] pb-4 mb-2">
          <div className="text-xs font-pixel text-cyan-400 tracking-widest">
            NAVIGATION
          </div>
          <button
            onClick={() => {
              soundEffects.close();
              onClose();
            }}
            className="w-7 h-7 rounded border border-black bg-[#1f3144] hover:bg-[#324d6b] text-white flex items-center justify-center font-silk text-xs"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col space-y-3" aria-label="Main menu">
          {menuItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                onMouseEnter={() => soundEffects.click()}
                className={`text-left font-silk text-xs md:text-sm tracking-widest py-2 px-3 rounded transition-all duration-100 flex items-center justify-between border ${
                  isActive
                    ? 'text-[#f5a742] bg-[#f5a742]/10 border-[#f5a742]/40 font-bold translate-x-1'
                    : 'text-[#d6e7f7] hover:text-white hover:bg-[#20364d]/60 border-transparent hover:border-[#38597a]'
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
