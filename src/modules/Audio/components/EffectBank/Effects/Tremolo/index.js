import React from 'react';
import PropTypes from 'prop-types';
import Effect from '../Effect';
import EffectRange from '../../EffectRange';
import WaveShapeSelector from '../../../../../components/WaveShapeSelector';
import {
  checkPropChange,
  defaultEffectSettings
} from '../../../../../../utils/effect';
import { createGain, createOscillator } from '../../../../../../utils/audio';

export const defaultSettings = Object.assign({}, defaultEffectSettings, {
  color: '#517693',
  depth: {
    min: 0,
    max: 1,
    name: 'Depth',
    value: 5
  },
  name: 'Tremolo',
  speed: {
    min: 1,
    max: 25,
    name: 'Speed',
    value: 5
  },
  title: 'Tremolo',
  waveShape: {
    value: 'sine'
  }
});

class Tremolo extends React.Component {
  constructor(props) {
    super(props);

    this.applySettings = this.applySettings.bind(this);
    this.setupAudio = this.setupAudio.bind(this);
  }

  componentDidMount() {
    this.setupAudio();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props) {
      this.applySettings(nextProps, this.props);
    }
  }

  applySettings(next, prev) {
    const time = next.context.currentTime + 1;
    if (checkPropChange(prev, next, 'waveShape')) {
      this.tremolo.type = next.settings.waveShape.value;
    }
    if (checkPropChange(prev, next, 'depth')) {
      this.depthGain.gain.setTargetAtTime(next.settings.depth.value, time, 0.1);
    }
    if (checkPropChange(prev, next, 'speed')) {
      this.tremolo.frequency.setTargetAtTime(
        next.settings.speed.value,
        time,
        0.1
      );
    }
    this.props.wire(next, prev, this.effect);
  }

  setupAudio() {
    // Create Gain and Oscillator that will control the tremolo
    this.depthGain = createGain(this.props.context, 0);
    this.effect = createGain(this.props.context, 1);
    this.tremolo = createOscillator(this.props.context);
    this.tremolo.connect(this.depthGain);
    this.depthGain.connect(this.effect.gain);
    this.applySettings(this.props);
  }

  render() {
    return (
      <div>
        <WaveShapeSelector
          value={this.props.settings.waveShape.value}
          change={e => this.props.handleSettingsChange('waveShape', e)}
        />
        <EffectRange
          change={this.props.handleSettingsChange}
          defaults={defaultSettings}
          property="depth"
          settings={this.props.settings}
        />
        <EffectRange
          change={this.props.handleSettingsChange}
          defaults={defaultSettings}
          property="speed"
          settings={this.props.settings}
        />
      </div>
    );
  }
}

Tremolo.propTypes = {
  context: PropTypes.object.isRequired,
  handleSettingsChange: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  wire: PropTypes.func.isRequired
};

export default Effect(Tremolo, 'none');
