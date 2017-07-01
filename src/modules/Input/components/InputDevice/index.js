import React from 'react';
import PropTypes from 'prop-types';
import Keyboard from './Keyboard';
import Midi from './Midi';
import Socket from './Socket';
import Stream from './Stream';
import {inputTypes} from '../../../../utils/input';

const InputDevice = ({device}) => {
  if (!device) {
    return null;
  }
  switch (device.device) {
    case inputTypes.midi:
      return <Midi device={device}/>;
    case inputTypes.keyboard:
      return <Keyboard />;
    case inputTypes.stream:
      return <Stream />;
    case inputTypes.websocket:
      return <Socket />;
  }
  return null;
};

InputDevice.propTypes = {
  device: PropTypes.object
};

export default InputDevice;
