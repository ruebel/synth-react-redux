import {C} from './constants';

export const addNote = note => ({
  type: C.ADD_NOTE,
  payload: note
});

export const editNote = note => ({
  type: C.EDIT_NOTE,
  payload: note
});

export const removeNote = note => ({
  type: C.REMOVE_NOTE,
  payload: note
});

export const setMeasureCnt = measureCnt => ({
  type: C.SET_MEASURE_CNT,
  payload: measureCnt
});

export const setTempo = tempo => ({
  type: C.SET_TEMPO,
  payload: tempo
});

export const setTimeSig = timeSig => ({
  type: C.SET_TIME_SIG,
  payload: timeSig
});
