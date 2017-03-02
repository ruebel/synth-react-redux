import uuid from 'uuid';
import {generateKey} from '../../utils/audio';
import {defaultSettings} from './components/EffectBank/Effects';
import {C} from './constants';
export const defaultVelocity = 0.4;

export const addEffect = (effect) => {
  return {
    type: C.ADD_EFFECT,
    payload: {
      id: uuid.v4(),
      type: effect,
      ...defaultSettings[effect]
    }
  };
};

export const keyDown = (id, velocity = defaultVelocity) => {
  return {
    type: C.KEY_DOWN,
    payload: generateKey(id, velocity)
  };
};

export const keyUp = (id) => {
  return {
    type: C.KEY_UP,
    payload: id
  };
};

export const removeEffect = (id) => {
  return {
    type: C.REMOVE_EFFECT,
    payload: id
  };
};

export const reorderEffects = (id, up = false) => {
  return {
    type: C.REORDER_EFFECTS,
    payload: {
      id,
      up
    }
  };
};

export const setEffectSettings = (settings) => {
  return {
    type: C.SET_EFFECT_SETTINGS,
    payload: settings
  };
};

export const setOutputLevel = (level) => {
  return {
    type: C.SET_OUTPUT_LEVEL,
    payload: level
  };
};
