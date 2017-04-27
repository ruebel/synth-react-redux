import React from 'react';
import Columns from '../components/Columns';
import Envelope from './components/Envelope';
import Modulation from './components/Modulation';
import OscillatorBank from './components/OscillatorBank';
import Portamento from './components/Portamento';
import Transpose from './components/Transpose';

const Synth = () => {
  return (
    <div>
      <Transpose />
      <OscillatorBank />
      <Columns>
        <Envelope />
        <Modulation />
        <Portamento />
      </Columns>
    </div>
  );
};

export default Synth;
