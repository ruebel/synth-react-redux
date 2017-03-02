import React from 'react';
import Envelope from './components/Envelope';
import Modulation from './components/Modulation';
import OscillatorBank from './components/OscillatorBank';
import Portamento from './components/Portamento';
const styles = require('./styles.css');

const Synth = () => {
  return (
    <div>
      <OscillatorBank />
      <div className={styles.cols}>
        <Envelope />
        <Modulation />
        <Portamento />
      </div>
    </div>
  );
};

export default Synth;
