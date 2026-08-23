import React, { useState } from 'react';
import { engineeringWatchItems } from '../data/portfolioData';
import { soundEffects } from '../utils/audio';

export default function EngineeringWatchOverlay({ isOpen = false, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const currentItem = engineeringWatchItems[currentIndex];

  const handlePrev = () => {
    soundEffects.click();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : engineeringWatchItems.length - 1));
  };

  const handleNext = () => {
    soundEffects.click();
    setCurrentIndex((prev) => (prev < engineeringWatchItems.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="absolute inset-0 z-40 bg-[#0d1622]/95 backdrop-blur-md flex flex-col p-4 md:p-8 select-none overflow-hidden scanline-overlay">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b-2 border-black bg-[#101b29] p-4 rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-amber-400 border border-black" />
          <h2 className="text-xs md:text-sm font-silk font-bold text-white tracking-widest uppercase">
            {currentItem.edition}
          </h2>
        </div>

        <button
          onClick={() => {
            soundEffects.close();
            onClose();
          }}
          className="flex items-center gap-1.5 px-3 py-1 rounded border border-black bg-[#1f3144] hover:bg-[#324d6b] text-white font-silk text-xs uppercase"
        >
          <span>✕</span>
          <span>CLOSE</span>
        </button>
      </div>

      {/* Main Carousel Card Body (Matching Screenshot 6) */}
      <div className="flex-1 bg-[#0b131e] border-x-2 border-b-2 border-black p-4 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 overflow-y-auto">
        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          className="hidden md:flex w-10 h-10 rounded border-2 border-black bg-[#1b2b3a] hover:bg-cyan-500 hover:text-black text-cyan-300 items-center justify-center font-silk text-sm font-bold shadow-lg transition-all"
          aria-label="Previous slide"
        >
          ◀
        </button>

        {/* Center Content Card */}
        <div className="flex-1 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
          {/* Card Image */}
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden border-2 border-black bg-black shadow-xl">
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="w-full h-full object-cover object-top"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3">
              <span className="text-[9px] font-pixel text-cyan-300 uppercase px-2 py-1 bg-black/80 border border-cyan-500/30 rounded">
                {currentItem.badge}
              </span>
            </div>
          </div>

          {/* Card Text & Details */}
          <div className="flex flex-col justify-center space-y-4">
            <div>
              <span className="text-[10px] font-silk text-[#6991b5] uppercase tracking-widest">
                {currentItem.subtitle}
              </span>
              <h3 className="text-lg md:text-xl font-silk font-bold text-white tracking-wider mt-1">
                {currentItem.title}
              </h3>
            </div>

            <p className="text-xs md:text-sm font-mono text-gray-300 leading-relaxed">
              {currentItem.desc}
            </p>

            {/* Bullet Highlights */}
            <ul className="space-y-2 pt-2 border-t border-[#1e3042]">
              {currentItem.bulletPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs font-mono text-cyan-300/90">
                  <span className="text-cyan-400 font-bold mt-0.5">■</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          className="hidden md:flex w-10 h-10 rounded border-2 border-black bg-[#1b2b3a] hover:bg-cyan-500 hover:text-black text-cyan-300 items-center justify-center font-silk text-sm font-bold shadow-lg transition-all"
          aria-label="Next slide"
        >
          ▶
        </button>
      </div>

      {/* Bottom Carousel Indicator Dots & Mobile Nav */}
      <div className="flex items-center justify-between p-3 bg-[#0d1622] border-x-2 border-b-2 border-black rounded-b-lg">
        <button onClick={handlePrev} className="md:hidden px-3 py-1 bg-[#1b2b3a] text-cyan-300 rounded font-silk text-xs">
          ◀ PREV
        </button>

        <div className="flex items-center gap-2 mx-auto">
          {engineeringWatchItems.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                soundEffects.click();
                setCurrentIndex(idx);
              }}
              className={`w-3 h-2 border border-black transition-all ${
                currentIndex === idx ? 'bg-cyan-400 w-6' : 'bg-[#22364a] hover:bg-[#34516d]'
              }`}
            />
          ))}
        </div>

        <button onClick={handleNext} className="md:hidden px-3 py-1 bg-[#1b2b3a] text-cyan-300 rounded font-silk text-xs">
          NEXT ▶
        </button>
      </div>
    </div>
  );
}
