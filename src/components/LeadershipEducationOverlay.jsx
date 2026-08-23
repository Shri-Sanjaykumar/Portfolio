import React, { useState } from 'react';
import { profile } from '../data/portfolioData';
import { soundEffects } from '../utils/audio';

export default function LeadershipEducationOverlay({ isOpen = false, onClose, initialTab = 'leadership' }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'leadership' | 'education'

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-40 bg-[#0d1622]/95 backdrop-blur-md flex flex-col p-4 md:p-8 select-none overflow-hidden scanline-overlay">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b-2 border-black bg-[#101b29] p-4 rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-amber-400 border border-black" />
          <h2 className="text-xs md:text-sm font-silk font-bold text-white tracking-widest uppercase">
            LEADERSHIP &amp; ACADEMICS
          </h2>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundEffects.click();
              setActiveTab('leadership');
            }}
            className={`px-3 py-1 rounded text-[10px] font-silk uppercase tracking-wider border border-black transition-all ${
              activeTab === 'leadership'
                ? 'bg-amber-400 text-black font-bold'
                : 'bg-[#1b2b3a] text-gray-300 hover:bg-[#273d52]'
            }`}
          >
            LEADERSHIP &amp; FESTS
          </button>
          <button
            onClick={() => {
              soundEffects.click();
              setActiveTab('education');
            }}
            className={`px-3 py-1 rounded text-[10px] font-silk uppercase tracking-wider border border-black transition-all ${
              activeTab === 'education'
                ? 'bg-amber-400 text-black font-bold'
                : 'bg-[#1b2b3a] text-gray-300 hover:bg-[#273d52]'
            }`}
          >
            VIT EDUCATION
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

      {/* Main Content Body */}
      <div className="flex-1 bg-[#0b131e] border-x-2 border-b-2 border-black p-4 md:p-8 overflow-y-auto">
        {activeTab === 'leadership' ? (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Leadership Card 1: VIT Health Club */}
            <div className="bg-[#101c2a] border border-[#20364d] rounded-lg p-5 shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1c2e40] pb-3 mb-3">
                <div>
                  <span className="text-[9px] font-pixel text-amber-400 uppercase">
                    ORGANIZATION // LEADERSHIP
                  </span>
                  <h3 className="text-sm md:text-base font-silk font-bold text-white mt-0.5">
                    VIT Health Club
                  </h3>
                  <div className="text-xs font-mono text-cyan-300">
                    Vice Chairperson &amp; Core Member (2025 – Present)
                  </div>
                </div>
                <span className="text-[10px] font-pixel px-2 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded self-start">
                  200+ HACKATHON
                </span>
              </div>

              <p className="text-xs font-mono text-gray-300 leading-relaxed mb-3">
                Directed end-to-end execution of the <strong>Hack the Hospital</strong> hackathon with 200+ participants, coordinating cross-functional teams, mentor tracks, technical workshops, schedules, and deliverables.
              </p>

              <div className="flex flex-wrap gap-2 text-[10px] font-mono text-gray-400">
                <span className="px-2 py-0.5 bg-[#142333] border border-[#233a4f] rounded">Cross-Functional Leadership</span>
                <span className="px-2 py-0.5 bg-[#142333] border border-[#233a4f] rounded">Technical Workshop Coordination</span>
                <span className="px-2 py-0.5 bg-[#142333] border border-[#233a4f] rounded">Operational Execution</span>
              </div>
            </div>

            {/* Leadership Card 2: Riviera & Gravitas */}
            <div className="bg-[#101c2a] border border-[#20364d] rounded-lg p-5 shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1c2e40] pb-3 mb-3">
                <div>
                  <span className="text-[9px] font-pixel text-amber-400 uppercase">
                    TECH FESTIVALS // LEADERSHIP
                  </span>
                  <h3 className="text-sm md:text-base font-silk font-bold text-white mt-0.5">
                    Riviera &amp; Gravitas Tech Festivals
                  </h3>
                  <div className="text-xs font-mono text-cyan-300">
                    Sponsorship Lead (2025 – 2026)
                  </div>
                </div>
                <span className="text-[10px] font-pixel px-2 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded self-start">
                  ₹60+ LAKHS SECURED
                </span>
              </div>

              <p className="text-xs font-mono text-gray-300 leading-relaxed mb-3">
                Led external stakeholder communication and commercial negotiations, securing <strong>INR 60+ Lakhs in non-monetary sponsorships</strong> and orchestrating deliverables across two 1,000+ attendee university mega-festivals.
              </p>

              <div className="flex flex-wrap gap-2 text-[10px] font-mono text-gray-400">
                <span className="px-2 py-0.5 bg-[#142333] border border-[#233a4f] rounded">Commercial Negotiation</span>
                <span className="px-2 py-0.5 bg-[#142333] border border-[#233a4f] rounded">Stakeholder Relations</span>
                <span className="px-2 py-0.5 bg-[#142333] border border-[#233a4f] rounded">Event Deliverables</span>
              </div>
            </div>
          </div>
        ) : (
          /* Education Card: VIT Vellore */
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-[#101c2a] border border-[#20364d] rounded-lg p-6 shadow">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#1c2e40] pb-4 mb-4">
                <div>
                  <span className="text-[9px] font-pixel text-cyan-400 uppercase">
                    DEGREE // ACADEMIC PROFILE
                  </span>
                  <h3 className="text-base md:text-lg font-silk font-bold text-white mt-1">
                    {profile.education.institution}
                  </h3>
                  <div className="text-sm font-mono text-cyan-300 mt-0.5">
                    {profile.education.degree}
                  </div>
                  <div className="text-xs font-mono text-gray-400 mt-1">
                    {profile.education.period} • {profile.education.graduation}
                  </div>
                </div>

                <div className="bg-[#0b131e] border-2 border-black p-3 rounded text-center">
                  <div className="text-[9px] font-pixel text-gray-400 uppercase">CUMULATIVE GPA</div>
                  <div className="text-xl md:text-2xl font-bold font-silk text-[#9dd48d]">
                    {profile.education.cgpa}
                  </div>
                </div>
              </div>

              {/* Coursework Grid */}
              <div>
                <div className="text-[10px] font-silk text-cyan-400 uppercase tracking-widest mb-2.5">
                  CORE COMPUTER SCIENCE COURSEWORK
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {profile.education.coursework.map((course) => (
                    <div
                      key={course}
                      className="p-2 bg-[#142333] border border-[#233a4f] rounded text-xs font-mono text-gray-200"
                    >
                      ✓ {course}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
