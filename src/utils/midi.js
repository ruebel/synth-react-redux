import {keyDown, keyUp} from '../actions/audio';

const service = {
  getDevices,
  setDevice
};

function getDevices() {
  // Look for Web MIDI API Support
  if (window.navigator && 'function' === typeof window.navigator.requestMIDIAccess) {
    return window.navigator.requestMIDIAccess()
      .then(access => {
        let devices = [{
          id: 0,
          device: 'KEYBOARD',
          name: 'Computer Keyboard'
        }];
        if (access.inputs && access.inputs.size > 0) {
          let inputs = access.inputs.values();
          for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
            let device = input.value;
            device.device = 'MIDI';
            devices.push(device);
          }
        }
        return devices;
      });
  } else {
    throw 'No Web MIDI support detected!';
  }
}

const handleMessage = (dispatch) => (e) => {
  /**
   * e.data is an array
   * e.data[0] = on (144) / off (128) / detune (224)
   * e.data[1] = midi note
   * e.data[2] = velocity || detune
   */
  switch (e.data[0]) {
    case 144:
      if (e.data[2] === 0) {
        dispatch(keyUp(e.data[1]));
      } else {
        dispatch(keyDown(e.data[1]));
      }
      break;
    case 128:
      dispatch(keyUp(e.data[1]));
      break;
  }
};

function setDevice(device, dispatch) {
  if (!device) return;
  const handle = handleMessage(dispatch);
  switch (device.device) {
    case 'MIDI':
      device.onmidimessage = handle;
      break;
    case 'KEYBOARD':
    default:

      break;
  }
}

export default service;
