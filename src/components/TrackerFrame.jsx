import React, { useState, useEffect, useCallback, useRef } from 'react';
import { profile, trackerNodes } from '../data/portfolioData';
import MapViewport from './MapViewport';
import IntroScreen from './IntroScreen';
import WebClickEffect from './WebClickEffect';
import { setSoundEnabled, soundEffects } from '../utils/audio';

// ─── Overlays ────────────────────────────────────────────────────────────────
import NavigationOverlay from './NavigationOverlay';
import ActivityLogOverlay from './ActivityLogOverlay';
import ProjectsOverlay from './ProjectsOverlay';
import SkillsArchitectureOverlay from './SkillsArchitectureOverlay';
import ExperienceOverlay from './ExperienceOverlay';
import ConnectDrawer from './ConnectDrawer';
import AboutMeOverlay from './AboutMeOverlay';
import ProjectDossierModal from './ProjectDossierModal';
import HelpOverlay from './HelpOverlay';

// ─── Pixel Spider icon (spideytracker.net filter buttons) ────────────────────
function PixelSpiderIcon({ color = 'green', size = 22 }) {
  const fill = color === 'green' ? '#79a86b' : color === 'red' ? '#cc3333' : '#e6e6e6';
  const bg   = color === 'green' ? '#2d5c30' : color === 'red' ? '#5c1a1a' : '#3a3a3a';
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill={bg} stroke="#000" strokeWidth="1.5"/>
      <ellipse cx="12" cy="13" rx="3.5" ry="4.5" fill={fill}/>
      <circle cx="12" cy="8.5" r="2.5" fill={fill}/>
      <line x1="8.5" y1="11" x2="4" y2="9" stroke={fill} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="8.5" y1="13" x2="3.5" y2="13" stroke={fill} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="8.5" y1="15" x2="4" y2="17" stroke={fill} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="15.5" y1="11" x2="20" y2="9" stroke={fill} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="15.5" y1="13" x2="20.5" y2="13" stroke={fill} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="15.5" y1="15" x2="20" y2="17" stroke={fill} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

// ─── Spidey mask eyes (top-center badge) ─────────────────────────────────────
function SpideyEyesMask() {
  return (
    <svg viewBox="0 0 32 20" width="28" height="18" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="9" cy="10" rx="7" ry="8" fill="#dc2626" stroke="#000" strokeWidth="1"/>
      <ellipse cx="23" cy="10" rx="7" ry="8" fill="#dc2626" stroke="#000" strokeWidth="1"/>
      <ellipse cx="9" cy="10" rx="4.5" ry="5.5" fill="white"/>
      <ellipse cx="23" cy="10" rx="4.5" ry="5.5" fill="white"/>
      <ellipse cx="9" cy="10" rx="2.5" ry="3" fill="#1e40af"/>
      <ellipse cx="23" cy="10" rx="2.5" ry="3" fill="#1e40af"/>
    </svg>
  );
}

// ─── Pixel mascot (bottom-left, walking Spider-Man) ──────────────────────────
function PixelMascot({ frame = 0 }) {
  return (
    <svg viewBox="0 0 32 48" width="36" height="54" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="10" y="1" width="12" height="10" rx="2" fill="#dc2626"/>
      <rect x="8"  y="3" width="2"  height="7"  fill="#dc2626"/>
      <rect x="22" y="3" width="2"  height="7"  fill="#dc2626"/>
      <rect x="11" y="3" width="4"  height="4"  rx="1" fill="white"/>
      <rect x="17" y="3" width="4"  height="4"  rx="1" fill="white"/>
      <rect x="12" y="4" width="2"  height="2"  fill="#1e40af"/>
      <rect x="18" y="4" width="2"  height="2"  fill="#1e40af"/>
      <rect x="9"  y="11" width="14" height="13" fill="#dc2626"/>
      <rect x="7"  y="13" width="2"  height="8"  fill="#dc2626"/>
      <rect x="23" y="13" width="2"  height="8"  fill="#dc2626"/>
      <rect x="13" y="15" width="6"  height="1"  fill="white" opacity="0.9"/>
      <rect x="15" y="13" width="2"  height="5"  fill="white" opacity="0.9"/>
      <rect x="11" y="24" width="4"  height="13" fill="#1e3a8a"/>
      <rect x="17" y="24" width="4"  height="13" fill="#1e3a8a"/>
      <rect x={frame === 0 ? 9  : 10} y="34" width="2"  height="5" fill="#1e3a8a"/>
      <rect x={frame === 0 ? 21 : 20} y="34" width="2"  height="5" fill="#1e3a8a"/>
      <rect x={frame === 0 ? 7  : 8}  y="38" width="4"  height="2" fill="#dc2626"/>
      <rect x={frame === 0 ? 21 : 20} y="38" width="4"  height="2" fill="#dc2626"/>
    </svg>
  );
}

// ─── Speaker icon ─────────────────────────────────────────────────────────────
function SpeakerIcon({ isOn }) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" xmlns="http://www.w3.org/2000/svg">
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

// ─── Radar widget ─────────────────────────────────────────────────────────────
function RadarWidget() {
  return (
    <div className="absolute bottom-3 right-3 z-20 pointer-events-none flex flex-col items-center gap-1">
      <div
        className="relative overflow-hidden"
        style={{
          width: 70, height: 70,
          borderRadius: '50%',
          background: 'rgba(8,15,25,0.95)',
          border: '2px solid #1e3d5a',
          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.8)',
        }}
      >
        {[0,30,60,90,120,150].map(a => (
          <div key={a} className="absolute inset-0 flex items-center justify-center" style={{ transform: `rotate(${a}deg)` }}>
            <div className="w-full h-px" style={{ background: 'rgba(30,61,90,0.7)' }}/>
          </div>
        ))}
        {[50,34,18].map(p => (
          <div key={p} className="absolute rounded-full border" style={{
            width:`${p}px`,height:`${p}px`,
            top:'50%',left:'50%',
            transform:'translate(-50%,-50%)',
            borderColor:'rgba(30,61,90,0.7)',
          }}/>
        ))}
        <div className="absolute inset-0 flex items-center justify-center animate-radar-sweep">
          <div className="absolute right-1/2 w-[35%] h-0.5 origin-right"
            style={{
              background:'linear-gradient(to right,transparent,rgba(0,255,136,0.8))',
              transformOrigin:'100% 50%',
            }}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background:'#00ff88', boxShadow:'0 0 5px #00ff88' }}/>
        </div>
      </div>
      <svg viewBox="0 0 20 20" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="8" fill="none" stroke="#1e4d6b" strokeWidth="1.2"/>
        <ellipse cx="10" cy="10" rx="4" ry="8" fill="none" stroke="#1e4d6b" strokeWidth="1"/>
        <line x1="2" y1="10" x2="18" y2="10" stroke="#1e4d6b" strokeWidth="1"/>
      </svg>
    </div>
  );
}

