import {combineReducers} from 'redux';
import {C} from './constants';

const measureCnt = (state = 1, action) => {
  switch (action.type) {
    case C.SET_MEASURE_CNT:
      return action.payload;
    default:
      return state;
  }
};

const notes = (state = [{tone: 60, beat: 1}], action) => {
  switch (action.type) {
    case C.ADD_NOTE:
      return [...state, action.payload];
    case C.EDIT_NOTE:
      return state.map(n => n.id === action.payload.id ? action.payload : n);
    case C.REMOVE_NOTE:
      return state.filter(n => n.id !== action.payload.id);
    default:
      return state;
  }
};

const tempo = (state = 120, action) => {
  switch (action.type) {
    case C.SET_TEMPO:
      return action.payload;
    default:
      return state;
  }
};

const timeSig = (state = {num: 4, den: 4}, action) => {
  switch (action.type) {
    case C.SET_TIME_SIG:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  measureCnt,
  notes,
  tempo,
  timeSig
});
