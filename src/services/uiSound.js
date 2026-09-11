let audioContext;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  audioContext ||= new AudioContext();
  if (audioContext.state === "suspended") audioContext.resume().catch(() => {});
  return audioContext;
}

function note(context, frequency, offset, duration, type = "sine", volume = 0.055) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const start = context.currentTime + offset;
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.018);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
}

const patterns = {
  correct: [[523, 0, .13], [659, .09, .16], [784, .18, .2]],
  incorrect: [[220, 0, .18, "triangle"], [165, .13, .24, "triangle"]],
  reward: [[659, 0, .12], [880, .1, .2]],
  complete: [[523, 0, .16], [659, .1, .16], [784, .2, .16], [1047, .31, .34]],
  unit: [[392, 0, .14], [523, .09, .14], [659, .18, .14], [784, .27, .18], [1047, .39, .4]]
};

export function playUiSound(kind, enabled = true) {
  if (!enabled || !patterns[kind]) return;
  try {
    const context = getAudioContext();
    if (!context) return;
    patterns[kind].forEach(([frequency, offset, duration, type]) => note(context, frequency, offset, duration, type));
  } catch {
    // Sound is progressive enhancement; learning must continue if audio is unavailable.
  }
}
