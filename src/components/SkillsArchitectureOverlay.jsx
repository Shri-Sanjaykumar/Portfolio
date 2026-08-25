import React, { useState } from 'react';
import { skillsCategories, engineeringPrinciples } from '../data/portfolioData';
import { soundEffects } from '../utils/audio';

export default function SkillsArchitectureOverlay({ isOpen = false, onClose }) {
  const [activeTab, setActiveTab] = useState('skills'); // 'skills' | 'principles'

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-40 bg-[#0d1622]/98 flex flex-col p-3 sm:p-6 md:p-8 select-none overflow-hidden scanline-overlay">
      {/* Decorative Spider-Man Action illustration background */}
      <img
        src="/spidey/spiderman-action.png"
        alt=""
        className="absolute pointer-events-none"
        style={{
          width: 280,
          height: 340,
          right: -20,
          bottom: -20,
          objectFit: 'contain',
          opacity: 0.08,
          filter: 'drop-shadow(0 0 30px rgba(220,38,38,0.4))',
        }}
      />

      {/* Top Header */}
      <div className="flex items-center justify-between border-b-2 border-black bg-[#101b29] p-3 sm:p-4 rounded-t-lg flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-cyan-400 border border-black shadow-[0_0_6px_#67e8f9]" />
          <h2 className="text-xs sm:text-sm font-silk font-bold text-white tracking-widest uppercase">
            TECHNICAL ARSENAL &amp; HOW I BUILD
          </h2>
          <span className="inline-block w-2 h-4 animate-cursor align-middle" style={{ background: '#e2f0fb' }} />
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundEffects.click();
              setActiveTab('skills');
            }}
            className={`px-3 py-1 rounded text-[10px] sm:text-xs font-silk uppercase tracking-wider border border-black transition-all cursor-pointer ${
              activeTab === 'skills'
                ? 'bg-cyan-400 text-black font-bold shadow-[0_2px_0_#000]'
                : 'bg-[#1b2b3a] text-gray-300 hover:bg-[#273d52]'
            }`}
          >
            SKILLS &amp; STACK
          </button>
          <button
            onClick={() => {
              soundEffects.click();
              setActiveTab('principles');
            }}
            className={`px-3 py-1 rounded text-[10px] sm:text-xs font-silk uppercase tracking-wider border border-black transition-all cursor-pointer ${
              activeTab === 'principles'
                ? 'bg-cyan-400 text-black font-bold shadow-[0_2px_0_#000]'
                : 'bg-[#1b2b3a] text-gray-300 hover:bg-[#273d52]'
            }`}
          >
            ENGINEERING DNA
          </button>
        </div>

        <button
          onClick={() => {
            soundEffects.close();
            onClose();
          }}
          className="flex items-center gap-1.5 px-3 py-1 rounded border border-black bg-[#1f3144] hover:bg-[#324d6b] text-white font-silk text-xs uppercase cursor-pointer"
        >
          <span>✕</span>
          <span>CLOSE</span>
        </button>
      </div>

      {/* Main Container - Scrollable */}
      <div className="flex-1 bg-[#0b131e] border-x-2 border-b-2 border-black p-4 sm:p-6 md:p-8 overflow-y-auto">
        {activeTab === 'skills' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {Object.entries(skillsCategories).map(([category, items]) => (
              <div
                key={category}
                className="bg-[#101c2a] border border-[#20364d] rounded-lg p-4 shadow flex flex-col justify-between hover:border-cyan-500/50 transition-all group"
                style={{
                  boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                }}
              >
                <div className="flex items-center gap-2 mb-3 border-b border-[#1b2e42] pb-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 group-hover:shadow-[0_0_8px_#67e8f9] transition-all" />
                  <h3 className="text-xs font-silk font-bold text-white tracking-wider">
                    {category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-[#162738] border border-[#263e57] text-gray-300 text-[11px] font-mono rounded hover:text-cyan-300 hover:border-cyan-500/60 hover:bg-[#1a344d] transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Engineering DNA - How I Build */
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-sm sm:text-base font-silk font-bold text-[#f5a742] tracking-wider uppercase">
                HOW I BUILD — 5 CORE PRINCIPLES
              </h3>
              <p className="text-xs font-mono text-gray-400 mt-1">
                The engineering philosophy guiding my system design, coding, and delivery.
              </p>
            </div>

            {engineeringPrinciples.map((p) => (
              <div
                key={p.number}
                className="bg-[#101c2a] border border-[#20364d] p-4 rounded-lg flex flex-col sm:flex-row sm:items-center gap-4 hover:border-cyan-500/40 hover:bg-[#142334] transition-all"
                style={{
                  boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                }}
              >
                <div className="text-2xl font-bold font-pixel text-cyan-400 flex-shrink-0 w-12 text-center">
                  {p.number}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h4 className="text-xs md:text-sm font-silk font-bold text-white uppercase">
                      {p.title}
                    </h4>
                    <span className="text-[8px] font-pixel px-1.5 py-0.5 bg-black text-cyan-300 rounded border border-cyan-500/30">
                      {p.tag}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-gray-300 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
