// Web Audio API 8-bit Sound Synthesizer for Sanjaykumar Tracker

let audioCtx = null;
let isSoundEnabled = false;

export const initAudio = () => {
  if (!audioCtx && typeof window !== 'undefined') {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

export const setSoundEnabled = (enabled) => {
  isSoundEnabled = enabled;
  if (enabled) {
    initAudio();
  }
};

export const getSoundEnabled = () => isSoundEnabled;

// Play 8-bit Tone
const playTone = (freq, type = 'square', duration = 0.08, gainVal = 0.15) => {
  if (!isSoundEnabled) return;
  initAudio();
  if (!audioCtx) return;

  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    console.warn('Audio playback error', e);
  }
};

// Custom sound effects
export const soundEffects = {
  click: () => {
    playTone(600, 'square', 0.04, 0.1);
  },
  
  select: () => {
    if (!isSoundEnabled) return;
    playTone(520, 'square', 0.05, 0.12);
    setTimeout(() => playTone(780, 'square', 0.08, 0.12), 40);
  },

  marker: () => {
    if (!isSoundEnabled) return;
    playTone(440, 'triangle', 0.04, 0.15);
    setTimeout(() => playTone(880, 'square', 0.09, 0.12), 40);
  },

  open: () => {
    if (!isSoundEnabled) return;
    playTone(300, 'square', 0.04, 0.12);
    setTimeout(() => playTone(450, 'square', 0.05, 0.12), 35);
    setTimeout(() => playTone(600, 'square', 0.06, 0.12), 70);
  },

  close: () => {
    if (!isSoundEnabled) return;
    playTone(600, 'square', 0.04, 0.12);
    setTimeout(() => playTone(400, 'square', 0.05, 0.12), 35);
    setTimeout(() => playTone(250, 'square', 0.06, 0.12), 70);
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
      setTimeout(() => playTone(freq, 'square', 0.12, 0.14), idx * 80);
    });
  }
};
