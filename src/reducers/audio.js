import { combineReducers } from 'redux';
import initialState from '../store/initialState';

const audio = combineReducers({
  context,
  effects,
  gainStage,
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

function effects(state = initialState.audio.effects, action) {
  switch(action.type) {
    case 'ADD_EFFECT':
      return [...state, action.payload];
    case 'REMOVE_EFFECT':
      return state.filter(e => e.id !== action.payload);
    case 'REORDER_EFFECTS':
      const start = state.findIndex(e => e.id === action.payload.id);
      const up = action.payload.up;
      const end = up ? start - 1 : start + 1;
      if (end < 0 || end === state.length) {
        return state;
      }
      let newState = [...state];
      newState.splice(end, 0, newState.splice(start, 1)[0]);
      return newState;
    case 'SET_EFFECT_SETTINGS':
      return state.map(e => {
        if (e.id === action.payload.id) {
          return action.payload;
        }
        return e;
      });
    default:
      return state;
  }
}

function gainStage(state = initialState.audio.gainStage) {
  // Right now there is nothing that will change this gain stage
  return state;
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
