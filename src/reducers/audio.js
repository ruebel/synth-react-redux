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
      return Object.assign({}, state, {
        [action.payload.id]: action.payload
      });
    case 'KEY_UP':
    return Object.assign({}, state, {
      [action.payload]: Object.assign({}, state[action.payload], {
        velocity: 0
      })
    });
    default:
      return state;
  }
}

export default audio;
