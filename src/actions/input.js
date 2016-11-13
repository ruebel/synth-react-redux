import input from '../utils/input';

const gotInputDevices = (devices) => {
  return {
    type: 'GET_INPUT_DEVICES',
    payload: devices
  };
};

export const setDevice = (device) => (dispatch, getState) => {
  let state = getState();
  // Deactivate current device
  input.deactivateDevice(state.input.selectedDevice);
  // Start listening for inputs from new device
  input.setDevice(device, dispatch);
  dispatch(setInputDevice(device || {}));
};

const setInputDevice = (device) => {
  return {
    type: 'SET_INPUT_DEVICE',
    payload: device
  };
};

export const getInputDevices = () => (dispatch) => {
  input.getDevices()
  .then(devices => {
    dispatch(gotInputDevices(devices));
    // Set default device
    if (devices.length > 0) {
      // Try to default to first midi device
      let midi = devices.find(d => d.device === 'MIDI');
      if (midi) {
        dispatch(setDevice(midi));
      } else {
        // No midi so just set first device (propably computer keyboard)
        dispatch(setDevice(devices[0]));
      }
    }
  });
};
