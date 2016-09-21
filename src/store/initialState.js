import {generateKey, getContext} from '../utils/audio';

function generateKeys(startPoint = 0, numKeys = 88) {
  let keys = {};
  for(let i = startPoint; i < (startPoint + numKeys); i++) {
    let key = generateKey(i);
    keys[key.id] = key;
  }
  return keys;
}

export default {
  audio: {
    context: getContext(),
    keys: generateKeys()
  },
  input: {
    devices: [],
    selectedDevice: {}
  },
  synth: {
    ignoreVelocity: false,
    sustain: false,
    waveShape: 'sine'
  }
};