// ─── Ruler ticks (top) ────────────────────────────────────────────────────────
function RulerTop() {
  return (
    <div className="absolute top-0 left-14 right-0 h-4 z-10 pointer-events-none flex items-end pb-0.5 px-2 gap-[7px]"
      style={{ background: 'rgba(8,15,24,0.8)' }}
    >
      {Array.from({ length: 48 }).map((_, i) => (
        <div key={i} className="flex-shrink-0"
          style={{ width:2, height: i % 4 === 0 ? 8 : i % 2 === 0 ? 5 : 3, background:'#1e3d5a' }}
        />
      ))}
    </div>
  );
}

// ─── Ruler ticks (left) ──────────────────────────────────────────────────────
function RulerLeft() {
  return (
    <div className="absolute top-14 left-0 bottom-0 w-[14px] z-10 pointer-events-none flex flex-col items-end pr-0.5 gap-[7px]"
      style={{ background: 'rgba(8,15,24,0.8)' }}
    >
      {Array.from({ length: 34 }).map((_, i) => (
        <div key={i} className="flex-shrink-0"
          style={{ height:2, width: i % 4 === 0 ? 8 : i % 2 === 0 ? 5 : 3, background:'#1e3d5a' }}
        />
      ))}
    </div>
  );
}

// ─── Toast notification ──────────────────────────────────────────────────────
function Toast({ message, id }) {
  return (
    <div key={id} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none animate-float-up">
      <div className="bg-black/90 border-2 border-cyan-400 px-5 py-2 rounded-lg font-silk text-xs text-cyan-300 tracking-wider whitespace-nowrap"
        style={{ boxShadow: '0 0 20px rgba(0,229,255,0.35)' }}
      >
        {message}
      </div>
    </div>
  );
}

