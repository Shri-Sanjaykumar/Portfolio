import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { gameWorlds, achievementsList } from '../../data/gameChallenges';
import SpideyCharacter from './SpideyCharacter';
import { soundEffects, toggleBGM, getBgmPlaying } from '../../utils/audio';

export default function SpideyGameModal({ isOpen = false, onClose }) {
  const {
    gameState,
    xpProgressPercent,
    recentUnlock,
    completeLevel,
    failChallenge,
    restoreLives,
    recordWebShot,
  } = useGame();

  const [selectedWorldId, setSelectedWorldId] = useState('world-1');
  const [activeLevel, setActiveLevel] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answeredState, setAnsweredState] = useState(null); // 'correct' | 'wrong' | null
  const [showHint, setShowHint] = useState(false);
  const [characterAction, setCharacterAction] = useState('idle');
  const [isBgmOn, setIsBgmOn] = useState(getBgmPlaying());
  const [activeTab, setActiveTab] = useState('quest'); // 'quest' | 'achievements' | 'sandbox'

  if (!isOpen) return null;

  const currentWorld = gameWorlds.find((w) => w.id === selectedWorldId) || gameWorlds[0];

  const handleSelectWorld = (worldId) => {
    soundEffects.select();
    setSelectedWorldId(worldId);
    setActiveLevel(null);
    setAnsweredState(null);
    setSelectedOption(null);
    setShowHint(false);
  };

  const handleStartLevel = (level) => {
    soundEffects.open();
    setActiveLevel(level);
    setSelectedOption(null);
    setAnsweredState(null);
    setShowHint(false);
    setCharacterAction('idle');
  };

  const handleAnswerSubmit = (optionIndex) => {
    if (answeredState) return; // already answered
    if (gameState.lives <= 0) {
      soundEffects.wrong();
      return;
    }

    setSelectedOption(optionIndex);

    if (optionIndex === activeLevel.correctIndex) {
      setAnsweredState('correct');
      setCharacterAction('victory');
      completeLevel(currentWorld.id, activeLevel.id, activeLevel.xpReward, activeLevel.coinReward);
    } else {
      setAnsweredState('wrong');
      setCharacterAction('damage');
      failChallenge();
      setTimeout(() => setCharacterAction('idle'), 600);
    }
  };

  const handleBgmToggle = () => {
    const next = toggleBGM();
    setIsBgmOn(next);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col p-2 sm:p-4 select-none overflow-hidden scanline-overlay">
      {/* Top Retro Arcade HUD Bar */}
      <div className="w-full max-w-6xl mx-auto bg-[#101c29] border-3 border-black rounded-xl p-3 shadow-2xl flex flex-wrap items-center justify-between gap-3 text-xs font-silk">
        
        {/* Player Stats */}
        <div className="flex items-center gap-4">
          {/* Level Badge */}
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#e8a838] text-black font-bold border border-black shadow">
              LVL {gameState.level}
            </span>
            <div className="w-24 sm:w-32 h-3 bg-black/60 rounded-full border border-cyan-500/40 overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-[#79a86b] transition-all duration-300"
                style={{ width: `${xpProgressPercent}%` }}
              />
            </div>
            <span className="text-[10px] font-mono text-cyan-300">
              {gameState.xp} XP
            </span>
          </div>

          {/* Web Coins */}
          <div className="flex items-center gap-1 text-yellow-300 font-bold">
            <span>🪙</span>
            <span>{gameState.coins}</span>
          </div>

          {/* Lives (Health) */}
          <div className="flex items-center gap-1">
            {[...Array(3)].map((_, i) => (
              <span key={i} className="text-sm">
                {i < gameState.lives ? '❤️' : '🖤'}
              </span>
            ))}
            {gameState.lives === 0 && (
              <button
                onClick={restoreLives}
                className="ml-1 text-[9px] px-1.5 py-0.5 bg-red-600 hover:bg-red-500 text-white rounded border border-black animate-pulse cursor-pointer"
              >
                HEAL
              </button>
            )}
          </div>

          {/* Streaks */}
          {gameState.streak > 0 && (
            <div className="hidden sm:flex items-center gap-1 text-orange-400 font-bold">
              <span>🔥</span>
              <span>{gameState.streak} STREAK</span>
            </div>
          )}
        </div>

        {/* HUD Navigation Tabs & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setActiveTab('quest')}
            className={`px-3 py-1 rounded border border-black cursor-pointer ${
              activeTab === 'quest' ? 'bg-cyan-600 text-white font-bold' : 'bg-[#1b2a3a] text-gray-300'
            }`}
          >
            QUESTS
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-3 py-1 rounded border border-black cursor-pointer ${
              activeTab === 'achievements' ? 'bg-cyan-600 text-white font-bold' : 'bg-[#1b2a3a] text-gray-300'
            }`}
          >
            TROPHIES
          </button>
          <button
            onClick={handleBgmToggle}
            className={`px-2.5 py-1 rounded border border-black text-[10px] cursor-pointer ${
              isBgmOn ? 'bg-[#79a86b] text-black font-bold' : 'bg-[#1b2a3a] text-gray-400'
            }`}
            title="Toggle 8-bit Chiptune Background Music"
          >
            🎵 {isBgmOn ? 'BGM ON' : 'BGM OFF'}
          </button>
          <button
            onClick={() => {
              soundEffects.close();
              onClose();
            }}
            className="px-3 py-1 rounded border-2 border-black bg-red-600 hover:bg-red-500 text-white font-bold cursor-pointer"
          >
            ✕ CLOSE
          </button>
        </div>
      </div>

      {/* Main Game Container */}
      <div className="w-full max-w-6xl mx-auto flex-1 bg-[#0c1521] border-3 border-black rounded-xl mt-2 overflow-hidden flex flex-col p-3 sm:p-5 relative">
        
        {/* World Selection Tabs */}
        {activeTab === 'quest' && !activeLevel && (
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#20364c]">
              {gameWorlds.map((world) => {
                const isUnlocked = gameState.unlockedWorlds.includes(world.id);
                const isSelected = selectedWorldId === world.id;
                return (
                  <button
                    key={world.id}
                    disabled={!isUnlocked}
                    onClick={() => handleSelectWorld(world.id)}
                    className={`px-4 py-2 rounded-lg border-2 border-black font-silk text-xs tracking-wider flex items-center gap-2 flex-shrink-0 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1a3854] text-cyan-300 border-cyan-400 shadow-md font-bold'
                        : isUnlocked
                        ? 'bg-[#142332] text-gray-300 hover:bg-[#1a2d40]'
                        : 'bg-[#0f1720] text-gray-600 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <span>{world.icon}</span>
                    <span>{world.name}</span>
                    {!isUnlocked && <span>🔒</span>}
                  </button>
                );
              })}
            </div>

            {/* Selected World Overview */}
            <div className="mt-3 bg-[#112030] border border-[#213a52] rounded-lg p-3 sm:p-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-silk font-bold text-white flex items-center gap-2">
                  <span>{currentWorld.icon}</span>
                  <span>{currentWorld.name}</span>
                  <span className="text-xs font-mono text-cyan-400 font-normal">
                    — {currentWorld.district}
                  </span>
                </h3>
                <p className="text-xs font-mono text-gray-300 mt-1 max-w-2xl">
                  {currentWorld.desc}
                </p>
              </div>
              <div className="hidden md:flex flex-col items-end">
                <span className="text-[10px] font-pixel text-yellow-400">
                  BOSS TARGET:
                </span>
                <span className="text-xs font-silk text-red-400 font-bold">
                  {currentWorld.bossName}
                </span>
              </div>
            </div>

            {/* Level Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-4 overflow-y-auto flex-1 pr-1">
              {currentWorld.levels.map((lvl, index) => {
                const isCompleted = gameState.completedLevels.includes(lvl.id);
                const isBoss = lvl.type === 'boss';
                return (
                  <div
                    key={lvl.id}
                    onClick={() => handleStartLevel(lvl)}
                    className={`p-4 rounded-xl border-3 border-black flex flex-col justify-between transition-transform duration-100 hover:scale-102 cursor-pointer shadow-lg relative overflow-hidden ${
                      isBoss
                        ? 'bg-gradient-to-b from-[#2a0b12] to-[#140508] border-red-600/80 hover:border-red-400'
                        : isCompleted
                        ? 'bg-[#122822] border-[#79a86b]/80 hover:border-[#79a86b]'
                        : 'bg-[#132333] border-[#223d57] hover:border-cyan-400'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-pixel mb-1.5">
                        <span className={isBoss ? 'text-red-400 font-bold' : 'text-cyan-400'}>
                          {isBoss ? '🔥 BOSS BATTLE' : `STAGE 0${index + 1}`}
                        </span>
                        {isCompleted && (
                          <span className="text-[#9dd48d] font-bold">
                            ⭐⭐⭐
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs sm:text-sm font-silk font-bold text-white leading-snug">
                        {lvl.title}
                      </h4>
                    </div>

                    <div className="mt-4 pt-3 border-t border-black/40 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-yellow-300 font-bold">
                        +{lvl.xpReward} XP
                      </span>
                      <span className="text-yellow-400">
                        +{lvl.coinReward} 🪙
                      </span>
                      <button className="px-2 py-0.5 rounded bg-[#e8a838] text-black font-silk text-[10px] font-bold">
                        {isCompleted ? 'REPLAY' : 'START'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Active Challenge Arena View */}
        {activeTab === 'quest' && activeLevel && (
          <div className="flex flex-col h-full justify-between">
            {/* Challenge Header */}
            <div className="flex items-center justify-between border-b border-[#213a52] pb-3">
              <div>
                <span className="text-[10px] font-pixel text-cyan-400 uppercase tracking-widest">
                  {currentWorld.name}
                </span>
                <h3 className="text-sm sm:text-lg font-silk font-bold text-white">
                  {activeLevel.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveLevel(null)}
                className="text-xs font-silk text-gray-400 hover:text-white px-3 py-1 rounded bg-[#172635] border border-[#2b4157] cursor-pointer"
              >
                ← BACK TO WORLD MAP
              </button>
            </div>

            {/* Interactive Challenge Body */}
            <div className="flex-1 overflow-y-auto py-3 space-y-4">
              {/* Question Card */}
              <div className="bg-[#122030] border-2 border-black rounded-lg p-4 sm:p-5 shadow">
                <div className="text-xs sm:text-sm font-silk text-cyan-200 leading-relaxed">
                  {activeLevel.question}
                </div>
              </div>

              {/* Options Grid */}
              <div className="space-y-2.5">
                {activeLevel.options.map((opt, optIdx) => {
                  const isSelected = selectedOption === optIdx;
                  const isCorrect = optIdx === activeLevel.correctIndex;
                  let optStyle = 'bg-[#162738] border-black text-gray-200 hover:bg-[#20364d] hover:border-cyan-500';

                  if (answeredState) {
                    if (isCorrect) {
                      optStyle = 'bg-[#1b442b] border-[#79a86b] text-[#a3d993] font-bold shadow-lg';
                    } else if (isSelected && !isCorrect) {
                      optStyle = 'bg-[#4a1616] border-red-500 text-red-300 font-bold';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={answeredState !== null}
                      onClick={() => handleAnswerSubmit(optIdx)}
                      className={`w-full text-left p-3 sm:p-4 rounded-lg border-2 font-mono text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${optStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs flex-shrink-0 font-bold mt-0.5">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="flex-1 leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback Explanation */}
              {answeredState && (
                <div
                  className={`p-4 rounded-lg border-2 font-mono text-xs sm:text-sm animate-in fade-in duration-200 ${
                    answeredState === 'correct'
                      ? 'bg-[#102d1d] border-[#79a86b] text-[#b4ebb4]'
                      : 'bg-[#331115] border-red-500 text-red-200'
                  }`}
                >
                  <div className="font-silk font-bold text-sm mb-1">
                    {answeredState === 'correct' ? '🎉 MISSION SUCCESSFUL!' : '❌ INCORRECT CALCULATION'}
                  </div>
                  <p className="leading-relaxed">{activeLevel.explanation}</p>
                </div>
              )}
            </div>

            {/* Interactive Action Footer with Spidey */}
            <div className="pt-3 border-t border-[#213a52] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="px-3 py-1.5 rounded bg-[#1c2e40] border border-cyan-500/40 text-cyan-300 text-xs font-silk hover:bg-[#274059] cursor-pointer"
                >
                  💡 {showHint ? 'HIDE HINT' : 'VIEW HINT'}
                </button>
                {showHint && (
                  <span className="text-xs font-mono text-yellow-300 max-w-md italic">
                    "{activeLevel.hint}"
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {answeredState && (
                  <button
                    onClick={() => {
                      setActiveLevel(null);
                      setAnsweredState(null);
                      setSelectedOption(null);
                    }}
                    className="px-6 py-2 rounded-lg border-2 border-black bg-[#e8a838] hover:bg-[#ffd277] text-black font-silk text-xs font-bold uppercase tracking-wider cursor-pointer shadow"
                  >
                    CONTINUE MISSION
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Trophies & Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="flex flex-col h-full">
            <h3 className="text-sm font-silk font-bold text-cyan-300 mb-3 uppercase tracking-wider">
              🏆 ENGINEERING TROPHIES &amp; MILESTONES
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 overflow-y-auto flex-1 pr-1">
              {achievementsList.map((ach) => {
                const isEarned = gameState.unlockedAchievements.includes(ach.id);
                return (
                  <div
                    key={ach.id}
                    className={`p-4 rounded-xl border-2 flex items-start gap-3 transition-all ${
                      isEarned
                        ? 'bg-[#152a3d] border-cyan-400 text-white shadow-md'
                        : 'bg-[#0f1722] border-[#1d2f42] text-gray-600 opacity-60'
                    }`}
                  >
                    <span className="text-2xl">{ach.icon}</span>
                    <div className="flex-1">
                      <div className="font-silk text-xs font-bold text-white flex items-center justify-between">
                        <span>{ach.title}</span>
                        {isEarned && <span className="text-[#79a86b] text-[10px]">UNLOCKED</span>}
                      </div>
                      <p className="text-[11px] font-mono text-gray-300 mt-1 leading-snug">
                        {ach.desc}
                      </p>
                      <span className="text-[10px] font-pixel text-yellow-400 mt-2 block">
                        +{ach.xpReward} XP
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
