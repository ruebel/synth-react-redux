import { combineReducers } from 'redux';
import {C} from '../actions';
const initialState = {
  previous: {
    velocity: 0,
    velocityScalar: 0
  },
  scale: [0, 2, 4, 5, 7, 9, 11],
  url: 'ws://wikimon.hatnote.com/en/',
  velocityScalar: 'change_size'
};

function previous(state = initialState.previous, action) {
  switch(action.type) {
    case C.ON_SOCKET_INPUT:
      return action.payload;
    default:
      return state;
  }
}

function scale(state = initialState.scale, action) {
  switch(action.type) {
    case C.SET_SOCKET_SCALE:
      return action.payload;
    default:
      return state;
  }
}

function url(state = initialState.url, action) {
  switch(action.type) {
    case C.SET_SOCKET_URL:
      return action.payload;
    default:
      return state;
  }
}

function velocityScalar(state = initialState.velocityScalar, action) {
  switch(action.type) {
    case C.SET_SOCKET_VELOCITY_SCALAR:
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  previous,
  scale,
  url,
  velocityScalar
});
