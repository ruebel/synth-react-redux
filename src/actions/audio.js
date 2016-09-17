import audio from '../utils/audio';

export const keyDown = (id) => {
  return {
    type: 'KEY_DOWN',
    payload: id
  };
};

export const keyUp = (id) => {
  return {
    type: 'KEY_UP',
    payload: id
  };
};

export const setupAudio = () => {
  return {
    type: 'SETUP_AUDIO',
    payload: audio
  };
};
