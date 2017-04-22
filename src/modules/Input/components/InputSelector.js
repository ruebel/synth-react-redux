import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Container from '../../components/Container';
import Gear from '../../components/icons/Gear';
import Select from '../../components/Select';
import {getInputDevices, setDevice} from '../actions';
import {getDevices, getSelectedDevice} from '../selectors';
const noneOption = {
  id: -1,
  name: 'None'
};

class InputSelector extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.props.getInputDevices();
  }

  handleChange(val) {
    const device = val ? this.props.devices.find(d => d.id === val.id) : null;
    this.props.setDevice(device);
  }

  render() {
    const options = [noneOption, ...this.props.devices];
    return (
      <Container
        active={Boolean(this.props.selectedDevice.id)}
        title="Input"
        >
          <div>
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
            {this.props.selectedDevice.id == 1 && (
              <Gear click={this.props.showSettings}/>
            )}
          </div>
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

InputSelector.propTypes = {
  devices: PropTypes.array.isRequired,
  getInputDevices: PropTypes.func.isRequired,
  selectedDevice: PropTypes.object,
  setDevice: PropTypes.func.isRequired,
  showSettings: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {getInputDevices, setDevice})(InputSelector);
