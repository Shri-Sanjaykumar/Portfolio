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
    { id: 'tracker', label: 'MAP TRACKER', icon: '🗺️' },
    { id: '3d_arena', label: '🌐 3D SIGNAL NETWORK', icon: '⚡' },
    { id: 'activity', label: 'ACTIVITY LOG', icon: '📜' },
    { id: 'projects', label: 'PROJECTS & MISSIONS', icon: '🚀' },
    { id: 'experience', label: 'EXPERIENCE (TFORCE)', icon: '💼' },
    { id: 'watch', label: 'WEB WATCH 1.0', icon: '👁️' },
    { id: 'skills', label: 'SKILLS & ARCHITECTURE', icon: '🛠️' },
    { id: 'leadership', label: 'EVENTS & LEADERSHIP', icon: '⭐' },
    { id: 'education', label: 'EDUCATION (VIT)', icon: '🎓' },
    { id: 'connect', label: 'MESSAGE CENTER', icon: '📡' },
    { id: 'help', label: 'HELP & GUIDE', icon: '❓' },
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
        {/* Background Spider Mask */}
        <div className="absolute -right-10 -top-10 opacity-15 pointer-events-none w-44 h-44">
          <PixelSpiderMask className="w-full h-full" />
        </div>

        {/* Top Header */}
        <div className="flex items-center justify-between border-b-2 border-[#22394e] pb-3 mb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#1b2b3b] border-2 border-cyan-400/60 flex items-center justify-center shadow">
              <PixelSpiderMask className="w-5 h-5" />
            </div>
            <span className="text-xs sm:text-sm font-silk text-cyan-300 uppercase tracking-widest font-bold">
              NAVIGATION // RADAR
            </span>
          </div>

          <button
            onClick={() => {
              soundEffects.close();
              onClose();
            }}
            className="flex items-center gap-1.5 text-xs font-silk text-[#8cb0cc] hover:text-white transition-colors cursor-pointer bg-[#1b2b3b] px-3 py-1.5 rounded-lg border border-[#2b4157]"
          >
            <span>✕</span>
            <span>CLOSE</span>
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col space-y-2 flex-1 justify-center py-2 overflow-y-auto pr-1" aria-label="Main menu">
          {menuItems.map((item, idx) => {
            const isActive = activeView === item.id;
            const is3D = item.id === '3d_arena';
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                onMouseEnter={() => soundEffects.click()}
                className={`text-left font-silk text-xs sm:text-sm tracking-wider py-2.5 px-3.5 rounded-lg transition-all duration-150 flex items-center justify-between cursor-pointer border ${
                  is3D
                    ? 'text-yellow-300 bg-yellow-500/20 border-yellow-400/60 font-bold hover:bg-yellow-500/30'
                    : isActive
                    ? 'text-[#f5a742] bg-[#f5a742]/15 border-[#f5a742]/40 font-bold translate-x-1.5 shadow'
                    : 'text-[#e2f0fb] border-transparent hover:text-white hover:bg-[#20364d]/80 hover:border-[#385573] hover:translate-x-1'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-cyan-400 font-pixel opacity-80">
                    0{idx + 1}
                  </span>
                  <span className="drop-shadow-sm font-bold">{item.label}</span>
                </div>
                {isActive ? (
                  <span className="text-[#f5a742] font-mono font-bold">▶</span>
                ) : is3D ? (
                  <span className="text-yellow-400 font-bold text-xs animate-bounce">⚡ 3D ORBIT</span>
                ) : (
                  <span className="text-cyan-400 text-xs opacity-0 hover:opacity-100 transition-opacity">
                    🕸️
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer info */}
        <div className="border-t border-[#22394e] pt-3 flex items-center justify-between text-[11px] font-mono text-gray-300">
          <span className="font-bold">SHRI SANJAYKUMAR V</span>
          <span className="text-cyan-400 font-silk text-[10px]">M.TECH SE @ VIT</span>
        </div>
      </div>
    </div>
  );
}
