const audioCtx = () => {
  if (!(window as any).__atmAudioCtx) {
    (window as any).__atmAudioCtx = new AudioContext();
  }
  return (window as any).__atmAudioCtx as AudioContext;
};

const playTone = (freq: number, duration: number, type: OscillatorType = "sine", volume = 0.15) => {
  try {
    const ctx = audioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Audio not available
  }
};

export const sounds = {
  keypress: () => playTone(1400, 0.04, "triangle", 0.06),

  submit: () => playTone(1200, 0.1, "sine", 0.12),

  cardInsert: () => {
    playTone(220, 0.1, "triangle", 0.08);
    setTimeout(() => playTone(440, 0.12, "triangle", 0.1), 100);
    setTimeout(() => playTone(660, 0.15, "sine", 0.08), 200);
  },

  cardEject: () => {
    playTone(660, 0.1, "sine", 0.08);
    setTimeout(() => playTone(440, 0.12, "triangle", 0.1), 100);
    setTimeout(() => playTone(220, 0.15, "triangle", 0.08), 200);
  },

  success: () => {
    playTone(523, 0.15, "sine", 0.12);
    setTimeout(() => playTone(659, 0.15, "sine", 0.12), 120);
    setTimeout(() => playTone(784, 0.2, "sine", 0.14), 240);
  },

  error: () => {
    playTone(300, 0.2, "square", 0.1);
    setTimeout(() => playTone(250, 0.3, "square", 0.1), 180);
  },

  navigate: () => playTone(600, 0.08, "sine", 0.08),
};
