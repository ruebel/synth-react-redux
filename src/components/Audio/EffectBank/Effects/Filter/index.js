import React, {PropTypes} from 'react';
import Effect from '../Effect';
import RangeControl from '../../../../RangeControl';
import {filterTypes} from '../../../../../utils/audio';

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.applySettings = this.applySettings.bind(this);
    this.setupAudio = this.setupAudio.bind(this);
    this.effect = this.props.context.createBiquadFilter();
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
    if (!prev || next.settings.filterType !== prev.settings.filterType) {
      this.effect.type = next.settings.filterType || 'lowshelf';
      // Gain is not used in the all of the filter types so hide it when not used
      this.showGain = ['lowshelf', 'highshelf', 'peaking'].indexOf(next.settings.filterType) >= 0;
      // Q is not used on all filter types so hide it when not used
      this.showQ = ['lowshelf', 'highshelf'].indexOf(next.settings.filterType) < 0;
    }
    if (!prev || next.settings.q !== prev.settings.q) {
      this.effect.Q.value = next.settings.q || 0;
    }
    if (!prev || next.settings.frequency !== prev.settings.frequency) {
      this.effect.frequency.value = next.settings.frequency || 0;
    }
    if (!prev || next.settings.gain !== prev.settings.gain) {
      this.effect.gain.value = next.settings.gain || 0;
    }
    this.props.wire(next, prev, this.effect);
  }

  setupAudio() {
    this.effect.type = 'lowshelf';
    this.effect.frequency.value = 1000;
    this.effect.gain.value = 0;
    this.showQ = false;
    this.showGain = true;
    this.applySettings(this.props);
  }

  render() {
    return (
      <div>
        <h3>Filter</h3>
        <select value={this.props.settings.filterType}
                onChange={e => this.props.handleSettingsChange('filterType', e)}>
          {filterTypes.map((f, i) => <option key={i} value={f}>{f}</option>)}
        </select>
        {this.showQ && (<RangeControl title="Q"
                      min={this.effect.Q.minValue}
                      max={this.effect.Q.maxValue}
                      onSet={e => this.props.handleSettingsChange('q', e)}
                      value={this.props.settings.q || 0}
                      />)}
        <RangeControl title="Frequency"
                      min={this.effect.frequency.minValue}
                      max={this.effect.frequency.maxValue}
                      step={1}
                      onSet={e => this.props.handleSettingsChange('frequency', e)}
                      value={this.props.settings.frequency || 0}
                      />
        {this.showGain && (
        <RangeControl title="Gain"
                      min={this.effect.gain.minValue}
                      max={this.effect.gain.maxValue}
                      step={1}
                      onSet={e => this.props.handleSettingsChange('gain', e)}
                      value={this.props.settings.gain || 0}
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
