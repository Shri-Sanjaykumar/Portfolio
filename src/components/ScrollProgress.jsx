import React, { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!barRef.current) return;
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? (scrolled / total) * 100 : 0;
      barRef.current.style.width = `${progress}%`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] bg-transparent z-[100] pointer-events-none">
      <div
        ref={barRef}
        className="h-full bg-gradient-to-r from-indigo-400 to-violet-400 transition-none"
        style={{ width: '0%' }}
      />
    </div>
  );
}
