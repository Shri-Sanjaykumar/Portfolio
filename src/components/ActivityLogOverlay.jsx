import React, { useState } from 'react';
import { activityLog, trackerNodes } from '../data/portfolioData';
import { soundEffects } from '../utils/audio';

const NAV_TABS = [
  { id: 'activity',   label: 'ACTIVITY LOG' },
  { id: 'projects',   label: 'PROJECTS & MISSIONS' },
  { id: 'watch',      label: 'WEB WATCH 1.0' },
  { id: 'skills',     label: 'SKILLS & ARCHITECTURE' },
  { id: 'leadership', label: 'EVENTS & LEADERSHIP' },
  { id: 'education',  label: 'EDUCATION (VIT)' },
  { id: 'connect',    label: 'MESSAGE CENTER' },
];

const STATUS_COLORS = {
  CONFIRMED:  { bg: '#2a4d38', text: '#79a86b', border: '#3a6b48', label: 'CONFIRMED'  },
  EVENT:      { bg: '#4a3020', text: '#f5a742', border: '#6b4a28', label: 'EVENT'      },
  EDUCATION:  { bg: '#1e3050', text: '#67c6ea', border: '#2a4870', label: 'EDUCATION'  },
  RUMORED:    { bg: '#4a2020', text: '#e05656', border: '#6b2828', label: 'RUMORED'    },
  EXPERIENCE: { bg: '#2a2a50', text: '#a07ef5', border: '#3a3a70', label: 'EXPERIENCE' },
  LEADERSHIP: { bg: '#4a3a00', text: '#e8c838', border: '#6b5500', label: 'LEADERSHIP' },
};

function StatusBadge({ status }) {
  const cfg = STATUS_COLORS[status] || STATUS_COLORS.CONFIRMED;
  return (
    <span
      className="px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-silk font-bold uppercase tracking-wider flex-shrink-0"
      style={{ background: cfg.bg, color: cfg.text, border: `1px solid ${cfg.border}` }}
    >
      {cfg.label}
    </span>
  );
}

export default function ActivityLogOverlay({ isOpen, onClose, onSelectNode, onSelectTab }) {
  const [activeTab, setActiveTab] = useState('activity');
  const [hoveredRow, setHoveredRow] = useState(null);

  if (!isOpen) return null;

  const handleTabClick = (tabId) => {
    soundEffects.click();
    if (tabId === 'activity') {
      setActiveTab('activity');
    } else {
      if (onSelectTab) onSelectTab(tabId);
    }
  };

  const handleRowClick = (nodeId) => {
    soundEffects.select();
    const node = trackerNodes.find((n) => n.id === nodeId);
    if (node && onSelectNode) onSelectNode(node);
  };

  return (
    <div
      className="absolute inset-0 z-40 flex"
      style={{ background: 'rgba(10,18,28,0.85)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-h-full flex overflow-hidden animate-dossier-reveal"
        style={{
          background: '#121f2d',
          border: '3px solid #000',
          borderRadius: '12px',
          margin: '16px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.95), inset 2px 2px 0 rgba(255,255,255,0.08)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Sidebar — matching ezgif-frame-040 */}
        <div
          className="w-44 sm:w-56 flex-shrink-0 flex flex-col"
          style={{ background: '#0e1925', borderRight: '2px solid #000' }}
        >
          <div className="px-4 py-3" style={{ borderBottom: '1px solid #162433' }}>
            <div className="text-[9px] font-silk text-cyan-400 tracking-widest uppercase">
              RADAR INDEX
            </div>
          </div>
          <div className="flex-1 p-2 space-y-0.5 overflow-y-auto">
            {NAV_TABS.map((tab) => {
              const isCurrent = tab.id === activeTab || (tab.id !== 'activity' && false);
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className="w-full text-left text-[10px] sm:text-xs py-2 px-2.5 rounded font-silk cursor-pointer transition-all"
                  style={{
                    background: isCurrent ? 'rgba(245,167,66,0.12)' : 'transparent',
                    color: isCurrent ? '#f5a742' : '#c5d8e8',
                    borderLeft: isCurrent ? '3px solid #f5a742' : '3px solid transparent',
                    fontWeight: isCurrent ? 'bold' : 'normal',
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
          <div className="p-3 text-[8px] font-mono" style={{ borderTop: '1px solid #162433' }}>
            <div className="text-gray-400 font-bold">SHRI SANJAYKUMAR V</div>
            <div className="text-cyan-400 mt-0.5">9.12 CGPA @ VIT</div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 sm:px-6 py-3"
            style={{ borderBottom: '2px solid #162433' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#67e8f9]" />
              <h2 className="text-xs sm:text-sm font-silk font-bold text-white tracking-widest uppercase">
                ACTIVITY LOG
              </h2>
              <span
                className="text-[9px] font-silk px-2 py-0.5 rounded"
                style={{ background: '#1a2d42', color: '#67e8f9', border: '1px solid #1e3d5a' }}
              >
                {activityLog.length} ENTRIES
              </span>
            </div>
            <button
              onClick={() => { soundEffects.close(); onClose(); }}
              className="flex items-center gap-1.5 text-[10px] font-silk cursor-pointer hover:text-white transition-colors px-3 py-1.5 rounded-lg"
              style={{ color: '#8cb0cc', background: '#162433', border: '1px solid #2b4157' }}
            >
              ✕ CLOSE
            </button>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-y-auto">
            {activityLog.map((entry, i) => (
              <div
                key={entry.id || i}
                className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 cursor-pointer transition-all border-l-2"
                style={{
                  borderBottom: '1px solid #162433',
                  background: hoveredRow === i ? 'rgba(255,255,255,0.04)' : 'transparent',
                  borderLeftColor: hoveredRow === i ? '#f5a742' : 'transparent',
                }}
                onMouseEnter={() => setHoveredRow(i)}
                onMouseLeave={() => setHoveredRow(null)}
                onClick={() => { if (entry.nodeId) handleRowClick(entry.nodeId); }}
                role={entry.nodeId ? 'button' : undefined}
              >
                {/* Status dot */}
                <div
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0"
                  style={{
                    background: STATUS_COLORS[entry.badgeType]?.text || '#79a86b',
                    boxShadow: `0 0 5px ${STATUS_COLORS[entry.badgeType]?.text || '#79a86b'}`,
                  }}
                />

                {/* Status badge */}
                <StatusBadge status={entry.badgeType || 'CONFIRMED'} />

                {/* Title */}
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] sm:text-xs font-silk text-white truncate tracking-wide">
                    {entry.title}
                  </div>
                  {entry.summary && (
                    <div className="text-[8px] sm:text-[9px] font-mono text-gray-400 truncate mt-0.5">
                      {entry.summary}
                    </div>
                  )}
                </div>

                {/* Date */}
                <div className="text-[9px] sm:text-[10px] font-silk text-gray-400 flex-shrink-0 text-right">
                  {entry.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
