import React from 'react';
import Audio from './Audio';
import DeviceSelector from './DeviceSelector';
import Keyboard from './Keyboard';
import PresetBank from './PresetBank';
import Synth from './Synth';
import AssignControl from './AssignControl';
const styles = require('./styles.css');

const App = () => {
  return (
    <div className={styles.container}>
      <div className={styles.inline}>
        <DeviceSelector />
        <PresetBank />
      </div>
      <Synth />
      <Keyboard />
      <Audio />
      <AssignControl />
    </div>
  );
};

export default App;
