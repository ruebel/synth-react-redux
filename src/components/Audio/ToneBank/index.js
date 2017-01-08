import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Tone from './Tone';

class ToneBank extends React.Component {
  constructor(props) {
    super(props);
    // Setup modulation
    this.modulation = this.props.context.createOscillator();
    this.modulation.type = this.props.settings.modulation.shape;
    this.modulation.frequency.value = this.props.settings.modulation.speed;
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
      // Modulation depth
      this.modulationGain.gain.value = next.settings.modulation.on ? next.settings.modulation.depth : 0;
    }
    if (!prev || next.settings.modulation.speed !== prev.settings.modulation.speed) {
      // Modulation Speed
      this.modulation.frequency.value = next.settings.modulation.speed;
    }
    if (!prev || next.settings.modulation.shape !== prev.settings.modulation.shape) {
      // Modulation wave shape
      this.modulation.type = next.settings.modulation.shape;
    }
  }

  render () {
    let toneMap = Object.keys(this.props.tones);
    if (this.props.settings.portamento.on) {
      // When portamento is on we only render one tone
      // We render the last pressed tone (last down holds the id of the last pressed note)
      toneMap = this.props.settings.lastDown ? [this.props.settings.lastDown] : [];
    }
    const tones = toneMap.map((k, i) => {
      return (
        <Tone
          key={i}
          tone={this.props.tones[k]}
          context={this.props.context}
          modulation={this.modulationGain}
          output={this.props.output}
          settings={this.props.settings}
        />);
      });
    return (
      <div>
        {tones}
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
    context: state.context,
    settings: state.synth
  };
};

export default connect(mapStateToProps)(ToneBank);
