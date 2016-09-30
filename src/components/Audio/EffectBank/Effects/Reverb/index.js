import React, {PropTypes} from 'react';
import Effect from '../Effect';
import irs from './IRs';

class Reverb extends React.Component {
  constructor(props) {
    super(props);

    this.applySettings = this.applySettings.bind(this);
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
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

  handleSettingsChange(property, e) {
    let settings = Object.assign({}, this.props.settings, {
      [property]: (e.target ? e.target.value : e)
    });
    this.props.changeSettings(settings, property);
  }

  setupAudio() {
    // Create waveshaper node
    this.effect = this.props.context.createConvolver();
    this.applySettings(this.props);
  }

  render() {
    return (
      <div>
        <h3>Reverb</h3>
        <select value={this.props.settings.ir}
                onChange={e => this.handleSettingsChange('irUrl', e)}>
          <option key={-1} value="">None</option>
          {Object.keys(irs).map((ir, i) => <option key={i} value={irs[ir].url}>{irs[ir].name}</option>)}
        </select>
      </div>
    );
  }
}

Reverb.propTypes = {
  changeSettings: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired,
  input: PropTypes.object,
  output: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  wire: PropTypes.func.isRequired
};

export default Effect(Reverb);
