import {keyDown, keyUp} from '../actions/audio';
import {setPitchBend, setSustain} from '../actions/synth';
let keyUpConnected;
let keyDownConnected;
let startNote = 48;
const keyMap = {
  // A (C)
  65: startNote++,
  // W (C#)
  87: startNote++,
  // S (D)
  83: startNote++,
  // E (Eb)
  69: startNote++,
  // D (E)
  68: startNote++,
  // F (F)
  70: startNote++,
  // T (F#)
  84: startNote++,
  // G (G)
  71: startNote++,
  // Y (G#)
  89: startNote++,
  // H (A)
  72: startNote++,
  // U (Bb)
  85: startNote++,
  // J (C)
  74: startNote++
};
const service = {
  deactivateDevice,
  getDevices,
  setDevice
};
/**
 * Convert MIDI Velocity (0-127) to Web Audio Gain (0-1)
 */
function convertVelocity(velocity) {
  return (velocity / 127).toFixed(2);
}
/**
 * Stop listening for device inputs
 */
function deactivateDevice(device) {
  if (!device) {
    return;
  }
  switch (device.device) {
    case 'MIDI':
      device.onmidimessage = null;
      break;
    case 'KEYBOARD':
      document.removeEventListener('keydown', keyDownConnected);
      document.removeEventListener('keyup', keyUpConnected);
      break;
  }
}
/**
 * Get Midi Devices
 */
function getDevices() {
  // Look for Web MIDI API Support
  if (window.navigator && 'function' === typeof window.navigator.requestMIDIAccess) {
    return window.navigator.requestMIDIAccess()
      .then(access => {
        // Add computer keyboard support
        let devices = [{
          id: '0',
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
/**
 * Handle Computer Keyboard key down
 */
const handleKeyDown = (dispatch) => (e) => {
  let note = keyMap[e.keyCode];
  if (note) {
    dispatch(keyDown(note));
  }
};
/**
 * Handle Computer Keyboard key up
 */
const handleKeyUp = (dispatch) => (e) => {
  let note = keyMap[e.keyCode];
  if (note) {
    dispatch(keyUp(note));
  }
};
/**
 * Handle incoming midi messages
 * e => MIDI event payload
 * e.timestamp is when function occured
 * e.data is function definition
 * e.data[0] = MIDI Function
 * e.data[1] = MIDI Note
 * e.data[2] = MIDI Velocity
 */
const handleMidiMessage = (dispatch) => (e) => {
  switch (e.data[0]) {
    // Note On
    case 144:
      let velocity = convertVelocity(e.data[2]);
      if (velocity > 0) {
        dispatch(keyDown(e.data[1], velocity));
      } else {
        dispatch(keyUp(e.data[1]));
      }
      break;
    // Note Off
    case 128:
      dispatch(keyUp(e.data[1]));
      break;
    // Trigger Bank
    case 153:
      // 36 - 49
      break;
    // Control
    case 176:
      switch(e.data[1]) {
        // Modulation
        case 1:

          break;
        // Sustain Pedal
        case 64:
          if (e.data[2] == 0) {
            // Sustain off
            dispatch(setSustain(false));
          } else {
            // Sustain on
            dispatch(setSustain(true));
          }
          break;
      }
      break;
    // Pitch Bend
    case 224:
      // 0 = max negative
      // 64 = no detune
      // 127 = max positive
      dispatch(setPitchBend(e.data[1] - 64));
      break;
  }
};
/**
 * Set input device
 */
function setDevice(device, dispatch) {
  if (!device) {
    return;
  }
  const handleMidi = handleMidiMessage(dispatch);
  switch (device.device) {
    case 'MIDI':
      device.onmidimessage = handleMidi;
      break;
    case 'KEYBOARD':
      keyUpConnected = handleKeyUp(dispatch);
      keyDownConnected = handleKeyDown(dispatch);
      document.addEventListener('keydown', keyDownConnected);
      document.addEventListener('keyup', keyUpConnected);
      break;
  }
}

export default service;
