import { combineReducers } from 'redux';
import initialState from '../store/initialState';

const audio = combineReducers({
  context,
  keys
});

function context(state = initialState.audio.context, action) {
  switch(action.type) {
    case 'SETUP_AUDIO':
      return action.payload;
    default:
      return state;
  }
}

function keys(state = initialState.audio.keys, action) {
  switch(action.type){
    case 'KEY_DOWN':
      return state.map(k => {
        if (k.id === action.payload.id) {
          k.on = action.payload.velocity;
        }
        return k;
      });
    case 'KEY_UP':
    return state.map(k => {
      if (k.id === action.payload) {
        k.on = 0;
      }
      return k;
    });
    case 'SETUP_AUDIO':
      return action.payload;
    default:
      return state;
  }
}

export default audio;
