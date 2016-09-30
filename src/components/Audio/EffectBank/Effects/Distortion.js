import React, {PropTypes} from 'react';

class Distortion extends React.Component {
  constructor(props) {
    super(props);

    this.applySettings = this.applySettings.bind(this);
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
    this.makeDistortionCurve = this.makeDistortionCurve.bind(this);
    this.setupAudio = this.setupAudio.bind(this);
  }

  componentDidMount() {
    this.setupAudio();
  }

  componentWillReceiveProps(nextProps) {
    this.applySettings(nextProps, this.props);
  }

  applySettings(next, prev) {
    if (!prev || next.settings.amount !== prev.settings.amount) {
      // Make curve to apply distortion
      let val = parseInt(next.settings.amount, 10);
      this.dist.curve = this.makeDistortionCurve(val);
    }
    if (!prev || prev.settings.oversample !== prev.settings.oversample) {
      // Enumerated value (none, 2x, 4x)
      this.dist.oversample = next.settings.oversample || 'none';
    }
    if (!prev ||
      prev.input !== next.input ||
      prev.settings.input !== next.settings.input ||
      prev.output !== next.output) {
      this.wireInputs(next);
    }
  }

  handleSettingsChange(property, e) {
    let settings = Object.assign({}, this.props.settings, {
      [property]: e.target.value
    });
    this.props.changeSettings(settings);
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
    this.dist = this.props.context.createWaveShaper();
    this.applySettings(this.props);
  }

  wireInputs(props) {
    // Connect Gain Stage Input if required
    if (props.input) {
      props.input.disconnect();
      props.input.connect(props.settings.input);
    }
    // Connect output
    props.settings.input.disconnect();
    props.settings.input.connect(this.dist);
    this.dist.disconnect();
    this.dist.connect(props.output);
  }

  render() {
    return (
      <div>
        <h3>Distortion</h3>
        <button onClick={() => this.props.remove(this.props.settings.id)}>X</button>
        <span> Oversampling</span>
        <select value={this.props.settings.oversample}
                onChange={e => this.handleSettingsChange('oversample', e)}>
          <option key="0" value="none">None</option>
          <option key="1" value="2x">2x</option>
          <option key="2" value="4x">4x</option>
        </select>
        <input type="range"
               defaultValue={this.props.settings.amount}
               min="0"
               max="100"
               onChange={e => this.handleSettingsChange('amount', e)}
               />
      </div>
    );
  }
}

Distortion.propTypes = {
  changeSettings: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired,
  input: PropTypes.object,
  remove: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  output: PropTypes.object.isRequired
};

export default Distortion;
