import {actions as audioActions} from '../modules/Audio';
import {actions as controlActions} from '../modules/Control';
import {actions as inputActions} from '../modules/Input';
import {actions as synthActions} from '../modules/Synth';
import keyMap from './keyMap';
import {getRandomInt} from './math';
export const inputTypes = {
  keyboard: 'KEYBOARD',
  midi: 'MIDI',
  websocket: 'WEBSOCKET'
};
const keyboardInput = {
  id: '0',
  device: inputTypes.keyboard,
  name: 'Computer Keyboard'
};
const websocketInput = {
  id: '1',
  device: inputTypes.websocket,
  name: 'Websocket'
};
/**
 * References to Key Up / Key Down event listeners
 */
let keyUpConnected;
let keyDownConnected;
const downKeys = {};
let webSocket;
/**
 * Convert MIDI Velocity (0-127) to Web Audio Gain (0-1)
 */
const convertVelocity = (velocity) => {
  return (velocity / 127).toFixed(2);
};
/**
 * Stop listening for device inputs
 */
export const deactivateDevice = (device) => {
  if (!device) {
    return;
  }
  switch (device.device) {
    case inputTypes.midi:
      device.onmidimessage = null;
      break;
    case inputTypes.keyboard:
      document.removeEventListener('keydown', keyDownConnected);
      document.removeEventListener('keyup', keyUpConnected);
      break;
  }
};
/**
 * Get Midi Devices
 */
export const getDevices = () => {
  // Look for Web MIDI API Support
  if (window.navigator && 'function' === typeof window.navigator.requestMIDIAccess) {
    return window.navigator.requestMIDIAccess()
      .then(access => {
        // Add computer keyboard support
        const devices = [keyboardInput, websocketInput];
        if (access.inputs && access.inputs.size > 0) {
          const inputs = access.inputs.values();
          for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
            const device = input.value;
            device.device = inputTypes.midi;
            devices.push(device);
          }
        }
        return devices;
      });
  } else {
    // throw 'No Web MIDI support detected!';
    const devices = [keyboardInput];
    return (new Promise(resolve => resolve(devices)));
  }
};

export const getRandomScaleNote = (settings, previous, message) => {
  return Object.assign({
    length: getRandomLength(settings),
    note: getRandomNote(settings, message)
  }, getRandomVelocity(settings, previous, message));
};

export const getRandomNote = (settings) => {
  const index = getRandomInt(0, settings.scale.length);
  const octaveNote = settings.scale[index];
  const note = getRandomInt(0, 6) * 12 + octaveNote;
  return note;
};

export const getRandomLength = (settings) => {
  return getRandomInt(settings.noteLength[0] || 0, settings.noteLength[1] || 5000);
};

export const getRandomVelocity = (settings, previous, message) => {
  let velocityScalar = message[settings.velocityScalar];
  if (!Number.isInteger(velocityScalar)) {
    velocityScalar = 100;
  }
  const lastVelocity = Math.max(Math.abs(previous.velocity), 0.5);
  const lastScalar = Math.max(previous.velocityScalar, 100);
  const velocity = Math.max(Math.min(velocityScalar / lastScalar * lastVelocity, 1), 0.3);
  return {
    velocity,
    velocityScalar
  };
};
/**
 * Handle Computer Keyboard key down
 */
const handleKeyDown = (dispatch) => (e) => {
  if (downKeys[e.keyCode]) {
    return;
  }
  const note = keyMap[e.keyCode];
  if (note) {
    dispatch(audioActions.keyDown(note));
    downKeys[e.keyCode] = true;
  }
};
/**
 * Handle Computer Keyboard key up
 */
const handleKeyUp = (dispatch) => (e) => {
  const note = keyMap[e.keyCode];
  downKeys[e.keyCode] = false;
  if (note) {
    dispatch(audioActions.keyUp(note));
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
      const velocity = convertVelocity(e.data[2]);
      if (velocity > 0) {
        dispatch(audioActions.keyDown(e.data[1], velocity));
      } else {
        dispatch(audioActions.keyUp(e.data[1]));
      }
      break;
    // Note Off
    case 128:
      dispatch(audioActions.keyUp(e.data[1]));
      break;
    // Trigger Bank
    // case 153:
    //   // 36 - 49
    //   break;
    // Control
    case 176:
      switch(e.data[1]) {
        // Sustain Pedal
        case 64:
          if (e.data[2] == 0) {
            // Sustain off
            dispatch(synthActions.setSustain(false));
          } else {
            // Sustain on
            dispatch(synthActions.setSustain(true));
          }
          break;
        default:
          dispatch(controlActions.setControl(e.data));
          break;
      }
      break;
    // Pitch Bend
    case 224:
      // 0 = max negative
      // 64 = no detune
      // 127 = max positive
      dispatch(synthActions.setPitchBend(e.data[2] - 64));
      break;
    default:
      dispatch(controlActions.setControl(e.data));
      break;
  }
};
/**
 * Handle Web Socket Message
 */
const handleSocketMessage = (dispatch) => ({data}) => {
  const message = JSON.parse(data);
  dispatch(inputActions.socketMessage(message));
};
/**
 * Set input device
 */
export const setDevice = (device, dispatch, settings) => {
  if (webSocket) {
    webSocket.close();
    webSocket = null;
  }
  if (!device) {
    return;
  }
  const handleMidi = handleMidiMessage(dispatch);
  switch (device.device) {
    case inputTypes.midi:
      device.onmidimessage = handleMidi;
      break;
    case inputTypes.keyboard:
      keyUpConnected = handleKeyUp(dispatch);
      keyDownConnected = handleKeyDown(dispatch);
      document.addEventListener('keydown', keyDownConnected);
      document.addEventListener('keyup', keyUpConnected);
      break;
    case inputTypes.websocket:
      startSocket(settings, dispatch);
      break;
  }
};

export const startSocket = (settings, dispatch) => {
  stopSocket();
  webSocket = new WebSocket(settings.url);
  webSocket.onmessage = handleSocketMessage(dispatch);
};

export const stopSocket = () => {
  if (webSocket) {
    webSocket.close();
  }
};
