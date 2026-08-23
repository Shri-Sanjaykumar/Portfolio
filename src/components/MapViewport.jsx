import React, { useState, useRef, useEffect } from 'react';
import { trackerNodes } from '../data/portfolioData';
import { PixelSpiderMarker, PixelStarMarker, PixelRadarWidget } from './PixelIcons';
import { soundEffects } from '../utils/audio';

export default function MapViewport({
  confirmedActive = true,
  rumoredActive = true,
  onSelectNode,
  selectedNode = null,
  statusToast = null
}) {
  const [zoomLevel, setZoomLevel] = useState('global'); // 'global' | 'india' | 'local'
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState(null);
  const [activePopupNode, setActivePopupNode] = useState(null);
  const viewportRef = useRef(null);

  // Filter nodes based on toggle tabs
  const visibleNodes = trackerNodes.filter(node => {
    if (node.status === 'CONFIRMED' && !confirmedActive) return false;
    if (node.status === 'RUMORED' && !rumoredActive) return false;
    return true;
  });

  // Handle global view reset
  const handleGlobalView = () => {
    soundEffects.click();
    setZoomLevel('global');
    setPanOffset({ x: 0, y: 0 });
  };

  // Handle center to VIT Vellore
  const handleCenterVIT = () => {
    soundEffects.select();
    setZoomLevel('india');
    // Pan offset to focus on India (x: 69%, y: 48%)
    setPanOffset({ x: -19, y: 3 });
  };

  // Mouse drag handlers for tactical map navigation
  const handleMouseDown = (e) => {
    // Don't drag if clicking marker or button
    if (e.target.closest('button') || e.target.closest('.map-marker') || e.target.closest('.node-popup')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    // Bound the pan
    const maxPan = zoomLevel === 'india' ? 120 : 60;
    setPanOffset({
      x: Math.max(-maxPan, Math.min(maxPan, newX)),
      y: Math.max(-maxPan, Math.min(maxPan, newY))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Marker Click
  const handleMarkerClick = (node, e) => {
    e.stopPropagation();
    soundEffects.marker();
    setActivePopupNode(node);
  };

  return (
    <div
      ref={viewportRef}
      className="relative w-full h-full bg-[#0d1622] overflow-hidden select-none cursor-grab active:cursor-grabbing border border-black"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Top Coordinate Rulers */}
      <div className="absolute top-0 inset-x-0 h-4 bg-[#0a111a]/90 border-b border-[#1b2b3d] z-20 flex items-center justify-between px-3 text-[8px] font-mono text-[#4d7394] pointer-events-none">
        {['180°W', '120°W', '60°W', '0°', '60°E', '120°E', '180°E'].map((coord, i) => (
          <span key={i} className="flex flex-col items-center">
            <span>{coord}</span>
            <span className="w-px h-1.5 bg-[#253b52]" />
          </span>
        ))}
      </div>

      {/* Left Coordinate Rulers */}
      <div className="absolute left-0 inset-y-0 w-4 bg-[#0a111a]/90 border-r border-[#1b2b3d] z-20 flex flex-col items-center justify-between py-6 text-[8px] font-mono text-[#4d7394] pointer-events-none">
        {['80°N', '40°N', '0°', '40°S', '80°S'].map((coord, i) => (
          <span key={i} className="flex items-center">
            <span className="h-px w-1.5 bg-[#253b52]" />
            <span className="-rotate-90 origin-center text-[7px]">{coord}</span>
          </span>
        ))}
      </div>

      {/* Interactive Map Transform Canvas */}
      <div
        className="w-full h-full transition-transform duration-500 ease-out origin-center"
        style={{
          transform: `scale(${zoomLevel === 'india' ? 1.7 : 1}) translate(${panOffset.x}px, ${panOffset.y}px)`
        }}
      >
        {/* World Map Vector SVG */}
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full absolute inset-0 object-cover"
          preserveAspectRatio="none"
        >
          {/* Tactical Grid Background */}
          <defs>
            <pattern id="tactical-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#162536" strokeWidth="0.75" strokeDasharray="3,3" />
            </pattern>
            <linearGradient id="ocean-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0a121c" />
              <stop offset="100%" stopColor="#0e1b29" />
            </linearGradient>
          </defs>

          {/* Oceans */}
          <rect width="1000" height="500" fill="url(#ocean-gradient)" />
          <rect width="1000" height="500" fill="url(#tactical-grid)" />

          {/* Continents Vectors (Stylized Dark Navy Landmasses) */}
          <g fill="#142233" stroke="#223954" strokeWidth="1">
            {/* North America */}
            <path d="M120,60 L240,55 L280,100 L250,150 L200,160 L180,210 L160,230 L130,190 L100,170 L80,120 Z" />
            {/* South America */}
            <path d="M220,250 L280,260 L320,300 L290,400 L240,440 L210,380 L200,290 Z" />
            {/* Europe */}
            <path d="M440,65 L550,60 L570,120 L530,160 L470,170 L430,130 L420,90 Z" />
            {/* Africa */}
            <path d="M430,180 L540,175 L570,240 L540,350 L480,380 L440,320 L410,240 Z" />
            {/* Asia */}
            <path d="M570,60 L850,55 L880,160 L820,240 L760,270 L720,220 L680,290 L650,230 L570,170 Z" />
            {/* Australia */}
            <path d="M780,310 L870,300 L890,370 L840,410 L770,380 Z" />
          </g>

          {/* Major High-Tech Flight/Data Corridor Lines */}
          <g stroke="#2f4a66" strokeWidth="1" strokeDasharray="4,4" fill="none" opacity="0.6">
            <path d="M185,179 Q450,80 691,239" />
            <path d="M488,142 Q580,180 691,239" />
            <path d="M691,239 Q720,280 845,191" />
            <path d="M691,239 Q450,300 250,300" />
          </g>

          {/* Region Label Text */}
          <g fill="#2e4863" className="font-mono text-[9px] select-none tracking-widest uppercase">
            <text x="160" y="140">NORTH AMERICA</text>
            <text x="250" y="340">SOUTH AMERICA</text>
            <text x="470" y="110">EUROPE</text>
            <text x="470" y="270">AFRICA</text>
            <text x="730" y="130">ASIA</text>
            <text x="810" y="360">OCEANIA</text>
            <text x="330" y="200" fill="#1f344a">Atlantic Ocean</text>
            <text x="600" y="360" fill="#1f344a">Indian Ocean</text>
            <text x="80" y="300" fill="#1f344a">Pacific Ocean</text>
          </g>
        </svg>

        {/* Tactical Marker Nodes */}
        {visibleNodes.map((node) => {
          const isSelected = selectedNode?.id === node.id || activePopupNode?.id === node.id;
          const isHovered = hoveredNode?.id === node.id;

          return (
            <div
              key={node.id}
              className="map-marker absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onClick={(e) => handleMarkerClick(node, e)}
              onMouseEnter={() => {
                setHoveredNode(node);
                soundEffects.click();
              }}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Render appropriate marker icon */}
              {node.type === 'education' || node.type === 'leadership' ? (
                <PixelStarMarker
                  size={node.featured ? 36 : 30}
                  isSelected={isSelected}
                  isHovered={isHovered}
                />
              ) : (
                <PixelSpiderMarker
                  color={node.status === 'CONFIRMED' ? 'green' : 'red'}
                  size={node.featured ? 36 : 30}
                  isSelected={isSelected}
                  isHovered={isHovered}
                />
              )}

              {/* Hover Tooltip Label */}
              {isHovered && !activePopupNode && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 whitespace-nowrap bg-black/95 border border-cyan-400 px-2 py-1 rounded shadow-xl text-[10px] font-mono text-cyan-300 z-50 pointer-events-none">
                  <div className="font-bold">{node.name}</div>
                  <div className="text-[8px] text-gray-400 font-pixel uppercase">{node.category}</div>
                </div>
              )}
            </div>
          );
        })}

        {/* Floating Dossier Preview Popup (Anchored near selected marker, matching Screenshot 4) */}
        {activePopupNode && (
          <div
            className="node-popup absolute -translate-x-1/2 -translate-y-full mb-4 z-40 w-64 bg-[#101822] border-2 border-black rounded-lg shadow-2xl p-2.5 flex flex-col gap-2 pointer-events-auto"
            style={{
              left: `${Math.max(16, Math.min(84, activePopupNode.x))}%`,
              top: `${Math.max(22, activePopupNode.y)}%`,
              boxShadow: '0 10px 30px rgba(0,0,0,0.8), 0 0 15px rgba(77, 130, 164, 0.4)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Popup Pointer Triangle */}
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[8px] border-x-transparent border-t-[10px] border-t-[#101822]" />

            {/* Thumbnail Header Image */}
            <div className="relative w-full h-24 rounded overflow-hidden border border-[#2b4157] bg-black">
              <img
                src={activePopupNode.thumbnail}
                alt={activePopupNode.name}
                className="w-full h-full object-cover object-top opacity-85"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute top-1.5 right-1.5">
                <button
                  onClick={() => setActivePopupNode(null)}
                  className="w-5 h-5 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center text-[10px] hover:bg-red-900"
                >
                  ✕
                </button>
              </div>
              <div className="absolute bottom-1.5 left-2 right-2">
                <span className="text-[8px] font-pixel text-cyan-300 uppercase tracking-widest px-1.5 py-0.5 rounded bg-black/70 border border-cyan-500/30 inline-block mb-0.5">
                  {activePopupNode.category}
                </span>
                <div className="text-xs font-bold text-white leading-tight drop-shadow truncate">
                  {activePopupNode.name}
                </div>
              </div>
            </div>

            {/* Short Snippet */}
            <p className="text-[10px] font-mono text-gray-300 line-clamp-2 leading-relaxed px-0.5">
              {activePopupNode.shortDesc}
            </p>

            {/* View Dossier Action Button */}
            <button
              onClick={() => {
                soundEffects.select();
                onSelectNode(activePopupNode);
                setActivePopupNode(null);
              }}
              className="w-full py-1.5 rounded border border-black bg-[#e8a838] hover:bg-[#ffd277] text-black font-silk text-[10px] font-bold uppercase tracking-wider transition-colors shadow"
            >
              VIEW DOSSIER
            </button>
          </div>
        )}
      </div>

      {/* Center Tactical Status Notification Toast */}
      {statusToast && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-40 bg-black/90 border border-cyan-400 px-4 py-2 rounded shadow-2xl text-xs font-silk text-cyan-300 uppercase tracking-widest animate-bounce pointer-events-none">
          {statusToast}
        </div>
      )}

      {/* Bottom Right Radar Scanner Widget (Screenshot 2, 3, 7, 8) */}
      <div className="absolute bottom-2 right-2 z-20 pointer-events-auto">
        <PixelRadarWidget
          isGlobal={zoomLevel === 'global'}
          onGlobalClick={handleGlobalView}
          onCenterClick={handleCenterVIT}
        />
      </div>

      {/* Scanline CRT overlay for authentic vintage radar monitor appearance */}
      <div className="absolute inset-0 scanline-overlay pointer-events-none z-10 opacity-30" />
    </div>
  );
}
