import React, {PropTypes} from 'react';
import Effect from '../Effect';
import EffectRange from '../../EffectRange';
import WaveShapeSelector from '../../../../WaveShapeSelector';
import {checkPropChange} from '../../../../../utils/effect';

export const defaultSettings = {
  color: '#517693',
  depth: {
    min: 0,
    max: 1,
    name: 'Depth',
    value: 5
  },
  effectLevel: {
    min: 0,
    max: 1,
    name: 'Effect Level',
    value: 1
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
};

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
    if (checkPropChange(prev, next, 'waveShape')) {
      this.tremolo.type = next.settings.waveShape.value;
    }
    if (checkPropChange(prev, next, 'depth')) {
      this.depthGain.gain.value = next.settings.depth.value;
    }
    if (checkPropChange(prev, next, 'speed')) {
      this.tremolo.frequency.value = next.settings.speed.value;
    }
    this.props.wire(next, prev, this.effect);
  }

  setupAudio() {
    // Create Gain and Oscillator that will control the tremolo
    this.depthGain = this.props.context.createGain();
    this.effect = this.props.context.createGain();
    this.effect.gain.value = 1;
    this.tremolo = this.props.context.createOscillator();
    this.tremolo.connect(this.depthGain);
    this.depthGain.connect(this.effect.gain);
    this.tremolo.start(0);
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
  input: PropTypes.object,
  settings: PropTypes.object.isRequired,
  output: PropTypes.object.isRequired,
  wire: PropTypes.func.isRequired
};

export default Effect(Tremolo, 'none');
