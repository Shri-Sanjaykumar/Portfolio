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

  // Trigger floating status toast
  const triggerToast = (msg) => {
    setStatusToast(msg);
    setTimeout(() => setStatusToast(null), 2500);
  };

  // Toggle 8-bit Sound
  const handleToggleSound = () => {
    const next = !isSoundOn;
    setIsSoundOn(next);
    setSoundEnabled(next);
    if (next) {
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

  // Navigation menu selection router
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
    <div className="min-h-screen w-full bg-[#0c1522] flex flex-col items-center justify-between p-2 sm:p-4 md:p-6 font-sans text-white select-none overflow-x-hidden">
      {/* Outer Wrapper */}
      <div className="w-full max-w-[1440px] mx-auto flex flex-col items-center">
        
        {/* ========================================================
            SLATE-BLUE RETRO MONITOR FRAME (Matching Screenshots)
            ======================================================== */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[540px] max-h-[82vh] bg-[#5695bc] rounded-2xl md:rounded-3xl border-4 md:border-[6px] border-black p-3 sm:p-4 md:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_2px_2px_0_rgba(255,255,255,0.4),inset_-2px_-2px_0_rgba(0,0,0,0.4)] flex flex-col">
          
          {/* Top-Left Menu Button (Yellow Round Outline, Screenshot 2) */}
          <button
            onClick={() => {
              soundEffects.open();
              setActiveOverlay(activeOverlay === 'nav' ? null : 'nav');
            }}
            aria-label="Toggle navigation menu"
            className="absolute top-2 sm:top-3 left-3 sm:left-4 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full border-3 sm:border-4 border-[#e8a838] bg-[#1a2634] hover:bg-[#25374a] flex items-center justify-center shadow-[0_4px_0_#000] transition-transform active:scale-95 cursor-pointer"
          >
            <div className="flex flex-col gap-1 items-center justify-center">
              <span className="w-4 sm:w-5 h-0.5 sm:h-1 bg-[#e8a838] rounded-sm" />
              <span className="w-4 sm:w-5 h-0.5 sm:h-1 bg-[#e8a838] rounded-sm" />
              <span className="w-4 sm:w-5 h-0.5 sm:h-1 bg-[#e8a838] rounded-sm" />
            </div>
          </button>

          {/* Top-Center Branding Pill Badge (Matching Screenshot) */}
          <div className="absolute top-1.5 sm:top-2 left-1/2 -translate-x-1/2 z-40 bg-[#162433] border-2 sm:border-3 border-black px-3 sm:px-6 py-1 sm:py-1.5 rounded-full shadow-[0_4px_0_#000] flex items-center gap-2 sm:gap-3 pointer-events-none">
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
            aria-label="Open Message Center"
            className="absolute top-2 sm:top-3 right-3 sm:right-4 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-lg border-2 sm:border-3 border-black bg-white hover:bg-gray-100 flex items-center justify-center shadow-[0_4px_0_#000] transition-transform active:scale-95 cursor-pointer group"
          >
            <div className="transform group-hover:scale-110 transition-transform">
              <PixelSpiderMarker color="white" size={24} />
            </div>
          </button>

          {/* Left Side Filter Tabs (Screenshot 7 & 8) */}
          <div className="absolute left-1 sm:left-2 top-20 sm:top-24 z-30 flex flex-col gap-2 pointer-events-auto">
            {/* Confirmed Sighting Filter Tab */}
            <button
              onClick={handleToggleConfirmed}
              title="Toggle Confirmed Sightings"
              className={`w-9 sm:w-11 h-9 sm:h-11 rounded-r-lg border-2 border-black flex items-center justify-center shadow-md transition-all cursor-pointer ${
                confirmedActive
                  ? 'bg-[#79a86b] translate-x-0'
                  : 'bg-[#3b5236] opacity-60 translate-x-[-3px]'
              }`}
            >
              <PixelSpiderMarker color="green" size={22} />
            </button>

            {/* Rumored Sighting Filter Tab */}
            <button
              onClick={handleToggleRumored}
              title="Toggle Rumored Sightings"
              className={`w-9 sm:w-11 h-9 sm:h-11 rounded-r-lg border-2 border-black flex items-center justify-center shadow-md transition-all cursor-pointer ${
                rumoredActive
                  ? 'bg-[#e6e6e6] translate-x-0'
                  : 'bg-[#6b6b6b] opacity-60 translate-x-[-3px]'
              }`}
            >
              <PixelSpiderMarker color="red" size={22} />
            </button>
          </div>

          {/* Inner Viewport Screen (Real Tactical Map) */}
          <div className="relative flex-1 w-full rounded-xl overflow-hidden border-2 sm:border-3 border-black shadow-[inset_0_4px_12px_rgba(0,0,0,0.8)] bg-[#0a111a] mt-8 sm:mt-10 mb-8 sm:mb-10">
            <MapViewport
              confirmedActive={confirmedActive}
              rumoredActive={rumoredActive}
              onSelectNode={(node) => setSelectedDossierNode(node)}
              statusToast={statusToast}
              onTriggerToast={triggerToast}
            />

            {/* Intro / Onboarding Screen (Screenshot 1) */}
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

            {/* Skills & Architecture Overlay */}
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

          {/* Bottom-Left Clinging Mascot (Screenshot 2, 7, 8) */}
          <div className="absolute -bottom-2.5 -left-2.5 z-40 pointer-events-none animate-mascot">
            <PixelMascot className="w-11 h-13 sm:w-14 sm:h-16 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]" />
          </div>

          {/* Bottom LED Ticker Bar & Sound Button (Screenshot 2, 7, 8) */}
          <div className="absolute bottom-2.5 sm:bottom-3 left-12 sm:left-16 right-3 sm:right-4 z-30 flex items-center gap-2 sm:gap-3">
            {/* Scrolling LED dot matrix marquee */}
            <div className="flex-1 bg-[#152332] border-2 sm:border-3 border-black h-8 sm:h-9 rounded-full overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.9),0_2px_0_rgba(255,255,255,0.2)] flex items-center px-4">
              <div className="animate-marquee whitespace-nowrap text-[10px] sm:text-xs font-silk text-[#9ae6ff] tracking-widest flex items-center gap-6">
                <span>SHARE YOUR ENGINEERING SIGHTINGS ON X ■ SIGHTING BY @SHRI_SANJAYKUMAR</span>
                <span>M.TECH INTEGRATED SE @ VIT (CGPA: 9.12 / 10.0) ■ GRADUATION 2028</span>
                <span>CAMPUSLLM: UNIVERSITY RAG ASSISTANT ACHIEVED ~3S AVERAGE LATENCY</span>
                <span>TFORCE INDIA ACADEMIC INTERN: ENTERPRISE GEN AI &amp; SAP BTP WORKFLOWS</span>
                <span>LEGITIFY: DEVSECOPS &amp; REPO COMPLIANCE AUDITOR ■ SOLAR ML: 7-DAY PREDICTION</span>
                <span>FINTRACK: GRAPH-BASED DEBT SETTLEMENT PLATFORM ■ MULTI-CLOUD AWS + AZURE</span>
                <span>SPONSORSHIP LEAD: SECURED INR 60+ LAKHS SPONSORSHIPS ACROSS RIVIERA &amp; GRAVITAS</span>
              </div>
            </div>

            {/* Green Sound Button */}
            <button
              onClick={handleToggleSound}
              title={isSoundOn ? 'Mute Sound' : 'Enable 8-bit Audio'}
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
          {/* Left Action Button (Watch Trailer / Download Resume) */}
          <a
            href={profile.resumeUrl}
            download
            onClick={() => soundEffects.click()}
            className="px-5 sm:px-8 py-2.5 rounded-lg btn-arcade-yellow text-xs sm:text-sm font-bold tracking-wider uppercase text-center shadow-lg cursor-pointer"
          >
            WATCH RESUME / DOSSIER
          </a>

          {/* Center Activity Log Quick Action */}
          <button
            onClick={() => {
              soundEffects.open();
              setActiveOverlay('activity');
            }}
            className="hidden md:flex px-4 py-2 rounded-lg bg-[#1a2d40] border-2 border-black text-[11px] font-silk text-cyan-300 hover:bg-[#25405c] transition-all tracking-wider shadow cursor-pointer"
          >
            📋 ACTIVITY LOG
          </button>

          {/* Right Action Button (Get Tickets / Connect) */}
          <button
            onClick={() => {
              soundEffects.open();
              setActiveOverlay('connect');
            }}
            className="px-5 sm:px-8 py-2.5 rounded-lg btn-arcade-yellow text-xs sm:text-sm font-bold tracking-wider uppercase text-center shadow-lg cursor-pointer"
          >
            GET CONNECTED / TICKETS
          </button>
        </div>

        {/* ========================================================
            LOWER HERO BRANDING BANNER (Spider-Man Title Aesthetic)
            ======================================================== */}
        <footer className="w-full flex flex-col items-center text-center mt-6 sm:mt-8 pt-4 border-t border-white/10 pb-4">
          {/* Logo Title */}
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
              className="hover:text-white transition-colors cursor-pointer"
            >
              GITHUB
            </a>
            <span>•</span>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors cursor-pointer"
            >
              LINKEDIN
            </a>
            <span>•</span>
            <a
              href={`mailto:${profile.email}`}
              className="hover:text-white transition-colors cursor-pointer"
            >
              EMAIL
            </a>
            <span>•</span>
            <a
              href={profile.resumeUrl}
              download
              className="hover:text-white transition-colors cursor-pointer"
            >
              RESUME
            </a>
            <span>•</span>
            <button
              onClick={() => {
                soundEffects.open();
                setActiveOverlay('help');
              }}
              className="hover:text-white transition-colors cursor-pointer"
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
