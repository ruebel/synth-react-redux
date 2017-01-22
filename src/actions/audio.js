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

export const getImpulseResponse = (settings) => async(dispatch, getState) => {
  // Make sure we received a url to fetch
  if (!settings.irUrl.value) {
    // No url so just clear the IR
    settings.irBuffer = null;
    settings.irUrl.value = null;
    settings.effectLevel = 0;
    dispatch(setEffectSettings(settings));
  } else {
    // Received url so we will have to fetch
    const state = getState();
    // Get the IR file from the server
    const response = await fetch(settings.irUrl.value);
    const audioData = await response.arrayBuffer();
    state.context.decodeAudioData(audioData, (buffer) => {
      const source = state.context.createBufferSource();
      source.buffer = buffer;
      settings.irBuffer = buffer;
      // Pass along to settings
      dispatch(setEffectSettings(settings));
    });
  }
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

export const setEffectSettings = (settings, field = '') => {
  // This is a little hack to be able to do the extra work of
  // getting the IR from the URL in a thunk
  if (field === 'irUrl') {
    return getImpulseResponse(settings);
  }
  // Normal effect settings update
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
