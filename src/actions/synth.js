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
