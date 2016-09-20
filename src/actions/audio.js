import audio from '../utils/audio';
const defaultVelocity = 0.4;

export const keyDown = (id, velocity = defaultVelocity) => {
  return {
    type: 'KEY_DOWN',
    payload: {
      id,
      velocity
    }
  };
};

export const keyUp = (id) => {
  return {
    type: 'KEY_UP',
    payload: id
  };
};

export const setupAudio = () => {
  let keys = audio.generateKeys();
  return {
    type: 'SETUP_AUDIO',
    payload: keys
  };
};
