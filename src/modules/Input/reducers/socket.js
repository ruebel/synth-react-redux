import { combineReducers } from 'redux';
import {C} from '../actions';
const initialState = {
  previous: {
    velocity: 0,
    velocityScalar: 0
  },
  settings: {
    noteLength: [100, 5000],
    scale: [0, 4, 7],
    url: 'ws://wikimon.hatnote.com/en/',
    velocityScalar: 'change_size'
  }
};

function previous(state = initialState.previous, action) {
  switch(action.type) {
    case C.ON_SOCKET_INPUT:
      return action.payload;
    default:
      return state;
  }
}

function settings(state = initialState.settings, action) {
  switch(action.type) {
    case C.SET_SOCKET_SETTINGS:
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  previous,
  settings
});
