import React from 'react';
import Audio from './Audio';
import DeviceSelector from './DeviceSelector';
import Keyboard from './Keyboard';
import Synth from './Synth';

const App = () => {
  return (
    <div>
      <DeviceSelector />
      <Synth />
      <Keyboard />
      <Audio />
    </div>
  );
};

export default App;
