import {C} from './constants';

export const addControl = (control, note) => {
  return {
    type: C.ADD_CONTROL,
    payload: {
      control: `${note[0]}:${note[1]}`,
      id: control.id,
      property: control.property,
      propertyId: control.propertyId
    }
  };
};

export const assignControl = (assign) => {
  return {
    type: C.ASSIGN_CONTROL,
    payload: assign ? {...assign} : null
  };
};

export const removeControl = (control) => {
  return {
    type: C.REMOVE_CONTROL,
    payload: {...control}
  };
};

export const setControl = (control) => (dispatch, getState) => {
  const state = getState();
  const c = state.control.controls[`${control[0]}:${control[1]}`];
  if (c) {
    dispatch(sendControlMessage(c, control[2]));
  } else {
    dispatch(midiEvent(control));
  }
};

const sendControlMessage = (control, value) => ({
  type: C.SEND_CONTROL_MESSAGE,
  payload: {
    control,
    value
  }
});

const midiEvent = (event) => {
  return {
    type: C.MIDI_EVENT,
    payload: event
  };
};
