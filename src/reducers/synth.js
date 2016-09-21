import { combineReducers } from 'redux';
import initialState from '../store/initialState';

const synth = combineReducers({
  ignoreVelocity,
  sustain,
  waveShape
});

function ignoreVelocity(state = initialState.synth.ignoreVelocity, action) {
  switch(action.type) {
    case 'SET_IGNORE_VELOCITY':
      return action.payload;
    default:
      return state;
  }
}

function sustain(state = initialState.synth.sustain, action) {
  switch(action.type) {
    case 'SET_SUSTAIN':
      return action.payload;
    default:
      return state;
  }
}

function waveShape(state = initialState.synth.waveShape, action) {
  switch(action.type) {
    case 'SET_WAVE_SHAPE':
      return action.payload;
    default:
      return state;
  }
}

export default synth;
