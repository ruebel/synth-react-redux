import React from 'react';

class Context extends React.Component {
  constructor(props) {
    super(props);
    window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext;
    let context = new AudioContext();
    this.state = {
      context,
      createOscillator: this.createOscillator.bind(this)
    };
  }

  createOscillator(freq) {
    let oscillator = this.state.context.createOscillator();
    oscillator.type = 'square';
    oscillator.frequency.value = freq;
    oscillator.connect(this.state.context.destination);
    oscillator.start();
    return oscillator;
  }

  render () {
    this.props.children(this.state);
  }
}

export default Context;
