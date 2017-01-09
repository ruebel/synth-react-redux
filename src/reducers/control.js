import {combineReducers} from 'redux';
import initialState from '../store/initialState';

const assign = (state = initialState.control.assign, action) => {
  switch(action.type) {
    case 'ASSIGN_CONTROL':
      return action.payload;
    case 'ADD_CONTROL':
    case 'REMOVE_CONTROL':
      return null;
    default:
      return state;
  }
};

const controls = (state = initialState.control.controls, action) => {
  switch(action.type) {
    case 'ADD_CONTROL':
      return Object.assign({}, state, {
        [action.payload.control]: action.payload
      });
    case 'LOAD_PRESET':
      return action.payload.control.controls;
    case 'REMOVE_CONTROL':
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

const last = (state = initialState.control.last, action) => {
  switch(action.type) {
    case 'MIDI_EVENT':
      return action.payload;
    case 'ASSIGN_CONTROL':
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
