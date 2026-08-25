import React, { useState, useEffect } from 'react';
import { 
  profile, 
  skillsCategories, 
  engineeringPrinciples, 
  engineeringWatchItems, 
  activityLog, 
  trackerNodes,
  socialPosts 
} from '../data/portfolioData';
import { soundEffects } from '../utils/audio';

// ─── TForce Experience Data ───────────────────────────────────────────────────
const EXPERIENCE_DATA = {
  company: 'TForce India Private Limited',
  formerName: 'formerly Qcloud Tech',
  role: 'Academic Intern — Generative AI & SAP Technologies',
  period: 'May 2026 – July 2026',
  location: 'Chennai, Tamil Nadu, India',
  type: 'CONFIRMED',
  tech: ['Python', 'Jupyter', 'SAP Gen AI Hub SDK', 'SAP BTP', 'RAG', 'Vector Search', 'SAP ABAP Cloud'],
  responsibilities: [
    'Developed enterprise Generative AI workflows using Python and SAP Generative AI Hub SDK on SAP BTP platform',
    'Implemented Retrieval-Augmented Generation (RAG) systems with vector search for enterprise document retrieval',
    'Integrated backend services with SAP ABAP Cloud for enterprise-grade workflow automation',
    'Built contextual AI reasoning systems over proprietary enterprise schemas maintaining data governance',
    'Delivered production-ready AI pipeline components within a structured enterprise software environment',
  ],
  highlights: [
    { label: 'DOMAIN', value: 'Enterprise Gen AI' },
    { label: 'PLATFORM', value: 'SAP BTP' },
    { label: 'DURATION', value: '3 Months' },
    { label: 'LOCATION', value: 'Chennai, India' },
  ],
  confidentialNote: 'Selected implementation details are omitted where required by company confidentiality policy.',
};

// ─── Badge Component ──────────────────────────────────────────────────────────
const BADGE_MAP = {
  CONFIRMED: { bg: 'rgba(30,90,40,0.5)', text: '#7ecf7e', border: '1px solid rgba(60,160,60,0.4)' },
  EVENT: { bg: 'rgba(80,50,10,0.5)', text: '#f5a742', border: '1px solid rgba(220,130,0,0.4)' },
  EDUCATION: { bg: 'rgba(10,40,90,0.5)', text: '#67b8e8', border: '1px solid rgba(20,90,190,0.4)' },
  EXPERIENCE: { bg: 'rgba(50,20,90,0.5)', text: '#b07ef5', border: '1px solid rgba(130,60,210,0.4)' },
  LEADERSHIP: { bg: 'rgba(90,70,0,0.5)', text: '#e8c838', border: '1px solid rgba(220,160,0,0.4)' },
  RUMORED: { bg: 'rgba(90,20,20,0.5)', text: '#e05656', border: '1px solid rgba(220,40,40,0.4)' },
};

function StatusBadge({ type }) {
  const cfg = BADGE_MAP[type] || BADGE_MAP.CONFIRMED;
  return (
    <span
      className="font-silk text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded flex-shrink-0"
      style={{ background: cfg.bg, color: cfg.text, border: cfg.border, whiteSpace: 'nowrap' }}
    >
      {type}
    </span>
  );
}

