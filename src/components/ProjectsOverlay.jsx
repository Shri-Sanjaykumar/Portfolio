import React, { useState } from 'react';
import { engineeringWatchItems, trackerNodes } from '../data/portfolioData';
import { soundEffects } from '../utils/audio';

// Projects carousel — exactly like spideytracker's "WEB WATCH 1.0" panel
export default function ProjectsOverlay({ isOpen, onClose, onSelectNode }) {
  const [current, setCurrent] = useState(0);

  if (!isOpen) return null;

  const total = engineeringWatchItems.length;

  const prev = () => {
    try { soundEffects.click?.(); } catch {}
    setCurrent(c => (c - 1 + total) % total);
  };
  const next = () => {
    try { soundEffects.click?.(); } catch {}
    setCurrent(c => (c + 1) % total);
  };

  const leftIdx   = (current - 1 + total) % total;
  const rightIdx  = (current + 1) % total;
  const leftItem  = engineeringWatchItems[leftIdx];
  const centerItem = engineeringWatchItems[current];
  const rightItem = engineeringWatchItems[rightIdx];

  return (
    <div
      className="absolute inset-0 z-40 flex flex-col"
      style={{ background: 'rgba(8,14,24,0.97)' }}
    >
      {/* Spider-Man action image — top-right decorative */}
      <img
        src="/spidey/spiderman-action.png"
        alt=""
        className="absolute pointer-events-none"
        style={{
          width: 200, height: 240,
          right: -20, top: -20,
          objectFit: 'contain',
          opacity: 0.15,
          filter: 'drop-shadow(0 0 20px rgba(220,38,38,0.4))',
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 flex-shrink-0"
        style={{ borderBottom: '2px solid rgba(30,61,90,0.6)' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#67e8f9', boxShadow: '0 0 6px #67e8f9' }}/>
          <span className="font-silk text-sm font-bold text-white tracking-widest uppercase">
            PROJECTS & MISSIONS
          </span>
          <span className="text-[9px] font-pixel" style={{ color: '#67e8f9' }}>
            WEB WATCH 1.0
          </span>
          {/* Blinking cursor */}
          <span className="w-2 h-4 inline-block animate-cursor" style={{ background: '#e2f0fb' }}/>
        </div>
        <button
          onClick={() => { try { soundEffects.close?.(); } catch {} onClose(); }}
          className="font-silk text-xs cursor-pointer hover:text-white transition-colors flex items-center gap-1.5"
          style={{ color: '#8cb0cc' }}
        >
          ✕ CLOSE
        </button>
      </div>

      {/* Carousel — 3 panel style matching spideytracker Web Watch */}
      <div className="flex-1 flex items-center justify-between px-4 sm:px-8 py-4 gap-4 overflow-hidden">
        {/* Left arrow */}
        <button
          onClick={prev}
          className="flex-shrink-0 w-10 h-16 flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '2px solid rgba(255,255,255,0.15)',
            borderRadius: 8,
          }}
          aria-label="Previous project"
        >
          <span className="text-white text-xl font-bold">‹</span>
        </button>

        {/* Three panels */}
        <div className="flex-1 flex items-stretch gap-6 overflow-hidden" style={{ minHeight: 0 }}>
          {/* Left card (partial) */}
          <div
            className="flex-shrink-0 flex flex-col gap-3 cursor-pointer opacity-60 hover:opacity-80 transition-all"
            style={{ width: '22%', minWidth: 120 }}
            onClick={prev}
          >
            <div className="rounded-lg overflow-hidden border-2 border-[#1e3348]"
              style={{ aspectRatio: '4/3', background: '#0d1a28' }}
            >
              <img src={leftItem.image} alt={leftItem.title} className="w-full h-full object-cover"/>
            </div>
            <div>
              <div className="font-silk text-[9px] text-cyan-400 tracking-widest">{leftItem.badge}</div>
              <div className="font-silk text-[10px] text-gray-400 font-bold uppercase mt-0.5 leading-tight line-clamp-2">{leftItem.title}</div>
            </div>
          </div>

          {/* Center card (main) */}
          <div className="flex-1 flex gap-5 overflow-hidden">
            <div className="flex-shrink-0 w-[42%] flex flex-col gap-3">
              <div
                className="rounded-lg overflow-hidden border-3 cursor-pointer transition-transform hover:scale-[1.02]"
                style={{ aspectRatio: '4/3', background: '#0d1a28', borderColor: '#2a4d6b' }}
                onClick={() => {
                  const node = trackerNodes.find(n => n.id === centerItem.nodeId || n.name.toLowerCase().includes(centerItem.title.split(' ')[0].toLowerCase()));
                  if (node && onSelectNode) onSelectNode(node);
                }}
              >
                <img src={centerItem.image} alt={centerItem.title} className="w-full h-full object-cover"/>
              </div>
              {/* Dot pagination */}
              <div className="flex items-center justify-center gap-2">
                {engineeringWatchItems.map((_, i) => (
                  <button key={i} onClick={() => { try { soundEffects.click?.(); } catch {} setCurrent(i); }}
                    className="cursor-pointer transition-all"
                    style={{
                      width: i === current ? 20 : 8,
                      height: 8,
                      borderRadius: 4,
                      background: i === current ? '#67e8f9' : 'rgba(255,255,255,0.25)',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Center text */}
            <div className="flex-1 flex flex-col justify-center gap-3 min-w-0">
              <div>
                <div className="font-silk text-[10px] tracking-widest mb-1" style={{ color: '#f5a742' }}>
                  {centerItem.badge}
                </div>
                <h3 className="font-silk text-base sm:text-lg font-bold text-white uppercase leading-tight tracking-wide">
                  {centerItem.title}
                </h3>
              </div>
              <p className="font-mono text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-5">
                {centerItem.desc}
              </p>
              <ul className="space-y-1.5">
                {centerItem.bulletPoints?.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-[10px] sm:text-xs font-mono text-gray-400">
                    <span style={{ color: '#67e8f9', flexShrink: 0 }}>▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              {/* Action buttons */}
              <div className="flex gap-3 mt-2">
                <a href={centerItem.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="btn-arcade-yellow px-4 py-1.5 text-[10px] font-bold rounded-lg cursor-pointer flex items-center gap-1.5"
                >
                  <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
                  VIEW CODE
                </a>
              </div>
            </div>
          </div>

          {/* Right card (partial) */}
          <div
            className="flex-shrink-0 flex flex-col gap-3 cursor-pointer opacity-60 hover:opacity-80 transition-all"
            style={{ width: '22%', minWidth: 120 }}
            onClick={next}
          >
            <div className="rounded-lg overflow-hidden border-2 border-[#1e3348]"
              style={{ aspectRatio: '4/3', background: '#0d1a28' }}
            >
              <img src={rightItem.image} alt={rightItem.title} className="w-full h-full object-cover"/>
            </div>
            <div>
              <div className="font-silk text-[9px] text-cyan-400 tracking-widest">{rightItem.badge}</div>
              <div className="font-silk text-[10px] text-gray-400 font-bold uppercase mt-0.5 leading-tight line-clamp-2">{rightItem.title}</div>
            </div>
          </div>
        </div>

        {/* Right arrow */}
        <button
          onClick={next}
          className="flex-shrink-0 w-10 h-16 flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '2px solid rgba(255,255,255,0.15)',
            borderRadius: 8,
          }}
          aria-label="Next project"
        >
          <span className="text-white text-xl font-bold">›</span>
        </button>
      </div>

      {/* Spider-Man bottom-right decorative */}
      <img
        src="/spidey/spiderman-removebg.png"
        alt=""
        className="absolute pointer-events-none"
        style={{
          width: 160, height: 200,
          left: -10, bottom: -10,
          objectFit: 'contain',
          opacity: 0.12,
          filter: 'drop-shadow(0 0 15px rgba(220,38,38,0.3))',
          transform: 'scaleX(-1)',
        }}
      />
    </div>
  );
}
