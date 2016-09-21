const octave = [
  'C',
  'C#',
  'D',
  'Eb',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'Bb',
  'B'
];
/**
 * Create Gain Node
 */
export const createGain = (context, velocity) => {
  let gain = context.createGain();
  gain.gain.value = velocity;
  return gain;
};
/**
 * Convert Note Number to Frequency
 */
export const convertNoteFrequency = (note) => {
  return Math.pow(2, (note - 69) / 12) * 440;
};
/**
 * Create Oscillator using settings
 */
export const createOscillator = (context, note, shape) => {
  let osc = context.createOscillator();
  osc.type = shape;
  osc.frequency.value = convertNoteFrequency(note);
  osc.start();
  return osc;
};
/**
 * Get Window Audio Context
 */
export const getContext = () => {
  window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext;
  let context = new AudioContext();
  return context;
};
/**
 * Generate key object
 */
export const generateKey = (i, velocity = 0) => {
  return {
    id: i,
    note: generateKeyNote(i + 3),
    octave: generateKeyOctave(i + 3),
    freq: convertNoteFrequency(i),
    velocity
  };
};

const generateKeyNote = (i) => {
  return octave[(i + 9) % 12];
};

const generateKeyOctave = (i) => {
  return Math.floor((i + 9) / 12);
};
