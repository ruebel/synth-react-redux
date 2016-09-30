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
    input
  };
  dispatch(addEffectAfter(payload));
};

export const getImpulseResponse = (settings) => (dispatch, getState) => {
  if (!settings.irUrl) {
    settings.irBuffer = null;
    settings.irUrl = null;
    settings.effectLevel = 0;
    dispatch(setEffectSettings(settings));
  } else {
    const state = getState();
    // Get the IR file from the server
    let ajaxRequest = new XMLHttpRequest();
    ajaxRequest.open('GET', settings.irUrl, true);
    ajaxRequest.responseType = 'arraybuffer';
    ajaxRequest.onload = () => {
      // Create teh audio buffer source
      let audioData = ajaxRequest.response;
      state.audio.context.decodeAudioData(audioData, (buffer) => {
        let source = state.audio.context.createBufferSource();
        source.buffer = buffer;
        settings.irBuffer = buffer;
        // Pass along to settings
        dispatch(setEffectSettings(settings));
      });
    };
    ajaxRequest.send();
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

export const setEffectSettings = (settings, field = '') => {
  if (field === 'irUrl') {
    return getImpulseResponse(settings);
  }
  return {
    type: 'SET_EFFECT_SETTINGS',
    payload: settings
  };
};
