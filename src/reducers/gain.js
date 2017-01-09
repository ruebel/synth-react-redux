import { combineReducers } from 'redux';
import initialState from '../store/initialState';

const gain = combineReducers({
  outputLevel
});

function outputLevel(state = initialState.audio.gain.outputLevel, action) {
  switch(action.type){
    case 'SET_OUTPUT_LEVEL':
      return action.payload;
    case 'LOAD_PRESET':
      return action.payload.audio.gain.outputLevel;
    default:
      return state;
  }
}

export default gain;
