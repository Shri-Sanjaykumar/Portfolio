import React, { useState } from 'react';
import { profile } from '../data/portfolioData';
import { PixelSpiderMask, PixelMascot, PixelSpeaker, PixelSpiderMarker } from './PixelIcons';
import MapViewport from './MapViewport';
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
    <div className="h-screen w-full bg-[#0a121d] flex flex-col justify-between p-2 sm:p-3 md:p-4 font-sans text-white select-none overflow-hidden">
      
      {/* ========================================================
          SLATE-BLUE RETRO MONITOR FRAME (Expanded Full Viewport)
          ======================================================== */}
      <div className="relative w-full max-w-[1540px] mx-auto flex-1 min-h-0 bg-[#5695bc] rounded-2xl md:rounded-3xl border-4 md:border-[6px] border-black p-2.5 sm:p-3.5 md:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_2px_2px_0_rgba(255,255,255,0.4),inset_-2px_-2px_0_rgba(0,0,0,0.4)] flex flex-col justify-between">
        
        {/* Top-Left Menu Button (Yellow Round Outline) */}
        <button
          onClick={() => {
            soundEffects.open();
            setActiveOverlay(activeOverlay === 'nav' ? null : 'nav');
          }}
          aria-label="Toggle navigation menu"
          className="absolute top-2 sm:top-2.5 left-2.5 sm:left-3.5 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full border-3 border-[#e8a838] bg-[#1a2634] hover:bg-[#25374a] flex items-center justify-center shadow-[0_4px_0_#000] transition-transform active:scale-95 cursor-pointer"
        >
          <div className="flex flex-col gap-1 items-center justify-center">
            <span className="w-4 sm:w-5 h-0.5 sm:h-1 bg-[#e8a838] rounded-sm" />
            <span className="w-4 sm:w-5 h-0.5 sm:h-1 bg-[#e8a838] rounded-sm" />
            <span className="w-4 sm:w-5 h-0.5 sm:h-1 bg-[#e8a838] rounded-sm" />
          </div>
        </button>

        {/* Top-Center Branding Pill Badge */}
        <div className="absolute top-1.5 sm:top-2 left-1/2 -translate-x-1/2 z-40 bg-[#162433] border-2 sm:border-3 border-black px-3 sm:px-6 py-1 sm:py-1.5 rounded-full shadow-[0_4px_0_#000] flex items-center gap-2 sm:gap-3 pointer-events-none">
          <span className="font-silk text-[10px] sm:text-xs md:text-sm font-bold text-white tracking-widest">
            SANJAYKUMAR
          </span>
          <PixelSpiderMask className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-silk text-[10px] sm:text-xs md:text-sm font-bold text-cyan-300 tracking-widest">
            TRACKER
          </span>
        </div>

        {/* Top-Right Connect Button */}
        <button
          onClick={() => {
            soundEffects.open();
            setActiveOverlay(activeOverlay === 'connect' ? null : 'connect');
          }}
          aria-label="Open Message Center"
          className="absolute top-2 sm:top-2.5 right-2.5 sm:right-3.5 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-lg border-2 sm:border-3 border-black bg-white hover:bg-gray-100 flex items-center justify-center shadow-[0_4px_0_#000] transition-transform active:scale-95 cursor-pointer group"
        >
          <div className="transform group-hover:scale-110 transition-transform">
            <PixelSpiderMarker color="white" size={22} />
          </div>
        </button>

        {/* Left Side Filter Tabs */}
        <div className="absolute left-1 sm:left-1.5 top-16 sm:top-20 z-30 flex flex-col gap-2 pointer-events-auto">
          {/* Confirmed Sighting Filter Tab */}
          <button
            onClick={handleToggleConfirmed}
            title="Toggle Confirmed Sightings"
            className={`w-8 sm:w-10 h-8 sm:h-10 rounded-r-lg border-2 border-black flex items-center justify-center shadow-md transition-all cursor-pointer ${
              confirmedActive
                ? 'bg-[#79a86b] translate-x-0'
                : 'bg-[#3b5236] opacity-60 translate-x-[-3px]'
            }`}
          >
            <PixelSpiderMarker color="green" size={20} />
          </button>

          {/* Rumored Sighting Filter Tab */}
          <button
            onClick={handleToggleRumored}
            title="Toggle Rumored Sightings"
            className={`w-8 sm:w-10 h-8 sm:h-10 rounded-r-lg border-2 border-black flex items-center justify-center shadow-md transition-all cursor-pointer ${
              rumoredActive
                ? 'bg-[#e6e6e6] translate-x-0'
                : 'bg-[#6b6b6b] opacity-60 translate-x-[-3px]'
            }`}
          >
            <PixelSpiderMarker color="red" size={20} />
          </button>
        </div>

        {/* Inner Viewport Screen (Real Leaflet Map) */}
        <div className="relative flex-1 w-full rounded-xl overflow-hidden border-2 sm:border-3 border-black shadow-[inset_0_4px_12px_rgba(0,0,0,0.8)] bg-[#0a111a] mt-7 sm:mt-8 mb-7 sm:mb-8 min-h-0">
          <MapViewport
            confirmedActive={confirmedActive}
            rumoredActive={rumoredActive}
            onSelectNode={(node) => setSelectedDossierNode(node)}
            statusToast={statusToast}
            onTriggerToast={triggerToast}
          />

          {/* Navigation Overlay */}
          <NavigationOverlay
            isOpen={activeOverlay === 'nav'}
            onClose={() => setActiveOverlay(null)}
            onSelectView={handleSelectView}
          />

          {/* Activity Log Overlay */}
          <ActivityLogOverlay
            isOpen={activeOverlay === 'activity'}
            onClose={() => setActiveOverlay(null)}
            onSelectNode={(node) => setSelectedDossierNode(node)}
          />

          {/* Engineering Watch Carousel */}
          <EngineeringWatchOverlay
            isOpen={activeOverlay === 'watch'}
            onClose={() => setActiveOverlay(null)}
          />

          {/* Connect / Message Center Drawer */}
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

          {/* Help / Guide Overlay */}
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

        {/* Bottom-Left Clinging Mascot */}
        <div className="absolute -bottom-2 -left-2 z-40 pointer-events-none animate-mascot">
          <PixelMascot className="w-10 h-12 sm:w-13 sm:h-15 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]" />
        </div>

        {/* Bottom LED Ticker Bar & Sound Button */}
        <div className="absolute bottom-1.5 sm:bottom-2 left-10 sm:left-14 right-2 sm:right-3 z-30 flex items-center gap-2">
          {/* Scrolling LED dot matrix marquee */}
          <div className="flex-1 bg-[#152332] border-2 sm:border-3 border-black h-7 sm:h-8 rounded-full overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.9),0_2px_0_rgba(255,255,255,0.2)] flex items-center px-4">
            <div className="animate-marquee whitespace-nowrap text-[9px] sm:text-xs font-silk text-[#9ae6ff] tracking-widest flex items-center gap-6">
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
            className="w-7 sm:w-8 h-7 sm:h-8 rounded-lg btn-arcade-green flex items-center justify-center shadow-md flex-shrink-0 cursor-pointer"
          >
            <PixelSpeaker isOn={isSoundOn} className="w-3.5 h-3.5 text-black" />
          </button>
        </div>
      </div>

      {/* ========================================================
          BOTTOM INTEGRATED ACTION BAR & HERO BRANDING
          ======================================================== */}
      <div className="w-full max-w-[1540px] mx-auto mt-2 flex flex-col md:flex-row items-center justify-between gap-2.5 px-2">
        {/* Left Action Button */}
        <a
          href={profile.resumeUrl}
          download
          onClick={() => soundEffects.click()}
          className="px-5 sm:px-7 py-2 rounded-lg btn-arcade-yellow text-[11px] sm:text-xs font-bold tracking-wider uppercase text-center shadow-lg cursor-pointer flex-shrink-0"
        >
          WATCH RESUME / DOSSIER
        </a>

        {/* Center Hero Branding & Links */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-xl md:text-2xl font-silk font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#e52d27] via-[#ff6b6b] to-[#b31217] drop-shadow uppercase">
              SHRI SANJAYKUMAR V
            </h1>
            <span className="text-gray-500 hidden sm:inline">|</span>
            <span className="text-[10px] sm:text-xs font-silk font-bold text-[#ffd277] tracking-wider hidden sm:inline">
              M.TECH SE @ VIT (CGPA: 9.12)
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] font-silk text-[#6da0c7] mt-0.5">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">
              GITHUB
            </a>
            <span>•</span>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">
              LINKEDIN
            </a>
            <span>•</span>
            <a href={`mailto:${profile.email}`} className="hover:text-white transition-colors cursor-pointer">
              EMAIL
            </a>
            <span>•</span>
            <button
              onClick={() => {
                soundEffects.open();
                setActiveOverlay('activity');
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              ACTIVITY LOG
            </button>
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
        </div>

        {/* Right Action Button */}
        <button
          onClick={() => {
            soundEffects.open();
            setActiveOverlay('connect');
          }}
          className="px-5 sm:px-7 py-2 rounded-lg btn-arcade-yellow text-[11px] sm:text-xs font-bold tracking-wider uppercase text-center shadow-lg cursor-pointer flex-shrink-0"
        >
          GET CONNECTED / TICKETS
        </button>
      </div>

    </div>
  );
}
