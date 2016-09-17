const service = {
  getDevices
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

export default service;
