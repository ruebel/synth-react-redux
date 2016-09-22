export const setIgnoreVelocity = (ignore) => {
  return {
    type: 'SET_IGNORE_VELOCITY',
    payload: ignore
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
