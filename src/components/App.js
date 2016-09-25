import React from 'react';
import DeviceSelector from './DeviceSelector';
import Keyboard from './Keyboard';
import ToneBank from './Audio/ToneBank';
import WaveShapeSelector from './WaveShapeSelector';
import EffectBank from './Audio/EffectBank';

const App = () => {
  return (
    <div>
      <h1>30430</h1>
      <DeviceSelector />
      <WaveShapeSelector />
      <Keyboard />
      <ToneBank />
      <EffectBank />
    </div>
  );
};

export default App;
