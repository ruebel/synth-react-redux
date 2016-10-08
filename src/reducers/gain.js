import { combineReducers } from 'redux';
import initialState from '../store/initialState';

const gain = combineReducers({
  input,
  output,
  outputLevel
});


function input(state = initialState.audio.gain.input) {
  // Right now there is nothing that will change this gain stage
  return state;
}

function output(state = initialState.audio.gain.output) {
  // Right now there is nothing that will change this gain stage
  return state;
}

function outputLevel(state = initialState.audio.gain.outputLevel, action) {
  switch(action.type){
    case 'SET_OUTPUT_LEVEL':
      return action.payload;
    default:
      return state;
  }
}

export default gain;
