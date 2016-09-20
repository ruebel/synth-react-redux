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

window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext;
let context = new AudioContext();

const service = {
  generateKeys,
  settings
};

let settings = {
  wave: 'square'
};

function generateKeys(startPoint = 0, numKeys = 88) {
  let keys = [];
  for(let i = startPoint; i < (startPoint + numKeys); i++) {
    keys.push(new Key(i, context));
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

export class Key {
  constructor(id, context) {
    this._oscillators = [];
    this.id = id - 3;
    this.note = generateKeyNote(id);
    this.octave = generateKeyOctave(id);
    this.freq = generateKeyFrequency(id);
    this.gain = context.createGain();
    this.gain.gain.value = 0;
    this.gain.connect(context.destination);
    this.addOscillator(1, context);
  }

  get on () {
    return this.gain.gain.value > 0;
  }

  set on(val) {
    if (val > 0) {
      this.start(val);
    } else {
      this.stop();
    }
  }

  addOscillator(harmonicLevel, context) {
    let oscillator = context.createOscillator();
    oscillator.type = settings.wave;
    oscillator.frequency.value = harmonicLevel * this.freq;
    oscillator.connect(this.gain);
    oscillator.start();
  }

  connect(target) {
    this._oscillator.connect(target);
  }

  start(velocity) {
    this.gain.gain.value = velocity;
  }

  stop() {
    this.gain.gain.value = 0;
  }
}

export default service;
