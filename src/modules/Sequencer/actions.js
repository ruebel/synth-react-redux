import uuid from 'uuid';
import { C } from './constants';
import { actions as audioActions } from '../Audio';

export const addNote = note => ({
  type: C.ADD_NOTE,
  payload: [
    {
      id: uuid.v4(),
      velocity: 100,
      ...note
    },
    {
      id: uuid.v4(),
      ...note,
      velocity: 0,
      beat: note.beat + 1
    }
  ]
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

export const stop = () => dispatch => {
  dispatch(audioActions.clearKeys());
};

export const triggerNotes = (notes = []) => dispatch => {
  // Trigger note offs first
  notes
    .sort((a, b) => a.velocity - b.velocity)
    .map(n => dispatch(audioActions.keyDown(n.tone, n.velocity / 127)));
};
