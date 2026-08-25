import React from 'react';
import { activityLog, trackerNodes } from '../data/portfolioData';
import { soundEffects } from '../utils/audio';

export default function ActivityLogOverlay({
  isOpen = false,
  onClose,
  onSelectNode,
  onSelectTab
}) {
  if (!isOpen) return null;

  const handleRowClick = (nodeId) => {
    soundEffects.select();
    const node = trackerNodes.find((n) => n.id === nodeId);
    if (node && onSelectNode) {
      onSelectNode(node);
    }
  };

  const navTabs = [
    { id: 'activity', label: 'ACTIVITY LOG' },
    { id: 'projects', label: 'PROJECTS & MISSIONS' },
    { id: 'watch', label: 'WEB WATCH 1.0' },
    { id: 'skills', label: 'SKILLS & ARCHITECTURE' },
    { id: 'leadership', label: 'EVENTS & LEADERSHIP' },
    { id: 'education', label: 'EDUCATION (VIT)' },
    { id: 'connect', label: 'MESSAGE CENTER' },
    { id: 'help', label: 'HELP & GUIDE' },
  ];

  return (
    <div
      className="absolute inset-0 z-40 bg-[#0d1622]/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none scanline-overlay animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl h-[88%] bg-[#121f2d] border-3 sm:border-4 border-black rounded-xl flex overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: '0 25px 60px rgba(0,0,0,0.9), inset 2px 2px 0 rgba(255,255,255,0.15)'
        }}
      >
        {/* Left Sidebar matching Screenshot ezgif-frame-040 */}
        <div className="w-48 sm:w-60 bg-[#0e1925] border-r-2 border-black p-3 sm:p-4 flex flex-col justify-between flex-shrink-0">
          <div className="space-y-1 sm:space-y-1.5">
            <div className="text-[10px] font-silk text-cyan-400 mb-3 px-2 tracking-widest uppercase">
              RADAR INDEX
            </div>
            {navTabs.map((tab) => {
              const isActive = tab.id === 'activity';
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundEffects.click();
                    if (onSelectTab) onSelectTab(tab.id);
                  }}
                  className={`w-full text-left font-silk text-[10px] sm:text-xs py-2 px-2.5 rounded transition-all cursor-pointer ${
                    isActive
                      ? 'text-[#f5a742] bg-[#f5a742]/15 border-l-3 border-[#f5a742] font-bold'
                      : 'text-gray-300 hover:text-white hover:bg-[#1a2c3f]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="text-[9px] font-mono text-gray-400 border-t border-[#1e3348] pt-2 px-2">
            SHRI SANJAYKUMAR V<br />
            <span className="text-cyan-400">9.12 CGPA @ VIT</span>
          </div>
        </div>

        {/* Center Main Activity Table matching ezgif-frame-040 */}
        <div className="flex-1 flex flex-col p-4 sm:p-6 overflow-hidden bg-[#121f2d]">
          {/* Header Bar with Close Button */}
          <div className="flex items-center justify-between border-b-2 border-[#1e3348] pb-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <h3 className="font-silk text-xs sm:text-sm text-cyan-300 tracking-wider uppercase font-bold">
                GLOBAL ACTIVITY LOG // CHRONOLOGY
              </h3>
            </div>

            <button
              onClick={() => {
                soundEffects.close();
                onClose();
              }}
              className="flex items-center gap-1 font-silk text-xs text-gray-300 hover:text-white bg-[#1e3348] hover:bg-[#2c4866] px-3 py-1 rounded border border-black cursor-pointer transition-colors"
            >
              <span>✕</span>
              <span>CLOSE</span>
            </button>
          </div>

          {/* Chronological Activity List */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-2">
            {activityLog.map((act) => {
              const isConfirmed = act.badgeType === 'CONFIRMED';
              const isEvent = act.badgeType === 'EVENT';
              const isEducation = act.badgeType === 'EDUCATION';

              return (
                <div
                  key={act.id}
                  onClick={() => handleRowClick(act.nodeId)}
                  onMouseEnter={() => soundEffects.click()}
                  className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 rounded-lg bg-[#0e1925]/90 hover:bg-[#1b2f44] border border-[#1e3348] hover:border-cyan-400/60 cursor-pointer transition-all duration-150 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-1.5 sm:mb-0 flex-1 min-w-0">
                    {/* Badge */}
                    <span
                      className={`font-silk text-[9px] px-2 py-0.5 rounded border border-black uppercase font-bold tracking-wider flex-shrink-0 ${
                        isConfirmed
                          ? 'bg-[#79a86b] text-black'
                          : isEvent
                          ? 'bg-sky-500 text-black'
                          : isEducation
                          ? 'bg-amber-400 text-black'
                          : 'bg-gray-400 text-black'
                      }`}
                    >
                      {act.badgeType}
                    </span>

                    {/* Title */}
                    <span className="font-silk text-xs sm:text-sm text-[#e2f0fb] group-hover:text-cyan-300 truncate font-bold">
                      {act.title}
                    </span>
                  </div>

                  {/* Date & Action */}
                  <div className="flex items-center gap-3 flex-shrink-0 text-right">
                    <span className="font-mono text-[10px] sm:text-xs text-gray-400">
                      {act.date}
                    </span>
                    <span className="text-cyan-400 font-silk text-xs group-hover:translate-x-1 transition-transform">
                      VIEW ↗
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Prompt */}
          <div className="border-t border-[#1e3348] pt-2 mt-2 flex items-center justify-between text-[10px] font-mono text-gray-400">
            <span>CLICK ANY ENTRY TO OPEN VERIFIED DOSSIER &amp; GITHUB REPO</span>
            <span className="text-cyan-400 font-bold">{activityLog.length} RECORDED SIGNALS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
