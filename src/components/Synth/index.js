import React from 'react';
import Envelope from './Envelope';
import Modulation from './Modulation';
import OscillatorBank from './OscillatorBank';
import Portamento from './Portamento';
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
