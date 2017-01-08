import {combineReducers} from 'redux';
import audio from './audio';
import control from './control';
import input from './input';
import synth from './synth';
import initialState from '../store/initialState';

const rootReducer = combineReducers({
  audio,
  context,
  control,
  input,
  synth
});

function context(state = initialState.context, action) {
  switch(action.type) {
    case 'SETUP_AUDIO':
      return action.payload;
    default:
      return state;
  }
}

export default rootReducer;
