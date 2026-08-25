import React, { useState } from 'react';
import { engineeringWatchItems } from '../data/portfolioData';
import { PixelSpiderMask } from './PixelIcons';
import { soundEffects } from '../utils/audio';

export default function EngineeringWatchOverlay({ isOpen = false, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const currentItem = engineeringWatchItems[currentIndex];

  const handleNext = () => {
    soundEffects.select();
    setCurrentIndex((prev) => (prev + 1) % engineeringWatchItems.length);
  };

  const handlePrev = () => {
    soundEffects.select();
    setCurrentIndex((prev) => (prev - 1 + engineeringWatchItems.length) % engineeringWatchItems.length);
  };

  return (
    <div
      className="absolute inset-0 z-40 bg-[#0d1622]/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none scanline-overlay animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl h-[90%] bg-[#121f2d] border-3 sm:border-4 border-black rounded-xl p-4 sm:p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: '0 25px 60px rgba(0,0,0,0.9), inset 2px 2px 0 rgba(255,255,255,0.15)'
        }}
      >
        {/* Background Decorative Logo */}
        <div className="absolute -right-8 -top-8 opacity-10 pointer-events-none w-56 h-56">
          <PixelSpiderMask className="w-full h-full" />
        </div>

        {/* Top Header */}
        <div className="flex items-center justify-between border-b-2 border-[#1e3348] pb-3 mb-3">
          <div className="flex items-center gap-2.5">
            <span className="px-2 py-0.5 rounded bg-cyan-400 text-black font-silk text-[10px] font-bold uppercase tracking-wider">
              {currentItem.edition}
            </span>
            <h3 className="font-silk text-xs sm:text-sm text-cyan-300 tracking-wider uppercase font-bold">
              WEB WATCH // ENGINEERING DOSSIER
            </h3>
          </div>

          <button
            onClick={() => {
              soundEffects.close();
              onClose();
            }}
            className="flex items-center gap-1 font-silk text-xs text-gray-300 hover:text-white bg-[#1e3348] hover:bg-[#2c4866] px-3 py-1 rounded border border-black cursor-pointer transition-colors"
          >
            <span>✕</span>
            <span>CLOSE</span>
          </button>
        </div>

        {/* Carousel Content (3D perspective and slide transition) */}
        <div className="flex-1 flex flex-col md:flex-row gap-5 overflow-y-auto items-center py-2">
          {/* Project Preview Image */}
          <div className="w-full md:w-1/2 h-52 sm:h-64 rounded-lg overflow-hidden border-2 border-black bg-black relative shadow-lg flex-shrink-0 group">
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                e.target.src = '/images/photo.jpeg';
              }}
            />
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 border border-cyan-400/60 font-silk text-[9px] text-cyan-300 uppercase tracking-wider">
              {currentItem.badge}
            </div>
          </div>

          {/* Project Details */}
          <div className="w-full md:w-1/2 flex flex-col justify-between space-y-3">
            <div>
              <h2 className="font-silk text-sm sm:text-base text-white tracking-wide font-bold">
                {currentItem.title}
              </h2>
              <p className="font-mono text-xs text-cyan-300 font-semibold mt-1">
                {currentItem.subtitle}
              </p>
              <p className="font-mono text-xs text-gray-300 mt-2.5 leading-relaxed">
                {currentItem.desc}
              </p>

              {/* Bullet Points */}
              <div className="mt-3 space-y-1.5">
                {currentItem.bulletPoints.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2 text-[11px] font-mono text-gray-300">
                    <span className="text-cyan-400 font-bold">▶</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct GitHub Link */}
            <div className="pt-2">
              <a
                href={currentItem.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEffects.click()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#e8a838] hover:bg-[#ffd277] text-black font-silk text-xs font-bold uppercase tracking-wider border-2 border-black shadow-[0_3px_0_#000] active:translate-y-1 transition-all"
              >
                <span>OPEN GITHUB REPO</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Carousel Controls & Pagination Dots */}
        <div className="border-t border-[#1e3348] pt-3 mt-2 flex items-center justify-between">
          <button
            onClick={handlePrev}
            className="px-3 sm:px-4 py-1.5 rounded bg-[#1e3348] hover:bg-[#2c4866] text-white font-silk text-xs border border-black cursor-pointer shadow transition-colors"
          >
            ◀ PREV
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {engineeringWatchItems.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  soundEffects.select();
                  setCurrentIndex(i);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  i === currentIndex
                    ? 'bg-cyan-400 w-6'
                    : 'bg-gray-600 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="px-3 sm:px-4 py-1.5 rounded bg-[#1e3348] hover:bg-[#2c4866] text-white font-silk text-xs border border-black cursor-pointer shadow transition-colors"
          >
            NEXT ▶
          </button>
        </div>
      </div>
    </div>
  );
}
