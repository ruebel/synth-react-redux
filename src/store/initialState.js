import uuid from 'uuid';
import {generateKey, getContext} from '../utils/audio';

function generateKeys(startPoint = 0, numKeys = 88) {
  let keys = {};
  for(let i = startPoint; i < (startPoint + numKeys); i++) {
    let key = generateKey(i);
    keys[key.id] = key;
  }
  return keys;
}

let context = getContext();
let outputGain = context.createGain();
outputGain.connect(context.destination);

export default {
  audio: {
    context,
    gain: {
      input: context.createGain(),
      output: outputGain,
      outputLevel: 1
    },
    effects: [],
    keys: generateKeys()
  },
  control: {
    assign: true,
    controls: {},
    last: null
  },
  input: {
    devices: [],
    selectedDevice: {}
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
