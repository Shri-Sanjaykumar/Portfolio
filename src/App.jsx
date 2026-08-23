import React from 'react';
import { GameProvider } from './context/GameContext';
import TrackerFrame from './components/TrackerFrame';

export default function App() {
  return (
    <GameProvider>
      <div className="w-full min-h-screen bg-[#0a121d] overflow-x-hidden">
        <TrackerFrame />
      </div>
    </GameProvider>
  );
}
