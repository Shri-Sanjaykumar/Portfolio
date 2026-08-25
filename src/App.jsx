import React from 'react';
import TrackerFrame from './components/TrackerFrame';

export default function App() {
  return (
    <div className="w-full h-full min-h-screen bg-[#0a121d] flex flex-col overflow-hidden">
      <TrackerFrame />
    </div>
  );
}
