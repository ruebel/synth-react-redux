import uuid from 'uuid';
import { C } from './constants';
import { actions as audioActions } from '../Audio';

export const addNote = note => ({
  type: C.ADD_NOTE,
  payload: [
    {
      id: uuid.v4(),
      length: 0.0625,
      selected: true,
      velocity: 100,
      ...note
    }
  ]
});

export const editNote = note => ({
  type: C.EDIT_NOTE,
  payload: note
});

export const removeNote = id => ({
  type: C.REMOVE_NOTE,
  payload: id
});

export const selectNote = id => ({
  type: C.SELECT_NOTE,
  payload: id
});

export const setMeasureCnt = measureCnt => ({
  type: C.SET_MEASURE_CNT,
  payload: measureCnt
});

export const setSettings = settings => ({
  type: C.SET_SETTINGS,
  payload: settings
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

export const triggerNotes = (notes = []) => (dispatch, getState) => {
  const { sequencer } = getState();
  const timeout = 60000 * sequencer.timeSig.den / sequencer.tempo;
  notes.forEach(n => {
    dispatch(audioActions.keyDown(n.tone, n.velocity / 127));
    setTimeout(
      () => dispatch(audioActions.keyUp(n.tone)),
      timeout * n.length - 10
    );
  });
};
