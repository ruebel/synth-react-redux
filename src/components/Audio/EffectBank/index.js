import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {addEffect, removeEffect, reorderEffects, setEffectSettings} from '../../../actions/audio';
import Effects from './Effects';

const EffectBank = ({context, effects, inputGain, outputGain, addEffect, removeEffect, reorderEffects, setEffectSettings}) => {
  let units = effects.map((e, i) => {
    let output = outputGain;
    if (i < effects.length - 1) {
      output = effects[i + 1].input;
    }
    // Load effect type dynamically
    let Effect = Effects[e.type];
    return (<Effect key={i}
            changeSettings={setEffectSettings}
            context={context}
            input={i == 0 ? inputGain : null}
            move={reorderEffects}
            output={output}
            remove={removeEffect}
            settings={e} />);
  });
  // If no effects are present pass gain stage directly to audio output
  if (units.length === 0) {
    inputGain.disconnect();
    inputGain.connect(outputGain);
  }
  return (
    <div>
      <button onClick={() => addEffect('BitCrusher')}>Add Bit Crusher</button>
      <button onClick={() => addEffect('Compression')}>Add Compression</button>
      <button onClick={() => addEffect('Delay')}>Add Delay</button>
      <button onClick={() => addEffect('Distortion')}>Add Distortion</button>
      <button onClick={() => addEffect('Filter')}>Add Filter</button>
      <button onClick={() => addEffect('MoogFilter')}>Add Moog Filter</button>
      <button onClick={() => addEffect('Reverb')}>Add Reverb</button>
      <button onClick={() => addEffect('Tremolo')}>Add Tremolo</button>
      {units}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    context: state.audio.context,
    effects: state.audio.effects,
    inputGain: state.audio.gain.input,
    outputGain: state.audio.gain.output
  };
};

EffectBank.propTypes = {
  addEffect: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired,
  effects: PropTypes.array.isRequired,
  inputGain: PropTypes.object.isRequired,
  outputGain: PropTypes.object.isRequired,
  removeEffect: PropTypes.func.isRequired,
  reorderEffects: PropTypes.func.isRequired,
  setEffectSettings: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  addEffect,
  removeEffect,
  reorderEffects,
  setEffectSettings})(EffectBank);
