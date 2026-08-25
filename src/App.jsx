import React, { Component } from 'react';
import TrackerFrame from './components/TrackerFrame';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Tracker Runtime Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full min-h-screen bg-[#0a121d] text-white p-6 flex flex-col items-center justify-center font-mono">
          <div className="max-w-xl bg-red-950/80 border-2 border-red-500 rounded-xl p-6 shadow-2xl">
            <h1 className="text-xl font-bold text-red-400 mb-2 font-silk">
              ⚠️ RUNTIME RECOVERY
            </h1>
            <p className="text-xs text-gray-300 mb-4">
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded cursor-pointer"
            >
              RESET &amp; RELOAD
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <div className="w-full h-full min-h-screen bg-[#0a121d] flex flex-col overflow-hidden">
        <TrackerFrame />
      </div>
    </ErrorBoundary>
  );
}
