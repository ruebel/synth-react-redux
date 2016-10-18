import React, {PropTypes} from 'react';
import Effect from '../Effect';
import RangeControl from '../../../../RangeControl';

export const defaultSettings = {
  bits: 4,
  normfreq: 0.2
};

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
    if (!prev || next.settings.bits !== prev.settings.bits) {
      let bits = parseInt(next.settings.bits, 10);
      this.effect.bits = bits;
    }
    if (!prev || next.settings.normfreq !== prev.settings.normfreq) {
      this.effect.normfreq = next.settings.normfreq;
    }
    this.props.wire(next, prev, this.effect);
  }

  createCrusher(context) {
    const bufferSize = 1024;
    let node = context.createScriptProcessor(bufferSize, 1, 1);
    // between 1 and 16
    node.bits = defaultSettings.bits;
    // between 0.0 and 1.0
    node.normfreq = defaultSettings.normfreq;
    let step = Math.pow(1 / 2, node.bits);
    let phaser = 0;
    let last = 0;
    node.onaudioprocess = (e) => {
      let input = e.inputBuffer.getChannelData(0);
      let output = e.outputBuffer.getChannelData(0);
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
        <h3>Bit Crusher</h3>
        <span> Bit Depth</span>
        <select value={this.props.settings.bits}
                onChange={e => this.props.handleSettingsChange('bits', e)}>
          <option key="0" value="1">1</option>
          <option key="1" value="2">2</option>
          <option key="2" value="4">4</option>
          <option key="3" value="8">8</option>
          <option key="4" value="16">16</option>
        </select>
        <RangeControl title="Rate"
                      min={0}
                      max={1}
                      onSet={e => this.props.handleSettingsChange('normfreq', e)}
                      value={this.props.settings.normfreq}
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
