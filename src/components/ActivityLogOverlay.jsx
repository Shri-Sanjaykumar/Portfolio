import React from 'react';
import { activityLog, trackerNodes } from '../data/portfolioData';
import { PixelSpiderMarker, PixelStarMarker } from './PixelIcons';
import { soundEffects } from '../utils/audio';

export default function ActivityLogOverlay({ isOpen = false, onClose, onSelectNode }) {
  if (!isOpen) return null;

  const handleRowClick = (nodeId) => {
    soundEffects.select();
    const node = trackerNodes.find((n) => n.id === nodeId);
    if (node) {
      onSelectNode(node);
    }
  };

  return (
    <div className="absolute inset-0 z-40 bg-gradient-to-b from-[#1b2734] via-[#14202d] to-[#0d1622] flex flex-col p-4 sm:p-6 md:p-8 select-none overflow-hidden scanline-overlay">
      {/* Top Header Bar (Matching Reference Screenshot 2, 3, 4) */}
      <div className="flex items-center justify-between border-b border-[#25394d] pb-3 mb-2 px-1">
        {/* Title with Blinking Terminal Cursor */}
        <div className="flex items-center gap-2">
          <h2 className="text-xs sm:text-sm font-silk font-bold text-cyan-300 tracking-widest uppercase">
            ACTIVITY LOG
          </h2>
          <span className="w-2.5 h-3.5 bg-cyan-400 animate-pulse inline-block" />
        </div>

        {/* Top-Right Close Button */}
        <button
          onClick={() => {
            soundEffects.close();
            onClose();
          }}
          className="flex items-center gap-1.5 text-[11px] font-silk text-[#8cb0cc] hover:text-white transition-colors cursor-pointer"
        >
          <span>✕</span>
          <span>CLOSE</span>
        </button>
      </div>

      {/* Main Activity Log Scrollable List */}
      <div className="flex-1 overflow-y-auto pr-2 divide-y divide-[#203447]/60">
        {activityLog.map((item) => (
          <div
            key={item.id}
            onClick={() => handleRowClick(item.nodeId)}
            onMouseEnter={() => soundEffects.click()}
            className="group flex items-center justify-between py-2.5 sm:py-3 px-1 sm:px-2 hover:bg-[#20344a]/50 transition-colors cursor-pointer rounded"
          >
            <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
              {/* Left Circle Icon */}
              <div className="flex-shrink-0">
                {item.badgeType === 'CONFIRMED' ? (
                  <div className="w-6 h-6 rounded-full border border-black bg-[#79a86b] flex items-center justify-center shadow">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="black">
                      <rect x="10" y="8" width="4" height="8" />
                      <rect x="11" y="7" width="2" height="1" />
                      <rect x="7" y="7" width="2" height="1" />
                      <rect x="6" y="8" width="1" height="2" />
                      <rect x="8" y="9" width="2" height="1" />
                      <rect x="6" y="11" width="4" height="1" />
                      <rect x="7" y="13" width="3" height="1" />
                      <rect x="6" y="14" width="1" height="2" />
                      <rect x="15" y="7" width="2" height="1" />
                      <rect x="17" y="8" width="1" height="2" />
                      <rect x="14" y="9" width="2" height="1" />
                      <rect x="14" y="13" width="3" height="1" />
                      <rect x="17" y="14" width="1" height="2" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full border border-black bg-[#5b99be] flex items-center justify-center shadow">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="black">
                      <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Status Badge Pill */}
              <span className={`text-[8px] sm:text-[9px] font-pixel px-1.5 sm:px-2 py-0.5 rounded border font-bold uppercase tracking-wider flex-shrink-0 ${
                item.badgeType === 'CONFIRMED'
                  ? 'border-[#79a86b]/60 text-[#a3d993] bg-[#79a86b]/10'
                  : 'border-[#5b99be]/60 text-[#8ec3e3] bg-[#5b99be]/10'
              }`}>
                {item.badgeType}
              </span>

              {/* Item Title */}
              <span className="text-[10px] sm:text-xs font-silk font-bold text-[#d8e8f8] group-hover:text-white truncate tracking-wider">
                {item.title}
              </span>
            </div>

            {/* Date Tag on Right */}
            <span className="text-[9px] sm:text-[10px] font-silk text-[#6f94b8] uppercase tracking-wider flex-shrink-0 ml-3">
              {item.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
