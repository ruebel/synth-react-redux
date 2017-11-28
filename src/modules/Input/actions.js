import { name } from './__init__';
import * as input from '../../utils/input';
import { actions as audioActions } from '../Audio';
export const C = {
  GET_INPUT_DEVICES: `${name}/GET_INPUT_DEVICES`,
  ON_SOCKET_INPUT: `${name}/ON_SOCKET_INPUT`,
  SET_INPUT_DEVICE: `${name}/SET_INPUT_DEVICE`,
  SET_SOCKET_SETTINGS: `${name}/SET_SOCKET_SETTINGS`,
  SET_SOCKET_STATUS: `${name}/SET_SOCKET_STATUS`,
  SET_STREAM: `${name}/SET_STREAM`
};

export const getInputDevices = () => (dispatch, getState) => {
  input
    .getDevices()
    .then(devices => {
      dispatch(gotInputDevices(devices));
      const state = getState();
      // Set default device
      if (devices.length > 0) {
        // Try to default to first midi device
        const midi = devices.find(d => d.device === input.inputTypes.midi);
        const selected = devices.find(
          d => d.id === state.input.selectedDevice.id
        );
        if (selected) {
          dispatch(setDevice(selected));
        } else if (midi) {
          dispatch(setDevice(midi));
        } else {
          // No midi so just set first device (propably computer keyboard)
          dispatch(setDevice(devices[0]));
        }
      }
    })
    .catch(error => {
      // eslint-disable-next-line
      debugger;
      console.error(error);
    });
};

const gotInputDevices = devices => {
  return {
    type: C.GET_INPUT_DEVICES,
    payload: devices
  };
};

export const setDevice = (device = {}) => {
  return {
    type: C.SET_INPUT_DEVICE,
    payload: device
  };
};

export const setSocketSettings = settings => ({
  type: C.SET_SOCKET_SETTINGS,
  payload: settings
});

export const setStream = stream => ({
  type: C.SET_STREAM,
  payload: stream
});

export const socketMessage = message => (dispatch, getState) => {
  const state = getState();
  const note = input.getRandomScaleNote(
    state.input.socket.settings,
    state.input.socket.previous,
    message
  );
  dispatch(audioActions.keyDown(note.note, note.velocity));
  dispatch(socketMessageAfter(Object.assign({}, note, { raw: message })));
  setTimeout(() => {
    dispatch(audioActions.keyUp(note.note));
  }, note.length);
};

const socketMessageAfter = note => {
  return {
    type: C.ON_SOCKET_INPUT,
    payload: note
  };
};

export const toggleSocket = () => {
  return {
    type: C.SET_SOCKET_STATUS
  };
};
