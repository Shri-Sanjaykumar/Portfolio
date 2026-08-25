import React, { useState, useEffect, useCallback } from 'react';
import { profile } from '../data/portfolioData';
import MapViewport from './MapViewport';
import IntroScreen from './IntroScreen';
import NavigationOverlay from './NavigationOverlay';
import ActivityLogOverlay from './ActivityLogOverlay';
import EngineeringWatchOverlay from './EngineeringWatchOverlay';
import ConnectDrawer from './ConnectDrawer';
import ProjectDossierModal from './ProjectDossierModal';
import SkillsArchitectureOverlay from './SkillsArchitectureOverlay';
import LeadershipEducationOverlay from './LeadershipEducationOverlay';
import HelpOverlay from './HelpOverlay';
import WebClickEffect from './WebClickEffect';
import { setSoundEnabled, soundEffects } from '../utils/audio';

/* ============================================================
   PIXEL SPIDER-MAN MASCOT (bottom-left clinging figure)
   ============================================================ */
function PixelMascot() {
  return (
    <svg viewBox="0 0 32 48" width="40" height="56" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="10" y="0" width="12" height="10" fill="#dc2626"/>
      <rect x="8" y="2" width="2" height="8" fill="#dc2626"/>
      <rect x="22" y="2" width="2" height="8" fill="#dc2626"/>
      <rect x="11" y="3" width="4" height="4" fill="#fff" rx="1"/>
      <rect x="17" y="3" width="4" height="4" fill="#fff" rx="1"/>
      <rect x="12" y="4" width="2" height="2" fill="#1e40af"/>
      <rect x="18" y="4" width="2" height="2" fill="#1e40af"/>
      <rect x="9" y="10" width="14" height="14" fill="#dc2626"/>
      <rect x="7" y="12" width="2" height="10" fill="#dc2626"/>
      <rect x="23" y="12" width="2" height="10" fill="#dc2626"/>
      <rect x="11" y="16" width="10" height="2" fill="#7f1d1d" opacity="0.5"/>
      <rect x="11" y="24" width="4" height="14" fill="#1e40af"/>
      <rect x="17" y="24" width="4" height="14" fill="#1e40af"/>
      <rect x="9" y="35" width="2" height="5" fill="#1e40af"/>
      <rect x="21" y="35" width="2" height="5" fill="#1e40af"/>
    </svg>
  );
}

/* ============================================================
   PIXEL SPIDER MASK (top branding)
   ============================================================ */
function PixelSpiderMask() {
  return (
    <svg viewBox="0 0 24 20" width="20" height="16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="12" cy="10" rx="10" ry="8" fill="#dc2626"/>
      <ellipse cx="8" cy="9" rx="4" ry="3.5" fill="#fff"/>
      <ellipse cx="16" cy="9" rx="4" ry="3.5" fill="#fff"/>
      <ellipse cx="8" cy="9" rx="2.5" ry="2" fill="#1e40af"/>
      <ellipse cx="16" cy="9" rx="2.5" ry="2" fill="#1e40af"/>
      <line x1="12" y1="2" x2="12" y2="18" stroke="#7f1d1d" strokeWidth="0.5" opacity="0.3"/>
      <line x1="2" y1="10" x2="22" y2="10" stroke="#7f1d1d" strokeWidth="0.5" opacity="0.3"/>
    </svg>
  );
}

/* ============================================================
   SPEAKER ICON
   ============================================================ */
function SpeakerIcon({ isOn }) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M2 5h3l4-3v12l-4-3H2z" fill="currentColor"/>
      {isOn ? (
        <>
          <path d="M11 5.5A3 3 0 0 1 11 10.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <path d="M13 3.5A5.5 5.5 0 0 1 13 12.5" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        </>
      ) : (
        <>
          <line x1="11" y1="5" x2="15" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="15" y1="5" x2="11" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </>
      )}
    </svg>
  );
}

/* ============================================================
   STATUS TOAST
   ============================================================ */
function StatusToast({ message }) {
  if (!message) return null;
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none animate-float-up">
      <div className="bg-black/90 border-2 border-cyan-400 px-4 py-2 rounded-lg font-silk text-xs text-cyan-300 tracking-wider whitespace-nowrap shadow-[0_0_20px_rgba(0,229,255,0.4)]">
        {message}
      </div>
    </div>
  );
}

/* ============================================================
   MAIN TRACKER FRAME
   ============================================================ */
