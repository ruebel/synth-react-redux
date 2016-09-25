import React, {PropTypes} from 'react';
import {createGain, createOscillator} from '../../../utils/audio';

class Tone extends React.Component {
  constructor(props) {
    super(props);

    this.setupAudio = this.setupAudio.bind(this);
  }

  componentDidMount() {
    this.setupAudio();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.settings.waveShape !== this.props.settings.waveShape) {
      // Change oscillator wave shape when props change
      this.oscillator.type = nextProps.settings.waveShape;
    }
  }

  setupAudio() {
    let oscillator = createOscillator(this.props.context, this.props.tone.id, this.props.settings.waveShape);
    let gain = createGain(this.props.context, this.props.tone.velocity);
    oscillator.connect(gain);
    gain.connect(this.props.output);
    this.oscillator = oscillator;
    this.gain = gain;
  }

  render() {
    if (this.gain) {
      let velocity = this.props.tone.velocity;
      let sustain = this.props.settings.sustain;
      if (!sustain || velocity > 0) {
        this.gain.gain.value = this.props.settings.ignoreVelocity && velocity > 0 ? 0.4 : velocity;
      }
    }
    return null;
  }
}

Tone.propTypes = {
  context: PropTypes.object.isRequired,
  output: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  sustain: PropTypes.bool,
  tone: PropTypes.object.isRequired,
};

export default Tone;
