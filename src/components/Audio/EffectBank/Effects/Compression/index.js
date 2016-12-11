import React, {PropTypes} from 'react';
import Effect from '../Effect';
import RangeControl from '../../../../RangeControl';
import {checkPropChange} from '../../../../../utils/effect';

export const defaultSettings = {
  attack: {
    min: 0,
    max: 1,
    value: 0
  },
  color: '#236b8e',
  effectLevel: {
    min: 0,
    max: 1,
    value: 1
  },
  knee: {
    min: 0,
    max: 40,
    value: 40
  },
  ratio: {
    min: 0,
    max: 20,
    value: 12
  },
  release: {
    min: 0,
    max: 1,
    value: 0.25
  },
  threshold: {
    min: -100,
    max: 0,
    value: -50
  },
  title: 'Compression'
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
    if (checkPropChange(prev, next, 'threshold')) {
      this.effect.threshold.value = next.settings.threshold.value;
    }
    if (checkPropChange(prev, next, 'knee')) {
      this.effect.knee.value = next.settings.knee.value;
    }
    if (checkPropChange(prev, next, 'ratio')) {
      this.effect.ratio.value = next.settings.ratio.value;
    }
    if (checkPropChange(prev, next, 'attack')) {
      this.effect.attack.value = next.settings.attack.value;
    }
    if (checkPropChange(prev, next, 'release')) {
      this.effect.release.value = next.settings.release.value;
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
        <RangeControl title="Threshold"
                      min={defaultSettings.threshold.min}
                      max={defaultSettings.threshold.max}
                      step={1}
                      onSet={e => this.props.handleSettingsChange('threshold', e)}
                      value={this.props.settings.threshold.value}
                      />
        <RangeControl title="Knee"
                      min={defaultSettings.knee.min}
                      max={defaultSettings.knee.max}
                      step={1}
                      onSet={e => this.props.handleSettingsChange('knee', e)}
                      value={this.props.settings.knee.value}
                      />
        <RangeControl title="Ratio"
                      min={defaultSettings.ratio.min}
                      max={defaultSettings.ratio.max}
                      step={1}
                      onSet={e => this.props.handleSettingsChange('ratio', e)}
                      value={this.props.settings.ratio.value}
                      />
        <RangeControl title="Attack"
                      min={defaultSettings.attack.min}
                      max={defaultSettings.attack.max}
                      step={0.01}
                      onSet={e => this.props.handleSettingsChange('attack', e)}
                      value={this.props.settings.attack.value}
                      />
        <RangeControl title="Release"
                      min={defaultSettings.release.min}
                      max={defaultSettings.release.max}
                      step={0.01}
                      onSet={e => this.props.handleSettingsChange('release', e)}
                      value={this.props.settings.release.value}
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
