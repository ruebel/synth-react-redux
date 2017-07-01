import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions as audioActions } from '../../../Audio';
import { actions as controlActions } from '../../../Control';
import { actions as synthActions } from '../../../Synth';
import { convertVelocity } from '../../../../utils/input';

class Midi extends React.Component {
  constructor(props) {
    super(props);

    this.deregister = this.deregister.bind(this);
    this.handleMidiMessage = this.handleMidiMessage.bind(this);
    this.register = this.register.bind(this);
  }

  componentDidMount() {
    this.register(this.props.device);
  }

  componentWillReceiveProps(next) {
    if (next.device.id !== this.props.device.id) {
      this.deregister();
      this.register(next.device);
    }
  }

  componentWillUpdate() {
    return false;
  }

  componentWillUnmount() {
    this.deregister();
  }

  deregister() {
    this.props.device.onmidimessage = null;
  }

  register(device) {
    if (device) {
      device.onmidimessage = this.handleMidiMessage;
    }
  }
  /**
   * Handle incoming midi messages
   * e => MIDI event payload
   * e.timestamp is when function occured
   * e.data is function definition
   * e.data[0] = MIDI Function
   * e.data[1] = MIDI Note
   * e.data[2] = MIDI Velocity
   */
  handleMidiMessage(e) {
    switch (e.data[0]) {
      // Note On
      case 144:
        const velocity = convertVelocity(e.data[2]);
        if (velocity > 0) {
          this.props.keyDown(e.data[1], velocity);
        } else {
          this.props.keyUp(e.data[1]);
        }
        break;
      // Note Off
      case 128:
        this.props.keyUp(e.data[1]);
        break;
      // Trigger Bank
      // case 153:
      //   // 36 - 49
      //   break;
      // Control
      case 176:
        switch (e.data[1]) {
          // Sustain Pedal
          case 64:
            if (e.data[2] == 0) {
              // Sustain off
              this.props.setSustain(false);
            } else {
              // Sustain on
              this.props.setSustain(true);
            }
            break;
          default:
            this.props.setControl(e.data);
            break;
        }
        break;
      // Pitch Bend
      case 224:
        // 0 = max negative
        // 64 = no detune
        // 127 = max positive
        this.props.setPitchBend(e.data[2] - 64);
        break;
      default:
        this.props.setControl(e.data);
        break;
    }
  }

  render() {
    return null;
  }
}

Midi.propTypes = {
  device: PropTypes.object.isRequired,
  keyDown: PropTypes.func.isRequired,
  keyUp: PropTypes.func.isRequired,
  setControl: PropTypes.func.isRequired,
  setPitchBend: PropTypes.func.isRequired,
  setSustain: PropTypes.func.isRequired
};

export default connect(null, {
  keyDown: audioActions.keyDown,
  keyUp: audioActions.keyUp,
  setControl: controlActions.setControl,
  setPitchBend: synthActions.setPitchBend,
  setSustain: synthActions.setSustain
})(Midi);
