import uuid from 'uuid';
import {generateKey} from '../utils/audio';
import {defaultSettings} from '../components/Audio/EffectBank/Effects';
export const defaultVelocity = 0.4;

const addEffectAfter = (payload) => {
  return {
    type: 'ADD_EFFECT',
    payload
  };
};

export const addEffect = (effect) => (dispatch) => {
  const payload = {
    id: uuid.v4(),
    type: effect,
    ...defaultSettings[effect]
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

export const reorderEffects = (id, up = false) => {
  return {
    type: 'REORDER_EFFECTS',
    payload: {
      id,
      up
    }
  };
};

export const setEffectSettings = (settings) => {
  return {
    type: 'SET_EFFECT_SETTINGS',
    payload: settings
  };
};

export const setOutputLevel = (level) => {
  return {
    type: 'SET_OUTPUT_LEVEL',
    payload: level
  };
} ;
