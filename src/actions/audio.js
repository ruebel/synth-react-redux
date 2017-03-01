import uuid from 'uuid';
import {generateKey} from '../utils/audio';
import {defaultSettings} from '../components/Audio/EffectBank/Effects';
const name = 'audio';
export const C = {
  ADD_EFFECT: `${name}/ADD_EFFECT`,
  KEY_DOWN: `${name}/KEY_DOWN`,
  KEY_UP: `${name}/KEY_UP`,
  REMOVE_EFFECT: `${name}/REMOVE_EFFECT`,
  REORDER_EFFECTS: `${name}/REORDER_EFFECTS`,
  SET_EFFECT_SETTINGS: `${name}/SET_EFFECT_SETTINGS`,
  SET_OUTPUT_LEVEL: `${name}/SET_OUTPUT_LEVEL`
};
export const defaultVelocity = 0.4;

const addEffectAfter = (payload) => {
  return {
    type: C.ADD_EFFECT,
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
} ;
