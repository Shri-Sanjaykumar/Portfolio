import React, { useState } from 'react';
import { activityLog, trackerNodes } from '../data/portfolioData';
import { soundEffects } from '../utils/audio';

// Exactly spideytracker.net's "ACTIVITY LOG" panel — simple full-screen table
const BADGE_CFG = {
  CONFIRMED:  { bg: 'rgba(30,90,40,0.5)', text: '#7ecf7e', border: '1px solid rgba(60,160,60,0.4)' },
  EVENT:      { bg: 'rgba(60,40,10,0.5)', text: '#f5a742', border: '1px solid rgba(200,120,0,0.4)' },
  EDUCATION:  { bg: 'rgba(10,30,80,0.5)', text: '#67b8e8', border: '1px solid rgba(20,80,180,0.4)' },
  EXPERIENCE: { bg: 'rgba(40,20,80,0.5)', text: '#b07ef5', border: '1px solid rgba(120,60,200,0.4)' },
  LEADERSHIP: { bg: 'rgba(80,60,0,0.5)',  text: '#e8c838', border: '1px solid rgba(200,150,0,0.4)' },
  RUMORED:    { bg: 'rgba(80,20,20,0.5)', text: '#e05656', border: '1px solid rgba(200,40,40,0.4)' },
};

function Badge({ type }) {
  const cfg = BADGE_CFG[type] || BADGE_CFG.CONFIRMED;
  return (
    <span className="font-silk text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded flex-shrink-0"
      style={{ background: cfg.bg, color: cfg.text, border: cfg.border, whiteSpace: 'nowrap' }}
    >
      {type}
    </span>
  );
}

// Green spider marker icon (matching spideytracker's left icon per row)
function SpiderMarker({ type }) {
  const color = type === 'RUMORED' ? '#cc3333' : type === 'EVENT' ? '#e8a838' : '#79a86b';
  const bg    = type === 'RUMORED' ? '#3a1010' : type === 'EVENT' ? '#3a2a08' : '#1a3318';
  return (
    <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center"
      style={{ background: bg, border: `2px solid ${color}` }}
    >
      <svg viewBox="0 0 14 14" width="10" height="10">
        <ellipse cx="7" cy="8" rx="2.5" ry="3" fill={color}/>
        <circle  cx="7" cy="5" r="2"         fill={color}/>
        <line x1="4.5" y1="7" x2="1" y2="5.5" stroke={color} strokeWidth="1" strokeLinecap="round"/>
        <line x1="4.5" y1="8.5" x2="0.5" y2="8.5" stroke={color} strokeWidth="1" strokeLinecap="round"/>
        <line x1="9.5" y1="7" x2="13" y2="5.5" stroke={color} strokeWidth="1" strokeLinecap="round"/>
        <line x1="9.5" y1="8.5" x2="13.5" y2="8.5" stroke={color} strokeWidth="1" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

export default function ActivityLogOverlay({ isOpen, onClose, onSelectNode, onSelectTab }) {
  const [hovered, setHovered] = useState(null);

  if (!isOpen) return null;

  const handleRow = (entry) => {
    try { soundEffects.select?.(); } catch {}
    if (entry.nodeId) {
      const node = trackerNodes.find(n => n.id === entry.nodeId);
      if (node && onSelectNode) onSelectNode(node);
    }
  };

  return (
    <div
      className="absolute inset-0 z-40 flex flex-col"
      style={{ background: 'rgba(10,17,28,0.98)' }}
    >
      {/* Spidey decorative — right side */}
      <img src="/spidey/spiderman-sense.png" alt="" className="absolute pointer-events-none"
        style={{ width:200,height:260,right:0,top:0,objectFit:'contain',opacity:0.06,
          filter:'drop-shadow(0 0 20px rgba(220,38,38,0.3))' }}
      />

      {/* Header — matches spideytracker "ACTIVITY LOG ▌  ✕ CLOSE" exactly */}
      <div className="flex items-center justify-between px-5 sm:px-8 py-4 flex-shrink-0"
        style={{ borderBottom: '1.5px solid rgba(30,61,90,0.6)' }}
      >
        <div className="flex items-center gap-3">
          <span className="font-silk text-sm sm:text-base font-bold text-white tracking-widest uppercase">
            ACTIVITY LOG
          </span>
          {/* Blinking cursor block — exactly like spideytracker */}
          <span className="inline-block w-2.5 h-4 animate-cursor align-middle" style={{ background: '#e2f0fb' }}/>
        </div>
        <button onClick={() => { try { soundEffects.close?.(); } catch {} onClose(); }}
          className="font-silk text-xs sm:text-sm cursor-pointer hover:text-white transition-colors flex items-center gap-1.5"
          style={{ color: '#9ab8cc' }}
        >
          ✕ CLOSE
        </button>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto">
        {activityLog.map((entry, i) => (
          <div
            key={entry.id || i}
            onClick={() => handleRow(entry)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="flex items-center gap-3 sm:gap-5 px-5 sm:px-8 py-3 cursor-pointer transition-all"
            style={{
              borderBottom: '1px solid rgba(30,61,90,0.4)',
              background: hovered === i ? 'rgba(255,255,255,0.04)' : 'transparent',
            }}
          >
            {/* Spider marker icon */}
            <SpiderMarker type={entry.badgeType || 'CONFIRMED'}/>

            {/* Badge */}
            <Badge type={entry.badgeType || 'CONFIRMED'}/>

            {/* Title */}
            <div className="flex-1 min-w-0">
              <span className="font-silk text-[10px] sm:text-xs text-white tracking-wider uppercase font-bold truncate block">
                {entry.title}
              </span>
            </div>

            {/* Date */}
            <div className="font-silk text-[9px] sm:text-[10px] flex-shrink-0" style={{ color: '#6b8fa8' }}>
              {entry.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
