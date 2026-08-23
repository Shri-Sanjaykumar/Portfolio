import React, { useState } from 'react';
import { activityLog, trackerNodes } from '../data/portfolioData';
import { PixelSpiderMarker, PixelStarMarker } from './PixelIcons';
import { soundEffects } from '../utils/audio';

export default function ActivityLogOverlay({ isOpen = false, onClose, onSelectNode }) {
  const [filterCategory, setFilterCategory] = useState('ALL');

  if (!isOpen) return null;

  const categories = ['ALL', 'PROJECT', 'EXPERIENCE', 'LEADERSHIP', 'EDUCATION'];

  const filteredLogs = activityLog.filter(item => {
    if (filterCategory === 'ALL') return true;
    return item.category === filterCategory;
  });

  const handleRowClick = (nodeId) => {
    soundEffects.select();
    const node = trackerNodes.find(n => n.id === nodeId);
    if (node) {
      onSelectNode(node);
    }
  };

  return (
    <div className="absolute inset-0 z-40 bg-[#0d1622]/95 backdrop-blur-md flex flex-col p-4 md:p-8 select-none overflow-hidden scanline-overlay">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b-2 border-black bg-[#101b29] p-4 rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-cyan-400 border border-black" />
          <h2 className="text-xs md:text-sm font-silk font-bold text-white tracking-widest uppercase">
            ACTIVITY LOG
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="hidden sm:flex items-center gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                soundEffects.click();
                setFilterCategory(cat);
              }}
              className={`px-3 py-1 rounded text-[10px] font-silk uppercase tracking-wider border border-black transition-all ${
                filterCategory === cat
                  ? 'bg-cyan-500 text-black font-bold'
                  : 'bg-[#1b2b3a] text-gray-300 hover:bg-[#273d52]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            soundEffects.close();
            onClose();
          }}
          className="flex items-center gap-1.5 px-3 py-1 rounded border border-black bg-[#1f3144] hover:bg-[#324d6b] text-white font-silk text-xs uppercase"
        >
          <span>✕</span>
          <span>CLOSE</span>
        </button>
      </div>

      {/* Main List Container */}
      <div className="flex-1 bg-[#0b131e] border-x-2 border-b-2 border-black overflow-y-auto p-2 md:p-4 divide-y divide-[#1b2a3a]">
        {filteredLogs.map((item) => (
          <div
            key={item.id}
            onClick={() => handleRowClick(item.nodeId)}
            onMouseEnter={() => soundEffects.click()}
            className="group flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 hover:bg-[#152333] transition-all cursor-pointer rounded gap-2"
          >
            <div className="flex items-center gap-3.5">
              {/* Category Icon Badge */}
              <div className="flex-shrink-0">
                {item.badgeType === 'CONFIRMED' ? (
                  <PixelSpiderMarker color="green" size={24} />
                ) : (
                  <PixelStarMarker size={24} />
                )}
              </div>

              {/* Status Tag Pill */}
              <span className={`text-[9px] font-pixel px-2 py-0.5 rounded border border-black font-bold tracking-widest ${
                item.badgeType === 'CONFIRMED'
                  ? 'bg-[#79a86b]/20 text-[#9dd48d] border-[#79a86b]/40'
                  : 'bg-[#5b99be]/20 text-[#8ec3e3] border-[#5b99be]/40'
              }`}>
                {item.badgeType}
              </span>

              {/* Title & Description */}
              <div>
                <h3 className="text-xs md:text-sm font-silk font-bold text-[#e2f0fb] group-hover:text-cyan-300 tracking-wider">
                  {item.title}
                </h3>
                <p className="text-[11px] font-mono text-gray-400 mt-0.5 line-clamp-1">
                  {item.summary}
                </p>
              </div>
            </div>

            {/* Date Tag */}
            <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0">
              <span className="text-[10px] font-silk text-[#6285a6] uppercase tracking-widest">
                {item.date}
              </span>
              <span className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono font-bold text-sm">
                ➔
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
