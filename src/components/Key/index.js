import React from 'react';
const styles = require('./styles.css');
import classNames from 'classnames/bind';
let cx = classNames.bind(styles);
import {createGain, createOscillator} from '../../utils/audio';

class Key extends React.Component {
  constructor(props) {
    super(props);

    this.toggleKey = this.toggleKey.bind(this);
    this.setupAudio = this.setupAudio.bind(this);
  }

  componentDidMount() {
    this.setupAudio();
  }

  setupAudio() {
    let oscillator = createOscillator(this.props.context, this.props.tone.id, this.props.shape);
    let gain = createGain(this.props.context, this.props.tone.velocity);
    oscillator.connect(gain);
    gain.connect(this.props.output);
    this.oscillator = oscillator;
    this.gain = gain;
  }

  toggleKey() {
    if (this.props.tone.velocity > 0) {
      this.props.keyUp(this.props.tone.id);
    } else {
      this.props.keyDown(this.props.tone.id);
    }
  }

  render() {
    if (this.gain) {
      this.gain.gain.value = this.props.tone.velocity;
    }
    let style = cx({
      key: true,
      on: this.props.tone.velocity > 0,
      ebony: this.props.tone.note.length > 1
    });
    return (
      <div onClick={this.toggleKey} className={style}>
        {this.props.tone.note}{this.props.tone.octave}
      </div>
    );
  }
}

export default Key;
