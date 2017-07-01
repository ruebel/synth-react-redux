import React from 'react';
import PropTypes from 'prop-types';
import Effect from '../Effect';
import EffectRange from '../../EffectRange';
import {
  checkPropChange,
  defaultEffectSettings
} from '../../../../../../utils/effect';

export const defaultSettings = Object.assign({}, defaultEffectSettings, {
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
});

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
