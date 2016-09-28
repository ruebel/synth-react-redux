import React from 'react';
import DeviceSelector from './DeviceSelector';
import EffectBank from './Audio/EffectBank';
import Keyboard from './Keyboard';
import Synth from './Synth';
import ToneBank from './Audio/ToneBank';

const App = () => {
  return (
    <div>
      <h1>30430</h1>
      <DeviceSelector />
      <Synth />
      <Keyboard />
      <ToneBank />
      <EffectBank />
    </div>
  );
};

export default App;
