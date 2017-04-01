import {combineReducers} from 'redux';
import uuid from 'uuid';
import {C} from '../actions';
import {actions as presetActions} from '../../Presets';
import {C as audioActions} from '../../Audio/constants';
import arpeggiator from './arpeggiator';
import modulation from './modulation';

const initialState = {
  bend: 0,
  envelope: {
    attack: 0,
    release: 0
  },
  ignoreVelocity: false,
  lastDown: null,
  oscId: uuid.v4(),
  oscillators: [{
    id: uuid.v4(),
    detune: 0,
    gain: 1,
    octave: 0,
    waveShape: 'sine'
  }],
  portamento: {
    on: false,
    speed: 75
  },
  sustain: false,
  transpose: 0
};

const synth = combineReducers({
  arpeggiator,
  bend,
  envelope: combineReducers({
    attack,
    release
  }),
  ignoreVelocity,
  lastDown,
  modulation,
  oscId,
  oscillators,
  portamento: combineReducers({
    on,
    speed
  }),
  sustain,
  transpose
});

function attack(state = initialState.envelope.attack, action) {
  switch(action.type) {
    case C.SET_SYNTH_ATTACK:
      return action.payload;
    case presetActions.C.LOAD_PRESET:
      return action.payload.synth.envelope.attack;
    default:
      return state;
  }
}

function bend(state = initialState.bend, action) {
  switch(action.type) {
    case C.SET_PITCH_BEND:
      return action.payload;
    default:
      return state;
  }
}

function ignoreVelocity(state = initialState.ignoreVelocity, action) {
  switch(action.type) {
    case C.SET_IGNORE_VELOCITY:
      return action.payload === null || action.payload === undefined ? !state : action.payload;
    case presetActions.C.LOAD_PRESET:
      return action.payload.synth.ignoreVelocity;
    default:
      return state;
  }
}

function lastDown(state = initialState.lastDown, action) {
  switch(action.type) {
    case audioActions.KEY_DOWN:
      return action.payload.id;
    default:
      return state;
  }
}

function on(state = initialState.portamento.on, action) {
  switch(action.type) {
    case C.SET_PORTAMENTO:
      return !state;
    case presetActions.C.LOAD_PRESET:
      return action.payload.synth.portamento.on;
    default:
      return state;
  }
}

function oscId(state = initialState.oscId, action) {
  switch(action.type) {
    case C.ADD_OSCILLATOR:
    case presetActions.C.LOAD_PRESET:
    case C.REMOVE_OSCILLATOR:
    case C.SET_OSCILLATOR_SETTING:
      return uuid.v4();
    default:
      return state;
  }
}

function oscillators(state = initialState.oscillators, action) {
  switch(action.type) {
    case C.ADD_OSCILLATOR:
      return [...state, action.payload];
    case presetActions.C.LOAD_PRESET:
      return action.payload.synth.oscillators;
    case C.REMOVE_OSCILLATOR:
      return state.filter(e => e.id !== action.payload);
    case C.SET_OSCILLATOR_SETTING:
      return state.map(e => {
        if (e.id === action.payload.id) {
          return Object.assign({}, e, {
            [action.payload.setting]: action.payload.value
          });
        }
        return e;
      });
    default:
      return state;
  }
}

function release(state = initialState.envelope.release, action) {
  switch(action.type) {
    case C.SET_SYNTH_RELEASE:
      return action.payload;
    case presetActions.C.LOAD_PRESET:
      return action.payload.synth.envelope.release;
    default:
      return state;
  }
}

function speed(state = initialState.portamento.speed, action) {
  switch(action.type) {
    case C.SET_PORTAMENTO_SPEED:
      return action.payload;
    case presetActions.C.LOAD_PRESET:
      return action.payload.synth.portamento.speed;
    default:
      return state;
  }
}

function sustain(state = initialState.sustain, action) {
  switch(action.type) {
    case C.SET_SUSTAIN:
      return action.payload;
    default:
      return state;
  }
}

function transpose(state = initialState.transpose, action) {
  switch(action.type) {
    case C.SET_TRANSPOSE:
      return action.payload;
    default:
      return state;
  }
}

export default synth;
