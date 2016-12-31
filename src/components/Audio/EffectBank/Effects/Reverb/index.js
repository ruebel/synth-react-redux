import React, {PropTypes} from 'react';
import Effect from '../Effect';
import Select from '../../../../Select';
import irs from './IRs';
import {checkPropChange, defaultEffectSettings} from '../../../../../utils/effect';

export const defaultSettings = Object.assign({}, defaultEffectSettings, {
  color: '#0198e1',
  // This will be set after the component loads since it needs to
  // download the ir
  irUrl: {
    name: 'Impulse Response',
    options: Object.keys(irs).map(ir => ({id: irs[ir].url, name: irs[ir].name})),
    value: ''
  },
  name: 'Reverb',
  title: 'Reverb'
});

class Reverb extends React.Component {
  constructor(props) {
    super(props);

    this.applySettings = this.applySettings.bind(this);
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
    if (checkPropChange(prev, next, 'irUrl')) {
      if (next.settings.irBuffer) {
        this.effect.buffer = next.settings.irBuffer;
      } else {
        this.effect.buffer = null;
      }
    }
    this.props.wire(next, prev, this.effect);
  }

  setupAudio() {
    // Create waveshaper node
    this.effect = this.props.context.createConvolver();
    // Handle default settings
    this.applySettings(this.props);
    // Get the first IR loaded
    this.props.handleSettingsChange('irUrl', irs[Object.keys(irs)[0]].url);
  }

  render() {
    return (
      <div>
        <Select
          labelKey="name"
          name="irSelect"
          onChange={e => this.props.handleSettingsChange('irUrl', e.id)}
          options={defaultSettings.irUrl.options}
          placeholder="Select Impulse Response..."
          searchable={false}
          title={defaultSettings.irUrl.name}
          value={this.props.settings.irUrl.value}
          valueKey="id"
        />
      </div>
    );
  }
}

Reverb.propTypes = {
  context: PropTypes.object.isRequired,
  handleSettingsChange: PropTypes.func.isRequired,
  input: PropTypes.object,
  output: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  wire: PropTypes.func.isRequired
};

export default Effect(Reverb);
