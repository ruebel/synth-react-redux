import uuid from 'uuid';
import {generateKey, getContext} from '../utils/audio';
/**
 * Generate keys for oscillator bank
 */
const generateKeys = (startPoint = 0, numKeys = 88) => {
  const keys = {};
  for(let i = startPoint; i < (startPoint + numKeys); i++) {
    const key = generateKey(i);
    keys[key.id] = key;
  }
  return keys;
};

export default {
  audio: {
    gain: {
      outputLevel: 1
    },
    effects: [],
    keys: generateKeys()
  },
  context: getContext(),
  control: {
    assign: null,
    controls: {},
    last: null
  },
  input: {
    devices: [],
    selectedDevice: {}
  },
  presets: {
    loadedId: null,
    presets: []
  },
  synth: {
    bend: 0,
    envelope: {
      attack: 0,
      release: 0
    },
    ignoreVelocity: false,
    lastDown: null,
    modulation: {
      on: false,
      depth: 4.3,
      shape: 'sine',
      speed: 4.5
    },
    oscId: uuid.v4(),
    oscillators: [{
      id: uuid.v4(),
      detune: 0,
      gain: 1,
      octave: 0,
      waveShape: 'sine'
    }],
    portamento: {
      on: false,
      speed: 75
    },
    sustain: false
  }
};
