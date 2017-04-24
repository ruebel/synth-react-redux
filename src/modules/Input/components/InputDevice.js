import React, {PropTypes} from 'react';
import Keyboard from './Keyboard';
import Midi from './Midi';
import Socket from './Socket';
import {inputTypes} from '../../../utils/input';

const InputDevice = ({device}) => {
  if (!device) {
    return null;
  }
  switch (device.device) {
    case inputTypes.midi:
      return <Midi device={device}/>;
    case inputTypes.keyboard:
      return <Keyboard />;
    case inputTypes.websocket:
      return <Socket />;
  }
  return null;
};

InputDevice.propTypes = {
  device: PropTypes.object
};

export default InputDevice;
