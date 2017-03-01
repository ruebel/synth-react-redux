import { combineReducers } from 'redux';
import {C} from '../actions/input';
import initialState from '../store/initialState';

const input = combineReducers({
  devices,
  selectedDevice
});

function devices(state = initialState.input.devices, action) {
  switch(action.type) {
    case C.GET_INPUT_DEVICES:
      return action.payload;
    default:
      return state;
  }
}

function selectedDevice(state = initialState.input.selectedDevice, action) {
  switch(action.type) {
    case C.SET_INPUT_DEVICE:
      return action.payload;
    default:
      return state;
  }
}

export default input;