export default function TrackerFrame() {
  // Always show intro on first load; respect sessionStorage to skip on HMR
  const [showIntro, setShowIntro] = useState(() => {
    try {
      return sessionStorage.getItem('tracker_intro_seen') !== 'yes';
    } catch { return true; }
  });
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [confirmedActive, setConfirmedActive] = useState(true);
  const [rumoredActive, setRumoredActive] = useState(true);
  const [activeOverlay, setActiveOverlay] = useState(null);
  const [selectedDossierNode, setSelectedDossierNode] = useState(null);
  const [statusToast, setStatusToast] = useState(null);
  const [toastKey, setToastKey] = useState(0);

  // Handle keyboard ESC to close any overlay
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        if (selectedDossierNode) setSelectedDossierNode(null);
        else if (activeOverlay) {
          soundEffects.close();
          setActiveOverlay(null);
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeOverlay, selectedDossierNode]);

  const triggerToast = useCallback((msg) => {
    setStatusToast(msg);
    setToastKey((k) => k + 1);
    setTimeout(() => setStatusToast(null), 2500);
  }, []);

  const handleStartTracker = useCallback((enableSound) => {
    setIsSoundOn(enableSound);
    setSoundEnabled(enableSound);
    setShowIntro(false);
    try { sessionStorage.setItem('tracker_intro_seen', 'yes'); } catch {}
    setTimeout(() => triggerToast(enableSound ? '🔊 AUDIO ENGINE: ONLINE' : '🔇 AUDIO ENGINE: MUTED'), 400);
  }, [triggerToast]);

  const handleToggleSound = useCallback(() => {
    const next = !isSoundOn;
    setIsSoundOn(next);
    setSoundEnabled(next);
    if (next) soundEffects.select();
  }, [isSoundOn]);

  const handleToggleConfirmed = useCallback(() => {
    soundEffects.toggle();
    setConfirmedActive((v) => {
      triggerToast(`CONFIRMED PROJECTS: ${!v ? 'ON' : 'OFF'}`);
      return !v;
    });
  }, [triggerToast]);

  const handleToggleRumored = useCallback(() => {
    soundEffects.toggle();
    setRumoredActive((v) => {
      triggerToast(`RESEARCH LABS: ${!v ? 'ON' : 'OFF'}`);
      return !v;
    });
  }, [triggerToast]);

  const openOverlay = useCallback((id) => {
    soundEffects.open();
    setActiveOverlay(id);
  }, []);

  const closeOverlay = useCallback(() => {
    soundEffects.close();
    setActiveOverlay(null);
  }, []);

  const handleSelectView = useCallback((viewId) => {
    const map = {
      tracker: null,
      activity: 'activity',
      projects: 'activity',
      experience: 'activity',
      watch: 'watch',
      skills: 'skills',
      leadership: 'leadership',
      education: 'education',
      connect: 'connect',
      help: 'help',
    };
    const target = map[viewId];
    if (target === null) { closeOverlay(); }
    else { soundEffects.open(); setActiveOverlay(target); }
  }, [closeOverlay]);

  // Ticker content
  const tickerItems = [
    'SHARE YOUR ENGINEERING SIGHTINGS ON X',
    '■ SIGHTING BY @SHRI_SANJAYKUMAR',
    'M.TECH INTEGRATED SE @ VIT (CGPA: 9.12 / 10.0)',
    '■ GRADUATION 2028',
    'CAMPUSLLM: UNIVERSITY RAG ASSISTANT ACHIEVED ~3S AVERAGE LATENCY',
    '■ TFORCE INDIA ACADEMIC INTERN: ENTERPRISE GEN AI & SAP BTP',
    'LEGITIFY: DEVSECOPS & REPO COMPLIANCE AUDITOR',
    '■ SOLAR ML: 7-DAY ENERGY PREDICTION SYSTEM',
    'FINTRACK: GRAPH-BASED DEBT SETTLEMENT PLATFORM',
    '■ MULTI-CLOUD AWS EC2 + AZURE VM SYSTEM ARCHITECTURE',
    'SPONSORSHIP LEAD: INR 60+ LAKHS ACROSS RIVIERA & GRAVITAS',
    '■ VIT HEALTH CLUB VICE CHAIRPERSON — 200+ PARTICIPANTS',
  ];

  const isAnyOverlayOpen = !!activeOverlay || !!selectedDossierNode;

  return (
    <div
      className="h-screen w-full bg-[#0a121d] flex flex-col p-2 sm:p-3 font-sans text-white select-none overflow-hidden relative"
      aria-label="Sanjaykumar Tracker Portfolio"
    >
      {/* Global Web Click Effect */}
      <WebClickEffect />

      {/* ============================================================
          RETRO MONITOR FRAME — SLATE BLUE
          ============================================================ */}
      <div
        className="relative w-full max-w-[1600px] mx-auto flex-1 min-h-0 rounded-2xl md:rounded-3xl border-4 md:border-[6px] border-black flex flex-col"
        style={{
          background: '#5695bc',
          boxShadow: '0 20px 50px rgba(0,0,0,0.85), inset 2px 2px 0 rgba(255,255,255,0.4), inset -2px -2px 0 rgba(0,0,0,0.4)',
          padding: '10px 10px 40px 10px',
        }}
      >
        {/* ============================================================
            TOP CHROME BAR
            ============================================================ */}
        {/* Top-Left Menu Button (hamburger lines style from reference) */}
        <button
          onClick={() => { soundEffects.open(); setActiveOverlay(activeOverlay === 'nav' ? null : 'nav'); }}
          aria-label="Open navigation menu"
          aria-expanded={activeOverlay === 'nav'}
          className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full border-[3px] border-[#e8a838] bg-[#1a2634] hover:bg-[#25374a] flex items-center justify-center cursor-pointer transition-transform active:scale-95"
          style={{ boxShadow: '0 4px 0 #000, inset 1px 1px 0 rgba(255,255,255,0.2)' }}
          title="Navigation Menu"
        >
          {activeOverlay === 'nav' ? (
            /* Minus/close icon when open */
            <div className="flex flex-col gap-[5px]">
              <div className="w-5 h-[2.5px] bg-[#e8a838] transform rotate-45 translate-y-[7.5px]" />
              <div className="w-5 h-[2.5px] bg-[#e8a838] transform -rotate-45" />
            </div>
          ) : (
            /* Hamburger lines */
            <div className="flex flex-col gap-[5px]">
              <div className="w-5 h-[2.5px] bg-[#e8a838]" />
              <div className="w-5 h-[2.5px] bg-[#e8a838]" />
              <div className="w-5 h-[2.5px] bg-[#e8a838]" />
            </div>
          )}
        </button>

        {/* Top-Center Title Badge */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
          <div
            className="flex items-center gap-2 px-4 sm:px-7 py-1.5 sm:py-2 rounded-full border-2 sm:border-[3px] border-black font-silk"
            style={{
              background: '#162433',
              boxShadow: '0 4px 0 #000, inset 1px 1px 0 rgba(255,255,255,0.2)',
            }}
          >
            <span className="text-[10px] sm:text-xs md:text-sm font-bold text-white tracking-widest uppercase">
              SANJAYKUMAR
            </span>
            <PixelSpiderMask />
            <span className="text-[10px] sm:text-xs md:text-sm font-bold text-cyan-300 tracking-widest uppercase">
              TRACKER
            </span>
          </div>
        </div>

        {/* Top-Right Connect Button */}
        <button
          onClick={() => { soundEffects.open(); setActiveOverlay(activeOverlay === 'connect' ? null : 'connect'); }}
          aria-label="Open message center"
          className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-xl border-2 sm:border-[3px] border-black bg-white hover:bg-gray-100 flex items-center justify-center cursor-pointer transition-transform active:scale-95"
          style={{ boxShadow: '0 4px 0 #000' }}
          title="Message Center / Connect"
        >
          {/* Spider icon */}
          <svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="5" fill="#dc2626"/>
            <ellipse cx="9" cy="10.5" rx="2.5" ry="2" fill="white"/>
            <ellipse cx="15" cy="10.5" rx="2.5" ry="2" fill="white"/>
            <ellipse cx="9" cy="10.5" rx="1.5" ry="1.2" fill="#1e3a8a"/>
            <ellipse cx="15" cy="10.5" rx="1.5" ry="1.2" fill="#1e3a8a"/>
            <line x1="4" y1="8" x2="9" y2="11" stroke="#1e1e1e" strokeWidth="1.2"/>
            <line x1="4" y1="16" x2="9" y2="13" stroke="#1e1e1e" strokeWidth="1.2"/>
            <line x1="20" y1="8" x2="15" y2="11" stroke="#1e1e1e" strokeWidth="1.2"/>
            <line x1="20" y1="16" x2="15" y2="13" stroke="#1e1e1e" strokeWidth="1.2"/>
          </svg>
        </button>

        {/* Left Side Filter Tabs */}
        <div className="absolute left-0 z-30 flex flex-col gap-2" style={{ top: '72px' }}>
          <button
            onClick={handleToggleConfirmed}
            title={`${confirmedActive ? 'Hide' : 'Show'} Confirmed Projects`}
            aria-pressed={confirmedActive}
            className="w-8 sm:w-10 h-8 sm:h-10 rounded-r-lg border-2 border-black flex items-center justify-center cursor-pointer transition-all"
            style={{
              background: confirmedActive ? '#79a86b' : '#3b5236',
              opacity: confirmedActive ? 1 : 0.65,
              transform: confirmedActive ? 'translateX(0)' : 'translateX(-3px)',
              boxShadow: '2px 2px 0 #000',
            }}
          >
            <svg viewBox="0 0 16 16" width="14" height="14" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="6" fill="#fff" opacity="0.9"/>
              <path d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2zm0 1a5 5 0 1 1 0 10A5 5 0 0 1 8 3z" fill="#000" opacity="0.3"/>
              <line x1="4" y1="8" x2="8" y2="3" stroke="#000" strokeWidth="0.8" opacity="0.6"/>
              <line x1="12" y1="8" x2="8" y2="3" stroke="#000" strokeWidth="0.8" opacity="0.6"/>
              <line x1="8" y1="13" x2="4" y2="8" stroke="#000" strokeWidth="0.8" opacity="0.6"/>
              <line x1="8" y1="13" x2="12" y2="8" stroke="#000" strokeWidth="0.8" opacity="0.6"/>
              <circle cx="8" cy="8" r="1.5" fill="#000" opacity="0.7"/>
            </svg>
          </button>

          <button
            onClick={handleToggleRumored}
            title={`${rumoredActive ? 'Hide' : 'Show'} Research Labs`}
            aria-pressed={rumoredActive}
            className="w-8 sm:w-10 h-8 sm:h-10 rounded-r-lg border-2 border-black flex items-center justify-center cursor-pointer transition-all"
            style={{
              background: rumoredActive ? '#e6e6e6' : '#6b6b6b',
              opacity: rumoredActive ? 1 : 0.65,
              transform: rumoredActive ? 'translateX(0)' : 'translateX(-3px)',
              boxShadow: '2px 2px 0 #000',
            }}
          >
            <svg viewBox="0 0 16 16" width="14" height="14" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="6" fill="#dc2626" opacity="0.9"/>
              <path d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2zm0 1a5 5 0 1 1 0 10A5 5 0 0 1 8 3z" fill="#000" opacity="0.3"/>
              <line x1="4" y1="8" x2="8" y2="3" stroke="#000" strokeWidth="0.8" opacity="0.6"/>
              <line x1="12" y1="8" x2="8" y2="3" stroke="#000" strokeWidth="0.8" opacity="0.6"/>
              <circle cx="8" cy="8" r="1.5" fill="#000" opacity="0.7"/>
            </svg>
          </button>
        </div>

        {/* ============================================================
            INNER VIEWPORT SCREEN (MAP AREA)
            ============================================================ */}
        <div
          className="relative w-full flex-1 min-h-0 overflow-hidden border-2 sm:border-[3px] border-black"
          style={{
            borderRadius: '10px',
            marginTop: '44px',
            marginBottom: '34px',
            background: '#0a111a',
            boxShadow: 'inset 0 4px 16px rgba(0,0,0,0.95)',
          }}
        >
          {/* Map */}
          <MapViewport
            confirmedActive={confirmedActive}
            rumoredActive={rumoredActive}
            onSelectNode={(node) => setSelectedDossierNode(node)}
            statusToast={statusToast}
            onTriggerToast={triggerToast}
            onOpenActivityLog={() => openOverlay('activity')}
            isIntroActive={showIntro}
          />

          {/* Toast notification */}
          {statusToast && <StatusToast key={toastKey} message={statusToast} />}

          {/* ============================================================
              OVERLAYS (all inside the viewport)
              ============================================================ */}

          {/* Intro */}
          {showIntro && <IntroScreen onStart={handleStartTracker} />}

          {/* Navigation */}
          <NavigationOverlay
            isOpen={activeOverlay === 'nav'}
            onClose={closeOverlay}
            activeView="tracker"
            onSelectView={handleSelectView}
          />

          {/* Activity Log */}
          <ActivityLogOverlay
            isOpen={activeOverlay === 'activity'}
            onClose={closeOverlay}
            onSelectNode={(node) => { setSelectedDossierNode(node); closeOverlay(); }}
            onSelectTab={handleSelectView}
          />

          {/* Web Watch / Projects */}
          <EngineeringWatchOverlay
            isOpen={activeOverlay === 'watch'}
            onClose={closeOverlay}
            onSelectNode={(node) => { setSelectedDossierNode(node); closeOverlay(); }}
          />

          {/* Connect Drawer */}
          <ConnectDrawer
            isOpen={activeOverlay === 'connect'}
            onClose={closeOverlay}
          />

          {/* Skills */}
          <SkillsArchitectureOverlay
            isOpen={activeOverlay === 'skills'}
            onClose={closeOverlay}
          />

          {/* Leadership & Education */}
          <LeadershipEducationOverlay
            isOpen={activeOverlay === 'leadership' || activeOverlay === 'education'}
            initialTab={activeOverlay === 'education' ? 'education' : 'leadership'}
            onClose={closeOverlay}
          />

          {/* Help */}
          <HelpOverlay
            isOpen={activeOverlay === 'help'}
            onClose={closeOverlay}
          />

          {/* Project Dossier */}
          {selectedDossierNode && (
            <ProjectDossierModal
              node={selectedDossierNode}
              onClose={() => setSelectedDossierNode(null)}
            />
          )}

          {/* Coordinate ruler TOP */}
          <div
            className="absolute top-0 left-0 right-0 h-4 z-10 pointer-events-none flex items-center justify-between px-8"
            style={{ background: 'rgba(10,17,26,0.85)' }}
          >
            {['180°W','120°W','60°W','0°','60°E','120°E','180°E'].map((c) => (
              <span key={c} className="text-[7px] font-mono text-[#3d6b8a]">{c}</span>
            ))}
          </div>

          {/* Coordinate ruler LEFT */}
          <div
            className="absolute top-4 left-0 bottom-0 w-4 z-10 pointer-events-none flex flex-col items-center justify-between py-4"
            style={{ background: 'rgba(10,17,26,0.85)' }}
          >
            {['80°N','40°N','0°','40°S','80°S'].map((c) => (
              <span key={c} className="text-[6px] font-mono text-[#3d6b8a] -rotate-90">{c}</span>
            ))}
          </div>

          {/* Radar widget (bottom-right, matching reference) */}
          <div className="absolute bottom-3 right-3 z-20 pointer-events-none">
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#1e3d5a] relative overflow-hidden"
              style={{ background: 'rgba(10,17,26,0.9)' }}
            >
              {/* Web lines */}
              {[30,60,90,120,150].map((angle, i) => (
                <div
                  key={i}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ transform: `rotate(${angle}deg)` }}
                >
                  <div className="w-full h-[1px] bg-[#1e4d6b] opacity-60" />
                </div>
              ))}
              {/* Concentric rings */}
              {[28,20,12].map((size) => (
                <div
                  key={size}
                  className="absolute rounded-full border border-[#1e4d6b] opacity-50"
                  style={{
                    width: `${size * 4}px`, height: `${size * 4}px`,
                    top: '50%', left: '50%',
                    transform: 'translate(-50%,-50%)',
                  }}
                />
              ))}
              {/* Sweep line */}
              <div className="absolute inset-0 flex items-center justify-center animate-radar-sweep">
                <div
                  className="w-1/2 h-[1.5px] origin-right"
                  style={{
                    background: 'linear-gradient(to left, #00ff88, transparent)',
                    right: '50%',
                    position: 'absolute',
                  }}
                />
              </div>
              {/* Center dot */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_6px_#00ff88]" />
              </div>
            </div>
            {/* Globe icon */}
            <div className="flex justify-center mt-1">
              <svg viewBox="0 0 16 16" width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="6" fill="none" stroke="#3d6b8a" strokeWidth="1.2"/>
                <ellipse cx="8" cy="8" rx="3" ry="6" fill="none" stroke="#3d6b8a" strokeWidth="1"/>
                <line x1="2" y1="8" x2="14" y2="8" stroke="#3d6b8a" strokeWidth="1"/>
              </svg>
            </div>
          </div>
        </div>

        {/* ============================================================
            BOTTOM-LEFT PIXEL MASCOT (clinging to frame corner)
            ============================================================ */}
        <div
          className="absolute -bottom-1 -left-1 z-40 cursor-pointer animate-mascot"
          onClick={() => openOverlay('activity')}
          title="Click for Activity Log"
        >
          <PixelMascot />
        </div>

        {/* ============================================================
            BOTTOM TICKER BAR + SOUND BUTTON
            ============================================================ */}
        <div
          className="absolute left-10 right-2 z-30 flex items-center gap-2"
          style={{ bottom: '8px' }}
        >
          {/* Scrolling LED Ticker */}
          <div
            className="flex-1 h-7 sm:h-8 rounded-full overflow-hidden flex items-center px-4 relative"
            style={{
              background: '#152332',
              border: '2.5px solid #000',
              boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.9), 0 2px 0 rgba(255,255,255,0.15)',
            }}
          >
            <div className="animate-marquee whitespace-nowrap text-[8px] sm:text-[10px] font-silk text-[#9ae6ff] tracking-widest flex gap-8">
              {[...tickerItems, ...tickerItems].map((item, i) => (
                <span key={i}>■ {item}</span>
              ))}
            </div>
          </div>
          {/* Green Sound Toggle Button */}
          <button
            onClick={handleToggleSound}
            title={isSoundOn ? 'Mute audio' : 'Enable 8-bit audio'}
            className="w-7 sm:w-8 h-7 sm:h-8 flex-shrink-0 rounded-lg flex items-center justify-center cursor-pointer btn-arcade-green"
            aria-pressed={isSoundOn}
          >
            <SpeakerIcon isOn={isSoundOn} />
          </button>
        </div>
      </div>

      {/* ============================================================
          FOOTER ACTION BAR — Below Monitor
          ============================================================ */}
      <div className="w-full max-w-[1600px] mx-auto mt-1.5 flex items-center justify-between gap-2 px-1">

        {/* Left: Resume / Dossier */}
        <a
          href="/Shri_Sanjaykumar_V_Resume.pdf"
          download="Shri_Sanjaykumar_V_Resume.pdf"
          onClick={() => soundEffects.click()}
          className="btn-arcade-yellow px-3 sm:px-5 py-2 text-[10px] sm:text-xs font-bold tracking-wider uppercase rounded-lg cursor-pointer flex-shrink-0 flex items-center gap-1.5"
          aria-label="Download Resume / Dossier"
        >
          <span>📄</span>
          <span className="hidden sm:inline">WATCH RESUME /</span> DOSSIER
        </a>

        {/* Center: Identity + Links */}
        <div className="flex flex-col items-center text-center flex-1 min-w-0 px-2">
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <h1
              className="text-sm sm:text-lg md:text-xl font-silk font-bold tracking-tight uppercase"
              style={{
                background: 'linear-gradient(180deg, #e52d27 0%, #ff6b6b 50%, #b31217 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              SHRI SANJAYKUMAR V
            </h1>
            <span className="text-gray-500 hidden sm:inline">|</span>
            <span className="text-[10px] font-silk text-gray-400 hidden md:inline">
              M.TECH SE @ VIT (CGPA: 9.12)
            </span>
          </div>
          {/* Nav links */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 mt-0.5 text-[9px] sm:text-[10px] font-silk text-[#6da0c7]">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">GITHUB</a>
            <span>·</span>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">LINKEDIN</a>
            <span>·</span>
            <a href={`mailto:${profile.email}`} className="hover:text-white transition-colors cursor-pointer">EMAIL</a>
            <span>·</span>
            <button onClick={() => openOverlay('activity')} className="hover:text-white transition-colors cursor-pointer">ACTIVITY LOG</button>
            <span>·</span>
            <button onClick={() => { try { sessionStorage.removeItem('tracker_intro_seen'); } catch {} setShowIntro(true); }} className="hover:text-white transition-colors cursor-pointer">CREDITS ▲</button>
          </div>
        </div>

        {/* Right: Get Connected */}
        <button
          onClick={() => openOverlay('connect')}
          className="btn-arcade-yellow px-3 sm:px-5 py-2 text-[10px] sm:text-xs font-bold tracking-wider uppercase rounded-lg cursor-pointer flex-shrink-0 flex items-center gap-1.5"
          aria-label="Open Message Center"
        >
          <span>📡</span>
          <span className="hidden sm:inline">GET CONNECTED /</span> TICKETS
        </button>
      </div>
    </div>
  );
}
