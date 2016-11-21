import React, {PropTypes} from 'react';
import Effect from '../Effect';
import RangeControl from '../../../../RangeControl';
import {filterTypes} from '../../../../../utils/audio';

export const defaultSettings = {
  effectLevel: 1,
  filterType: 'lowshelf',
  frequency: 100,
  gain: 1,
  q: 0,
  title: 'Filter'
};

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.applySettings = this.applySettings.bind(this);
    this.effect = this.props.context.createBiquadFilter();
    this.effect.type = defaultSettings.filterType;
    this.effect.frequency.value = defaultSettings.frequency;
    this.effect.gain.value = defaultSettings.gain;
  }

  componentDidMount() {
    this.applySettings(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props) {
      this.applySettings(nextProps, this.props);
    }
  }

  applySettings(next, prev) {
    if (!prev || next.settings.filterType !== prev.settings.filterType) {
      this.effect.type = next.settings.filterType;
    }
    if (!prev || next.settings.q !== prev.settings.q) {
      // Since we don't use the actual Q numbers in the slider we have to scale
      // them by 10e38 for the component
      this.effect.Q.value = next.settings.q * (10^38);
    }
    if (!prev || next.settings.frequency !== prev.settings.frequency) {
      this.effect.frequency.value = next.settings.frequency;
    }
    if (!prev || next.settings.gain !== prev.settings.gain) {
      this.effect.gain.value = next.settings.gain;
    }
    this.props.wire(next, prev, this.effect);
  }

  render() {
    // Gain is not used in the all of the filter types so hide it when not used
    const showGain = ['lowshelf', 'highshelf', 'peaking'].indexOf(this.props.settings.filterType) >= 0;
    // Q is not used on all filter types so hide it when not used
    const showQ = ['lowshelf', 'highshelf'].indexOf(this.props.settings.filterType) < 0;
    return (
      <div>
        <select value={this.props.settings.filterType}
                onChange={e => this.props.handleSettingsChange('filterType', e)}>
          {filterTypes.map((f, i) => <option key={i} value={f}>{f}</option>)}
        </select>
        {showQ && (<RangeControl title="Q"
                      min={-1}
                      max={1}
                      step={0.01}
                      onSet={e => this.props.handleSettingsChange('q', e)}
                      value={this.props.settings.q}
                      />)}
        <RangeControl title="Frequency"
                      min={this.effect.frequency.minValue}
                      max={this.effect.frequency.maxValue}
                      step={1}
                      onSet={e => this.props.handleSettingsChange('frequency', e)}
                      value={this.props.settings.frequency}
                      />
        {showGain && (
        <RangeControl title="Gain"
                      min={this.effect.gain.minValue}
                      max={this.effect.gain.maxValue}
                      step={1}
                      onSet={e => this.props.handleSettingsChange('gain', e)}
                      value={this.props.settings.gain}
                      />)}

      </div>
    );
  }
}

Filter.propTypes = {
  context: PropTypes.object.isRequired,
  handleSettingsChange: PropTypes.func.isRequired,
  input: PropTypes.object,
  settings: PropTypes.object.isRequired,
  output: PropTypes.object.isRequired,
  wire: PropTypes.func.isRequired
};

export default Effect(Filter);
