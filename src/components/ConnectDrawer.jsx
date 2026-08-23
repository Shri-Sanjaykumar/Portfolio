import React, { useState } from 'react';
import { profile, socialPosts } from '../data/portfolioData';
import { PixelSpiderMask } from './PixelIcons';
import { soundEffects } from '../utils/audio';

export default function ConnectDrawer({ isOpen = false, onClose }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    soundEffects.select();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <div
      className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm flex justify-end select-none"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md h-full bg-[#0d1622] border-l-2 border-black p-5 flex flex-col shadow-2xl overflow-y-auto scanline-overlay"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-4">
          <div className="flex items-center gap-2">
            <PixelSpiderMask className="w-5 h-5" />
            <span className="text-xs font-silk font-bold text-cyan-300 tracking-wider">
              CONNECT CENTER
            </span>
          </div>
          <button
            onClick={() => {
              soundEffects.close();
              onClose();
            }}
            className="w-7 h-7 rounded border border-black bg-[#1f3144] hover:bg-[#324d6b] text-white flex items-center justify-center font-silk text-xs"
          >
            ✕
          </button>
        </div>

        {/* Profile Card Header */}
        <div className="bg-[#121f2e] border-2 border-black p-4 rounded-lg mb-5 flex items-center gap-4 shadow-md">
          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-cyan-400 bg-black flex-shrink-0">
            <img
              src={profile.images.profile}
              alt={profile.name}
              className="w-full h-full object-cover object-top"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
          <div>
            <h3 className="text-xs font-silk font-bold text-white tracking-wider">
              {profile.name}
            </h3>
            <p className="text-[10px] font-mono text-cyan-400 mt-0.5">
              {profile.handle}
            </p>
            <p className="text-[10px] font-mono text-gray-400 mt-1 line-clamp-1">
              {profile.positioning}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEffects.click()}
            className="py-2 px-3 rounded border border-black bg-[#1b2b3a] hover:bg-[#283f54] text-white font-silk text-[10px] text-center tracking-wider transition-colors shadow"
          >
            GITHUB ↗
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEffects.click()}
            className="py-2 px-3 rounded border border-black bg-[#1b2b3a] hover:bg-[#283f54] text-white font-silk text-[10px] text-center tracking-wider transition-colors shadow"
          >
            LINKEDIN ↗
          </a>
          <a
            href={`mailto:${profile.email}`}
            onClick={() => soundEffects.click()}
            className="py-2 px-3 rounded border border-black bg-[#1b2b3a] hover:bg-[#283f54] text-white font-silk text-[10px] text-center tracking-wider transition-colors shadow"
          >
            EMAIL ME
          </a>
          <a
            href={profile.resumeUrl}
            download
            onClick={() => soundEffects.click()}
            className="py-2 px-3 rounded border border-black bg-[#e8a838] hover:bg-[#ffd277] text-black font-silk text-[10px] font-bold text-center tracking-wider transition-colors shadow"
          >
            RESUME ↓
          </a>
        </div>

        {/* Message Broadcast Feed (Matching Screenshot 5) */}
        <div className="mb-6 space-y-3">
          <div className="text-[10px] font-silk text-[#6991b5] uppercase tracking-widest px-1">
            ENGINEERING TRANSMISSIONS
          </div>

          {socialPosts.map((post) => (
            <div
              key={post.id}
              className="bg-[#0f1926] border border-[#1e3348] p-3 rounded text-left shadow-sm"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="text-[10px] font-silk font-bold text-white">
                    {post.author}
                  </span>
                </div>
                <span className="text-[9px] font-mono text-[#547a9e]">
                  {post.time}
                </span>
              </div>
              <p className="text-xs font-mono text-gray-300 leading-relaxed">
                {post.text}
              </p>
            </div>
          ))}
        </div>

        {/* Direct Encrypted Message Form */}
        <div className="mt-auto bg-[#0a121c] border-2 border-black p-4 rounded-lg">
          <div className="text-[10px] font-silk text-cyan-400 uppercase tracking-widest mb-3">
            DIRECT TRANSMISSION
          </div>

          {submitted ? (
            <div className="bg-[#79a86b]/20 border border-[#79a86b] p-3 rounded text-center text-xs font-mono text-[#9dd48d]">
              ✓ TRANSMISSION ENCRYPTED &amp; SENT!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2.5">
              <input
                type="text"
                required
                placeholder="YOUR NAME"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#121e2b] border border-[#233a4f] rounded px-2.5 py-1.5 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
              />
              <input
                type="email"
                required
                placeholder="YOUR EMAIL"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#121e2b] border border-[#233a4f] rounded px-2.5 py-1.5 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
              />
              <textarea
                rows={2}
                required
                placeholder="MESSAGE / OPPORTUNITY"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-[#121e2b] border border-[#233a4f] rounded px-2.5 py-1.5 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 resize-none"
              />
              <button
                type="submit"
                className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-silk text-xs font-bold rounded border border-black uppercase tracking-wider shadow transition-colors"
              >
                TRANSMIT MESSAGE
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
