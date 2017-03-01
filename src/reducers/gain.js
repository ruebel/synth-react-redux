import { combineReducers } from 'redux';
import {C} from '../actions/audio';
import {C as presetActions} from '../actions/presets';
import initialState from '../store/initialState';

const gain = combineReducers({
  outputLevel
});

function outputLevel(state = initialState.audio.gain.outputLevel, action) {
  switch(action.type){
    case C.SET_OUTPUT_LEVEL:
      return action.payload;
    case presetActions.LOAD_PRESET:
      return action.payload.audio.gain.outputLevel;
    default:
      return state;
  }
}

export default gain;
