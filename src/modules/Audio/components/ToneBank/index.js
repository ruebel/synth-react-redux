import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Arpeggiator from './Arpeggiator';
import Container from '../../../components/Container';
import Tone from './Tone';
import { getKeys } from '../../selectors';
import { selectors as appSelectors } from '../../../App';
import {
  selectors as synthSelectors,
  actions as synthActions
} from '../../../Synth';
import { createGain, createOscillator } from '../../../../utils/audio';

class ToneBank extends React.Component {
  constructor(props) {
    super(props);

    // Setup modulation
    this.modulation = createOscillator(
      this.props.context,
      this.props.settings.modulation.speed,
      this.props.settings.modulation.shape
    );
    this.modulationGain = createGain(this.props.context);
    this.modulation.connect(this.modulationGain);

    this.applySettings = this.applySettings.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props) {
      this.applySettings(nextProps, this.props);
    }
  }

  applySettings(next, prev) {
    if (
      !prev ||
      next.settings.modulation.depth !== prev.settings.modulation.depth ||
      next.settings.modulation.on !== prev.settings.modulation.on
    ) {
      // Modulation depth
      this.modulationGain.gain.setTargetAtTime(
        next.settings.modulation.on ? next.settings.modulation.depth : 0,
        this.props.context.currentTime + 1,
        0.1
      );
    }
    if (
      !prev ||
      next.settings.modulation.speed !== prev.settings.modulation.speed
    ) {
      // Modulation Speed
      this.modulation.frequency.setTargetAtTime(
        next.settings.modulation.speed,
        this.props.context.currentTime + 1,
        0.1
      );
    }
    if (
      !prev ||
      next.settings.modulation.shape !== prev.settings.modulation.shape
    ) {
      // Modulation wave shape
      this.modulation.type = next.settings.modulation.shape;
    }
  }

  render() {
    let inner;
    if (this.props.settings.arpeggiator.on) {
      inner = (
        <Arpeggiator {...this.props} modulationGain={this.modulationGain} />
      );
    } else {
      let toneMap = Object.keys(this.props.tones);
      if (this.props.settings.portamento.on) {
        // When portamento is on we only render one tone
        // We render the last pressed tone (last down holds the id of the last pressed note)
        toneMap = this.props.settings.lastDown
          ? [this.props.settings.lastDown]
          : [];
      }
      inner = toneMap.map((k, i) => {
        return (
          <Tone
            key={i}
            tone={this.props.tones[k]}
            context={this.props.context}
            modulation={this.modulationGain}
            output={this.props.output}
            settings={this.props.settings}
          />
        );
      });
    }
    return (
      <Container
        active={this.props.settings.arpeggiator.on}
        activeChange={this.props.setArpeggiatorOn}
        title="Arpeggiator"
      >
        {inner}
      </Container>
    );
  }
}

ToneBank.propTypes = {
  context: PropTypes.object.isRequired,
  output: PropTypes.object.isRequired,
  setArpeggiatorOn: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  tones: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    tones: getKeys(state),
    context: appSelectors.getContext(state),
    settings: synthSelectors.getSynth(state)
  };
};

export default connect(mapStateToProps, {
  setArpeggiatorOn: synthActions.setArpeggiatorOn
})(ToneBank);
