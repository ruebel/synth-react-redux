import uuid from 'uuid';
import {name} from './__init__';
export const C = {
  ADD_OSCILLATOR: `${name}/ADD_OSCILLATOR`,
  REMOVE_OSCILLATOR: `${name}/REMOVE_OSCILLATOR`,
  SET_ARPEGGIATOR: `${name}/SET_ARPEGGIATOR`,
  SET_ARPEGGIATOR_INTERVAL: `${name}/SET_ARPEGGIATOR_INTERVAL`,
  SET_ARPEGGIATOR_MODE: `${name}/SET_ARPEGGIATOR_MODE`,
  SET_ARPEGGIATOR_OCTAVE: `${name}/SET_ARPEGGIATOR_OCTAVE`,
  SET_IGNORE_VELOCITY: `${name}/SET_IGNORE_VELOCITY`,
  SET_MODULATION_DEPTH: `${name}/SET_MODULATION_DEPTH`,
  SET_MODULATION_ON: `${name}/SET_MODULATION_ON`,
  SET_MODULATION_SHAPE: `${name}/SET_MODULATION_SHAPE`,
  SET_MODULATION_SPEED: `${name}/SET_MODULATION_SPEED`,
  SET_OSCILLATOR_SETTING: `${name}/SET_OSCILLATOR_SETTING`,
  SET_PITCH_BEND: `${name}/SET_PITCH_BEND`,
  SET_PORTAMENTO: `${name}/SET_PORTAMENTO`,
  SET_PORTAMENTO_SPEED: `${name}/SET_PORTAMENTO_SPEED`,
  SET_SUSTAIN: `${name}/SET_SUSTAIN`,
  SET_SYNTH_ATTACK: `${name}/SET_SYNTH_ATTACK`,
  SET_SYNTH_RELEASE: `${name}/SET_SYNTH_RELEASE`
};

export const addOscillator = () => {
  return {
    type: C.ADD_OSCILLATOR,
    payload: {
      id: uuid.v4(),
      detune: 0,
      gain: 1,
      octave: 0,
      waveShape: 'sine'
    }
  };
};

export const removeOscillator = (id) => {
  return {
    type: C.REMOVE_OSCILLATOR,
    payload: id
  };
};

export const setAttack = (attack) => {
  return {
    type: C.SET_SYNTH_ATTACK,
    payload: attack
  };
};

export const setArpeggiatorInterval = (interval) => {
  return {
    type: C.SET_ARPEGGIATOR_INTERVAL,
    payload: interval
  };
};

export const setArpeggiatorMode = (mode) => {
  return {
    type: C.SET_ARPEGGIATOR_MODE,
    payload: mode.id
  };
};

export const setArpeggiatorOctave = (octave) => {
  return {
    type: C.SET_ARPEGGIATOR_OCTAVE,
    payload: octave.id
  };
};

export const setArpeggiatorOn = () => {
  return {
    type: C.SET_ARPEGGIATOR
  };
};

export const setIgnoreVelocity = (ignore) => {
  return {
    type: C.SET_IGNORE_VELOCITY,
    payload: ignore
  };
};

export const setModulationDepth = (depth) => {
  return {
    type: C.SET_MODULATION_DEPTH,
    payload: depth
  };
};

export const setModulationOn = () => {
  return {
    type: C.SET_MODULATION_ON,
    payload: null
  };
};

export const setModulationShape = (shape) => {
  return {
    type: C.SET_MODULATION_SHAPE,
    payload: shape
  };
};

export const setModulationSpeed = (speed) => {
  return {
    type: C.SET_MODULATION_SPEED,
    payload: speed
  };
};

export const setOscillatorSetting = (id, value, setting) => {
  return {
    type: C.SET_OSCILLATOR_SETTING,
    payload: {
      id,
      setting,
      value
    }
  };
};

export const setPitchBend = (bend) => {
  return {
    type: C.SET_PITCH_BEND,
    payload: bend
  };
};

export const setPortamento = () => {
  return {
    type: C.SET_PORTAMENTO,
    payload: null
  };
};

export const setPortamentoSpeed = (speed) => {
  return {
    type: C.SET_PORTAMENTO_SPEED,
    payload: speed
  };
};

export const setRelease = (release) => {
  return {
    type: C.SET_SYNTH_RELEASE,
    payload: release
  };
};

export const setSustain = (sustain) => {
  return {
    type: C.SET_SUSTAIN,
    payload: sustain
  };
};
