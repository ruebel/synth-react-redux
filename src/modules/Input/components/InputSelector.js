import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from '../../components/Container';
import Gear from '../../components/icons/Gear';
import InputDevice from './InputDevice';
import PlayPauseButton from '../../components/PlayPauseButton';
import Select from '../../components/Select';
import { getInputDevices, setDevice, toggleSocket } from '../actions';
import { getDevices, getSelectedDevice, getSocketStatus } from '../selectors';
const noneOption = {
  id: -1,
  name: 'None'
};

class InputSelector extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getInputDevices();
  }

  handleChange(val) {
    const device = val ? this.props.devices.find(d => d.id === val.id) : null;
    this.props.setDevice(device);
  }

  render() {
    const options = [noneOption, ...this.props.devices];
    const id = this.props.selectedDevice ? this.props.selectedDevice.id : null;
    return (
      <Container active={Boolean(id)} full title="Input">
        <div>
          <Select
            labelKey="name"
            name="inputSelect"
            onChange={this.handleChange}
            options={options}
            placeholder="Select Input..."
            searchable={false}
            value={id}
            valueKey="id"
          />
          {id === 1 &&
            <div>
              <Gear click={this.props.showSettings} />
              <PlayPauseButton
                click={this.props.toggleSocket}
                play={this.props.socketStatus}
              />
            </div>}
        </div>
        <InputDevice device={this.props.selectedDevice} />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    devices: getDevices(state),
    selectedDevice: getSelectedDevice(state),
    socketStatus: getSocketStatus(state)
  };
};

InputSelector.propTypes = {
  devices: PropTypes.array.isRequired,
  getInputDevices: PropTypes.func.isRequired,
  selectedDevice: PropTypes.object,
  setDevice: PropTypes.func.isRequired,
  showSettings: PropTypes.func.isRequired,
  socketStatus: PropTypes.bool,
  toggleSocket: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  getInputDevices,
  setDevice,
  toggleSocket
})(InputSelector);
