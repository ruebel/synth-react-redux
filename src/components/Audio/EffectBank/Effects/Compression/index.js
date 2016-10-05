import React, {PropTypes} from 'react';
import Effect from '../Effect';
import RangeControl from '../../../../RangeControl';

export const defaultSettings = {
  threshold: -50,
  knee: 40,
  ratio: 12,
  attack: 0,
  release: 0.25
};

class Compression extends React.Component {
  constructor(props) {
    super(props);

    this.applySettings = this.applySettings.bind(this);
    this.setupAudio = this.setupAudio.bind(this);
    this.setupAudio();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props) {
      this.applySettings(nextProps, this.props);
    }
  }

  applySettings(next, prev) {
    if (!prev || next.settings.threshold !== prev.settings.threshold) {
      this.effect.threshold.value = next.settings.threshold;
    }
    if (!prev || next.settings.knee !== prev.settings.knee) {
      this.effect.knee.value = next.settings.knee;
    }
    if (!prev || next.settings.ratio !== prev.settings.ratio) {
      this.effect.ratio.value = next.settings.ratio;
    }
    if (!prev || next.settings.attack !== prev.settings.attack) {
      this.effect.attack.value = next.settings.attack;
    }
    if (!prev || next.settings.release !== prev.settings.release) {
      this.effect.release.value = next.settings.release;
    }
    this.props.wire(next, prev, this.effect);
  }

  setupAudio() {
    // Create waveshaper node
    this.effect = this.props.context.createDynamicsCompressor();
    this.applySettings(this.props);
  }

  render() {
    return (
      <div>
        <h3>Compression</h3>
        <RangeControl title="Threshold"
                      min={this.effect.threshold.minValue}
                      max={this.effect.threshold.maxValue}
                      step={1}
                      onSet={e => this.props.handleSettingsChange('threshold', e)}
                      value={this.props.settings.threshold}
                      />
        <RangeControl title="Knee"
                      min={this.effect.knee.minValue}
                      max={this.effect.knee.maxValue}
                      step={1}
                      onSet={e => this.props.handleSettingsChange('knee', e)}
                      value={this.props.settings.knee}
                      />
        <RangeControl title="Ratio"
                      min={this.effect.ratio.minValue}
                      max={this.effect.ratio.maxValue}
                      step={1}
                      onSet={e => this.props.handleSettingsChange('ratio', e)}
                      value={this.props.settings.ratio}
                      />
        <RangeControl title="Attack"
                      min={this.effect.attack.minValue}
                      max={this.effect.attack.maxValue}
                      step={0.01}
                      onSet={e => this.props.handleSettingsChange('attack', e)}
                      value={this.props.settings.attack}
                      />
        <RangeControl title="Release"
                      min={this.effect.release.minValue}
                      max={this.effect.release.maxValue}
                      step={0.01}
                      onSet={e => this.props.handleSettingsChange('release', e)}
                      value={this.props.settings.release}
                      />
      </div>
    );
  }
}

Compression.propTypes = {
  context: PropTypes.object.isRequired,
  handleSettingsChange: PropTypes.func.isRequired,
  input: PropTypes.object,
  settings: PropTypes.object.isRequired,
  output: PropTypes.object.isRequired,
  wire: PropTypes.func.isRequired
};

export default Effect(Compression);
