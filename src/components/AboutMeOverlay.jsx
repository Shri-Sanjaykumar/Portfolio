import React from 'react';
import { profile } from '../data/portfolioData';
import { soundEffects } from '../utils/audio';

export default function AboutMeOverlay({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="absolute inset-0 z-40 flex items-center justify-center"
      style={{ background: 'rgba(8,14,24,0.97)' }}
      onClick={onClose}
    >
      {/* Decorative Spider-Man behind */}
      <img src="/spidey/spiderman-sense.png" alt="" className="absolute pointer-events-none"
        style={{ width:300,height:400,right:-30,bottom:-30,objectFit:'contain',opacity:0.08,
          filter:'drop-shadow(0 0 30px rgba(220,38,38,0.3))', transform:'scaleX(-1)' }}
      />

      <div
        className="relative w-full max-w-3xl mx-4 flex flex-col sm:flex-row gap-6 overflow-hidden"
        style={{
          background:'rgba(12,20,32,0.98)',
          border:'3px solid #000',
          borderRadius:14,
          boxShadow:'0 25px 60px rgba(0,0,0,0.9), inset 2px 2px 0 rgba(255,255,255,0.08)',
          padding:24,
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="absolute top-3 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{background:'#67e8f9',boxShadow:'0 0 6px #67e8f9'}}/>
            <span className="font-silk text-xs font-bold text-white tracking-widest">ABOUT ME</span>
            <span className="w-2 h-4 inline-block animate-cursor" style={{background:'#e2f0fb'}}/>
          </div>
          <button onClick={onClose}
            className="font-silk text-[10px] cursor-pointer hover:text-white transition-colors flex items-center gap-1"
            style={{color:'#8cb0cc'}}
          >
            ✕ CLOSE
          </button>
        </div>

        {/* Profile photo — THIS is the one place we use the personal photo */}
        <div className="flex-shrink-0 flex flex-col items-center gap-3 mt-10">
          <div
            className="relative overflow-hidden"
            style={{
              width:160,height:190,
              border:'3px solid #1e3d5a',
              borderRadius:10,
              boxShadow:'0 0 30px rgba(0,229,255,0.15), 0 10px 30px rgba(0,0,0,0.8)',
            }}
          >
            <img
              src="/images/photo.jpeg"
              alt="Shri Sanjaykumar V"
              className="w-full h-full object-cover"
            />
            {/* Corner web decoration */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <svg viewBox="0 0 160 190" className="w-full h-full opacity-30">
                <line x1="0" y1="0" x2="30" y2="0" stroke="#67e8f9" strokeWidth="1.5"/>
                <line x1="0" y1="0" x2="0" y2="30" stroke="#67e8f9" strokeWidth="1.5"/>
                <line x1="160" y1="0" x2="130" y2="0" stroke="#67e8f9" strokeWidth="1.5"/>
                <line x1="160" y1="0" x2="160" y2="30" stroke="#67e8f9" strokeWidth="1.5"/>
                <line x1="0" y1="190" x2="30" y2="190" stroke="#67e8f9" strokeWidth="1.5"/>
                <line x1="0" y1="190" x2="0" y2="160" stroke="#67e8f9" strokeWidth="1.5"/>
                <line x1="160" y1="190" x2="130" y2="190" stroke="#67e8f9" strokeWidth="1.5"/>
                <line x1="160" y1="190" x2="160" y2="160" stroke="#67e8f9" strokeWidth="1.5"/>
              </svg>
            </div>
          </div>
          {/* Handle tag */}
          <div className="font-silk text-[9px] text-cyan-400 tracking-widest text-center">
            {profile.handle}
          </div>
          {/* Social links */}
          <div className="flex flex-col gap-1 w-full">
            <a href={profile.github} target="_blank" rel="noopener noreferrer"
              className="btn-arcade-yellow px-3 py-1 text-[9px] font-bold rounded cursor-pointer text-center"
              onClick={() => { try { soundEffects.click?.(); } catch {} }}
            >GITHUB</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
              className="px-3 py-1 text-[9px] font-silk font-bold rounded cursor-pointer text-center transition-all hover:bg-[#1a3a5c]"
              style={{background:'#0e2030',border:'2px solid #1e3d5a',color:'#67e8f9',boxShadow:'0 3px 0 #000'}}
              onClick={() => { try { soundEffects.click?.(); } catch {} }}
            >LINKEDIN</a>
            <a href={`mailto:${profile.email}`}
              className="px-3 py-1 text-[9px] font-silk font-bold rounded cursor-pointer text-center transition-all hover:bg-[#1a3a5c]"
              style={{background:'#0e2030',border:'2px solid #1e3d5a',color:'#67e8f9',boxShadow:'0 3px 0 #000'}}
            >EMAIL ME</a>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col gap-4 mt-10 min-w-0">
          {/* Name */}
          <div>
            <h2 className="font-silk text-lg sm:text-2xl font-bold uppercase"
              style={{
                background:'linear-gradient(180deg,#e52d27 0%,#ff6b6b 50%,#b31217 100%)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
              }}
            >
              SHRI SANJAYKUMAR V
            </h2>
            <div className="font-silk text-[10px] tracking-widest mt-1" style={{color:'#67e8f9'}}>
              M.TECH INTEGRATED SOFTWARE ENGINEERING @ VIT VELLORE
            </div>
            <div className="font-silk text-[9px] mt-0.5" style={{color:'#f5a742'}}>
              CGPA: 9.12 / 10.0  ·  GRADUATION: 2028
            </div>
          </div>

          {/* Bio */}
          <p className="font-mono text-xs sm:text-sm text-gray-300 leading-relaxed">
            {profile.bio}
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label:'CGPA', value:'9.12', sub:'Out of 10.0' },
              { label:'PROJECTS', value:'5+', sub:'Live & Shipped' },
              { label:'SPONSORSHIP', value:'₹60L+', sub:'Non-monetary' },
            ].map(stat => (
              <div key={stat.label} className="text-center p-2 rounded-lg"
                style={{background:'rgba(30,61,90,0.3)',border:'1px solid rgba(30,61,90,0.6)'}}
              >
                <div className="font-silk text-lg font-bold" style={{color:'#f5a742'}}>{stat.value}</div>
                <div className="font-silk text-[8px] text-white tracking-widest">{stat.label}</div>
                <div className="font-mono text-[7px] text-gray-400 mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="p-3 rounded-lg" style={{background:'rgba(14,25,40,0.8)',border:'1px solid rgba(30,61,90,0.5)'}}>
            <div className="font-silk text-[9px] text-cyan-400 mb-1 tracking-widest">EDUCATION</div>
            <div className="font-silk text-xs text-white font-bold">Vellore Institute of Technology</div>
            <div className="font-mono text-[10px] text-gray-300 mt-0.5">M.Tech Integrated in Software Engineering</div>
            <div className="font-mono text-[9px] text-gray-400">Aug 2023 – Present  ·  Expected 2028</div>
          </div>
        </div>
      </div>
    </div>
  );
}
