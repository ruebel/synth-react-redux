import React, {PropTypes} from 'react';
import Container from '../../../../Container';
import EffectRange from '../../EffectRange';
import Mover from './Mover';
import {equalPower} from '../../../../../utils/audio';
import {checkPropChange} from '../../../../../utils/effect';
/**
 * Effect
 *
 * WrappedComponent
 * * Effect Component that will be wrapped by this component
 * effectLevelMode
 * * If 'blend' then the wet and dry will be blended with the effect level slider
 * * If 'wet' then just the wet level will be effected by the effect level slider
 * * If 'none' then no blending will be done
 */
const Effect = (WrappedComponent, effectLevelMode = 'blend') => {
  class EffectComponent extends React.Component {
    constructor(props) {
      super(props);

      this.applySettings = this.applySettings.bind(this);
      this.handleSettingsChange = this.handleSettingsChange.bind(this);
      this.wire = this.wire.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      if (this.props) {
        this.applySettings(nextProps, this.props);
      }
    }

    applySettings(next, prev) {
      if (checkPropChange(prev, next, 'effectLevel') ||
          checkPropChange(prev, next, 'on')) {
        switch(effectLevelMode) {
          case 'blend':
            if (next.settings.on.value) {
              // Cross Fade using equal power curve
              this.bypassGain.gain.value = equalPower(next.settings.effectLevel.value, true);
              this.effectGain.gain.value = equalPower(next.settings.effectLevel.value);
            } else {
              this.bypassGain.gain.value = 1;
              this.effectGain.gain.value = 0;
            }
            break;
          case 'wet':
            if (next.settings.on.value) {
              this.effectGain.gain.value = equalPower(next.settings.effectLevel.value);
            } else {
              this.effectGain.gain.value = 0;
            }
            break;
        }
      }
    }

    handleSettingsChange(property, e) {
      const settings = Object.assign({}, this.props.settings, {
        [property]: Object.assign({}, this.props.settings[property], {
          value: e.target ? e.target.value : e
        })
      });
      this.props.changeSettings(settings, property);
    }

    wire(next, prev, effect) {
      // Make sure we need to rewire everything
      if (!prev ||
        prev.input !== next.input ||
        prev.settings.input !== next.settings.input ||
        prev.output !== next.output) {
          // Make sure we have already made gains
          if (!this.effectGain) {
            this.effectGain = this.props.context.createGain();
            this.effectGain.gain.value = 1;
            if (effectLevelMode === 'blend') {
              this.bypassGain = this.props.context.createGain();
              this.bypassGain.gain.value = 0;
            }
          }
          // Connect Gain Stage Input if required
          if (next.input) {
            next.input.disconnect();
            next.input.connect(next.settings.input);
          }
          // Connect output
          next.settings.input.disconnect();
          next.settings.input.connect(this.effectGain);
          if (Array.isArray(effect)) {
            effect.forEach(e => this.effectGain.connect(e.input));
          } else {
            this.effectGain.connect(effect);
          }
          if (effectLevelMode === 'blend') {
            // Bypass Gain for blending
            next.settings.input.connect(this.bypassGain);
            this.bypassGain.disconnect();
            this.bypassGain.connect(next.output);
          } else {
            // Direct connect input
            next.settings.input.connect(next.output);
          }
          // Effect Gain
          if (Array.isArray(effect)) {
            effect.forEach(e => {
              e.output.disconnect();
              e.output.connect(next.output);
            });
          } else {
            effect.disconnect();
            effect.connect(next.output);
          }
      }
    }

    render () {
      const move = (<Mover
        close={() => this.props.remove(this.props.settings.id)}
        down={() => this.props.move(this.props.settings.id)}
        on={this.props.settings.on.value}
        power={() => this.handleSettingsChange('on', !this.props.settings.on.value)}
        up={() => this.props.move(this.props.settings.id, true)}/>);
      return (
        <Container
            active={this.props.settings.on.value}
            title={this.props.settings.title}
            titleControl={move}>
          <WrappedComponent {...this.props}
                            handleSettingsChange={this.handleSettingsChange}
                            wire={this.wire}/>
          {effectLevelMode !== 'none' ? (
            <EffectRange
              change={this.handleSettingsChange}
              defaults={this.props.defaults}
              property="effectLevel"
              settings={this.props.settings}
              title="Effect Level"
            />
            ) : null}
        </Container>
      );
    }
  }

  EffectComponent.propTypes = {
    changeSettings: PropTypes.func.isRequired,
    context: PropTypes.object.isRequired,
    defaults: PropTypes.object.isRequired,
    move: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    settings: PropTypes.object.isRequired
  };

  return EffectComponent;
};

export default Effect;
