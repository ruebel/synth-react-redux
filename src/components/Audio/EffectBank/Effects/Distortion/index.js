import React, {PropTypes} from 'react';
import Effect from '../Effect';
import RangeControl from '../../../../RangeControl';
import Select from '../../../../Select';

export const defaultSettings = {
  amount: 0,
  effectLevel: 1,
  oversample: '4x',
  title: 'Distortion'
};

const oversamples = [{id: 'none', name: 'None'}, {id: '2x', name: '2x'}, {id: '4x', name: '4x'}];

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
    if (!prev || next.settings.oversample !== prev.settings.oversample) {
      // Enumerated value (none, 2x, 4x)
      this.effect.oversample = next.settings.oversample || defaultSettings.oversample;
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
        <Select
          labelKey="name"
          name="oversampleSelect"
          onChange={e => this.props.handleSettingsChange('oversample', e.id)}
          options={oversamples}
          placeholder="Select Oversampling..."
          searchable={false}
          title="Oversampling"
          value={this.props.settings.oversample}
          valueKey="id"
        />
        <RangeControl title="Amount"
                      max={100}
                      onSet={e => this.props.handleSettingsChange('amount', e)}
                      value={this.props.settings.amount}
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
