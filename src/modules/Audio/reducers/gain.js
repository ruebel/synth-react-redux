import { combineReducers } from 'redux';
import {C} from '../constants';
import {actions as presetActions} from '../../Presets';

const initialState = {
  outputLevel: 1
};

const gain = combineReducers({
  outputLevel
});

function outputLevel(state = initialState.outputLevel, action) {
  switch(action.type){
    case C.SET_OUTPUT_LEVEL:
      return action.payload;
    case presetActions.C.LOAD_PRESET:
      return action.payload.audio.gain.outputLevel;
    default:
      return state;
  }
}

export default gain;
