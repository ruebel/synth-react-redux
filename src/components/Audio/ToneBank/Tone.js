import React, {PropTypes} from 'react';
import {convertNoteFrequency, createGain, createOscillator} from '../../../utils/audio';

class Tone extends React.Component {
  constructor(props) {
    super(props);

    this.setupAudio = this.setupAudio.bind(this);
  }

  componentDidMount() {
    this.setupAudio();
  }

  componentWillReceiveProps(next) {
    if (next.settings.waveShape !== this.props.settings.waveShape) {
      // Change oscillator wave shape when props change
      this.oscillator.type = next.settings.waveShape;
    }
    if (next.settings.bend !== this.props.settings.bend) {
      // Pitch Bend
      const now =  this.props.context.currentTime;
      // To make the bend smooth we ramp the frequency from current to target
      const nextFreq = convertNoteFrequency(this.props.tone.id + next.settings.bend);
      this.oscillator.frequency.setValueAtTime(this.oscillator.frequency.value, now);
      // the last parameter is the speed of the bend
      this.oscillator.frequency.setTargetAtTime(nextFreq, now, 0.05);
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
    this.oscillator = createOscillator(this.props.context, this.props.tone.id, this.props.settings.waveShape);
    // Connect modulation oscillator to frequency
    this.props.modulation.connect(this.oscillator.frequency);
    this.envelope = createGain(this.props.context, this.props.tone.velocity);

    this.oscillator.connect(this.envelope);
    this.envelope.connect(this.props.output);
  }

  render() {
    if (this.envelope) {
      let ignoreVel = this.props.settings.ignoreVelocity;
      let velocity = this.props.tone.velocity;
      let sustain = this.props.settings.sustain;
      if (!sustain || velocity > 0) {
        let now =  this.props.context.currentTime;
        if (velocity == 0) {
          // Note OFF
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
          // Note ON
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
  modulation: PropTypes.object,
  output: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  tone: PropTypes.object.isRequired
};

export default Tone;
