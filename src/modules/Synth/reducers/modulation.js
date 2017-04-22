import { combineReducers } from 'redux';
import {C} from '../actions';
import {C as presetActions} from '../../Presets';
const initialState = {
  on: false,
  depth: 4.3,
  shape: 'sine',
  speed: 4.5
};

const modulation = combineReducers({
    depth,
    on,
    shape,
    speed
  });

function depth(state = initialState.depth, action) {
  switch(action.type) {
    case C.SET_MODULATION_DEPTH:
      return action.payload;
    case presetActions.LOAD_PRESET:
      return action.payload.synth.modulation.depth;
    default:
      return state;
  }
}

function on(state = initialState.on, action) {
  switch(action.type) {
    case C.SET_MODULATION_ON:
      return !state;
    case presetActions.LOAD_PRESET:
      return action.payload.synth.modulation.on;
    default:
      return state;
  }
}

function shape(state = initialState.shape, action) {
  switch(action.type) {
    case C.SET_MODULATION_SHAPE:
      return action.payload;
    case presetActions.LOAD_PRESET:
      return action.payload.synth.modulation.shape;
    default:
      return state;
  }
}

function speed(state = initialState.speed, action) {
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
