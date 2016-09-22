import { combineReducers } from 'redux';
import audio from './audio';
import input from './input';
import synth from './synth';

const rootReducer = combineReducers({
  audio,
  input,
  synth
});

export default rootReducer;