// ─── TICKER items ─────────────────────────────────────────────────────────────
const TICKER = [
  'SHARE YOUR ENGINEERING SIGHTINGS ON X',
  '■ SIGHTING BY @SHRI_SANJAYKUMAR  M.TECH INTEGRATED SE @ VIT (CGPA: 9.12 / 10.0)',
  '■ GRADUATION: 2028',
  '■ CAMPUSLLM: UNIVERSITY RAG ASSISTANT — ~3S AVERAGE LATENCY',
  '■ TFORCE INDIA ACADEMIC INTERN: ENTERPRISE GEN AI & SAP BTP',
  '■ LEGITIFY: DEVSECOPS & REPO COMPLIANCE AUDITOR',
  '■ SOLAR ML: NASA POWER API — 7-DAY ENERGY PREDICTION',
  '■ FINTRACK: GRAPH-BASED DEBT SETTLEMENT PLATFORM',
  '■ MULTI-CLOUD AWS EC2 + AZURE VM SYSTEM ARCHITECTURE',
  '■ SPONSORSHIP LEAD: INR 60+ LAKHS — RIVIERA & GRAVITAS 2025-26',
  '■ VIT HEALTH CLUB VICE CHAIRPERSON — 200+ PARTICIPANTS',
];

// ─── MAIN TRACKER FRAME ───────────────────────────────────────────────────────
export default function TrackerFrame({ onReplayIntro }) {
  const [showIntro, setShowIntro] = useState(() => {
    try { return sessionStorage.getItem('tracker_sound_set') !== 'yes'; }
    catch { return true; }
  });
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [confirmedActive, setConfirmedActive] = useState(true);
  const [rumoredActive, setRumoredActive]   = useState(true);
  const [activeOverlay, setActiveOverlay]   = useState(null);
  const [selectedNode, setSelectedNode]     = useState(null);
  const [toast, setToast]                   = useState(null);
  const [toastKey, setToastKey]             = useState(0);
  const [mascotFrame, setMascotFrame]       = useState(0);

  // Mascot walk animation
  useEffect(() => {
    const iv = setInterval(() => setMascotFrame(f => f === 0 ? 1 : 0), 350);
    return () => clearInterval(iv);
  }, []);

  // ESC key handler
  useEffect(() => {
    const fn = (e) => {
      if (e.key !== 'Escape') return;
      if (selectedNode)        { setSelectedNode(null); return; }
      if (activeOverlay)       { soundEffects.close?.(); setActiveOverlay(null); }
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [activeOverlay, selectedNode]);

  const triggerToast = useCallback((msg) => {
    setToast(msg);
    setToastKey(k => k + 1);
    setTimeout(() => setToast(null), 2600);
  }, []);

  const handleStartTracker = useCallback((sound) => {
    setIsSoundOn(sound);
    setSoundEnabled(sound);
    setShowIntro(false);
    try { sessionStorage.setItem('tracker_sound_set', 'yes'); } catch {}
    setTimeout(() => triggerToast(sound ? '🔊 AUDIO ENGINE: ONLINE' : '🔇 AUDIO ENGINE: MUTED'), 300);
  }, [triggerToast]);

  const openOverlay = useCallback((id) => {
    try { soundEffects.open?.(); } catch {}
    setActiveOverlay(id);
  }, []);

  const closeOverlay = useCallback(() => {
    try { soundEffects.close?.(); } catch {}
    setActiveOverlay(null);
  }, []);

  const handleSelectView = useCallback((id) => {
    const map = {
      tracker:    null,
      projects:   'projects',
      skills:     'skills',
      internship: 'internship',
      connect:    'connect',
      about:      'about',
      activity:   'activity',
      help:       'help',
    };
    const t = map[id];
    if (t === null) closeOverlay();
    else { try { soundEffects.open?.(); } catch {}; setActiveOverlay(t); }
  }, [closeOverlay]);

  const toggleSound = useCallback(() => {
    const next = !isSoundOn;
    setIsSoundOn(next);
    setSoundEnabled(next);
    try { if (next) soundEffects.select?.(); } catch {}
  }, [isSoundOn]);

  const toggleConfirmed = useCallback(() => {
    try { soundEffects.toggle?.(); } catch {}
    setConfirmedActive(v => { triggerToast(`CONFIRMED: ${!v ? 'ON' : 'OFF'}`); return !v; });
  }, [triggerToast]);

  const toggleRumored = useCallback(() => {
    try { soundEffects.toggle?.(); } catch {}
    setRumoredActive(v => { triggerToast(`RESEARCH LABS: ${!v ? 'ON' : 'OFF'}`); return !v; });
  }, [triggerToast]);

  const tickerContent = [...TICKER, ...TICKER];

  return (
    <div className="h-screen w-full bg-[#0a121d] flex flex-col select-none overflow-hidden"
      style={{ padding: '8px 8px 6px 8px' }}
    >
      <WebClickEffect />

      {/* ════════════════════════════════════════════════════════
          RETRO MONITOR — exact spideytracker.net blue frame
          ════════════════════════════════════════════════════════ */}
      <div
        className="relative flex-1 min-h-0 w-full max-w-[1600px] mx-auto flex flex-col"
        style={{
          background: '#5695bc',
          borderRadius: '18px',
          border: '5px solid #000',
          boxShadow: '0 20px 60px rgba(0,0,0,0.9), inset 3px 3px 0 rgba(255,255,255,0.45), inset -3px -3px 0 rgba(0,0,0,0.45)',
          padding: '10px 10px 38px 10px',
        }}
      >

        {/* ── HANGING SPIDER-MAN (top-center, dangles from top) ── */}
        {!showIntro && (
          <div
            className="absolute top-0 z-30 flex flex-col items-center cursor-pointer animate-swing"
            style={{ left: '50%', transform: 'translateX(-50%)', transformOrigin: 'top center' }}
            onClick={() => { triggerToast('🕷️ SPIDER-SENSE TINGLING!'); }}
            title="Spider-Sense!"
          >
            <div className="w-px bg-white/90" style={{ height: 80, boxShadow: '0 0 4px rgba(255,255,255,0.7)' }}/>
            <img
              src="/spidey/spiderman-swinging.png"
              alt="Hanging Spider-Man"
              className="object-contain"
              style={{ width: 90, height: 140, filter: 'drop-shadow(0 6px 20px rgba(0,0,0,0.95))' }}
            />
          </div>
        )}

        {/* ── TOP LEFT: Orange circle menu button ── */}
        <button
          onClick={() => setActiveOverlay(activeOverlay === 'nav' ? null : 'nav')}
          className="absolute top-2 left-2 z-40 flex items-center justify-center cursor-pointer transition-transform active:scale-90"
          style={{
            width: 44, height: 44,
            borderRadius: '50%',
            border: activeOverlay === 'nav' ? '3.5px solid #dc2626' : '3.5px solid #e8a838',
            background: '#1a2634',
            boxShadow: '0 4px 0 #000, inset 1px 1px 0 rgba(255,255,255,0.2)',
          }}
          aria-label="Navigation menu"
          aria-expanded={activeOverlay === 'nav'}
        >
          {activeOverlay === 'nav' ? (
            <svg viewBox="0 0 20 20" width="20" height="20">
              <line x1="4" y1="4" x2="16" y2="16" stroke="#dc2626" strokeWidth="3" strokeLinecap="round"/>
              <line x1="16" y1="4" x2="4"  y2="16" stroke="#dc2626" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg viewBox="0 0 28 18" width="26" height="16">
              <ellipse cx="8"  cy="9" rx="6.5" ry="7.5" fill="#dc2626" stroke="#000" strokeWidth="0.8"/>
              <ellipse cx="20" cy="9" rx="6.5" ry="7.5" fill="#dc2626" stroke="#000" strokeWidth="0.8"/>
              <ellipse cx="8"  cy="9" rx="4"   ry="5"   fill="white"/>
              <ellipse cx="20" cy="9" rx="4"   ry="5"   fill="white"/>
              <ellipse cx="8"  cy="9" rx="2.2" ry="2.8" fill="#1e40af"/>
              <ellipse cx="20" cy="9" rx="2.2" ry="2.8" fill="#1e40af"/>
            </svg>
          )}
        </button>

        {/* ── TOP CENTER: Title badge (exactly matching spideytracker) ── */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
          <div
            className="flex items-center gap-2.5 px-5 py-1.5 font-silk"
            style={{
              background: '#111e2d',
              border: '2.5px solid #000',
              borderRadius: '8px',
              boxShadow: '0 4px 0 #000, inset 1px 1px 0 rgba(255,255,255,0.15)',
            }}
          >
            <span className="text-[11px] sm:text-sm font-bold text-white tracking-[0.2em] uppercase">
              SANJAYKUMAR
            </span>
            <SpideyEyesMask />
            <span className="text-[11px] sm:text-sm font-bold text-white tracking-[0.2em] uppercase">
              TRACKER
            </span>
          </div>
        </div>

        {/* ── TOP RIGHT: White square spider icon ── */}
        <button
          onClick={() => openOverlay(activeOverlay === 'connect' ? null : 'connect')}
          className="absolute top-2 right-2 z-40 flex items-center justify-center cursor-pointer transition-transform active:scale-90"
          style={{
            width: 44, height: 44,
            background: 'white',
            border: '2.5px solid #000',
            borderRadius: '8px',
            boxShadow: '0 4px 0 #000',
          }}
          aria-label="Connect"
          title="Connect / Message Center"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="12" cy="14" rx="4" ry="5" fill="#111"/>
            <circle  cx="12" cy="8"  r="3.5"       fill="#111"/>
            <line x1="7"  y1="12" x2="2"  y2="9"  stroke="#111" strokeWidth="1.3"/>
            <line x1="7"  y1="14" x2="1"  y2="14" stroke="#111" strokeWidth="1.3"/>
            <line x1="7"  y1="16" x2="2"  y2="19" stroke="#111" strokeWidth="1.3"/>
            <line x1="17" y1="12" x2="22" y2="9"  stroke="#111" strokeWidth="1.3"/>
            <line x1="17" y1="14" x2="23" y2="14" stroke="#111" strokeWidth="1.3"/>
            <line x1="17" y1="16" x2="22" y2="19" stroke="#111" strokeWidth="1.3"/>
          </svg>
        </button>

        {/* ── LEFT FILTER TABS (green/red spider — same as spideytracker) ── */}
        <div className="absolute left-0 z-30 flex flex-col gap-2" style={{ top: 72 }}>
          <button onClick={toggleConfirmed}
            title={confirmedActive ? 'Hide Confirmed' : 'Show Confirmed'}
            className="flex items-center justify-center cursor-pointer transition-all active:scale-95"
            style={{
              width: 36, height: 36,
              background: confirmedActive ? '#2d5c30' : '#1a3020',
              border: '2px solid #000',
              borderLeft: 'none',
              borderRadius: '0 8px 8px 0',
              boxShadow: '2px 2px 0 #000',
              opacity: confirmedActive ? 1 : 0.55,
            }}
          >
            <PixelSpiderIcon color="green" size={22}/>
          </button>
          <button onClick={toggleRumored}
            title={rumoredActive ? 'Hide Research' : 'Show Research'}
            className="flex items-center justify-center cursor-pointer transition-all active:scale-95"
            style={{
              width: 36, height: 36,
              background: rumoredActive ? '#5c1a1a' : '#2a0a0a',
              border: '2px solid #000',
              borderLeft: 'none',
              borderRadius: '0 8px 8px 0',
              boxShadow: '2px 2px 0 #000',
              opacity: rumoredActive ? 1 : 0.55,
            }}
          >
            <PixelSpiderIcon color="red" size={22}/>
          </button>
        </div>

        {/* ── INNER VIEWPORT (MAP AREA) ── */}
        <div
          className="relative flex-1 min-h-0 w-full overflow-hidden"
          style={{
            borderRadius: 10,
            border: '3px solid #000',
            background: '#081018',
            marginTop: 46,
            marginBottom: 32,
            boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.95)',
          }}
        >
          {/* Ruler overlays */}
          <RulerTop/>
          <RulerLeft/>

          {/* Map */}
          <MapViewport
            confirmedActive={confirmedActive}
            rumoredActive={rumoredActive}
            onSelectNode={(node) => setSelectedNode(node)}
            statusToast={toast}
            onTriggerToast={triggerToast}
            onOpenActivityLog={() => openOverlay('activity')}
            isIntroActive={showIntro}
          />

          {/* Radar */}
          <RadarWidget/>

          {/* Toast */}
          {toast && <Toast message={toast} id={toastKey}/>}

          {/* ── INTRO SOUND SCREEN ── */}
          {showIntro && <IntroScreen onStart={handleStartTracker}/>}

          {/* ── NAVIGATION OVERLAY ── */}
          <NavigationOverlay
            isOpen={activeOverlay === 'nav'}
            onClose={closeOverlay}
            activeView={activeOverlay}
            onSelectView={handleSelectView}
          />

          {/* ── ACTIVITY LOG ── */}
          <ActivityLogOverlay
            isOpen={activeOverlay === 'activity'}
            onClose={closeOverlay}
            onSelectNode={(node) => { setSelectedNode(node); closeOverlay(); }}
            onSelectTab={handleSelectView}
          />

          {/* ── PROJECTS (Web Watch style) ── */}
          <ProjectsOverlay
            isOpen={activeOverlay === 'projects'}
            onClose={closeOverlay}
            onSelectNode={(node) => { setSelectedNode(node); closeOverlay(); }}
          />

          {/* ── SKILLS ── */}
          <SkillsArchitectureOverlay
            isOpen={activeOverlay === 'skills'}
            onClose={closeOverlay}
          />

          {/* ── INTERNSHIP ── */}
          <ExperienceOverlay
            isOpen={activeOverlay === 'internship'}
            onClose={closeOverlay}
          />

          {/* ── CONNECT ── */}
          <ConnectDrawer
            isOpen={activeOverlay === 'connect'}
            onClose={closeOverlay}
          />

          {/* ── ABOUT ME ── */}
          <AboutMeOverlay
            isOpen={activeOverlay === 'about'}
            onClose={closeOverlay}
          />

          {/* ── HELP ── */}
          <HelpOverlay
            isOpen={activeOverlay === 'help'}
            onClose={closeOverlay}
          />

          {/* ── PROJECT DOSSIER ── */}
          {selectedNode && (
            <ProjectDossierModal
              node={selectedNode}
              onClose={() => setSelectedNode(null)}
            />
          )}
        </div>

        {/* ── BOTTOM-LEFT MASCOT (pixel walking spider-man) ── */}
        <div
          className="absolute z-40 cursor-pointer"
          style={{ bottom: -4, left: -4 }}
          onClick={() => openOverlay('activity')}
          title="Activity Log"
        >
          <PixelMascot frame={mascotFrame}/>
        </div>

        {/* ── BOTTOM TICKER + SOUND ── */}
        <div className="absolute z-30 flex items-center gap-2" style={{ bottom: 8, left: 40, right: 8 }}>
          <div
            className="flex-1 overflow-hidden flex items-center"
            style={{
              height: 30,
              background: '#101d2c',
              border: '2.5px solid #000',
              borderRadius: 20,
              boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.9), 0 2px 0 rgba(255,255,255,0.15)',
              paddingLeft: 16,
              paddingRight: 8,
            }}
          >
            <div className="animate-marquee whitespace-nowrap flex gap-10 text-[9px] sm:text-[10px] font-silk tracking-widest"
              style={{ color: '#7dd3fc' }}
            >
              {tickerContent.map((t, i) => <span key={i}>{t}</span>)}
            </div>
          </div>
          <button onClick={toggleSound}
            title={isSoundOn ? 'Mute' : 'Enable Sound'}
            className="flex-shrink-0 flex items-center justify-center cursor-pointer btn-arcade-green"
            style={{ width: 30, height: 30, borderRadius: 8 }}
          >
            <SpeakerIcon isOn={isSoundOn}/>
          </button>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          BOTTOM ACTION BAR — exactly like spideytracker
          ════════════════════════════════════════════════════════ */}
      <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between gap-2 mt-1.5 px-0.5">

        {/* Left: Watch Resume */}
        <a
          href="/Shri_Sanjaykumar_V_Resume.pdf"
          download="Shri_Sanjaykumar_V_Resume.pdf"
          onClick={() => { try { soundEffects.click?.(); } catch {} }}
          className="btn-arcade-yellow px-4 sm:px-6 py-2 text-[10px] sm:text-xs font-bold tracking-wider uppercase rounded-lg cursor-pointer flex-shrink-0"
          style={{ minWidth: 140 }}
        >
          WATCH RESUME / DOSSIER
        </a>

        {/* Center branding */}
        <div className="flex flex-col items-center text-center flex-1 min-w-0 px-2">
          <h1
            className="text-sm sm:text-lg font-silk font-bold tracking-tight uppercase"
            style={{
              background: 'linear-gradient(180deg,#e52d27 0%,#ff6b6b 50%,#b31217 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            SHRI SANJAYKUMAR V
          </h1>
          <div className="flex flex-wrap justify-center gap-x-3 text-[9px] sm:text-[10px] font-silk mt-0.5"
            style={{ color: '#6da0c7' }}
          >
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GITHUB</a>
            <span>·</span>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LINKEDIN</a>
            <span>·</span>
            <a href={`mailto:${profile.email}`} className="hover:text-white transition-colors">EMAIL</a>
            <span>·</span>
            <button onClick={() => openOverlay('activity')} className="hover:text-white transition-colors cursor-pointer">ACTIVITY LOG</button>
            <span>·</span>
            {onReplayIntro && (
              <>
                <button onClick={onReplayIntro} className="hover:text-white transition-colors cursor-pointer text-cyan-300">REPLAY INTRO ▶</button>
                <span>·</span>
              </>
            )}
            <button onClick={() => { try { sessionStorage.removeItem('tracker_sound_set'); } catch {}; setShowIntro(true); }} className="hover:text-white transition-colors cursor-pointer">CREDITS ▲</button>
          </div>
        </div>

        {/* Right: Get Connected */}
        <button
          onClick={() => openOverlay('connect')}
          className="btn-arcade-yellow px-4 sm:px-6 py-2 text-[10px] sm:text-xs font-bold tracking-wider uppercase rounded-lg cursor-pointer flex-shrink-0"
          style={{ minWidth: 140 }}
        >
          GET CONNECTED / TICKETS
        </button>
      </div>
    </div>
  );
}
