import React from 'react';
import EffectBank from './EffectBank';
import OutputGain from './OutputGain';
import ToneBank from './ToneBank';

const Audio = () => {
  return (
    <div>
      <ToneBank />
      <EffectBank />
      <OutputGain />
    </div>
  );
};

export default Audio;
