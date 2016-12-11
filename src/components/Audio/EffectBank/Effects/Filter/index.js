import React, {PropTypes} from 'react';
import Effect from '../Effect';
import RangeControl from '../../../../RangeControl';
import Select from '../../../../Select';
import {filterTypes} from '../../../../../utils/audio';
import {checkPropChange} from '../../../../../utils/effect';

export const defaultSettings = {
  color: '#517693',
  effectLevel: {
    min: 0,
    max: 1,
    value: 1
  },
  filterType: {
    options: filterTypes.map(f => ({id: f, name: f})),
    value: 'lowshelf'
  },
  frequency: {
    min: 0,
    max: 22050,
    value: 100
  },
  gain: {
    min: -1,
    max: 1,
    value: 1
  },
  q: {
    min: -1,
    max: 1,
    value: 0.1
  },
  title: 'Filter'
};

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.applySettings = this.applySettings.bind(this);
    this.effect = this.props.context.createBiquadFilter();
    this.effect.type = defaultSettings.filterType.value;
    this.effect.frequency.value = defaultSettings.frequency.value;
    this.effect.gain.value = defaultSettings.gain.value;
    this.effect.Q.value = defaultSettings.q.value;
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
    if (checkPropChange(prev, next, 'filterType')) {
      this.effect.type = next.settings.filterType.value;
    }
    if (checkPropChange(prev, next, 'q')) {
      // Since we don't use the actual Q numbers in the slider we have to scale
      // them by 10e38 for the component
      this.effect.Q.value = next.settings.q.value * (10^38);
    }
    if (checkPropChange(prev, next, 'frequency')) {
      this.effect.frequency.value = next.settings.frequency.value;
    }
    if (checkPropChange(prev, next, 'gain')) {
      this.effect.gain.value = next.settings.gain.value * 3.4028234663852886e+38;
    }
    this.props.wire(next, prev, this.effect);
  }

  render() {
    // Gain is not used in the all of the filter types so hide it when not used
    const showGain = ['lowshelf', 'highshelf', 'peaking'].indexOf(this.props.settings.filterType.value) >= 0;
    // Q is not used on all filter types so hide it when not used
    const showQ = ['lowshelf', 'highshelf'].indexOf(this.props.settings.filterType.value) < 0;
    return (
      <div>
        <Select
          labelKey="name"
          name="oversampleSelect"
          onChange={e => this.props.handleSettingsChange('filterType', e.id)}
          options={defaultSettings.filterType.options}
          placeholder="Select Filter Type..."
          searchable={false}
          title="Type"
          value={this.props.settings.filterType.value}
          valueKey="id"
        />
        {showQ && (<RangeControl title="Q"
                      min={defaultSettings.q.min}
                      max={defaultSettings.q.max}
                      step={0.01}
                      onSet={e => this.props.handleSettingsChange('q', e)}
                      value={this.props.settings.q.value}
                      />)}
        <RangeControl title="Frequency"
                      min={defaultSettings.frequency.min}
                      max={defaultSettings.frequency.max}
                      step={1}
                      onSet={e => this.props.handleSettingsChange('frequency', e)}
                      value={this.props.settings.frequency.value}
                      />
        {showGain && (
        <RangeControl title="Gain"
                      min={defaultSettings.gain.min}
                      max={defaultSettings.gain.max}
                      step={0.01}
                      onSet={e => this.props.handleSettingsChange('gain', e)}
                      value={this.props.settings.gain.value}
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
