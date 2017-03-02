import { combineReducers } from 'redux';
import {C} from '../constants';
import gain from './gain';
import {generateKey} from '../../../utils/audio';

/**
 * Generate keys for oscillator bank
 */
const generateKeys = (startPoint = 0, numKeys = 88) => {
  const keys = {};
  for(let i = startPoint; i < (startPoint + numKeys); i++) {
    const key = generateKey(i);
    keys[key.id] = key;
  }
  return keys;
};

const initialState = {
  effects: [],
  keys: generateKeys()
};

function effects(state = initialState.effects, action) {
  switch(action.type) {
    case C.ADD_CONTROL:
      return state.map(e => {
        if (e.id === action.payload.id) {
          return Object.assign({}, e, {
            [action.payload.property]: Object.assign({}, e[action.payload.property], {
              control: action.payload.control
            })
          });
        }
        return e;
      });
    case C.ADD_EFFECT:
      return [...state, action.payload];
    case C.LOAD_PRESET:
      return action.payload.audio.effects;
    case C.REMOVE_EFFECT:
      return state.filter(e => e.id !== action.payload);
    case C.REMOVE_CONTROL:
      return state.map(e => {
        if (e.id === action.payload.id) {
          return Object.assign({}, e, {
            [action.payload.property]: Object.assign({}, e[action.payload.property], {
              control: null
            })
          });
        }
        return e;
      });
    case C.REORDER_EFFECTS:
      const start = state.findIndex(e => e.id === action.payload.id);
      const up = action.payload.up;
      const end = up ? start - 1 : start + 1;
      if (end < 0 || end === state.length) {
        return state;
      }
      const newState = [...state];
      newState.splice(end, 0, newState.splice(start, 1)[0]);
      return newState;
    case C.SEND_CONTROL_MESSAGE:
      return state.map(e => {
        if (e.id === action.payload.control.id) {
          const property = e[action.payload.control.property];
          // transform midi range to target value range
          const value = ((action.payload.value / 127) * (property.max - property.min)) + property.min;
          return Object.assign({}, e, {
            [action.payload.control.property]: Object.assign({}, property, {
              value
            })
          });
        }
        return e;
      });
    case C.SET_EFFECT_SETTINGS:
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

function keys(state = initialState.keys, action) {
  switch(action.type){
    case C.KEY_DOWN:
      return Object.assign({}, state, {
        [action.payload.id]: action.payload
      });
    case C.KEY_UP:
    return Object.assign({}, state, {
      [action.payload]: Object.assign({}, state[action.payload], {
        velocity: 0
      })
    });
    default:
      return state;
  }
}

export default combineReducers({
  effects,
  gain,
  keys
});