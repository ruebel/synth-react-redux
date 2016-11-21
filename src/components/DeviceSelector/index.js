import React, {PropTypes} from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {setDevice} from '../../actions/input';
import Container from '../Container';

class DeviceSelector extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(val) {
    const device = this.props.devices.find(d => d.id === val.id);
    this.props.setDevice(device);
  }

  render() {
    const options = [{id: -1, name: 'None'}, ...this.props.devices];
    return (
      <Container active={this.props.selectedDevice.id} title="Input">
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
    devices: state.input.devices,
    selectedDevice: state.input.selectedDevice
  };
};

DeviceSelector.propTypes = {
  devices: PropTypes.array.isRequired,
  selectedDevice: PropTypes.object,
  setDevice: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {setDevice})(DeviceSelector);
