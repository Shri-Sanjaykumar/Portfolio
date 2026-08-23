import React, { useState } from 'react';
import { profile } from '../data/portfolioData';
import { PixelSpiderMask, PixelMascot, PixelSpeaker, PixelSpiderMarker } from './PixelIcons';
import MapViewport from './MapViewport';
import IntroScreen from './IntroScreen';
import NavigationOverlay from './NavigationOverlay';
import ActivityLogOverlay from './ActivityLogOverlay';
import EngineeringWatchOverlay from './EngineeringWatchOverlay';
import ConnectDrawer from './ConnectDrawer';
import ProjectDossierModal from './ProjectDossierModal';
import HelpOverlay from './HelpOverlay';
import SkillsArchitectureOverlay from './SkillsArchitectureOverlay';
import LeadershipEducationOverlay from './LeadershipEducationOverlay';
import { setSoundEnabled, getSoundEnabled, soundEffects } from '../utils/audio';

export default function TrackerFrame() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [confirmedActive, setConfirmedActive] = useState(true);
  const [rumoredActive, setRumoredActive] = useState(true);
  const [activeOverlay, setActiveOverlay] = useState(null); // 'nav' | 'activity' | 'watch' | 'connect' | 'skills' | 'leadership' | 'education' | 'help'
  const [selectedDossierNode, setSelectedDossierNode] = useState(null);
  const [statusToast, setStatusToast] = useState(null);

  // Show quick toast notification
  const triggerToast = (msg) => {
    setStatusToast(msg);
    setTimeout(() => setStatusToast(null), 2500);
  };

  // Toggle Sound
  const handleToggleSound = () => {
    const nextState = !isSoundOn;
    setIsSoundOn(nextState);
    setSoundEnabled(nextState);
    if (nextState) {
      soundEffects.select();
    }
  };

  // Toggle Confirmed Sightings
  const handleToggleConfirmed = () => {
    soundEffects.toggle();
    const next = !confirmedActive;
    setConfirmedActive(next);
    triggerToast(`CONFIRMED SIGHTINGS: ${next ? 'ON' : 'OFF'}`);
  };

  // Toggle Rumored Sightings
  const handleToggleRumored = () => {
    soundEffects.toggle();
    const next = !rumoredActive;
    setRumoredActive(next);
    triggerToast(`RUMORED SIGHTINGS: ${next ? 'ON' : 'OFF'}`);
  };

  // Menu navigation router
  const handleSelectView = (viewId) => {
    if (viewId === 'tracker') {
      setActiveOverlay(null);
    } else if (viewId === 'activity' || viewId === 'projects' || viewId === 'experience') {
      setActiveOverlay('activity');
    } else if (viewId === 'watch') {
      setActiveOverlay('watch');
    } else if (viewId === 'skills') {
      setActiveOverlay('skills');
    } else if (viewId === 'leadership') {
      setActiveOverlay('leadership');
    } else if (viewId === 'education') {
      setActiveOverlay('education');
    } else if (viewId === 'connect') {
      setActiveOverlay('connect');
    } else if (viewId === 'help') {
      setActiveOverlay('help');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0c1522] flex flex-col items-center justify-between p-3 sm:p-5 md:p-8 font-sans text-white select-none">
      {/* Tracker Main Container Wrapper */}
      <div className="w-full max-w-[1360px] mx-auto flex flex-col items-center">
        
        {/* ========================================================
            OUTER BLUE RETRO MONITOR FRAME (Matching Screenshots)
            ======================================================== */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] min-h-[500px] max-h-[82vh] bg-[#4d82a4] rounded-2xl md:rounded-3xl border-4 md:border-[6px] border-black p-3 sm:p-4 md:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_2px_2px_0_rgba(255,255,255,0.4),inset_-2px_-2px_0_rgba(0,0,0,0.4)] flex flex-col">
          
          {/* ----------------- TOP CONTROLS & BRANDING ----------------- */}
          
          {/* Top-Left Menu Button (Yellow Round Outline) */}
          <button
            onClick={() => {
              soundEffects.open();
              setActiveOverlay(activeOverlay === 'nav' ? null : 'nav');
            }}
            aria-label="Toggle navigation menu"
            className="absolute top-2.5 sm:top-3.5 left-3 sm:left-4 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full border-3 sm:border-4 border-[#e8a838] bg-[#1a2634] hover:bg-[#25374a] flex items-center justify-center shadow-lg transition-transform active:scale-95"
          >
            {/* Hamburger / Pixel Eye Icon */}
            <div className="flex flex-col gap-1 items-center justify-center">
              <span className="w-4 sm:w-5 h-0.5 sm:h-1 bg-[#e8a838] rounded-sm" />
              <span className="w-4 sm:w-5 h-0.5 sm:h-1 bg-[#e8a838] rounded-sm" />
              <span className="w-4 sm:w-5 h-0.5 sm:h-1 bg-[#e8a838] rounded-sm" />
            </div>
          </button>

          {/* Top-Center Branding Pill Badge (Matching Screenshot) */}
          <div className="absolute top-1.5 sm:top-2 left-1/2 -translate-x-1/2 z-40 bg-[#162433] border-2 sm:border-3 border-black px-3 sm:px-6 py-1 sm:py-1.5 rounded-full shadow-[0_4px_0_#000] flex items-center gap-2 sm:gap-3">
            <span className="font-silk text-[10px] sm:text-xs md:text-sm font-bold text-white tracking-widest">
              SANJAYKUMAR
            </span>
            <PixelSpiderMask className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-silk text-[10px] sm:text-xs md:text-sm font-bold text-cyan-300 tracking-widest">
              TRACKER
            </span>
          </div>

          {/* Top-Right Connect / Message Drawer Button (White Square with Pixel Spider) */}
          <button
            onClick={() => {
              soundEffects.open();
              setActiveOverlay(activeOverlay === 'connect' ? null : 'connect');
            }}
            aria-label="Open Connect Drawer"
            className="absolute top-2.5 sm:top-3.5 right-3 sm:right-4 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-lg border-2 sm:border-3 border-black bg-white hover:bg-gray-100 flex items-center justify-center shadow-[0_4px_0_#000] transition-transform active:scale-95 group"
          >
            <div className="transform group-hover:scale-110 transition-transform">
              <PixelSpiderMarker color="white" size={24} />
            </div>
          </button>

          {/* ----------------- LEFT SIDE FILTER TABS ----------------- */}
          <div className="absolute left-1 sm:left-2 top-20 sm:top-24 z-30 flex flex-col gap-2 pointer-events-auto">
            {/* Confirmed Sighting Filter Tab */}
            <button
              onClick={handleToggleConfirmed}
              title="Toggle Confirmed Projects"
              className={`w-9 sm:w-11 h-9 sm:h-11 rounded-r-lg border-2 border-black flex items-center justify-center shadow-md transition-all ${
                confirmedActive
                  ? 'bg-[#79a86b] translate-x-0'
                  : 'bg-[#3b5236] opacity-60 translate-x-[-3px]'
              }`}
            >
              <PixelSpiderMarker color="green" size={22} />
            </button>

            {/* Rumored / Research Sighting Filter Tab */}
            <button
              onClick={handleToggleRumored}
              title="Toggle Research / Rumored Milestones"
              className={`w-9 sm:w-11 h-9 sm:h-11 rounded-r-lg border-2 border-black flex items-center justify-center shadow-md transition-all ${
                rumoredActive
                  ? 'bg-[#e6e6e6] translate-x-0'
                  : 'bg-[#6b6b6b] opacity-60 translate-x-[-3px]'
              }`}
            >
              <PixelSpiderMarker color="red" size={22} />
            </button>
          </div>

          {/* ----------------- INNER VIEWPORT SCREEN ----------------- */}
          <div className="relative flex-1 w-full rounded-xl overflow-hidden border-2 sm:border-3 border-black shadow-[inset_0_4px_12px_rgba(0,0,0,0.8)] bg-black mt-8 sm:mt-10 mb-8 sm:mb-10">
            {/* Interactive World Map & Radar Viewport */}
            <MapViewport
              confirmedActive={confirmedActive}
              rumoredActive={rumoredActive}
              onSelectNode={(node) => setSelectedDossierNode(node)}
              statusToast={statusToast}
            />

            {/* Intro / Onboarding Screen Overlay (Screenshot 1) */}
            {!hasStarted && (
              <IntroScreen
                onStartTracking={() => {
                  setHasStarted(true);
                  setIsSoundOn(getSoundEnabled());
                }}
              />
            )}

            {/* Navigation Overlay (Screenshot 2) */}
            <NavigationOverlay
              isOpen={activeOverlay === 'nav'}
              onClose={() => setActiveOverlay(null)}
              onSelectView={handleSelectView}
            />

            {/* Activity Log Overlay (Screenshot 12) */}
            <ActivityLogOverlay
              isOpen={activeOverlay === 'activity'}
              onClose={() => setActiveOverlay(null)}
              onSelectNode={(node) => setSelectedDossierNode(node)}
            />

            {/* Engineering Watch Carousel (Screenshot 6) */}
            <EngineeringWatchOverlay
              isOpen={activeOverlay === 'watch'}
              onClose={() => setActiveOverlay(null)}
            />

            {/* Connect / Message Center Drawer (Screenshot 5) */}
            <ConnectDrawer
              isOpen={activeOverlay === 'connect'}
              onClose={() => setActiveOverlay(null)}
            />

            {/* Skills & Engineering DNA Overlay */}
            <SkillsArchitectureOverlay
              isOpen={activeOverlay === 'skills'}
              onClose={() => setActiveOverlay(null)}
            />

            {/* Leadership & Education Overlay */}
            <LeadershipEducationOverlay
              isOpen={activeOverlay === 'leadership' || activeOverlay === 'education'}
              initialTab={activeOverlay === 'education' ? 'education' : 'leadership'}
              onClose={() => setActiveOverlay(null)}
            />

            {/* Help / Guide Overlay (Screenshot 9) */}
            <HelpOverlay
              isOpen={activeOverlay === 'help'}
              onClose={() => setActiveOverlay(null)}
            />

            {/* Project Dossier Modal */}
            {selectedDossierNode && (
              <ProjectDossierModal
                node={selectedDossierNode}
                onClose={() => setSelectedDossierNode(null)}
              />
            )}
          </div>

          {/* ----------------- BOTTOM CONTROLS & TICKER ----------------- */}
          
          {/* Clinging Mascot Sticker at Bottom-Left Frame Corner (Matching Screenshot) */}
          <div className="absolute -bottom-2.5 -left-2.5 z-40 pointer-events-none animate-mascot">
            <PixelMascot className="w-11 h-13 sm:w-14 sm:h-16 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]" />
          </div>

          {/* Bottom LED Ticker Bar & Sound Toggle (Matching Screenshot) */}
          <div className="absolute bottom-2.5 sm:bottom-3 left-12 sm:left-16 right-3 sm:right-4 z-30 flex items-center gap-2 sm:gap-3">
            {/* Dot-Matrix LED Scrolling Marquee */}
            <div className="flex-1 bg-[#152332] border-2 sm:border-3 border-black h-8 sm:h-9 rounded-full overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.9),0_2px_0_rgba(255,255,255,0.2)] flex items-center px-4">
              <div className="animate-marquee whitespace-nowrap text-[10px] sm:text-xs font-silk text-[#9ae6ff] tracking-widest flex items-center gap-6">
                <span>SHRI SANJAYKUMAR V ■ SOFTWARE ENGINEERING STUDENT @ VIT</span>
                <span>CGPA: 9.12 / 10.0 ■ EXPECTED GRADUATION: 2028</span>
                <span>GENERATIVE AI ■ ENTERPRISE RAG ■ CLOUD SYSTEMS ■ FULL STACK</span>
                <span>TFORCE INDIA INTERN (GEN AI &amp; SAP BTP) ■ CAMPUSLLM (~3S LATENCY)</span>
                <span>LEGITIFY ■ SOLAR ML (7-DAY PREDICT) ■ FINTRACK (GRAPH ALGORITHMS)</span>
                <span>SPONSORSHIP LEAD (INR 60+ LAKHS SECURED) ■ HACK THE HOSPITAL LEAD</span>
                <span>CLICK ANY MAP NODE OR MENU FOR COMPLETE ENGINEERING DOSSIERS</span>
              </div>
            </div>

            {/* Green Sound Button */}
            <button
              onClick={handleToggleSound}
              title={isSoundOn ? 'Mute Sound' : 'Enable 8-bit Sound'}
              className="w-8 sm:w-9 h-8 sm:h-9 rounded-lg btn-arcade-green flex items-center justify-center shadow-md flex-shrink-0 cursor-pointer"
            >
              <PixelSpeaker isOn={isSoundOn} className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>

        {/* ========================================================
            ACTION BAR (YELLOW BEVELED ARCADE BUTTONS)
            ======================================================== */}
        <div className="w-full flex flex-wrap items-center justify-between gap-3 mt-3 px-2 sm:px-4">
          {/* Left Button: Download Resume */}
          <a
            href={profile.resumeUrl}
            download
            onClick={() => soundEffects.click()}
            className="px-5 sm:px-7 py-2.5 rounded-lg btn-arcade-yellow text-xs sm:text-sm font-bold tracking-wider uppercase text-center shadow-lg"
          >
            📄 DOWNLOAD RESUME
          </a>

          {/* Center Guide Trigger */}
          <button
            onClick={() => {
              soundEffects.open();
              setActiveOverlay('help');
            }}
            className="hidden md:flex px-4 py-2 rounded-lg bg-[#1a2d40] border-2 border-black text-[11px] font-silk text-cyan-300 hover:bg-[#25405c] transition-all tracking-wider shadow"
          >
            ❓ CONTROLS GUIDE
          </button>

          {/* Right Button: Let's Connect */}
          <button
            onClick={() => {
              soundEffects.open();
              setActiveOverlay('connect');
            }}
            className="px-5 sm:px-7 py-2.5 rounded-lg btn-arcade-yellow text-xs sm:text-sm font-bold tracking-wider uppercase text-center shadow-lg"
          >
            💬 LET'S CONNECT
          </button>
        </div>

        {/* ========================================================
            LOWER HERO BRANDING BANNER (Spider-Man Title Aesthetic)
            ======================================================== */}
        <footer className="w-full flex flex-col items-center text-center mt-6 sm:mt-8 pt-4 border-t border-white/10 pb-4">
          {/* Hero Name Banner */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-silk font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#e52d27] via-[#ff6b6b] to-[#b31217] drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] uppercase">
            SHRI SANJAYKUMAR V
          </h1>

          <div className="text-xs sm:text-sm font-silk font-bold text-[#ffd277] tracking-widest mt-1">
            SOFTWARE ENGINEERING STUDENT • VELLORE INSTITUTE OF TECHNOLOGY
          </div>

          <p className="text-[11px] sm:text-xs font-mono text-gray-400 max-w-2xl mt-2 px-4 leading-relaxed">
            Building intelligent, scalable and practical software systems across Generative AI, Cloud Computing, Backend Architecture and Machine Learning.
          </p>

          {/* Social Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-4 text-[11px] font-silk text-[#6da0c7]">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GITHUB
            </a>
            <span>•</span>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LINKEDIN
            </a>
            <span>•</span>
            <a
              href={`mailto:${profile.email}`}
              className="hover:text-white transition-colors"
            >
              EMAIL
            </a>
            <span>•</span>
            <a
              href={profile.resumeUrl}
              download
              className="hover:text-white transition-colors"
            >
              RESUME
            </a>
            <span>•</span>
            <button
              onClick={() => {
                soundEffects.open();
                setActiveOverlay('help');
              }}
              className="hover:text-white transition-colors"
            >
              CREDITS ▲
            </button>
          </div>

          <div className="text-[9px] font-mono text-gray-600 mt-4">
            © {new Date().getFullYear()} SHRI SANJAYKUMAR V. DESIGNED &amp; ENGINEERED AS AN INTERACTIVE RETRO RADAR EXPERIENCE.
          </div>
        </footer>

      </div>
    </div>
  );
}
