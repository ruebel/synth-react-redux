import React from 'react';
import PropTypes from 'prop-types';
import Effect from '../Effect';
import EffectRange from '../../EffectRange';
import {
  checkPropChange,
  defaultEffectSettings
} from '../../../../../../utils/effect';

export const defaultSettings = {
  ...defaultEffectSettings,
  attack: {
    min: 0,
    max: 1,
    name: 'Attack',
    value: 0
  },
  color: '#236b8e',
  knee: {
    min: 0,
    max: 40,
    name: 'Knee',
    value: 40
  },
  name: 'Compression',
  ratio: {
    min: 0,
    max: 20,
    name: 'Ratio',
    value: 12
  },
  release: {
    min: 0,
    max: 1,
    name: 'Release',
    value: 0.25
  },
  threshold: {
    min: -100,
    max: 0,
    name: 'Threshold',
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
    const time = next.context.currentTime + 0.01;
    if (checkPropChange(prev, next, 'threshold')) {
      this.effect.threshold.setTargetAtTime(
        next.settings.threshold.value,
        time,
        0.1
      );
    }
    if (checkPropChange(prev, next, 'knee')) {
      this.effect.knee.setTargetAtTime(next.settings.knee.value, time, 0.1);
    }
    if (checkPropChange(prev, next, 'ratio')) {
      this.effect.ratio.setTargetAtTime(next.settings.ratio.value, time, 0.1);
    }
    if (checkPropChange(prev, next, 'attack')) {
      this.effect.attack.setTargetAtTime(next.settings.attack.value, time, 0.1);
    }
    if (checkPropChange(prev, next, 'release')) {
      this.effect.release.setTargetAtTime(
        next.settings.release.value,
        time,
        0.1
      );
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
        <EffectRange
          change={this.props.handleSettingsChange}
          defaults={defaultSettings}
          property="threshold"
          settings={this.props.settings}
        />
        <EffectRange
          change={this.props.handleSettingsChange}
          defaults={defaultSettings}
          property="knee"
          settings={this.props.settings}
        />
        <EffectRange
          change={this.props.handleSettingsChange}
          defaults={defaultSettings}
          property="ratio"
          settings={this.props.settings}
        />
        <EffectRange
          change={this.props.handleSettingsChange}
          defaults={defaultSettings}
          property="attack"
          settings={this.props.settings}
        />
        <EffectRange
          change={this.props.handleSettingsChange}
          defaults={defaultSettings}
          property="release"
          settings={this.props.settings}
        />
      </div>
    );
  }
}

Compression.propTypes = {
  context: PropTypes.object.isRequired,
  handleSettingsChange: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  wire: PropTypes.func.isRequired
};

export default Effect(Compression);
