import {combineReducers} from 'redux';
import initialState from '../store/initialState';

const assign = (state = initialState.control.assign, action) => {
  switch(action.type) {
    case 'ASSIGN_CONTROL':
      return action.payload;
    case 'ADD_CONTROL':
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
    case 'REMOVE_CONTROL':
      return Object.keys(state)
        .filter(k => k !== action.payload)
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
    default:
      return state;
  }
};

export default combineReducers({
  assign,
  controls,
  last
});
