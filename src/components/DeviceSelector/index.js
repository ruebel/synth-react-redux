import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {setDevice} from '../../actions/input';

class DeviceSelector extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const device = this.props.devices.find(d => d.id === e.target.value);
    this.props.setDevice(device);
  }

  render() {
    let options = this.props.devices.map((d, i) => {
      return <option key={i} value={d.id}>{d.name}</option>;
    });
    const none = <option key={-1} value={{}}>None</option>;
    options = [none, ...options];
    return (
      <div>
        <h3>Input</h3>
        <select value={this.props.selectedDevice.id} onChange={this.handleChange}>
          {options}
        </select>
      </div>
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
