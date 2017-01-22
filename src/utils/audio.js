export const filterTypes = [
  'lowpass',
  'highpass',
  'bandpass',
  'lowshelf',
  'highshelf',
  'peaking',
  'notch',
  'allpass'
];

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

export const waveShapes = [
  'sine',
  'square',
  'sawtooth',
  'triangle'
];
/**
* Convert Note Number to Frequency
*/
export const convertNoteFrequency = (note) => {
  return Math.pow(2, (note - 69) / 12) * 440;
};
/**
 * Create Gain Node
 */
export const createGain = (context, velocity) => {
  const gain = context.createGain();
  gain.gain.value = velocity;
  return gain;
};
/**
 * Create Oscillator using settings
 */
export const createOscillator = (context, note, shape) => {
  const osc = context.createOscillator();
  osc.type = shape;
  osc.frequency.value = convertNoteFrequency(note);
  osc.start();
  return osc;
};
/**
 * Equal power curve for audio cross fading
 */
export const equalPower = (val = 0, second = false) => {
  return Math.pow(0.5 * (1 + Math.cos(Math.PI * val) * (second ? 1 : -1)), 0.5);
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
/**
* Return Key note in plain english (i.e. C#)
*/
const generateKeyNote = (i) => {
  return octave[(i + 9) % 12];
};
/**
* Generate octave # for key
*/
const generateKeyOctave = (i) => {
  return Math.floor((i + 9) / 12);
};
/**
 * Get Window Audio Context
 */
export const getContext = () => {
  window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext;
  const context = new AudioContext();
  return context;
};
