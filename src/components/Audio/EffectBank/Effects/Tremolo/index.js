import React, {PropTypes} from 'react';
import Effect from '../Effect';
import RangeControl from '../../../../RangeControl';
import WaveShapeSelector from '../../../../WaveShapeSelector';

export const defaultSettings = {
  depth: 5,
  effectLevel: 1,
  speed: 5,
  waveShape: 'sine'
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
    if (!prev || next.settings.waveShape !== prev.settings.waveShape) {
      this.tremolo.type = next.settings.waveShape;
    }
    if (!prev || next.settings.depth !== prev.settings.depth) {
      this.depthGain.gain.value = next.settings.depth;
    }
    if (!prev || next.settings.speed !== prev.settings.speed) {
      this.tremolo.frequency.value = next.settings.speed;
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
        <h3>Tremolo</h3>
        <WaveShapeSelector value={this.props.settings.waveShape}
                           change={e => this.props.handleSettingsChange('waveShape', e)} />
        <RangeControl title="Depth"
                      value={this.props.settings.depth}
                      onSet={e => this.props.handleSettingsChange('depth', e)}
                      min={0}
                      max={1}/>
        <RangeControl title="Speed"
                      value={this.props.settings.speed}
                      onSet={e => this.props.handleSettingsChange('speed', e)}
                      min={1}
                      max={25}/>
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
