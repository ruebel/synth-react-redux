import React, {PropTypes} from 'react';
import Effect from '../Effect';
import irs from './IRs';

export const defaultSettings = {
  effectLevel: 1,
  // This will be set after the component loads since it needs to
  // download the ir
  irUrl: '',
  title: 'Reverb'
};

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
    if (!prev || next.settings.irUrl !== prev.settings.irUrl) {
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
        <select value={this.props.settings.ir}
                onChange={e => this.props.handleSettingsChange('irUrl', e)}>
          {Object.keys(irs).map((ir, i) => <option key={i} value={irs[ir].url}>{irs[ir].name}</option>)}
        </select>
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
