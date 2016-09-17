import { combineReducers } from 'redux';
import audio from './audio';
import input from './input';

const rootReducer = combineReducers({
  audio,
  input
});

export default rootReducer;
