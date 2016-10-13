import uuid from 'uuid';

export const addOscillator = () => {
  return {
    type: 'ADD_OSCILLATOR',
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
    type: 'REMOVE_OSCILLATOR',
    payload: id
  };
};

export const setAttack = (attack) => {
  return {
    type: 'SET_SYNTH_ATTACK',
    payload: attack
  };
};

export const setIgnoreVelocity = (ignore) => {
  return {
    type: 'SET_IGNORE_VELOCITY',
    payload: ignore
  };
};

export const setModulationDepth = (depth) => {
  return {
    type: 'SET_MODULATION_DEPTH',
    payload: depth
  };
};

export const setModulationOn = () => {
  return {
    type: 'SET_MODULATION_ON',
    payload: null
  };
};

export const setModulationShape = (shape) => {
  return {
    type: 'SET_MODULATION_SHAPE',
    payload: shape
  };
};

export const setModulationSpeed = (speed) => {
  return {
    type: 'SET_MODULATION_SPEED',
    payload: speed
  };
};

export const setOscillatorSetting = (id, value, setting) => {
  return {
    type: 'SET_OSCILLATOR_SETTING',
    payload: {
      id,
      setting,
      value
    }
  };
};

export const setPitchBend = (bend) => {
  return {
    type: 'SET_PITCH_BEND',
    payload: bend
  };
};

export const setPortamento = () => {
  return {
    type: 'SET_PORTAMENTO',
    payload: null
  };
};

export const setPortamentoSpeed = (speed) => {
  return {
    type: 'SET_PORTAMENTO_SPEED',
    payload: speed
  };
};

export const setRelease = (release) => {
  return {
    type: 'SET_SYNTH_RELEASE',
    payload: release
  };
};

export const setSustain = (sustain) => {
  return {
    type: 'SET_SUSTAIN',
    payload: sustain
  };
};
