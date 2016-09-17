import { combineReducers } from 'redux';
import initialState from '../store/initialState';

const rootReducer = combineReducers({
  audio,
  keys
});

function keys(state = initialState.keys, action) {
  switch(action.type){
    case 'KEY_DOWN':
      return state.map(k => {
        if (k.id === action.payload) {
          k.on = true;
          k.audio.gain.gain.value = 0.4;
        }
        return k;
      });
    case 'KEY_UP':
    return state.map(k => {
      if (k.id === action.payload) {
        k.on = false;
        k.audio.gain.gain.value = 0;
      }
      return k;
    });
    case 'SETUP_CONTEXT':
      return state.map(k => {
        return Object.assign({}, k, {
          audio: action.payload.createOscillator(k.freq)
        });
      });
    default:
      return state;
  }
}

function audio(state = initialState.audio, action) {
  switch(action.type) {
    case 'SETUP_CONTEXT':
      return action.payload;
    default:
      return state;
  }
}

export default rootReducer;
