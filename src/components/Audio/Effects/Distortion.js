import React from 'react';

class Distortion extends React.Component {
  constructor(props) {
    super(props);

    this.setupAudio = this.setupAudio.bind(this);
    this.makeDistortionCurve = this.makeDistortionCurve.bind(this);
  }

  componentDidMount() {
    this.setupAudio();
  }

  setupAudio() {
    let dist = this.props.context.createWaveShaper();
    dist.curve = this.makeDistortionCurve(400);
    dist.oversample = '4x';
    if (this.props.input) {
      this.props.input.connect(this.props.settings.input);
    }
    this.props.settings.input.connect(dist);
    dist.connect(this.props.output);
  }

  makeDistortionCurve(amount) {
    var k = typeof amount === 'number' ? amount : 50,
      n_samples = 44100,
      curve = new Float32Array(n_samples),
      deg = Math.PI / 180,
      i = 0,
      x;
    for ( ; i < n_samples; ++i ) {
      x = i * 2 / n_samples - 1;
      curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
    }
    return curve;
  }

  render() {
    return (
      <div>Distortion</div>
    );
  }
}

export default Distortion;
