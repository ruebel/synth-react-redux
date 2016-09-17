import React from 'react';
import {connect} from 'react-redux';

const DeviceSelector = ({devices, selectedDevice}) => {
  return (
    <div>
      {devices.map((d, i) => <div key={i}>{d.name}</div>)}
      <h1>
      {selectedDevice.name}
      </h1>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    devices: state.input.devices,
    selectedDevice: state.input.selectedDevice
  };
};

export default connect(mapStateToProps)(DeviceSelector);
