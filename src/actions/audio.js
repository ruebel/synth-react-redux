import uuid from 'uuid';
import {generateKey} from '../utils/audio';
const defaultVelocity = 0.4;

const addEffectAfter = (payload) => {
  return {
    type: 'ADD_EFFECT',
    payload
  };
};

export const addEffect = (effect) => (dispatch, getState) => {
  let state = getState();
  let input = state.audio.context.createGain();
  let payload = {
    id: uuid.v4(),
    type: effect,
    input,
    settings: {}
  };
  dispatch(addEffectAfter(payload));
};

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

export const removeEffect = (id) => {
  return {
    type: 'REMOVE_EFFECT',
    payload: id
  };
};

export const setEffectSettings = (settings) => {
  return {
    type: 'SET_EFFECT_SETTINGS',
    payload: settings
  };
};
