import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {addEffect, removeEffect, reorderEffects, setEffectSettings} from '../../../actions/audio';
import AddEffect from './AddEffect';
import Effects, {defaultSettings} from './Effects';
const styles = require('./styles.css');

const EffectBank = ({context, effects, inputGain, outputGain, addEffect, removeEffect, reorderEffects, setEffectSettings}) => {
  const units = effects.map((e, i) => {
    let output = outputGain;
    if (i < effects.length - 1) {
      output = effects[i + 1].input;
    }
    // Load effect type dynamically
    const Effect = Effects[e.type];
    return (<Effect key={i}
            changeSettings={setEffectSettings}
            context={context}
            defaults={defaultSettings[e.type]}
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
      <AddEffect add={addEffect} />
      <div className={styles.bank}>
        {units}
      </div>
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
