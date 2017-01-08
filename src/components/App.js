import React from 'react';
import Audio from './Audio';
import DeviceSelector from './DeviceSelector';
import Keyboard from './Keyboard';
import PresetBank from './PresetBank';
import Synth from './Synth';
import AssignControl from './AssignControl';

const App = () => {
  return (
    <div className="container">
      <DeviceSelector />
      <PresetBank />
      <Synth />
      <Keyboard />
      <Audio />
      <AssignControl />
    </div>
  );
};

export default App;
