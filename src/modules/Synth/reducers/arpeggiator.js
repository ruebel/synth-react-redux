import { combineReducers } from 'redux';
import { C } from '../actions';
import { C as presetActions } from '../../Presets';
const initialState = {
  interval: 400,
  mode: 'down',
  octave: 1,
  on: false
};

const arpeggiator = combineReducers({
  interval,
  mode,
  octave,
  on
});

function interval(state = initialState.interval, action) {
  switch (action.type) {
    case C.SET_ARPEGGIATOR_INTERVAL:
      return action.payload;
    case presetActions.LOAD_PRESET:
      return action.payload.synth.arpeggiator.interval;
    default:
      return state;
  }
}

function mode(state = initialState.mode, action) {
  switch (action.type) {
    case C.SET_ARPEGGIATOR_MODE:
      return action.payload;
    case presetActions.LOAD_PRESET:
      return action.payload.synth.arpeggiator.mode;
    default:
      return state;
  }
}

function octave(state = initialState.octave, action) {
  switch (action.type) {
    case C.SET_ARPEGGIATOR_OCTAVE:
      return action.payload;
    case presetActions.LOAD_PRESET:
      return action.payload.synth.arpeggiator.octave;
    default:
      return state;
  }
}

function on(state = initialState.on, action) {
  switch (action.type) {
    case C.SET_ARPEGGIATOR:
      return !state;
    case presetActions.LOAD_PRESET:
      return action.payload.synth.arpeggiator.on;
    default:
      return state;
  }
}

export default arpeggiator;
