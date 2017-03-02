import React, {PropTypes} from 'react';
import Effect from '../Effect';
import EffectRange from '../../EffectRange';
import Select from '../../../../../components/Select';
import {checkPropChange, defaultEffectSettings} from '../../../../../../utils/effect';

export const defaultSettings = Object.assign({}, defaultEffectSettings, {
  bits: {
    name: 'Bit Depth',
    options: [1, 2, 4, 8, 16].map(v => ({id: v, name: v})),
    value: 4
  },
  color: '#539dc2',
  name: 'BitCrusher',
  normfreq: {
    min: 0,
    max: 1,
    name: 'Rate',
    value: 0.2
  },
  title: 'Bit Crusher'
});

class BitCrusher extends React.Component {
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
    if (checkPropChange(prev, next, 'bits')) {
      const bits = parseInt(next.settings.bits.value, 10);
      this.effect.bits = bits;
    }
    if (checkPropChange(prev, next, 'normfreq')) {
      this.effect.normfreq = next.settings.normfreq.value;
    }
    this.props.wire(next, prev, this.effect);
  }

  createCrusher(context) {
    const bufferSize = 1024;
    const node = context.createScriptProcessor(bufferSize, 1, 1);
    // between 1 and 16
    node.bits = defaultSettings.bits.value;
    // between 0.0 and 1.0
    node.normfreq = defaultSettings.normfreq.value;
    const step = Math.pow(1 / 2, node.bits);
    let phaser = 0;
    let last = 0;
    node.onaudioprocess = (e) => {
      const input = e.inputBuffer.getChannelData(0);
      const output = e.outputBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        phaser += node.normfreq;
        if (phaser >= 1.0) {
          phaser -= 1.0;
          last = step * Math.floor(input[i] / step + 0.5);
        }
        output[i] = last;
      }
    };
    return node;
  }

  setupAudio() {
    this.effect = this.createCrusher(this.props.context);
    this.applySettings(this.props);
  }

  render() {
    return (
      <div>
        <Select
          labelKey="name"
          name="bitDepthSelect"
          onChange={e => this.props.handleSettingsChange('bits', e)}
          options={defaultSettings.bits.options}
          placeholder="Select Bit Depth..."
          searchable={false}
          title={defaultSettings.bits.name}
          value={this.props.settings.bits.value}
          valueKey="id"
        />
        <EffectRange
          change={this.props.handleSettingsChange}
          defaults={defaultSettings}
          property="normfreq"
          settings={this.props.settings}
        />
      </div>
    );
  }
}

BitCrusher.propTypes = {
  context: PropTypes.object.isRequired,
  handleSettingsChange: PropTypes.func.isRequired,
  input: PropTypes.object,
  settings: PropTypes.object.isRequired,
  output: PropTypes.object.isRequired,
  wire: PropTypes.func.isRequired
};

export default Effect(BitCrusher);
