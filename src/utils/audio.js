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

export const waveShapes = ['sine', 'square', 'sawtooth', 'triangle'];

export const arpeggiatorModes = [
  {
    id: 'down',
    name: 'Down'
  },
  {
    id: 'up',
    name: 'Up'
  },
  {
    id: 'upDown',
    name: 'Up / Down'
  }
];

export const arpeggiatorOctaves = [
  { id: 1, name: 1 },
  { id: 2, name: 2 },
  { id: 3, name: 3 }
];
/**
* Convert Note Number to Frequency
*/
export const convertNoteFrequency = note => {
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
 * Generate keys for oscillator bank
 */
export const generateKeys = (startPoint = 0, numKeys = 88) => {
  const keys = {};
  for (let i = startPoint; i < startPoint + numKeys; i++) {
    const key = generateKey(i);
    keys[key.id] = key;
  }
  return keys;
};
/**
* Return Key note in plain english (i.e. C#)
*/
const generateKeyNote = i => {
  return octave[(i + 9) % 12];
};
/**
* Generate octave # for key
*/
const generateKeyOctave = i => {
  return Math.floor((i + 9) / 12);
};
/**
 * Get Window Audio Context
 */
export const getContext = () => {
  window.AudioContext =
    window.AudioContext ||
    window.webkitAudioContext ||
    window.mozAudioContext ||
    window.oAudioContext;
  const context = new AudioContext();
  return context;
};
/**
 * Fetch Impulse Response from server
 */
export const getImpulseResponse = async (settings, effect, context) => {
  // Make sure we received a url to fetch
  if (!settings.irUrl.value) {
    // No url so just clear the IR
    settings.irUrl.value = null;
    settings.effectLevel = 0;
    effect.buffer = null;
  } else {
    // Received url so we will have to fetch
    // Get the IR file from the server
    const response = await fetch(settings.irUrl.value);
    const audioData = await response.arrayBuffer();
    context.decodeAudioData(audioData, buffer => {
      const source = context.createBufferSource();
      source.buffer = buffer;
      effect.buffer = buffer;
    });
  }
};
/**
 * Gets next index in arpeggiator note array based on
 * current - current index
 * previous - previous index
 * length - length of array
 * mode - arpeggiator direction (up, down, upDown)
 */
export const getNextIndex = (current, previous, length, mode) => {
  switch (mode) {
    case 'down':
      if (current - 1 >= 0) {
        return current - 1;
      } else {
        return length - 1;
      }
    case 'up':
      if (current + 1 < length) {
        return current + 1;
      } else {
        return 0;
      }
    case 'upDown':
      if (previous < current) {
        if (current + 1 < length) {
          return current + 1;
        } else {
          return current - 1;
        }
      } else {
        if (current - 1 >= 0) {
          return current - 1;
        } else {
          return current + 1;
        }
      }
  }
};
