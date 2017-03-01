import { combineReducers } from 'redux';
import {C} from '../actions/synth';
import {C as presetActions} from '../actions/presets';
import initialState from '../store/initialState';

const modulation = combineReducers({
    depth,
    on,
    shape,
    speed
  });

function depth(state = initialState.synth.modulation.depth, action) {
  switch(action.type) {
    case C.SET_MODULATION_DEPTH:
      return action.payload;
    case presetActions.LOAD_PRESET:
      return action.payload.synth.modulation.depth;
    default:
      return state;
  }
}

function on(state = initialState.synth.modulation.on, action) {
  switch(action.type) {
    case C.SET_MODULATION_ON:
      return !state;
    case presetActions.LOAD_PRESET:
      return action.payload.synth.modulation.on;
    default:
      return state;
  }
}

function shape(state = initialState.synth.modulation.shape, action) {
  switch(action.type) {
    case C.SET_MODULATION_SHAPE:
      return action.payload;
    case presetActions.LOAD_PRESET:
      return action.payload.synth.modulation.shape;
    default:
      return state;
  }
}

function speed(state = initialState.synth.modulation.speed, action) {
  switch(action.type) {
    case C.SET_MODULATION_SPEED:
      return action.payload;
    case presetActions.LOAD_PRESET:
      return action.payload.synth.modulation.speed;
    default:
      return state;
  }
}

export default modulation;
