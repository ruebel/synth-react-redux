import midi from '../utils/midi';

const gotInputDevices = (devices) => {
  return {
    type: 'GET_INPUT_DEVICES',
    payload: devices
  };
};

export const setDevice = (device) => (dispatch, getState) => {
  let state = getState();
  // Deactivate current device
  midi.deactivateDevice(state.input.selectedDevice);
  // Start listening for inputs from new device
  midi.setDevice(device, dispatch);
  dispatch(setInputDevice(device || {}));
};

const setInputDevice = (device) => {
  return {
    type: 'SET_INPUT_DEVICE',
    payload: device
  };
};

export const getInputDevices = () => (dispatch) => {
  midi.getDevices().then(devices => {
    dispatch(gotInputDevices(devices));
  });
};
