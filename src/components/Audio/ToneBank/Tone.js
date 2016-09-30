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

  shouldComponentUpdate(newProps) {
    let shouldUpdate = (
      newProps.settings.sustain !== this.props.settings.sustain &&
      !newProps.settings.sustain
    ) || (
      newProps.settings.sustain === this.props.settings.sustain &&
      newProps.settings !== this.props.settings) ||
      newProps.tone.velocity !== this.props.tone.velocity;
    return shouldUpdate;
  }

  setupAudio() {
    let oscillator = createOscillator(this.props.context, this.props.tone.id, this.props.settings.waveShape);
    let envelope = createGain(this.props.context, this.props.tone.velocity);

    oscillator.connect(envelope);
    envelope.connect(this.props.output);
    this.oscillator = oscillator;
    this.envelope = envelope;
  }

  render() {
    if (this.envelope) {
      let ignoreVel = this.props.settings.ignoreVelocity;
      let velocity = this.props.tone.velocity;
      let sustain = this.props.settings.sustain;
      if (!sustain || velocity > 0) {
        let now =  this.props.context.currentTime;
        if (velocity == 0) {
          // NOTE OFF
          let release = this.props.settings.envelope.release;
          this.envelope.gain.cancelScheduledValues(now);
          if (release > 0) {
            // this is necessary because of the linear ramp
            this.envelope.gain.setValueAtTime(this.envelope.gain.value, now);
            this.envelope.gain.setTargetAtTime(0.0, now, release);
          } else {
            this.envelope.gain.value = 0;
          }
        } else {
          // NOTE ON
          velocity = ignoreVel ? 0.4 : velocity;
          let envAttackEnd = now + ((this.props.settings.envelope.attack || 0) / 10.0) + 0.001;
          // let envAttackEnd = now + (68 / 20.0);
          this.envelope.gain.setValueAtTime(this.envelope.gain.value, now);
          this.envelope.gain.linearRampToValueAtTime(velocity, envAttackEnd);
          // let timeConstant = (50 / 100.0) + 0.001;
          // this.envelope.gain.setTargetAtTime(velocity, envAttackEnd, timeConstant);
        }
      }
    }
    return null;
  }
}

Tone.propTypes = {
  context: PropTypes.object.isRequired,
  output: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  tone: PropTypes.object.isRequired
};

export default Tone;
