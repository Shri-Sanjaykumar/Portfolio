import React, { createContext, useContext, useState, useEffect } from 'react';
import { gameWorlds, achievementsList } from '../data/gameChallenges';
import { soundEffects } from '../utils/audio';

const GameContext = createContext();

const STORAGE_KEY = 'spidey_engineering_quest_v1';

const initialGameState = {
  xp: 0,
  level: 1,
  coins: 50,
  lives: 3,
  streak: 0,
  completedLevels: [],
  unlockedWorlds: ['world-1'],
  unlockedAchievements: ['ach-first-web'],
  totalWebsShot: 0,
  totalChallengesSolved: 0,
};

export function GameProvider({ children }) {
  const [gameState, setGameState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...initialGameState, ...JSON.parse(saved) };
      }
    } catch (e) {}
    return initialGameState;
  });

  const [recentUnlock, setRecentUnlock] = useState(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    } catch (e) {}
  }, [gameState]);

  // Check achievements on state change
  const checkAchievements = (newState) => {
    const toUnlock = [];

    if (newState.streak >= 3 && !newState.unlockedAchievements.includes('ach-streak-3')) {
      toUnlock.push('ach-streak-3');
    }
    if (newState.completedLevels.includes('lvl-1-4') && !newState.unlockedAchievements.includes('ach-rag-master')) {
      toUnlock.push('ach-rag-master');
    }
    if (newState.completedLevels.includes('lvl-2-3') && !newState.unlockedAchievements.includes('ach-cloud-sentinel')) {
      toUnlock.push('ach-cloud-sentinel');
    }
    if (newState.completedLevels.includes('lvl-3-3') && !newState.unlockedAchievements.includes('ach-solar-prophet')) {
      toUnlock.push('ach-solar-prophet');
    }
    if (newState.completedLevels.includes('lvl-4-3') && !newState.unlockedAchievements.includes('ach-graph-hero')) {
      toUnlock.push('ach-graph-hero');
    }
    if (newState.completedLevels.includes('lvl-5-3') && !newState.unlockedAchievements.includes('ach-devsecops-titan')) {
      toUnlock.push('ach-devsecops-titan');
    }
    if (newState.completedLevels.length >= 15 && !newState.unlockedAchievements.includes('ach-all-worlds')) {
      toUnlock.push('ach-all-worlds');
    }

    if (toUnlock.length > 0) {
      soundEffects.victory();
      const firstAch = achievementsList.find((a) => a.id === toUnlock[0]);
      if (firstAch) {
        setRecentUnlock(firstAch);
        setTimeout(() => setRecentUnlock(null), 4000);
      }
      return [...newState.unlockedAchievements, ...toUnlock];
    }
    return newState.unlockedAchievements;
  };

  // Complete a level
  const completeLevel = (worldId, levelId, xpEarned, coinsEarned) => {
    soundEffects.correct();
    soundEffects.coin();

    setGameState((prev) => {
      const isNewCompletion = !prev.completedLevels.includes(levelId);
      const newCompleted = isNewCompletion ? [...prev.completedLevels, levelId] : prev.completedLevels;
      const newXP = prev.xp + xpEarned;
      const newLevel = Math.floor(newXP / 250) + 1;
      const newCoins = prev.coins + coinsEarned;
      const newStreak = prev.streak + 1;
      const newTotal = prev.totalChallengesSolved + 1;

      // Unlock next world if boss beaten
      const newUnlockedWorlds = [...prev.unlockedWorlds];
      if (levelId === 'lvl-1-4' && !newUnlockedWorlds.includes('world-2')) newUnlockedWorlds.push('world-2');
      if (levelId === 'lvl-2-3' && !newUnlockedWorlds.includes('world-3')) newUnlockedWorlds.push('world-3');
      if (levelId === 'lvl-3-3' && !newUnlockedWorlds.includes('world-4')) newUnlockedWorlds.push('world-4');
      if (levelId === 'lvl-4-3' && !newUnlockedWorlds.includes('world-5')) newUnlockedWorlds.push('world-5');

      const intermediate = {
        ...prev,
        xp: newXP,
        level: newLevel,
        coins: newCoins,
        streak: newStreak,
        completedLevels: newCompleted,
        unlockedWorlds: newUnlockedWorlds,
        totalChallengesSolved: newTotal,
      };

      const updatedAchievements = checkAchievements(intermediate);

      return {
        ...intermediate,
        unlockedAchievements: updatedAchievements,
      };
    });
  };

  // Record incorrect answer
  const failChallenge = () => {
    soundEffects.wrong();
    soundEffects.damage();
    setGameState((prev) => ({
      ...prev,
      lives: Math.max(0, prev.lives - 1),
      streak: 0,
    }));
  };

  // Restore Lives
  const restoreLives = () => {
    soundEffects.select();
    setGameState((prev) => ({
      ...prev,
      lives: 3,
    }));
  };

  // Record Web Shot
  const recordWebShot = () => {
    setGameState((prev) => ({
      ...prev,
      totalWebsShot: prev.totalWebsShot + 1,
    }));
  };

  // Reset Progress
  const resetProgress = () => {
    setGameState(initialGameState);
  };

  const xpCurrentLevel = gameState.xp % 250;
  const xpProgressPercent = Math.min(100, Math.round((xpCurrentLevel / 250) * 100));

  return (
    <GameContext.Provider
      value={{
        gameState,
        xpProgressPercent,
        recentUnlock,
        completeLevel,
        failChallenge,
        restoreLives,
        recordWebShot,
        resetProgress,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);
