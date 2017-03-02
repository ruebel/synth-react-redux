import React from 'react';
import {Audio} from '../Audio';
import {Input} from '../Input';
import Keyboard from '../components/Keyboard';
import {Presets} from '../Presets';
import {Synth} from '../Synth';
import {AssignControl} from '../Control';
const styles = require('./styles.css');

const App = () => {
  return (
    <div className={styles.container}>
      <div className={styles.inline}>
        <Input />
        <Presets />
      </div>
      <Synth />
      <Keyboard />
      <Audio />
      <AssignControl />
    </div>
  );
};

export default App;
