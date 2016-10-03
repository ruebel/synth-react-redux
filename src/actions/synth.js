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

export const setWaveShape = (waveShape) => {
  return {
    type: 'SET_WAVE_SHAPE',
    payload: waveShape
  };
};
