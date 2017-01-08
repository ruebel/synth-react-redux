import { combineReducers } from 'redux';
import initialState from '../store/initialState';

const gain = combineReducers({
  outputLevel
});

function outputLevel(state = initialState.audio.gain.outputLevel, action) {
  switch(action.type){
    case 'SET_OUTPUT_LEVEL':
      return action.payload;
    default:
      return state;
  }
}

export default gain;
