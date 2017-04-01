import {combineReducers} from 'redux';
import {C} from './constants';
const initialState = {
  assign: null,
  controls: {},
  last: null
};

const assign = (state = initialState.assign, action) => {
  switch(action.type) {
    case C.ASSIGN_CONTROL:
      return action.payload;
    case C.ADD_CONTROL:
    case C.REMOVE_CONTROL:
      return null;
    default:
      return state;
  }
};

const controls = (state = initialState.controls, action) => {
  switch(action.type) {
    case C.ADD_CONTROL:
      return Object.assign({}, state, {
        [action.payload.control]: action.payload
      });
    case C.LOAD_PRESET:
      return action.payload.control.controls;
    case C.REMOVE_CONTROL:
      const val = `${action.payload.channel}:${action.payload.control}`;
      return Object.keys(state)
        .filter(k => k !== val)
        .reduce((result, k) => {
          result[k] = state[k];
          return result;
      }, {});
    default:
      return state;
  }
};

const last = (state = initialState.last, action) => {
  switch(action.type) {
    case C.MIDI_EVENT:
      return action.payload;
    case C.ASSIGN_CONTROL:
      return null;
    default:
      return state;
  }
};

export default combineReducers({
  assign,
  controls,
  last
});
