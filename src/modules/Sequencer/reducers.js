import { combineReducers } from 'redux';
import uuid from 'uuid';
import { C } from './constants';
import testNotes from './notes';

const measureCnt = (state = 2, action) => {
  switch (action.type) {
    case C.SET_MEASURE_CNT:
      return action.payload;
    case C.SET_SETTINGS:
      return action.payload.measureCnt;
    default:
      return state;
  }
};

const notes = (state = testNotes, action) => {
  switch (action.type) {
    case C.ADD_NOTE:
      return [
        ...state.map(n => ({ ...n, selected: false })),
        ...action.payload
      ];
    case C.EDIT_NOTE:
      return state.map(n => (n.id === action.payload.id ? action.payload : n));
    case C.REMOVE_NOTE:
      return state.filter(n => n.id !== action.payload);
    case C.SELECT_NOTE:
      return state.map(n => ({ ...n, selected: n.id === action.payload }));
    default:
      return state;
  }
};

const noteRevision = (state = uuid.v4(), action) => {
  switch (action.type) {
    case C.ADD_NOTE:
    case C.EDIT_NOTE:
    case C.REMOVE_NOTE:
    case C.SET_MEASURE_CNT:
    case C.SELECT_NOTE:
    case C.SET_SETTINGS:
    case C.SET_TIME_SIG:
      return uuid.v4();
    default:
      return state;
  }
};

const tempo = (state = 120, action) => {
  switch (action.type) {
    case C.SET_TEMPO:
      return action.payload;
    case C.SET_SETTINGS:
      return action.payload.tempo;
    default:
      return state;
  }
};

const timeSig = (state = { num: 3, den: 4 }, action) => {
  switch (action.type) {
    case C.SET_TIME_SIG:
      return action.payload;
    case C.SET_SETTINGS:
      return action.payload.timeSig;
    default:
      return state;
  }
};

export default combineReducers({
  measureCnt,
  notes,
  noteRevision,
  tempo,
  timeSig
});
