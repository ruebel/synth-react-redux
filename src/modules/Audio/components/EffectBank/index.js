import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  addEffect,
  removeEffect,
  reorderEffects,
  setEffectSettings
} from '../../actions';
import AddEffect from './AddEffect';
import Effects, { defaultSettings } from './Effects';
import { getEffects } from '../../selectors';
import { selectors as appSelectors } from '../../../App';
const styles = require('./styles.css');

const createGains = (gains = {}, effects, context) => {
  // Create new gain nodes
  const createdGains = effects.reduce((total, e) => {
    return Object.assign({}, total, {
      [e.id]: gains[e.id] || context.createGain()
    });
  }, gains);
  // Remove old gain nodes
  return Object.keys(createdGains)
    .filter(k => {
      if (effects.some(e => e.id === k)) {
        return true;
      } else {
        createdGains[k].disconnect();
        return false;
      }
    })
    .reduce((total, k) => {
      return Object.assign({}, total, {
        [k]: createdGains[k]
      });
    }, {});
};

class EffectBank extends React.Component {
  render() {
    const {
      context,
      effects,
      inputGain,
      outputGain,
      addEffect,
      removeEffect,
      reorderEffects,
      setEffectSettings
    } = this.props;
    this.effectGains = createGains(this.effectGains, effects, context);
    const units = effects.map((e, i) => {
      let output = outputGain;
      if (i < effects.length - 1) {
        output = this.effectGains[effects[i + 1].id];
      }
      // Load effect type dynamically
      const Effect = Effects[e.type];
      return (
        <Effect
          key={i}
          changeSettings={setEffectSettings}
          context={context}
          defaults={defaultSettings[e.type]}
          gain={this.effectGains[e.id]}
          input={i === 0 ? inputGain : null}
          move={reorderEffects}
          output={output}
          remove={removeEffect}
          settings={e}
        />
      );
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
  }
}

const mapStateToProps = state => {
  return {
    context: appSelectors.getContext(state),
    effects: getEffects(state)
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
  setEffectSettings
})(EffectBank);
