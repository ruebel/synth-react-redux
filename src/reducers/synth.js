import { combineReducers } from 'redux';
import initialState from '../store/initialState';

const synth = combineReducers({
  envelope: combineReducers({
    attack,
    release
  }),
  ignoreVelocity,
  sustain,
  waveShape
});

function attack(state = initialState.synth.envelope.attack, action) {
  switch(action.type) {
    case 'SET_SYNTH_ATTACK':
      return action.payload;
    default:
      return state;
  }
}

function ignoreVelocity(state = initialState.synth.ignoreVelocity, action) {
  switch(action.type) {
    case 'SET_IGNORE_VELOCITY':
      return action.payload;
    default:
      return state;
  }
}

function release(state = initialState.synth.envelope.release, action) {
  switch(action.type) {
    case 'SET_SYNTH_RELEASE':
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
