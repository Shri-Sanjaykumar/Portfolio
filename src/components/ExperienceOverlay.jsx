import React from 'react';
import { soundEffects } from '../utils/audio';

// Experience data for TForce India
const EXPERIENCE = {
  company: 'TForce India Private Limited',
  formerName: 'formerly Qcloud Tech',
  role: 'Academic Intern — Generative AI & SAP Technologies',
  period: 'May 2026 – July 2026',
  location: 'Chennai, Tamil Nadu, India',
  type: 'CONFIRMED',
  tech: ['Python', 'Jupyter', 'SAP Generative AI Hub SDK', 'SAP BTP', 'RAG', 'Vector Search', 'SAP ABAP Cloud'],
  responsibilities: [
    'Developed enterprise Generative AI workflows using Python and SAP Generative AI Hub SDK on SAP BTP platform',
    'Implemented Retrieval-Augmented Generation (RAG) systems with vector search for enterprise document retrieval',
    'Integrated backend services with SAP ABAP Cloud for enterprise-grade workflow automation',
    'Built contextual AI reasoning systems over proprietary enterprise schemas maintaining data governance',
    'Delivered production-ready AI pipeline components within a structured enterprise software environment',
  ],
  highlights: [
    { label: 'DOMAIN',    value: 'Enterprise Gen AI' },
    { label: 'PLATFORM',  value: 'SAP BTP'          },
    { label: 'DURATION',  value: '3 Months'          },
    { label: 'LOCATION',  value: 'Chennai, India'    },
  ],
  confidentialNote: 'Selected implementation details are omitted where required by company confidentiality policy.',
};

export default function ExperienceOverlay({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="absolute inset-0 z-40 flex items-center justify-center"
      style={{ background: 'rgba(8,14,24,0.97)' }}
      onClick={onClose}
    >
      {/* Spidey decorative */}
      <img src="/spidey/spiderman-swinging.png" alt="" className="absolute pointer-events-none"
        style={{ width:220,height:320,right:-20,top:-20,objectFit:'contain',opacity:0.07,
          filter:'drop-shadow(0 0 20px rgba(220,38,38,0.4))', transform:'rotate(10deg)' }}
      />

      <div
        className="relative w-full max-w-2xl mx-4 overflow-hidden"
        style={{
          background:'rgba(12,20,32,0.99)',
          border:'3px solid #000',
          borderRadius:14,
          boxShadow:'0 25px 60px rgba(0,0,0,0.9), inset 2px 2px 0 rgba(255,255,255,0.07)',
          maxHeight:'90vh',
          overflowY:'auto',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4"
          style={{ background:'rgba(12,20,32,0.99)', borderBottom:'2px solid rgba(30,61,90,0.6)' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{background:'#a07ef5',boxShadow:'0 0 6px #a07ef5'}}/>
            <span className="font-silk text-xs font-bold text-white tracking-widest uppercase">
              EXPERIENCE (TFORCE)
            </span>
            <span className="w-2 h-4 inline-block animate-cursor" style={{background:'#e2f0fb'}}/>
          </div>
          <button onClick={onClose}
            className="font-silk text-[10px] cursor-pointer hover:text-white transition-colors flex items-center gap-1"
            style={{color:'#8cb0cc'}}
          >
            ✕ CLOSE
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Company card */}
          <div className="flex items-start gap-4">
            {/* Company logo placeholder — Spider-Man themed */}
            <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-lg"
              style={{ background:'rgba(14,25,40,0.9)', border:'2px solid rgba(30,61,90,0.6)' }}
            >
              <img src="/spidey/spiderman-small.png" alt="" className="w-10 h-10 object-contain"/>
            </div>
            <div>
              <h2 className="font-silk text-sm sm:text-base font-bold text-white uppercase tracking-wide">
                {EXPERIENCE.company}
              </h2>
              <div className="font-mono text-[10px] mt-0.5" style={{color:'#6b7280'}}>
                {EXPERIENCE.formerName}
              </div>
              <div className="font-silk text-[11px] mt-1" style={{color:'#67e8f9'}}>
                {EXPERIENCE.role}
              </div>
              <div className="font-mono text-[10px] mt-0.5" style={{color:'#9ca3af'}}>
                {EXPERIENCE.period}  ·  {EXPERIENCE.location}
              </div>
            </div>
          </div>

          {/* Highlights grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {EXPERIENCE.highlights.map(h => (
              <div key={h.label} className="text-center p-2 rounded-lg"
                style={{background:'rgba(30,61,90,0.2)',border:'1px solid rgba(30,61,90,0.5)'}}
              >
                <div className="font-silk text-[8px] tracking-widest" style={{color:'#f5a742'}}>{h.label}</div>
                <div className="font-silk text-[10px] text-white font-bold mt-1">{h.value}</div>
              </div>
            ))}
          </div>

          {/* Tech stack */}
          <div>
            <div className="font-silk text-[9px] tracking-widest mb-2" style={{color:'#67e8f9'}}>
              TECHNOLOGY STACK
            </div>
            <div className="flex flex-wrap gap-2">
              {EXPERIENCE.tech.map(t => (
                <span key={t}
                  className="font-mono text-[9px] px-2.5 py-1 rounded font-bold"
                  style={{ background:'rgba(20,40,60,0.8)', border:'1px solid rgba(30,80,120,0.6)', color:'#a5f3fc' }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Responsibilities */}
          <div>
            <div className="font-silk text-[9px] tracking-widest mb-3" style={{color:'#67e8f9'}}>
              KEY RESPONSIBILITIES
            </div>
            <ul className="space-y-2.5">
              {EXPERIENCE.responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold"
                    style={{background:'rgba(20,40,60,0.8)',border:'1px solid rgba(30,80,120,0.6)',color:'#67e8f9',marginTop:1}}
                  >
                    {i + 1}
                  </span>
                  <span className="font-mono text-[10px] sm:text-xs text-gray-300 leading-relaxed">{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Confidential notice */}
          <div className="p-3 rounded-lg flex items-start gap-2"
            style={{ background:'rgba(245,167,66,0.08)', border:'1px solid rgba(245,167,66,0.3)' }}
          >
            <span className="text-sm flex-shrink-0">🔒</span>
            <p className="font-mono text-[9px] sm:text-[10px]" style={{color:'#d97706'}}>
              {EXPERIENCE.confidentialNote}
            </p>
          </div>

          {/* CTA */}
          <div className="flex gap-3">
            <a href="https://www.linkedin.com/in/shri-sanjaykumar-v-588bab28a/" target="_blank" rel="noopener noreferrer"
              className="btn-arcade-yellow px-5 py-2 text-[10px] font-bold rounded-lg cursor-pointer"
              onClick={() => { try { soundEffects.click?.(); } catch {} }}
            >
              VIEW ON LINKEDIN
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
