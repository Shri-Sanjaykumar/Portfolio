import React, { useState } from 'react';
import { skillsCategories, engineeringPrinciples } from '../data/portfolioData';
import { soundEffects } from '../utils/audio';

export default function SkillsArchitectureOverlay({ isOpen = false, onClose }) {
  const [activeTab, setActiveTab] = useState('skills'); // 'skills' | 'principles'

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-40 bg-[#0d1622]/95 backdrop-blur-md flex flex-col p-4 md:p-8 select-none overflow-hidden scanline-overlay">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b-2 border-black bg-[#101b29] p-4 rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-cyan-400 border border-black" />
          <h2 className="text-xs md:text-sm font-silk font-bold text-white tracking-widest uppercase">
            TECHNICAL ARSENAL &amp; HOW I BUILD
          </h2>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundEffects.click();
              setActiveTab('skills');
            }}
            className={`px-3 py-1 rounded text-[10px] font-silk uppercase tracking-wider border border-black transition-all ${
              activeTab === 'skills'
                ? 'bg-cyan-500 text-black font-bold'
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
            className={`px-3 py-1 rounded text-[10px] font-silk uppercase tracking-wider border border-black transition-all ${
              activeTab === 'principles'
                ? 'bg-cyan-500 text-black font-bold'
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
          className="flex items-center gap-1.5 px-3 py-1 rounded border border-black bg-[#1f3144] hover:bg-[#324d6b] text-white font-silk text-xs uppercase"
        >
          <span>✕</span>
          <span>CLOSE</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="flex-1 bg-[#0b131e] border-x-2 border-b-2 border-black p-4 md:p-8 overflow-y-auto">
        {activeTab === 'skills' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {Object.entries(skillsCategories).map(([category, items]) => (
              <div
                key={category}
                className="bg-[#101c2a] border border-[#20364d] rounded-lg p-4 shadow flex flex-col justify-between"
              >
                <div className="flex items-center gap-2 mb-3 border-b border-[#1b2e42] pb-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  <h3 className="text-xs font-silk font-bold text-white tracking-wider">
                    {category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-[#162738] border border-[#263e57] text-gray-300 text-[11px] font-mono rounded hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
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
              <h3 className="text-sm font-silk font-bold text-[#f5a742] tracking-wider">
                HOW I BUILD — 5 CORE PRINCIPLES
              </h3>
              <p className="text-xs font-mono text-gray-400 mt-1">
                The engineering philosophy guiding my system design, coding, and delivery.
              </p>
            </div>

            {engineeringPrinciples.map((p) => (
              <div
                key={p.number}
                className="bg-[#101c2a] border border-[#20364d] p-4 rounded-lg flex flex-col sm:flex-row sm:items-center gap-4 hover:border-cyan-500/40 transition-all"
              >
                <div className="text-2xl font-bold font-pixel text-cyan-400 flex-shrink-0">
                  {p.number}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-xs md:text-sm font-silk font-bold text-white">
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
