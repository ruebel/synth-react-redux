import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Select from '../components/Select';
import Container from '../components/Container';
import {getInputDevices, setDevice} from './actions';
import {getDevices, getSelectedDevice} from './selectors';
const noneOption = {
  id: -1,
  name: 'None'
};

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.props.getInputDevices();
  }

  handleChange(val) {
    const device = this.props.devices.find(d => d.id === val.id);
    this.props.setDevice(device);
  }

  render() {
    const options = [noneOption, ...this.props.devices];
    return (
      <Container active={Boolean(this.props.selectedDevice.id)} title="Input">
        <Select
          labelKey="name"
          name="inputSelect"
          onChange={this.handleChange}
          options={options}
          placeholder="Select Input..."
          searchable={false}
          value={this.props.selectedDevice.id}
          valueKey="id"
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    devices: getDevices(state),
    selectedDevice: getSelectedDevice(state)
  };
};

Input.propTypes = {
  devices: PropTypes.array.isRequired,
  getInputDevices: PropTypes.func.isRequired,
  selectedDevice: PropTypes.object,
  setDevice: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {getInputDevices, setDevice})(Input);
