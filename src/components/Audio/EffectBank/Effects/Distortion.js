import React, {PropTypes} from 'react';
import Effect from './Effect';

class Distortion extends React.Component {
  constructor(props) {
    super(props);

    this.applySettings = this.applySettings.bind(this);
    this.makeDistortionCurve = this.makeDistortionCurve.bind(this);
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
    if (!prev || next.settings.amount !== prev.settings.amount) {
      // Make curve to apply distortion
      let val = parseInt(next.settings.amount, 10);
      this.effect.curve = this.makeDistortionCurve(val);
    }
    if (!prev || prev.settings.oversample !== prev.settings.oversample) {
      // Enumerated value (none, 2x, 4x)
      this.effect.oversample = next.settings.oversample || 'none';
    }
    this.props.wire(next, prev, this.effect);
  }

  makeDistortionCurve(amount) {
    let k = (typeof amount === 'number' && !isNaN(amount)) ? amount : 50;
    const numSamples = 44100;
    let curve = new Float32Array(numSamples);
    let x;
    for (let i = 0; i < numSamples; ++i ) {
      x = i * 2 / numSamples - 1;
      curve[i] = (Math.PI + k) * x / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  setupAudio() {
    // Create waveshaper node
    this.effect = this.props.context.createWaveShaper();
    this.applySettings(this.props);
  }

  render() {
    return (
      <div>
        <h3>Distortion</h3>
        <span> Oversampling</span>
        <select value={this.props.settings.oversample}
                onChange={e => this.props.handleSettingsChange('oversample', e)}>
          <option key="0" value="none">None</option>
          <option key="1" value="2x">2x</option>
          <option key="2" value="4x">4x</option>
        </select>
        <input type="range"
               defaultValue={this.props.settings.amount}
               min="0"
               max="100"
               onChange={e => this.props.handleSettingsChange('amount', e)}
               />
      </div>
    );
  }
}

Distortion.propTypes = {
  context: PropTypes.object.isRequired,
  handleSettingsChange: PropTypes.func.isRequired,
  input: PropTypes.object,
  settings: PropTypes.object.isRequired,
  output: PropTypes.object.isRequired,
  wire: PropTypes.func.isRequired
};

export default Effect(Distortion);
