import midi from '../utils/midi';

const gotInputDevices = (devices) => {
  return {
    type: 'GET_INPUT_DEVICES',
    payload: devices
  };
};

export const setDevice = (device) => {
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