// ─── Main Spidey Menu Overlay (Split Panel: Left Navigation + Right Content) ──
export default function SpideyMenuOverlay({
  isOpen,
  activeTab = 'activity',
  onSelectTab,
  onClose,
  onSelectNode
}) {
  const [currentTab, setCurrentTab] = useState(activeTab || 'activity');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [hoveredLogRow, setHoveredLogRow] = useState(null);
  const [connectForm, setConnectForm] = useState({ name: '', email: '', message: '' });
  const [connectSent, setConnectSent] = useState(false);
  const [skillsSubTab, setSkillsSubTab] = useState('skills'); // 'skills' | 'principles'

  useEffect(() => {
    if (activeTab) setCurrentTab(activeTab);
  }, [activeTab]);

  if (!isOpen) return null;

  const handleTabChange = (tabId) => {
    try { soundEffects.click?.(); } catch {}
    if (tabId === 'tracker') {
      onClose();
    } else {
      setCurrentTab(tabId);
      if (onSelectTab) onSelectTab(tabId);
    }
  };

  const navItems = [
    { id: 'activity',   label: 'ACTIVITY LOG' },
    { id: 'skills',     label: 'SKILLS & STACK' },
    { id: 'projects',   label: 'WEB WATCH 1.0' },
    { id: 'internship', label: 'EXPERIENCE (TFORCE)' },
    { id: 'about',      label: 'ABOUT ME' },
    { id: 'connect',    label: 'TRANSMISSIONS' },
    { id: 'help',       label: 'HELP & GUIDE' },
  ];

  // Carousel controls for Web Watch
  const totalProjects = engineeringWatchItems.length;
  const prevProject = () => {
    try { soundEffects.click?.(); } catch {}
    setCarouselIndex(c => (c - 1 + totalProjects) % totalProjects);
  };
  const nextProject = () => {
    try { soundEffects.click?.(); } catch {}
    setCarouselIndex(c => (c + 1) % totalProjects);
  };

  const handleConnectSubmit = (e) => {
    e.preventDefault();
    try { soundEffects.select?.(); } catch {}
    setConnectSent(true);
    setTimeout(() => {
      setConnectSent(false);
      setConnectForm({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <div
      className="absolute inset-0 z-40 flex select-none overflow-hidden"
      style={{
        background: 'rgba(8, 14, 24, 0.98)',
        backdropFilter: 'blur(3px)',
      }}
    >
      {/* ═══════════════════════════════════════════════════════════════
          LEFT NAVIGATION COLUMN (Matching spideytracker.net Frame 040)
          ═══════════════════════════════════════════════════════════════ */}
      <div
        className="w-44 sm:w-56 md:w-64 flex-shrink-0 flex flex-col justify-center px-4 sm:px-6 py-6 border-r border-[#162738] overflow-y-auto"
        style={{
          background: '#09121d',
        }}
      >
        <div className="space-y-1.5 sm:space-y-2.5 my-auto">
          {navItems.map((item) => {
            const isSelected = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className="w-full text-left font-silk text-xs sm:text-sm md:text-[15px] font-bold tracking-wider uppercase py-2 px-2.5 rounded transition-all cursor-pointer flex items-center justify-between group"
                style={{
                  color: isSelected ? '#f5a742' : '#b8d0e5',
                  background: isSelected ? 'rgba(245,167,66,0.12)' : 'transparent',
                  borderLeft: isSelected ? '3px solid #f5a742' : '3px solid transparent',
                  transform: isSelected ? 'translateX(3px)' : 'translateX(0)',
                }}
              >
                <span>{item.label}</span>
                {isSelected && <span className="text-[#f5a742] text-xs">▶</span>}
              </button>
            );
          })}
        </div>

        {/* Bottom Profile Handle */}
        <div className="pt-4 border-t border-[#142334] mt-auto">
          <div className="font-mono text-[10px] text-gray-300 font-bold">SHRI SANJAYKUMAR V</div>
          <div className="font-silk text-[8px] text-cyan-400 mt-0.5 tracking-wider">M.TECH SE @ VIT (9.12 CGPA)</div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          RIGHT CONTENT PANE (Matches spideytracker.net Frame 040/055/060)
          ═══════════════════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#08101a] relative overflow-hidden">
        
        {/* Top Header Bar */}
        <div
          className="flex items-center justify-between px-5 sm:px-8 py-3.5 border-b border-[#162738] flex-shrink-0"
          style={{ background: '#09121d' }}
        >
          <div className="flex items-center gap-3">
            <span className="font-silk text-xs sm:text-sm font-bold text-white tracking-widest uppercase">
              {currentTab === 'activity' && 'ACTIVITY LOG'}
              {currentTab === 'skills' && 'SKILLS & TECHNICAL ARSENAL'}
              {currentTab === 'projects' && 'WEB WATCH 1.0'}
              {currentTab === 'internship' && 'EXPERIENCE // TFORCE INDIA'}
              {currentTab === 'about' && 'ABOUT SHRI SANJAYKUMAR V'}
              {currentTab === 'connect' && 'ENGINEERING TRANSMISSIONS'}
              {currentTab === 'help' && 'SYSTEM CONTROLS & GUIDE'}
            </span>
            {/* Blinking Cursor */}
            <span className="inline-block w-2.5 h-3.5 animate-cursor align-middle" style={{ background: '#e2f0fb' }} />
          </div>

          <button
            onClick={() => {
              try { soundEffects.close?.(); } catch {}
              onClose();
            }}
            className="font-silk text-xs cursor-pointer text-[#8cb0cc] hover:text-white transition-colors flex items-center gap-1 px-2.5 py-1 rounded bg-[#101b29] border border-[#233b52]"
          >
            ✕ CLOSE
          </button>
        </div>

        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">

          {/* ── 1. ACTIVITY LOG ────────────────────────────────────── */}
          {currentTab === 'activity' && (
            <div className="space-y-1">
              {activityLog.map((entry, i) => (
                <div
                  key={entry.id || i}
                  onClick={() => {
                    if (entry.nodeId) {
                      const node = trackerNodes.find(n => n.id === entry.nodeId);
                      if (node && onSelectNode) onSelectNode(node);
                    }
                  }}
                  onMouseEnter={() => setHoveredLogRow(i)}
                  onMouseLeave={() => setHoveredLogRow(null)}
                  className="flex items-center gap-3 sm:gap-4 px-3 sm:px-5 py-3 rounded cursor-pointer transition-all border-b border-[#142334]"
                  style={{
                    background: hoveredLogRow === i ? 'rgba(255,255,255,0.05)' : 'transparent',
                  }}
                >
                  <StatusBadge type={entry.badgeType || 'CONFIRMED'} />
                  <div className="flex-1 min-w-0">
                    <span className="font-silk text-[11px] sm:text-xs text-white tracking-wider uppercase font-bold truncate block">
                      {entry.title}
                    </span>
                    {entry.summary && (
                      <span className="font-mono text-[9px] text-gray-400 truncate block mt-0.5">
                        {entry.summary}
                      </span>
                    )}
                  </div>
                  <div className="font-silk text-[9px] sm:text-[10px] text-[#6b8fa8] flex-shrink-0">
                    {entry.date}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── 2. SKILLS & STACK ──────────────────────────────────── */}
          {currentTab === 'skills' && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => { try { soundEffects.click?.(); } catch {}; setSkillsSubTab('skills'); }}
                  className={`px-3 py-1 rounded text-xs font-silk uppercase cursor-pointer border ${
                    skillsSubTab === 'skills' ? 'bg-cyan-400 text-black font-bold border-black' : 'bg-[#101b29] text-gray-300 border-[#233b52]'
                  }`}
                >
                  SKILLS &amp; TECH STACK
                </button>
                <button
                  onClick={() => { try { soundEffects.click?.(); } catch {}; setSkillsSubTab('principles'); }}
                  className={`px-3 py-1 rounded text-xs font-silk uppercase cursor-pointer border ${
                    skillsSubTab === 'principles' ? 'bg-cyan-400 text-black font-bold border-black' : 'bg-[#101b29] text-gray-300 border-[#233b52]'
                  }`}
                >
                  ENGINEERING DNA (5 PRINCIPLES)
                </button>
              </div>

              {skillsSubTab === 'skills' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(skillsCategories).map(([category, items]) => (
                    <div
                      key={category}
                      className="bg-[#0e1926] border border-[#1e344a] rounded-lg p-4 shadow"
                    >
                      <div className="flex items-center gap-2 mb-3 border-b border-[#182a3d] pb-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-400" />
                        <h4 className="text-xs font-silk font-bold text-white tracking-wider uppercase">
                          {category}
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {items.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-[#142334] border border-[#233a52] text-gray-300 text-[10px] font-mono rounded hover:text-cyan-300 hover:border-cyan-500/50 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {engineeringPrinciples.map((p) => (
                    <div
                      key={p.number}
                      className="bg-[#0e1926] border border-[#1e344a] p-3.5 rounded-lg flex items-start gap-4"
                    >
                      <div className="text-xl font-bold font-pixel text-cyan-400 flex-shrink-0 w-8">
                        {p.number}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-xs font-silk font-bold text-white uppercase">{p.title}</h4>
                          <span className="text-[8px] font-pixel px-1.5 py-0.5 bg-black text-cyan-300 rounded border border-cyan-500/30">
                            {p.tag}
                          </span>
                        </div>
                        <p className="text-xs font-mono text-gray-300 leading-relaxed">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── 3. WEB WATCH 1.0 (PROJECTS 3-CARD CAROUSEL) ────────── */}
          {currentTab === 'projects' && (
            <div className="h-full flex flex-col justify-center">
              <div className="flex items-center justify-between gap-4">
                {/* Left Arrow Pill Box (Matching Reference Frame 055) */}
                <button
                  onClick={prevProject}
                  className="w-10 h-20 rounded-md bg-[#101b29] border-2 border-[#223a50] hover:border-cyan-400 text-white flex items-center justify-center font-silk text-lg cursor-pointer transition-all flex-shrink-0"
                >
                  ‹
                </button>

                {/* 3-Card Carousel Display */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 overflow-hidden">
                  {[
                    (carouselIndex - 1 + totalProjects) % totalProjects,
                    carouselIndex,
                    (carouselIndex + 1) % totalProjects,
                  ].map((idx, pos) => {
                    const item = engineeringWatchItems[idx];
                    const isCenter = pos === 1;
                    return (
                      <div
                        key={item.id + idx}
                        className={`bg-[#0e1926] border-2 rounded-lg p-3.5 flex flex-col justify-between transition-all ${
                          isCenter
                            ? 'border-cyan-500/70 shadow-[0_0_20px_rgba(0,229,255,0.2)]'
                            : 'border-[#1b2f42] opacity-60 hover:opacity-90'
                        }`}
                      >
                        <div className="w-full h-32 sm:h-36 rounded overflow-hidden border border-[#20364d] mb-3 bg-black">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div>
                          <div className="text-[9px] font-silk text-[#f5a742] tracking-wider mb-1">
                            {item.badge}
                          </div>
                          <h4 className="text-xs sm:text-sm font-silk font-bold text-white uppercase line-clamp-1 mb-2">
                            {item.title}
                          </h4>
                          <p className="text-[10px] font-mono text-gray-300 line-clamp-3 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>

                        <div className="mt-3 pt-3 border-t border-[#182b3d] flex items-center justify-between">
                          <a
                            href={item.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-arcade-yellow px-3 py-1 text-[9px] font-bold rounded cursor-pointer"
                          >
                            VIEW CODE ↗
                          </a>
                          <span className="text-[9px] font-silk text-cyan-400">
                            EDITION 1.0
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Right Arrow Pill Box */}
                <button
                  onClick={nextProject}
                  className="w-10 h-20 rounded-md bg-[#101b29] border-2 border-[#223a50] hover:border-cyan-400 text-white flex items-center justify-center font-silk text-lg cursor-pointer transition-all flex-shrink-0"
                >
                  ›
                </button>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-5">
                {engineeringWatchItems.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { try { soundEffects.click?.(); } catch {}; setCarouselIndex(i); }}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      i === carouselIndex ? 'w-6 bg-cyan-400' : 'w-2 bg-[#20364d]'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── 4. INTERNSHIP (TFORCE INDIA) ───────────────────────── */}
          {currentTab === 'internship' && (
            <div className="max-w-3xl mx-auto space-y-5">
              <div className="bg-[#0e1926] border border-[#1e344a] rounded-lg p-5">
                <div className="flex items-start justify-between border-b border-[#1a2d40] pb-3 mb-4">
                  <div>
                    <h3 className="font-silk text-sm sm:text-base font-bold text-white uppercase">
                      {EXPERIENCE_DATA.company}
                    </h3>
                    <div className="font-mono text-[10px] text-gray-400 mt-0.5">{EXPERIENCE_DATA.formerName}</div>
                    <div className="font-silk text-xs text-cyan-400 mt-1">{EXPERIENCE_DATA.role}</div>
                  </div>
                  <span className="font-silk text-[9px] px-2 py-0.5 rounded bg-green-900/40 text-green-300 border border-green-700/50">
                    {EXPERIENCE_DATA.period}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
                  {EXPERIENCE_DATA.highlights.map(h => (
                    <div key={h.label} className="bg-[#122132] border border-[#213a52] p-2 rounded text-center">
                      <div className="font-silk text-[8px] text-[#f5a742]">{h.label}</div>
                      <div className="font-silk text-[10px] text-white font-bold mt-0.5">{h.value}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="font-silk text-[10px] text-cyan-400 uppercase tracking-wider">RESPONSIBILITIES</div>
                  <ul className="space-y-2">
                    {EXPERIENCE_DATA.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs font-mono text-gray-300">
                        <span className="text-cyan-400 font-bold">▸</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#182b3d]">
                  {EXPERIENCE_DATA.tech.map(t => (
                    <span key={t} className="px-2 py-0.5 bg-[#142334] border border-[#233a52] text-cyan-300 text-[10px] font-mono rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── 5. ABOUT ME (Alone uses photo.jpeg) ─────────────────── */}
          {currentTab === 'about' && (
            <div className="max-w-3xl mx-auto bg-[#0e1926] border border-[#1e344a] rounded-lg p-5 flex flex-col sm:flex-row gap-6">
              <div className="flex flex-col items-center gap-3 flex-shrink-0">
                <div className="w-36 h-44 rounded-lg overflow-hidden border-2 border-cyan-400 shadow-[0_0_20px_rgba(0,229,255,0.2)] bg-black">
                  <img
                    src="/images/photo.jpeg"
                    alt="Shri Sanjaykumar V"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="font-silk text-[10px] text-cyan-400">{profile.handle}</div>
                <a
                  href="/Shri_Sanjaykumar_V_Resume.pdf"
                  download="Shri_Sanjaykumar_V_Resume.pdf"
                  className="btn-arcade-yellow w-full text-center py-1.5 text-[9px] font-bold rounded cursor-pointer"
                >
                  DOWNLOAD CV ↓
                </a>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="font-silk text-base sm:text-xl font-bold text-white uppercase">
                    {profile.name}
                  </h3>
                  <div className="font-silk text-xs text-cyan-400 mt-1">
                    M.TECH INTEGRATED SOFTWARE ENGINEERING @ VIT VELLORE
                  </div>
                  <div className="font-mono text-xs text-[#f5a742] mt-0.5">
                    CGPA: 9.12 / 10.0 • BATCH: 2023 – 2028
                  </div>
                </div>

                <p className="text-xs font-mono text-gray-300 leading-relaxed">
                  {profile.bio}
                </p>

                <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-[#182b3d]">
                  <div className="bg-[#122132] p-2 rounded text-center border border-[#213a52]">
                    <div className="font-silk text-base font-bold text-[#f5a742]">9.12</div>
                    <div className="font-silk text-[8px] text-gray-300">CGPA / 10.0</div>
                  </div>
                  <div className="bg-[#122132] p-2 rounded text-center border border-[#213a52]">
                    <div className="font-silk text-base font-bold text-cyan-400">₹60L+</div>
                    <div className="font-silk text-[8px] text-gray-300">SPONSORSHIPS</div>
                  </div>
                  <div className="bg-[#122132] p-2 rounded text-center border border-[#213a52]">
                    <div className="font-silk text-base font-bold text-[#7ecf7e]">200+</div>
                    <div className="font-silk text-[8px] text-gray-300">HACKATHON LEAD</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── 6. CONNECT / TRANSMISSIONS ──────────────────────────── */}
          {currentTab === 'connect' && (
            <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Transmission Feed */}
              <div className="space-y-3">
                <div className="font-silk text-[10px] text-cyan-400 uppercase tracking-widest">
                  RECENT TRANSMISSIONS ON X
                </div>
                {socialPosts.map(post => (
                  <div key={post.id} className="bg-[#0e1926] border border-[#1e344a] p-3 rounded text-left">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-silk text-[10px] text-white font-bold">{post.author}</span>
                      <span className="font-mono text-[8px] text-gray-400">{post.time}</span>
                    </div>
                    <p className="font-mono text-xs text-gray-300 leading-relaxed">{post.text}</p>
                  </div>
                ))}
              </div>

              {/* Direct Message Form */}
              <div className="bg-[#0e1926] border border-[#1e344a] p-4 rounded-lg flex flex-col justify-between">
                <div>
                  <div className="font-silk text-[10px] text-[#f5a742] uppercase tracking-widest mb-3">
                    SEND DIRECT TRANSMISSION
                  </div>
                  {connectSent ? (
                    <div className="p-3 bg-green-900/30 border border-green-500/50 rounded text-center text-xs font-mono text-green-300">
                      ✓ MESSAGE TRANSMITTED DIRECTLY TO SHRI SANJAYKUMAR!
                    </div>
                  ) : (
                    <form onSubmit={handleConnectSubmit} className="space-y-2.5">
                      <input
                        type="text"
                        required
                        placeholder="YOUR NAME / AGENT ID"
                        value={connectForm.name}
                        onChange={e => setConnectForm({ ...connectForm, name: e.target.value })}
                        className="w-full bg-[#122132] border border-[#233e59] rounded px-3 py-1.5 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                      />
                      <input
                        type="email"
                        required
                        placeholder="YOUR EMAIL"
                        value={connectForm.email}
                        onChange={e => setConnectForm({ ...connectForm, email: e.target.value })}
                        className="w-full bg-[#122132] border border-[#233e59] rounded px-3 py-1.5 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                      />
                      <textarea
                        rows={3}
                        required
                        placeholder="MESSAGE / OPPORTUNITY"
                        value={connectForm.message}
                        onChange={e => setConnectForm({ ...connectForm, message: e.target.value })}
                        className="w-full bg-[#122132] border border-[#233e59] rounded px-3 py-1.5 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 resize-none"
                      />
                      <button
                        type="submit"
                        className="btn-arcade-yellow w-full py-2 text-xs font-bold rounded uppercase cursor-pointer"
                      >
                        TRANSMIT SIGNAL ⚡
                      </button>
                    </form>
                  )}
                </div>

                <div className="pt-4 border-t border-[#182b3d] flex justify-between gap-2 mt-4 text-[10px] font-silk">
                  <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-white">GITHUB ↗</a>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-white">LINKEDIN ↗</a>
                  <a href={`mailto:${profile.email}`} className="text-[#f5a742] hover:text-white">EMAIL ✉</a>
                </div>
              </div>
            </div>
          )}

          {/* ── 7. HELP & GUIDE ────────────────────────────────────── */}
          {currentTab === 'help' && (
            <div className="max-w-2xl mx-auto space-y-4 text-center">
              <div className="text-sm font-silk text-[#f5a742] tracking-wider uppercase mb-3">
                SANJAYKUMAR TRACKER CONTROLS
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                <div className="bg-[#0e1926] border border-[#1e344a] p-3 rounded">
                  <div className="font-silk text-xs text-white mb-1">🗺 MAP NAVIGATION</div>
                  <div className="font-mono text-[10px] text-gray-300 leading-relaxed">
                    Click and drag map to explore global engineering sightings. Click markers to inspect project dossiers.
                  </div>
                </div>
                <div className="bg-[#0e1926] border border-[#1e344a] p-3 rounded">
                  <div className="font-silk text-xs text-white mb-1">🕷 SPIDER-SENSE &amp; SOUND</div>
                  <div className="font-mono text-[10px] text-gray-300 leading-relaxed">
                    Click anywhere on the screen for realistic web-shooting audio &amp; particle effects. Press ESC to close any open overlay.
                  </div>
                </div>
                <div className="bg-[#0e1926] border border-[#1e344a] p-3 rounded">
                  <div className="font-silk text-xs text-white mb-1">🟢 / 🔴 FILTER TABS</div>
                  <div className="font-mono text-[10px] text-gray-300 leading-relaxed">
                    Toggle left tabs to filter Confirmed Projects vs Research Labs on the global radar.
                  </div>
                </div>
                <div className="bg-[#0e1926] border border-[#1e344a] p-3 rounded">
                  <div className="font-silk text-xs text-white mb-1">📄 RESUME DOSSIER</div>
                  <div className="font-mono text-[10px] text-gray-300 leading-relaxed">
                    Click WATCH RESUME / DOSSIER at the bottom left to download Shri Sanjaykumar V's resume.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
