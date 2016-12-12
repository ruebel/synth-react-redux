import { combineReducers } from 'redux';
import audio from './audio';
import control from './control';
import input from './input';
import synth from './synth';

const rootReducer = combineReducers({
  audio,
  control,
  input,
  synth
});

export default rootReducer;
