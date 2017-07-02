import React from 'react';
import PropTypes from 'prop-types';
import Effect from '../Effect';
import EffectRange from '../../EffectRange';
import Select from '../../../../../components/Select';
import { filterTypes } from '../../../../../../utils/audio';
import {
  checkPropChange,
  defaultEffectSettings
} from '../../../../../../utils/effect';

export const defaultSettings = Object.assign({}, defaultEffectSettings, {
  color: '#517693',
  filterType: {
    options: filterTypes.map(f => ({ id: f, name: f })),
    value: 'lowshelf'
  },
  frequency: {
    min: 0,
    max: 22050,
    name: 'Frequency',
    value: 100
  },
  gain: {
    min: -1,
    max: 1,
    name: 'Gain',
    value: 1
  },
  name: 'Filter',
  q: {
    min: -1,
    max: 1,
    name: 'Q',
    value: 0.1
  },
  title: 'Filter'
});

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
      this.effect.Q.value = next.settings.q.value * (10 ^ 38);
    }
    if (checkPropChange(prev, next, 'frequency')) {
      this.effect.frequency.value = next.settings.frequency.value;
    }
    if (checkPropChange(prev, next, 'gain')) {
      this.effect.gain.value = next.settings.gain.value * 3.4028234663852886e38;
    }
    this.props.wire(next, prev, this.effect);
  }

  render() {
    // Gain is not used in the all of the filter types so hide it when not used
    const showGain =
      ['lowshelf', 'highshelf', 'peaking'].indexOf(
        this.props.settings.filterType.value
      ) >= 0;
    // Q is not used on all filter types so hide it when not used
    const showQ =
      ['lowshelf', 'highshelf'].indexOf(this.props.settings.filterType.value) <
      0;
    return (
      <div>
        <Select
          labelKey="name"
          name="oversampleSelect"
          onChange={e => this.props.handleSettingsChange('filterType', e.id)}
          options={defaultSettings.filterType.options}
          placeholder="Select Filter Type..."
          searchable={false}
          title={defaultSettings.filterType.name}
          value={this.props.settings.filterType.value}
          valueKey="id"
        />
        {showQ &&
          <EffectRange
            change={this.props.handleSettingsChange}
            defaults={defaultSettings}
            property="q"
            settings={this.props.settings}
          />}
        <EffectRange
          change={this.props.handleSettingsChange}
          defaults={defaultSettings}
          property="frequency"
          settings={this.props.settings}
        />
        {showGain &&
          <EffectRange
            change={this.props.handleSettingsChange}
            defaults={defaultSettings}
            property="gain"
            settings={this.props.settings}
          />}
      </div>
    );
  }
}

Filter.propTypes = {
  context: PropTypes.object.isRequired,
  handleSettingsChange: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  wire: PropTypes.func.isRequired
};

export default Effect(Filter);
