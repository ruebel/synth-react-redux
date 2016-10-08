import uuid from 'uuid';
import {generateKey} from '../utils/audio';
import {defaultSettings} from '../components/Audio/EffectBank/Effects';
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
    ...defaultSettings[effect]
  };
  dispatch(addEffectAfter(payload));
};

export const getImpulseResponse = (settings) => (dispatch, getState) => {
  // Make sure we received a url to fetch
  if (!settings.irUrl) {
    // No url so just clear the IR
    settings.irBuffer = null;
    settings.irUrl = null;
    settings.effectLevel = 0;
    dispatch(setEffectSettings(settings));
  } else {
    // Received url so we will have to fetch
    const state = getState();
    // Get the IR file from the server
    let ajaxRequest = new XMLHttpRequest();
    ajaxRequest.open('GET', settings.irUrl, true);
    ajaxRequest.responseType = 'arraybuffer';
    ajaxRequest.onload = () => {
      // Create the audio buffer source
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
