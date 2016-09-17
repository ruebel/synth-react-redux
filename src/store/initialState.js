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

function generateKeys() {
  let keys = [];
  for(let i = 0; i < 88; i++) {
    keys.push({
      id: i - 3,
      note: generateKeyNote(i),
      octave: generateKeyOctave(i),
      freq: generateKeyFrequency(i),
      on: false
    });
  }
  return keys;
}

function generateKeyFrequency(i) {
  return Math.pow(2, (i - 48) / 12) * 440;
}

function generateKeyNote(i) {
  return octave[(i + 9) % 12];
}

function generateKeyOctave(i) {
  return Math.floor((i + 9) / 12);
}

export default {
  audio: {
    context: {},
    keys: generateKeys()
  },
  input: {
    devices: [],
    selectedDevice: {}
  }
};
