import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {addEffect, removeEffect, reorderEffects, setEffectSettings} from '../../../actions/audio';
import Effects from './Effects';

const EffectBank = ({context, effects, gainStage, addEffect, removeEffect, reorderEffects, setEffectSettings}) => {
  let units = effects.map((e, i) => {
    let output = context.destination;
    if (i < effects.length - 1) {
      output = effects[i + 1].input;
    }
    // Load effect type dynamically
    let Effect = Effects[e.type];
    return (<Effect key={i}
            changeSettings={setEffectSettings}
            context={context}
            input={i == 0 ? gainStage : null}
            move={reorderEffects}
            output={output}
            remove={removeEffect}
            settings={e} />);
  });
  // If no effects are present pass gain stage directly to audio output
  if (units.length === 0) {
    gainStage.disconnect();
    gainStage.connect(context.destination);
  }
  return (
    <div>
      <button onClick={() => addEffect('Distortion')}>Add Distortion!!!</button>
      <button onClick={() => addEffect('Reverb')}>Add Reverb!!!</button>
      {units}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    context: state.audio.context,
    gainStage: state.audio.gainStage,
    effects: state.audio.effects
  };
};

EffectBank.propTypes = {
  addEffect: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired,
  effects: PropTypes.array.isRequired,
  gainStage: PropTypes.object.isRequired,
  removeEffect: PropTypes.func.isRequired,
  reorderEffects: PropTypes.func.isRequired,
  setEffectSettings: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  addEffect,
  removeEffect,
  reorderEffects,
  setEffectSettings})(EffectBank);
