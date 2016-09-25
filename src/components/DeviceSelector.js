import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {setDevice} from '../actions/input';

const DeviceSelector = ({devices, selectedDevice, setDevice}) => {
  let options = devices.map((d, i) => {
    return <option key={i} value={d.id}>{d.name}</option>;
  });
  let none = <option key={-1} value={{}}>None</option>;
  options = [none, ...options];
  return (
    <select value={selectedDevice.id} onChange={e => {
      let device = devices.find(d => d.id === e.target.value);
      setDevice(device);
    }}>
      {options}
    </select>
  );
};

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
