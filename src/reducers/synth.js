import { combineReducers } from 'redux';
import uuid from 'uuid';
import {C} from '../actions/synth';
import {C as presetActions} from '../actions/presets';
import {C as inputActions} from '../actions/input';
import initialState from '../store/initialState';
import modulation from './modulation';

const synth = combineReducers({
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
  sustain
});

function attack(state = initialState.synth.envelope.attack, action) {
  switch(action.type) {
    case C.SET_SYNTH_ATTACK:
      return action.payload;
    case presetActions.LOAD_PRESET:
      return action.payload.synth.envelope.attack;
    default:
      return state;
  }
}

function bend(state = initialState.synth.bend, action) {
  switch(action.type) {
    case C.SET_PITCH_BEND:
      return action.payload;
    default:
      return state;
  }
}

function ignoreVelocity(state = initialState.synth.ignoreVelocity, action) {
  switch(action.type) {
    case C.SET_IGNORE_VELOCITY:
      return action.payload === null || action.payload === undefined ? !state : action.payload;
    case presetActions.LOAD_PRESET:
      return action.payload.synth.ignoreVelocity;
    default:
      return state;
  }
}

function lastDown(state = initialState.synth.lastDown, action) {
  switch(action.type){
    case inputActions.KEY_DOWN:
      return action.payload.id;
    default:
      return state;
  }
}

function on(state = initialState.synth.portamento.on, action) {
  switch(action.type) {
    case C.SET_PORTAMENTO:
      return !state;
    case presetActions.LOAD_PRESET:
      return action.payload.synth.portamento.on;
    default:
      return state;
  }
}

function oscId(state = initialState.synth.oscId, action) {
  switch(action.type) {
    case C.ADD_OSCILLATOR:
    case presetActions.LOAD_PRESET:
    case C.REMOVE_OSCILLATOR:
    case C.SET_OSCILLATOR_SETTING:
      return uuid.v4();
    default:
      return state;
  }
}

function oscillators(state = initialState.synth.oscillators, action) {
  switch(action.type) {
    case C.ADD_OSCILLATOR:
      return [...state, action.payload];
    case presetActions.LOAD_PRESET:
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

function release(state = initialState.synth.envelope.release, action) {
  switch(action.type) {
    case C.SET_SYNTH_RELEASE:
      return action.payload;
    case presetActions.LOAD_PRESET:
      return action.payload.synth.envelope.release;
    default:
      return state;
  }
}

function speed(state = initialState.synth.portamento.speed, action) {
  switch(action.type) {
    case C.SET_PORTAMENTO_SPEED:
      return action.payload;
    case presetActions.LOAD_PRESET:
      return action.payload.synth.portamento.speed;
    default:
      return state;
  }
}

function sustain(state = initialState.synth.sustain, action) {
  switch(action.type) {
    case C.SET_SUSTAIN:
      return action.payload;
    default:
      return state;
  }
}

export default synth;
