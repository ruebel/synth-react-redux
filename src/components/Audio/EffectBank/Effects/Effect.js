import React, {PropTypes} from 'react';
import RangeControl from '../../../Synth/Envelope/RangeControl';

const Effect = (WrappedComponent) => {
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
      if (!prev || prev.settings.effectLevel !== next.settings.effectLevel) {
        this.effectGain.gain.value = next.settings.effectLevel || 0;
        this.bypassGain.gain.value = 1 - (next.settings.effectLevel || 0);
      }
    }

    handleSettingsChange(property, e) {
      let settings = Object.assign({}, this.props.settings, {
        [property]: (e.target ? e.target.value : e)
      });
      this.props.changeSettings(settings, property);
    }

    wire(next, prev, effect) {
      if (!prev ||
        prev.input !== next.input ||
        prev.settings.input !== next.settings.input ||
        prev.output !== next.output) {
          // Make sure we have already made bypass gains
          if (!this.effectGain) {
            this.effectGain = this.props.context.createGain();
            this.bypassGain = this.props.context.createGain();
          }
          // Connect Gain Stage Input if required
          if (next.input) {
            next.input.disconnect();
            next.input.connect(next.settings.input);
          }
          // Connect output
          next.settings.input.disconnect();
          next.settings.input.connect(this.effectGain);
          this.effectGain.connect(effect);
          // Bypass Gain
          next.settings.input.connect(this.bypassGain);
          this.bypassGain.disconnect();
          this.bypassGain.connect(next.output);
          // Effect Gain
          effect.disconnect();
          effect.connect(next.output);
      }
    }

    render () {
      return (
        <div>
          <button onClick={() => this.props.remove(this.props.settings.id)}>X</button>
          <WrappedComponent {...this.props} wire={this.wire}/>
          <RangeControl title="Effect Level"
                        value={this.props.settings.effectLevel || 0}
                        onSet={e => this.handleSettingsChange('effectLevel', e)}/>
        </div>
      );

    }
  }

  EffectComponent.propTypes = {
    changeSettings: PropTypes.func.isRequired,
    context: PropTypes.object.isRequired,
    remove: PropTypes.func.isRequired,
    settings: PropTypes.object.isRequired
  };

  return EffectComponent;
};

export default Effect;
