import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Tone from './Tone';

class ToneBank extends React.Component {
  constructor(props) {
    super(props);
    this.modulation = this.props.context.createOscillator();
    this.modulation.type = this.props.settings.modulation.shape;
    this.modulation.frequency.value = 1;
    this.modulation.start(0);
    this.modulationGain = this.props.context.createGain();
    this.modulation.connect(this.modulationGain);

    this.applySettings = this.applySettings.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props) {
      this.applySettings(nextProps, this.props);
    }
  }

  applySettings(next, prev) {
    if (!prev ||
      next.settings.modulation.depth !== prev.settings.modulation.depth ||
      next.settings.modulation.on !== prev.settings.modulation.on
    ) {
      this.modulationGain.gain.value = next.settings.modulation.on ? next.settings.modulation.depth : 0;
    }
    if (!prev || next.settings.modulation.speed !== prev.settings.modulation.speed) {
      this.modulation.frequency.value = next.settings.modulation.speed;
    }
    if (!prev || next.settings.modulation.shape !== prev.settings.modulation.shape) {
      this.modulation.type = next.settings.modulation.shape;
    }
  }

  render () {
    return (
      <div>
        {Object.keys(this.props.tones).map((k, i) => {
          return (
            <Tone key={i}
            tone={this.props.tones[k]}
            context={this.props.context}
            modulation={this.modulationGain}
            output={this.props.output}
            settings={this.props.settings}/>);
          })}
        </div>
      );
  }
}

ToneBank.propTypes = {
  context: PropTypes.object.isRequired,
  output: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  tones: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    tones: state.audio.keys,
    context: state.audio.context,
    output: state.audio.gainStage,
    settings: state.synth
  };
};

export default connect(mapStateToProps)(ToneBank);
