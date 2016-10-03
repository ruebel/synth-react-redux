import { combineReducers } from 'redux';
import initialState from '../store/initialState';

const modulation = combineReducers({
    depth,
    on,
    shape,
    speed
  });

function depth(state = initialState.synth.modulation.depth, action) {
  switch(action.type) {
    case 'SET_MODULATION_DEPTH':
      return action.payload;
    default:
      return state;
  }
}

function on(state = initialState.synth.modulation.on, action) {
  switch(action.type) {
    case 'SET_MODULATION_ON':
    return !state;
    default:
    return state;
  }
}

function shape(state = initialState.synth.modulation.shape, action) {
  switch(action.type) {
    case 'SET_MODULATION_SHAPE':
      return action.payload;
    default:
      return state;
  }
}

function speed(state = initialState.synth.modulation.speed, action) {
  switch(action.type) {
    case 'SET_MODULATION_SPEED':
      return action.payload;
    default:
      return state;
  }
}

export default modulation;
