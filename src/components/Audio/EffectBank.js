import React from 'react';
import {connect} from 'react-redux';
import {addEffect, setEffectSettings} from '../../actions/audio';
import Effects from './Effects';

const EffectBank = ({context, effects, gainStage, addEffect, setEffectSettings}) => {
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
            input={i === 0 ? gainStage : null}
            output={output}
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

export default connect(mapStateToProps, {addEffect, setEffectSettings})(EffectBank);
