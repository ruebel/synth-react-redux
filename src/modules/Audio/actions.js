import uuid from 'uuid';
import { generateKey } from '../../utils/audio';
import { defaultSettings } from './components/EffectBank/Effects';
import { C } from './constants';
export const defaultVelocity = 0.4;

export const addEffect = effect => {
  return {
    type: C.ADD_EFFECT,
    payload: {
      id: uuid.v4(),
      type: effect,
      ...defaultSettings[effect]
    }
  };
};

export const keyDown = (id, velocity = defaultVelocity) => (
  dispatch,
  getState
) => {
  const state = getState();
  dispatch(keyDownAfter(generateKey(id + state.synth.transpose, velocity)));
};

const keyDownAfter = key => ({
  type: C.KEY_DOWN,
  payload: key
});

export const keyUp = id => (dispatch, getState) => {
  const state = getState();
  dispatch(keyUpAfter(id + state.synth.transpose));
};

const keyUpAfter = key => ({
  type: C.KEY_UP,
  payload: key
});

export const removeEffect = id => {
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

export const setEffectSettings = settings => {
  return {
    type: C.SET_EFFECT_SETTINGS,
    payload: settings
  };
};

export const setOutputLevel = level => {
  return {
    type: C.SET_OUTPUT_LEVEL,
    payload: level
  };
};
