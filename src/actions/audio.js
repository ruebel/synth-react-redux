import {generateKey} from '../utils/audio';
const defaultVelocity = 0.4;

export const keyDown = (id, velocity = defaultVelocity) => {
  return {
    type: 'KEY_DOWN',
    payload: generateKey(id, velocity)
  };
};

export const keyUp = (id) => {
  return {
    type: 'KEY_UP',
    payload: id
  };
};
