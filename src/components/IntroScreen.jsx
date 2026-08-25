import React, { useState } from 'react';
import { setSoundEnabled, soundEffects } from '../utils/audio';

export default function IntroScreen({ onStart }) {
  const [isClosing, setIsClosing] = useState(false);

  const handleSelectSound = (enableSound) => {
    soundEffects.select();
    setSoundEnabled(enableSound);
    setIsClosing(true);
    setTimeout(() => {
      onStart(enableSound);
    }, 250);
  };

  return (
    <div
      className={`absolute inset-0 z-50 bg-[#0d1622]/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 select-none scanline-overlay transition-all duration-300 ${
        isClosing ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Hanging Spiderman from Top */}
      <div className="flex flex-col items-center mb-3 animate-swing">
        <div className="w-[2px] h-12 sm:h-16 bg-gradient-to-b from-white via-white/80 to-cyan-300 shadow-[0_0_8px_white]" />
        <div className="relative w-16 h-24 sm:w-20 sm:h-28">
          <img
            src="/spidey/spiderman-hanging-transparent.png"
            alt="Hanging Spiderman"
            className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]"
            onError={(e) => {
              e.target.src = '/spidey/marvel-comics-white-background-spider-man-wallpaper-preview-Photoroom.png';
            }}
          />
        </div>
      </div>

      {/* Main Intro Card */}
      <div className="w-full max-w-lg text-center flex flex-col items-center">
        {/* Header Text matching ezgif-frame-020 */}
        <h2 className="font-silk text-xs sm:text-sm md:text-base text-[#e2f0fb] leading-relaxed tracking-wider uppercase font-bold mb-4 px-4 drop-shadow">
          WELCOME TO THE SANJAYKUMAR TRACKER.
          <br />
          <span className="text-cyan-300">INTERACT WITH THE MAP TO VIEW</span>
          <br />
          ENGINEERING SIGHTINGS &amp; MISSIONS
          <br />
          ALL OVER THE WORLD.
        </h2>

        {/* Animated 8-bit Audio Equalizer Bars */}
        <div className="flex items-center justify-center gap-1.5 my-4 h-8">
          {[40, 70, 90, 60, 100, 80, 50, 85, 45].map((height, i) => (
            <div
              key={i}
              className="w-1.5 sm:w-2 bg-gradient-to-t from-cyan-600 to-cyan-300 rounded-xs transition-all duration-300 animate-pulse"
              style={{
                height: `${height}%`,
                animationDelay: `${i * 120}ms`
              }}
            />
          ))}
        </div>

        {/* Prompt */}
        <p className="font-silk text-[10px] sm:text-xs text-gray-300 tracking-wider uppercase mb-5">
          CHOOSE YOUR SETTINGS AND START TRACKING
        </p>

        {/* Sound Selection Buttons matching Screenshot ezgif-frame-020 */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={() => handleSelectSound(true)}
            onMouseEnter={() => soundEffects.click()}
            className="px-5 sm:px-8 py-2.5 rounded-lg border-2 sm:border-3 border-black bg-cyan-400 text-black font-silk text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[0_4px_0_#000,inset_1px_1px_0_rgba(255,255,255,0.6)] hover:bg-cyan-300 hover:scale-105 active:translate-y-1 transition-all cursor-pointer"
          >
            SOUND ON
          </button>

          <button
            onClick={() => handleSelectSound(false)}
            onMouseEnter={() => soundEffects.click()}
            className="px-5 sm:px-8 py-2.5 rounded-lg border-2 sm:border-3 border-black bg-[#1f3144] text-gray-300 font-silk text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[0_4px_0_#000] hover:bg-[#2c455f] hover:text-white active:translate-y-1 transition-all cursor-pointer"
          >
            SOUND OFF
          </button>
        </div>
      </div>
    </div>
  );
}
