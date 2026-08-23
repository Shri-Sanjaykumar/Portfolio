import React from 'react';
import { PixelSpiderMask } from './PixelIcons';
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
    { id: 'game', label: '🎮 PLAY SPIDEY QUEST' },
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
    soundEffects.thwip();
    soundEffects.select();
    onSelectView(id);
    onClose();
  };

  return (
    <div
      className="absolute inset-0 z-40 bg-[#0d1622]/92 backdrop-blur-md flex items-stretch p-3 sm:p-6 md:p-8 select-none scanline-overlay animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md flex flex-col justify-between bg-[#121f2d] border-3 border-black p-5 sm:p-7 rounded-xl shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: '0 25px 60px rgba(0,0,0,0.9), inset 2px 2px 0 rgba(255,255,255,0.15)'
        }}
      >
        {/* Animated Background Spider-Web Pattern */}
        <div className="absolute -right-12 -top-12 opacity-10 pointer-events-none w-48 h-48">
          <PixelSpiderMask className="w-full h-full text-white" />
        </div>

        {/* Top Header */}
        <div className="flex items-center justify-between border-b-2 border-[#22394e] pb-3 mb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#1b2b3b] border-2 border-cyan-400/50 flex items-center justify-center shadow">
              <PixelSpiderMask className="w-4 h-4 text-cyan-300" />
            </div>
            <span className="text-xs font-silk text-cyan-300 uppercase tracking-widest font-bold">
              NAVIGATION // RADAR
            </span>
          </div>

          <button
            onClick={() => {
              soundEffects.close();
              onClose();
            }}
            className="flex items-center gap-1.5 text-xs font-silk text-[#8cb0cc] hover:text-white transition-colors cursor-pointer bg-[#1b2b3b] px-2.5 py-1 rounded border border-[#2b4157]"
          >
            <span>✕</span>
            <span>CLOSE</span>
          </button>
        </div>

        {/* Menu Items with Staggered Slide In */}
        <nav className="flex flex-col space-y-1.5 flex-1 justify-center py-2" aria-label="Main menu">
          {menuItems.map((item, idx) => {
            const isActive = activeView === item.id;
            const isGame = item.id === 'game';
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                onMouseEnter={() => soundEffects.click()}
                className={`text-left font-silk text-xs sm:text-sm tracking-widest py-2 px-3.5 rounded transition-all duration-150 flex items-center justify-between cursor-pointer border ${
                  isGame
                    ? 'text-yellow-300 bg-yellow-500/20 border-yellow-400/50 font-bold hover:bg-yellow-500/30'
                    : isActive
                    ? 'text-[#f5a742] bg-[#f5a742]/15 border-[#f5a742]/40 font-bold translate-x-1.5 shadow'
                    : 'text-[#e2f0fb] border-transparent hover:text-white hover:bg-[#20364d]/80 hover:border-[#385573] hover:translate-x-1'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] text-cyan-400 font-pixel opacity-70">
                    0{idx + 1}
                  </span>
                  <span className="drop-shadow-sm">{item.label}</span>
                </div>
                {isActive ? (
                  <span className="text-[#f5a742] font-mono font-bold">▶</span>
                ) : isGame ? (
                  <span className="text-yellow-400 font-bold text-xs animate-bounce">⚡ PLAY</span>
                ) : (
                  <span className="text-[#4d7394] text-xs opacity-0 hover:opacity-100 transition-opacity">
                    🕸️
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer info */}
        <div className="border-t border-[#22394e] pt-3 flex items-center justify-between text-[10px] font-mono text-gray-400">
          <span>SHRI SANJAYKUMAR V</span>
          <span className="text-cyan-400">M.TECH SE @ VIT</span>
        </div>
      </div>
    </div>
  );
}
