// Comprehensive Web Audio API Synthesizer & BGM Engine for Sanjaykumar Tracker & Game

let audioCtx = null;
let isSoundEnabled = true;
let isBgmPlaying = false;
let bgmInterval = null;
let masterVolume = 0.8;
let bgmVolume = 0.25;

export const initAudio = () => {
  if (!audioCtx && typeof window !== 'undefined') {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    } catch (e) {
      console.warn('AudioContext init error', e);
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
};

export const setSoundEnabled = (enabled) => {
  isSoundEnabled = enabled;
  if (enabled) {
    initAudio();
  } else {
    stopBGM();
  }
};

export const getSoundEnabled = () => isSoundEnabled;

export const setMasterVolume = (vol) => {
  masterVolume = Math.max(0, Math.min(1, vol));
};

export const setBgmVolume = (vol) => {
  bgmVolume = Math.max(0, Math.min(1, vol));
};

// Play synthesized tone
const playTone = (freq, type = 'square', duration = 0.08, gainVal = 0.15) => {
  if (!isSoundEnabled) return;
  initAudio();
  if (!audioCtx) return;

  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    const finalGain = gainVal * masterVolume;
    gain.gain.setValueAtTime(finalGain, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {}
};

// Background Chiptune Music Generator (Looping 8-bit melody)
export const startBGM = () => {
  if (!isSoundEnabled || isBgmPlaying) return;
  initAudio();
  if (!audioCtx) return;

  isBgmPlaying = true;
  const melody = [
    { note: 220, dur: 0.15 }, // A3
    { note: 261.63, dur: 0.15 }, // C4
    { note: 329.63, dur: 0.15 }, // E4
    { note: 261.63, dur: 0.15 },
    { note: 293.66, dur: 0.15 }, // D4
    { note: 349.23, dur: 0.15 }, // F4
    { note: 440, dur: 0.2 },    // A4
    { note: 392, dur: 0.2 },    // G4
    { note: 329.63, dur: 0.15 },
    { note: 261.63, dur: 0.15 },
    { note: 220, dur: 0.25 },
    { note: 196, dur: 0.25 },   // G3
  ];

  let step = 0;
  bgmInterval = setInterval(() => {
    if (!isSoundEnabled || !isBgmPlaying) {
      stopBGM();
      return;
    }
    const current = melody[step % melody.length];
    playTone(current.note, 'triangle', current.dur, bgmVolume * 0.12);
    // Bass pulse
    if (step % 2 === 0) {
      playTone(current.note / 2, 'sine', 0.18, bgmVolume * 0.18);
    }
    step++;
  }, 220);
};

export const stopBGM = () => {
  isBgmPlaying = false;
  if (bgmInterval) {
    clearInterval(bgmInterval);
    bgmInterval = null;
  }
};

export const toggleBGM = () => {
  if (isBgmPlaying) {
    stopBGM();
  } else {
    startBGM();
  }
  return isBgmPlaying;
};

export const getBgmPlaying = () => isBgmPlaying;

// Sound Effects Catalog
export const soundEffects = {
  click: () => {
    playTone(600, 'square', 0.04, 0.08);
  },
  
  select: () => {
    if (!isSoundEnabled) return;
    playTone(520, 'square', 0.05, 0.1);
    setTimeout(() => playTone(780, 'square', 0.08, 0.1), 40);
  },

  thwip: () => {
    if (!isSoundEnabled) return;
    initAudio();
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1600, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.18 * masterVolume, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    } catch (e) {}
  },

  jump: () => {
    if (!isSoundEnabled) return;
    initAudio();
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(200, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.12 * masterVolume, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {}
  },

  land: () => {
    if (!isSoundEnabled) return;
    playTone(120, 'triangle', 0.08, 0.15);
  },

  attack: () => {
    if (!isSoundEnabled) return;
    playTone(800, 'sawtooth', 0.05, 0.15);
    setTimeout(() => playTone(300, 'square', 0.08, 0.12), 40);
  },

  correct: () => {
    if (!isSoundEnabled) return;
    playTone(523.25, 'triangle', 0.08, 0.12); // C5
    setTimeout(() => playTone(659.25, 'triangle', 0.08, 0.12), 80); // E5
    setTimeout(() => playTone(783.99, 'triangle', 0.12, 0.15), 160); // G5
    setTimeout(() => playTone(1046.50, 'triangle', 0.2, 0.18), 240); // C6
  },

  wrong: () => {
    if (!isSoundEnabled) return;
    playTone(280, 'sawtooth', 0.1, 0.18);
    setTimeout(() => playTone(180, 'sawtooth', 0.2, 0.2), 100);
  },

  coin: () => {
    if (!isSoundEnabled) return;
    playTone(987.77, 'square', 0.06, 0.1); // B5
    setTimeout(() => playTone(1318.51, 'square', 0.15, 0.12), 60); // E6
  },

  xp: () => {
    if (!isSoundEnabled) return;
    [440, 554, 659, 880].forEach((freq, i) => {
      setTimeout(() => playTone(freq, 'sine', 0.06, 0.08), i * 35);
    });
  },

  victory: () => {
    if (!isSoundEnabled) return;
    const fanfare = [
      { f: 523.25, d: 0.12 }, // C5
      { f: 523.25, d: 0.12 },
      { f: 523.25, d: 0.12 },
      { f: 659.25, d: 0.3 },  // E5
      { f: 587.33, d: 0.15 }, // D5
      { f: 659.25, d: 0.15 },
      { f: 783.99, d: 0.4 },  // G5
    ];
    fanfare.forEach((n, i) => {
      setTimeout(() => playTone(n.f, 'triangle', n.d, 0.18), i * 140);
    });
  },

  damage: () => {
    if (!isSoundEnabled) return;
    playTone(150, 'sawtooth', 0.18, 0.25);
    setTimeout(() => playTone(90, 'square', 0.15, 0.2), 60);
  },

  marker: () => {
    if (!isSoundEnabled) return;
    playTone(440, 'triangle', 0.04, 0.12);
    setTimeout(() => playTone(880, 'square', 0.09, 0.1), 40);
  },

  open: () => {
    if (!isSoundEnabled) return;
    playTone(300, 'square', 0.04, 0.1);
    setTimeout(() => playTone(450, 'square', 0.05, 0.1), 35);
    setTimeout(() => playTone(600, 'square', 0.06, 0.1), 70);
  },

  close: () => {
    if (!isSoundEnabled) return;
    playTone(600, 'square', 0.04, 0.1);
    setTimeout(() => playTone(400, 'square', 0.05, 0.1), 35);
    setTimeout(() => playTone(250, 'square', 0.06, 0.1), 70);
  },

  toggle: () => {
    if (!isSoundEnabled) return;
    playTone(700, 'sawtooth', 0.05, 0.1);
    setTimeout(() => playTone(950, 'square', 0.07, 0.1), 40);
  },

  intro: () => {
    if (!isSoundEnabled) return;
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      setTimeout(() => playTone(freq, 'square', 0.12, 0.12), idx * 80);
    });
  }
};
