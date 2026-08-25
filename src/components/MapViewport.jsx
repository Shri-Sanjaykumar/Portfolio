import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { trackerNodes } from '../data/portfolioData';
import { PixelRadarWidget } from './PixelIcons';
import { soundEffects } from '../utils/audio';

export default function MapViewport({
  confirmedActive = true,
  rumoredActive = true,
  onSelectNode,
  statusToast = null,
  onTriggerToast,
  onOpenActivityLog,
  isIntroActive = false
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [selectedPopupNode, setSelectedPopupNode] = useState(null);
  const [isGlobalView, setIsGlobalView] = useState(true);
  const [showSignalBanner, setShowSignalBanner] = useState(true);

  // Auto-dismiss the yellow 11 Active Signals banner 4.5s after intro completes
  useEffect(() => {
    if (!isIntroActive) {
      const timer = setTimeout(() => {
        setShowSignalBanner(false);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [isIntroActive]);

  // Helper to create HTML string for marker icons
  const createMarkerHtml = (node) => {
    const isStar = node.type === 'education' || node.type === 'leadership';
    const isGreen = node.status === 'CONFIRMED';
    const themeBg = isStar ? '#5b99be' : isGreen ? '#79a86b' : '#d94b4b';
    const themeLight = isStar ? '#8ec3e3' : isGreen ? '#a3d993' : '#f27979';

    return `
      <div class="relative w-8 h-8 flex items-center justify-center cursor-pointer group">
        <div class="absolute inset-0 rounded-full border-2 animate-ping opacity-30" style="border-color: ${themeLight};"></div>
        <div class="w-7 h-7 rounded-full border-2 border-black flex items-center justify-center shadow-lg transition-transform group-hover:scale-125" style="background-color: ${themeBg}; box-shadow: inset 1px 1px 0 ${themeLight}, 0 4px 6px rgba(0,0,0,0.7);">
          ${isStar ? `
            <svg viewBox="0 0 24 24" class="w-4 h-4" fill="black">
              <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
            </svg>
          ` : `
            <svg viewBox="0 0 24 24" class="w-4 h-4" fill="${isGreen ? 'black' : 'white'}">
              <rect x="10" y="8" width="4" height="8" />
              <rect x="11" y="7" width="2" height="1" />
              <rect x="7" y="7" width="2" height="1" />
              <rect x="6" y="8" width="1" height="2" />
              <rect x="8" y="9" width="2" height="1" />
              <rect x="6" y="11" width="4" height="1" />
              <rect x="7" y="13" width="3" height="1" />
              <rect x="6" y="14" width="1" height="2" />
              <rect x="15" y="7" width="2" height="1" />
              <rect x="17" y="8" width="1" height="2" />
              <rect x="14" y="9" width="2" height="1" />
              <rect x="14" y="11" width="4" height="1" />
              <rect x="14" y="13" width="3" height="1" />
              <rect x="17" y="14" width="1" height="2" />
            </svg>
          `}
        </div>
      </div>
    `;
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    try {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      const leafletObj = L.map ? L : (window.L || L.default || L);
      const map = leafletObj.map(mapContainerRef.current, {
        center: [20, 10],
        zoom: 2.2,
        minZoom: 2,
        maxZoom: 18,
        zoomControl: false,
        attributionControl: false,
      });

      mapInstanceRef.current = map;

      // Dark Map Tiles (CartoDB Dark Matter)
      leafletObj.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      const handleResize = () => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      };

      setTimeout(handleResize, 100);
      setTimeout(handleResize, 500);
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
      };
    } catch (err) {
      console.warn('Leaflet initialization fallback:', err);
    }
  }, []);

  // Invalidate map size when intro closes
  useEffect(() => {
    if (!isIntroActive && mapInstanceRef.current) {
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 300);
    }
  }, [isIntroActive]);

  // Update Markers when filters change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    try {
      const leafletObj = L.divIcon ? L : (window.L || L.default || L);
      markersRef.current.forEach((m) => map.removeLayer(m));
      markersRef.current = [];

      const visibleNodes = trackerNodes.filter((node) => {
        if (node.status === 'CONFIRMED' && !confirmedActive) return false;
        if (node.status === 'RUMORED' && !rumoredActive) return false;
        return true;
      });

      visibleNodes.forEach((node) => {
        const customIcon = leafletObj.divIcon({
          className: 'custom-pixel-marker',
          html: createMarkerHtml(node),
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        const marker = leafletObj.marker([node.lat, node.lng], { icon: customIcon }).addTo(map);

        marker.on('click', () => {
          try { soundEffects.marker?.(); } catch {}
          setSelectedPopupNode(node);
        });

        markersRef.current.push(marker);
      });
    } catch (err) {
      console.warn('Marker creation error:', err);
    }
  }, [confirmedActive, rumoredActive]);

  // Global View Reset
  const handleGlobalView = () => {
    try { soundEffects.click?.(); } catch {}
    setIsGlobalView(true);
    if (onTriggerToast) onTriggerToast('CENTERING: GLOBAL RECON VIEW');
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([20, 10], 2.2, { duration: 1.5 });
    }
  };

  // Center on Neighborhood (VIT Vellore Hub)
  const handleCenterNeighborhood = () => {
    try { soundEffects.select?.(); } catch {}
    setIsGlobalView(false);
    if (onTriggerToast) onTriggerToast('CENTERING: VIT VELLORE HUB');
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([12.9692, 79.1559], 13, { duration: 1.8 });
    }
  };

  return (
    <div className="relative w-full h-full bg-[#0a111a] select-none overflow-hidden">
      {/* Top Coordinate Rulers */}
      <div className="absolute top-0 inset-x-0 h-4 bg-[#0a111a]/95 border-b border-[#1b2b3d] z-20 flex items-center justify-between px-3 text-[8px] font-mono text-[#4d7394] pointer-events-none">
        {['180°W', '120°W', '60°W', '0°', '60°E', '120°E', '180°E'].map((coord, i) => (
          <span key={i} className="flex flex-col items-center">
            <span>{coord}</span>
            <span className="w-px h-1.5 bg-[#253b52]" />
          </span>
        ))}
      </div>

      {/* Left Coordinate Rulers */}
      <div className="absolute left-0 inset-y-0 w-4 bg-[#0a111a]/95 border-r border-[#1b2b3d] z-20 flex flex-col items-center justify-between py-6 text-[8px] font-mono text-[#4d7394] pointer-events-none">
        {['80°N', '40°N', '0°', '40°S', '80°S'].map((coord, i) => (
          <span key={i} className="flex items-center">
            <span className="h-px w-1.5 bg-[#253b52]" />
            <span className="-rotate-90 origin-center text-[7px]">{coord}</span>
          </span>
        ))}
      </div>

      {/* Floating Center Notification Banner - Auto disappears after intro */}
      {showSignalBanner ? (
        <div className="absolute top-7 left-1/2 -translate-x-1/2 z-20 pointer-events-auto transition-all duration-500 animate-in fade-in slide-in-from-top-4">
          <div 
            onClick={() => {
              if (onOpenActivityLog) onOpenActivityLog();
            }}
            className="relative bg-[#f0ad38] border-2 sm:border-3 border-black rounded-lg px-4 sm:px-6 py-1.5 sm:py-2 shadow-[0_4px_0_#000] flex flex-col items-center cursor-pointer hover:bg-[#ffc355] transition-transform active:scale-95 group"
          >
            {/* Perched Spider-Man on top */}
            <img
              src="/spidey/spiderman-crouch.png"
              alt=""
              className="absolute -top-7 left-1/2 -translate-x-1/2 w-9 h-9 object-contain pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            />
            <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-pixel text-black font-bold">
              <span>00:00</span>
              <div className="w-4 h-4 rounded-full bg-red-600 border border-black flex items-center justify-center animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
              <span>00:00</span>
            </div>
            <div className="text-[10px] sm:text-xs font-silk font-bold text-black uppercase tracking-wider mt-0.5 whitespace-nowrap">
              {trackerNodes.length} ACTIVE ENGINEERING SIGNALS
            </div>

            {/* Dismiss Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowSignalBanner(false);
              }}
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-black text-white text-[9px] font-bold border border-white/40 flex items-center justify-center hover:bg-red-700 transition-colors"
              title="Dismiss banner"
            >
              ✕
            </button>
          </div>
        </div>
      ) : (
        /* Re-open Signal Pill */
        <button
          onClick={() => setShowSignalBanner(true)}
          className="absolute top-6 left-1/2 -translate-x-1/2 z-20 bg-black/80 hover:bg-black text-[#f0ad38] border border-[#f0ad38]/50 px-3 py-1 rounded-full text-[9px] font-silk flex items-center gap-1.5 shadow-md cursor-pointer transition-all hover:scale-105"
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span>{trackerNodes.length} SIGNALS</span>
        </button>
      )}

      {/* Leaflet Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-0 cursor-crosshair" />

      {/* Floating Dossier Preview Popup when clicking node on map */}
      {selectedPopupNode && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-72 sm:w-80 bg-[#101822] border-3 border-black rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_25px_rgba(6,182,212,0.4)] p-3 flex flex-col gap-2.5 animate-in fade-in zoom-in-95 duration-150">
          <div className="relative w-full h-32 rounded overflow-hidden border border-[#2b4157] bg-black">
            <img
              src={selectedPopupNode.thumbnail}
              alt={selectedPopupNode.name}
              className="w-full h-full object-cover object-top opacity-90"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
            <button
              onClick={() => setSelectedPopupNode(null)}
              className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/80 border border-white/20 text-white flex items-center justify-center text-xs hover:bg-red-900 transition-colors cursor-pointer"
            >
              ✕
            </button>
            <div className="absolute bottom-2 left-2 right-2">
              <span className="text-[8px] font-pixel text-cyan-300 uppercase px-1.5 py-0.5 rounded bg-black/80 border border-cyan-500/40 inline-block mb-1">
                {selectedPopupNode.category}
              </span>
              <div className="text-xs sm:text-sm font-bold font-silk text-white leading-tight truncate">
                {selectedPopupNode.name}
              </div>
            </div>
          </div>

          <p className="text-[11px] font-mono text-gray-300 line-clamp-2 px-1 leading-relaxed">
            {selectedPopupNode.shortDesc}
          </p>

          <button
            onClick={() => {
              try { soundEffects.select?.(); } catch {}
              if (onSelectNode) onSelectNode(selectedPopupNode);
              setSelectedPopupNode(null);
            }}
            className="btn-arcade-yellow w-full py-2 text-xs font-bold uppercase tracking-wider rounded cursor-pointer"
          >
            VIEW EVENT / PROJECT ⚡
          </button>
        </div>
      )}

      {/* Floating Status Notification Toast */}
      {statusToast && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-40 bg-black/95 border-2 border-[#4d82a4] px-5 py-2 rounded shadow-2xl text-xs font-silk text-cyan-300 uppercase tracking-widest pointer-events-none animate-float-up">
          {statusToast}
        </div>
      )}

      {/* 3D Animated Radar Scanner Widget (Bottom-Right) */}
      <div className="absolute bottom-2 right-2 z-20 pointer-events-auto">
        <PixelRadarWidget
          isGlobal={isGlobalView}
          onGlobalClick={handleGlobalView}
          onCenterClick={handleCenterNeighborhood}
        />
      </div>

      {/* Retro Scanline Overlay */}
      <div className="absolute inset-0 scanline-overlay pointer-events-none z-10 opacity-20" />
    </div>
  );
}
