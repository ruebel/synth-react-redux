import {getRandomInt} from './math';
export const inputTypes = {
  keyboard: 'KEYBOARD',
  midi: 'MIDI',
  stream: 'STREAM',
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
const streamInput = {
  id: '2',
  device: inputTypes.stream,
  name: 'Audio Input'
};
/**
 * Convert MIDI Velocity (0-127) to Web Audio Gain (0-1)
 */
export const convertVelocity = (velocity) => {
  return (velocity / 127).toFixed(2);
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
        const devices = [keyboardInput, streamInput, websocketInput];
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
