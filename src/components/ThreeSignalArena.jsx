import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { trackerNodes } from '../data/portfolioData';
import { soundEffects } from '../utils/audio';

export default function ThreeSignalArena({ isOpen = false, onClose, onSelectNode }) {
  const mountRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [activeFilter, setActiveFilter] = useState('ALL'); // 'ALL' | 'PROJECTS' | 'EXPERIENCE' | 'SKILLS'

  useEffect(() => {
    if (!isOpen || !mountRef.current) return;

    // Scene Setup
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a121d, 0.025);

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 10, 35);

    // Renderer with GPU antialiasing
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x00e5ff, 2.5);
    dirLight.position.set(15, 25, 20);
    scene.add(dirLight);

    const redLight = new THREE.PointLight(0xe52d27, 3, 50);
    redLight.position.set(-15, -10, 15);
    scene.add(redLight);

    // Central Core Wireframe Sphere (S.V. Signal Hub)
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    const coreGeo = new THREE.IcosahedronGeometry(4, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      wireframe: true,
      emissive: 0x0088aa,
      emissiveIntensity: 0.6,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // Inner Glowing Sphere
    const innerGeo = new THREE.SphereGeometry(2.5, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xe52d27,
      transparent: true,
      opacity: 0.8,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // Rotating Outer Energy Rings
    const ringGeo = new THREE.TorusGeometry(6, 0.08, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x79a86b, wireframe: true });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.rotation.y = Math.PI / 3;
    coreGroup.add(ring2);

    // Background Particle Stardust Constellation
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 80;
      particlePositions[i + 1] = (Math.random() - 0.5) * 60;
      particlePositions[i + 2] = (Math.random() - 0.5) * 60;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x8ec3e3,
      size: 0.35,
      transparent: true,
      opacity: 0.75,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Interactive 3D Node Mesh Instances
    const nodeMeshes = [];
    const webLinesGroup = new THREE.Group();
    scene.add(webLinesGroup);

    const radius = 16;
    trackerNodes.forEach((node, i) => {
      const angle = (i / trackerNodes.length) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle * 2) * 4;
      const z = Math.sin(angle) * radius;

      const isStar = node.type === 'education' || node.type === 'leadership';
      const isGreen = node.status === 'CONFIRMED';
      const nodeColor = isStar ? 0x5b99be : isGreen ? 0x79a86b : 0xe52d27;

      const nodeGroup = new THREE.Group();
      nodeGroup.position.set(x, y, z);
      nodeGroup.userData = { node, origY: y, angle };

      // Node Geometry
      const geom = isStar
        ? new THREE.OctahedronGeometry(1.4, 0)
        : new THREE.DodecahedronGeometry(1.2, 0);

      const mat = new THREE.MeshStandardMaterial({
        color: nodeColor,
        emissive: nodeColor,
        emissiveIntensity: 0.5,
        roughness: 0.2,
        metalness: 0.8,
      });

      const mesh = new THREE.Mesh(geom, mat);
      nodeGroup.add(mesh);

      // Node Halo Ring
      const haloGeo = new THREE.RingGeometry(1.6, 1.8, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: nodeColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6,
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.rotation.x = Math.PI / 2;
      nodeGroup.add(halo);

      scene.add(nodeGroup);
      nodeMeshes.push(nodeGroup);

      // Web Line connecting Node to Core
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.25,
      });
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(x, y, z),
      ]);
      const line = new THREE.Line(lineGeo, lineMat);
      webLinesGroup.add(line);
    });

    // Raycasting for Interactivity
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        nodeMeshes.map((g) => g.children[0])
      );

      if (intersects.length > 0) {
        const hitGroup = intersects[0].object.parent;
        setHoveredNode(hitGroup.userData.node);
        container.style.cursor = 'pointer';
      } else {
        setHoveredNode(null);
        container.style.cursor = 'grab';
      }
    };

    const handlePointerDown = (e) => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        nodeMeshes.map((g) => g.children[0])
      );

      if (intersects.length > 0) {
        soundEffects.thwip();
        soundEffects.select();
        const hitNode = intersects[0].object.parent.userData.node;
        if (onSelectNode) onSelectNode(hitNode);
      }
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerdown', handlePointerDown);

    // Mouse Drag Orbit Simulation
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      targetRotationY += deltaX * 0.005;
      targetRotationX += deltaY * 0.005;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth camera orbit
      scene.rotation.y += (targetRotationY - scene.rotation.y) * 0.05;
      scene.rotation.x += (targetRotationX - scene.rotation.x) * 0.05;

      // Auto subtle drift when idle
      if (!isDragging) {
        targetRotationY += 0.0015;
      }

      // Core Animation
      coreMesh.rotation.y = time * 0.3;
      coreMesh.rotation.x = time * 0.2;
      ring1.rotation.z = time * 0.4;
      ring2.rotation.x = time * 0.5;

      // Pulse Particles
      particles.rotation.y = time * 0.03;

      // Nodes animation
      nodeMeshes.forEach((g, idx) => {
        g.position.y = g.userData.origY + Math.sin(time * 2 + idx) * 0.6;
        g.children[0].rotation.y = time * 0.8;
        g.children[0].rotation.x = time * 0.5;
        if (g.children[1]) {
          g.children[1].rotation.z = time * 0.6;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerdown', handlePointerDown);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#070d14]/95 backdrop-blur-md flex flex-col p-3 sm:p-5 select-none overflow-hidden scanline-overlay">
      {/* Top HUD Header */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between bg-[#111f2e] border-3 border-black rounded-xl p-3 sm:p-4 shadow-2xl z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#1b2b3b] border-2 border-cyan-400 flex items-center justify-center shadow">
            <img
              src="/spidey/spiderman-face-transparent.png"
              alt="Spidey"
              className="w-5 h-5 object-contain"
            />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-silk font-bold text-white tracking-widest flex items-center gap-2">
              <span>3D SPATIAL SIGNAL NETWORK</span>
              <span className="text-[9px] font-pixel text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/40">
                WEBGL ACTIVE
              </span>
            </h2>
            <p className="text-[11px] font-mono text-gray-300">
              Drag to rotate spatial camera • Click any 3D node to inspect dossier
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            soundEffects.close();
            onClose();
          }}
          className="px-4 py-1.5 rounded-lg border-2 border-black bg-red-600 hover:bg-red-500 text-white font-silk text-xs font-bold uppercase tracking-wider cursor-pointer shadow active:scale-95 transition-transform"
        >
          ✕ CLOSE 3D
        </button>
      </div>

      {/* 3D Canvas Viewport */}
      <div className="relative w-full max-w-6xl mx-auto flex-1 mt-3 rounded-xl border-3 border-black bg-[#060b12] overflow-hidden shadow-[inset_0_4px_20px_rgba(0,0,0,0.9)]">
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Hovered Node Tooltip HUD */}
        {hoveredNode && (
          <div className="absolute top-4 left-4 z-30 bg-[#101e2c]/90 border-2 border-cyan-400 rounded-lg p-3 shadow-2xl pointer-events-none max-w-xs animate-in fade-in zoom-in-95 duration-100">
            <div className="text-[9px] font-pixel text-cyan-300 uppercase">
              {hoveredNode.category} ■ {hoveredNode.status}
            </div>
            <div className="text-sm font-silk font-bold text-white mt-0.5">
              {hoveredNode.name}
            </div>
            <div className="text-[11px] font-mono text-gray-300 mt-1 line-clamp-2">
              {hoveredNode.shortDesc}
            </div>
            <div className="text-[10px] font-silk text-yellow-300 mt-2">
              [ CLICK TO OPEN DOSSIER ↗ ]
            </div>
          </div>
        )}

        {/* Bottom Orbit Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-black/80 border border-white/20 px-4 py-1.5 rounded-full text-[11px] font-silk text-cyan-300 pointer-events-none flex items-center gap-2">
          <span>🕸️ 3D ORBIT ENGINE</span>
          <span>•</span>
          <span className="text-gray-400">9 ACTIVE NODES IN ORBIT</span>
        </div>
      </div>
    </div>
  );
}
