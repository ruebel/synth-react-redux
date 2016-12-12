export const addControl = (id, control) => {
  return {
    type: 'ADD_CONTROL',
    payload: {
      id,
      control
    }
  };
};

export const assignControl = (id, name, isEffect) => {
  return {
    type: 'ASSIGN_CONTROL',
    payload: {
      id,
      name,
      isEffect
    }
  };
};

export const removeControl = (id) => {
  return {
    type: 'REMOVE_CONTROL',
    payload: id
  };
};

export const setControl = (control) => (dispatch, getState) => {
  const state = getState();
  const c = state.control[control[0]];
  if (c) {
    dispatch(() => ({
      type: 'SEND_CONTROL_MESSAGE',
      payload: c
    }));
  } else {
    dispatch(midiEvent(control));
  }
};

const midiEvent = (event) => {
  return {
    type: 'MIDI_EVENT',
    payload: event
  };
};
