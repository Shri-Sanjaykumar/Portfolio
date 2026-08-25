import React, { useState } from 'react';
import VideoIntro from './components/VideoIntro';
import TrackerFrame from './components/TrackerFrame';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0a121d] flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="text-4xl mb-4">🕷️</div>
            <h2 className="font-silk text-red-400 text-sm mb-2 tracking-wider">SPIDER-SENSE ERROR DETECTED</h2>
            <p className="text-xs font-mono text-gray-400 mb-6 break-all">{String(this.state.error)}</p>
            <button
              onClick={() => { this.setState({ hasError: false, error: null }); window.location.reload(); }}
              className="btn-arcade-yellow px-6 py-2 text-xs font-bold rounded-lg cursor-pointer"
            >
              RESET & RELOAD
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  // Show video intro on fresh load
  const [showVideoIntro, setShowVideoIntro] = useState(() => {
    try {
      return sessionStorage.getItem('portfolio_intro_done') !== 'yes';
    } catch {
      return true;
    }
  });

  const handleIntroComplete = () => {
    try { sessionStorage.setItem('portfolio_intro_done', 'yes'); } catch {}
    setShowVideoIntro(false);
  };

  const handleReplayIntro = () => {
    setShowVideoIntro(true);
  };

  return (
    <ErrorBoundary>
      {showVideoIntro && <VideoIntro onComplete={handleIntroComplete} />}
      <div
        className="w-full h-full"
        style={{ visibility: showVideoIntro ? 'hidden' : 'visible' }}
      >
        <TrackerFrame onReplayIntro={handleReplayIntro} />
      </div>
    </ErrorBoundary>
  );
}
