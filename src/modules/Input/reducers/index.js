import { combineReducers } from 'redux';
import {C} from '../actions';
import socket from './socket';
const initialState = {
  devices: [],
  selectedDevice: {}
};

const input = combineReducers({
  devices,
  selectedDevice,
  socket
});

function devices(state = initialState.devices, action) {
  switch(action.type) {
    case C.GET_INPUT_DEVICES:
      return action.payload;
    default:
      return state;
  }
}

function selectedDevice(state = initialState.selectedDevice, action) {
  switch(action.type) {
    case C.SET_INPUT_DEVICE:
      return action.payload;
    default:
      return state;
  }
}

export default input;
