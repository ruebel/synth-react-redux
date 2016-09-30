import React, {PropTypes} from 'react';
import irs from './IRs';

class Reverb extends React.Component {
  constructor(props) {
    super(props);

    this.applySettings = this.applySettings.bind(this);
    this.getImpulseResponse = this.getImpulseResponse.bind(this);
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
    this.setupAudio = this.setupAudio.bind(this);
    this.wireInputs = this.wireInputs.bind(this);
  }

  componentDidMount() {
    this.setupAudio();
  }

  componentWillReceiveProps(nextProps) {
    this.applySettings(nextProps, this.props);
  }

  applySettings(next, prev) {
    if (!prev || next.settings.ir !== prev.settings.ir) {
      this.getImpulseResponse(next);
    }
    if (!prev ||
      prev.input !== next.input ||
      prev.settings.input !== next.settings.input ||
      prev.output !== next.output) {
      this.wireInputs(next);
    }
  }

  getImpulseResponse(props) {
    let ajaxRequest = new XMLHttpRequest();
    ajaxRequest.open('GET', irs[props.settings.ir || Object.keys(irs)[0]].url, true);
    ajaxRequest.responseType = 'arraybuffer';
    ajaxRequest.onload = () => {
      let audioData = ajaxRequest.response;
      props.context.decodeAudioData(audioData, (buffer) => {
        let source = props.context.createBufferSource();
        source.buffer = buffer;
        this.reverb.buffer = buffer;
      });
    };
    ajaxRequest.send();
  }

  handleSettingsChange(property, e) {
    let settings = Object.assign({}, this.props.settings, {
      [property]: e.target.value
    });
    this.props.changeSettings(settings);
  }

  setupAudio() {
    // Create waveshaper node
    this.reverb = this.props.context.createConvolver();
    this.applySettings(this.props);
  }

  wireInputs(props) {
    // Connect Gain Stage Input if required
    if (props.input) {
      props.input.disconnect();
      props.input.connect(props.settings.input);
    }
    // Connect output
    props.settings.input.disconnect();
    props.settings.input.connect(this.reverb);
    this.reverb.disconnect();
    this.reverb.connect(props.output);
  }

  render() {
    return (
      <div>
        <h3>Reverb</h3>
        <button onClick={() => this.props.remove(this.props.settings.id)}>X</button>
        <select value={this.props.settings.ir}
                onChange={e => this.handleSettingsChange('ir', e)}>
          {Object.keys(irs).map((ir, i) => <option key={i} value={ir}>{irs[ir].name}</option>)}
        </select>
      </div>
    );
  }
}

Reverb.propTypes = {
  changeSettings: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired,
  input: PropTypes.object,
  remove: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  output: PropTypes.object.isRequired
};

export default Reverb;
