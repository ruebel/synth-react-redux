import React from 'react';
import Envelope from './Envelope';
import Modulation from './Modulation';
import OscillatorBank from './OscillatorBank';
import Portamento from './Portamento';

const Synth = () => {
  return (
    <div>
      <OscillatorBank />
      <Envelope />
      <Modulation />
      <Portamento />
    </div>
  );
};

export default Synth;
