import {combineReducers} from 'redux';
import {C} from './constants';
const initialState = {
  loadedId: null,
  presets: []
};

const loadedId = (state = initialState.loadedId, action) => {
  switch(action.type) {
    case C.LOAD_PRESET:
    case C.SAVE_NEW_PRESET:
      return action.payload.id;
    case C.REMOVE_PRESET:
      return null;
    default:
      return state;
  }
};

const presets = (state = initialState.presets, action) => {
  switch(action.type) {
    case C.CLEAR_PRESETS:
      return [];
    case C.REMOVE_PRESET:
      return state.filter(p => p.id !== action.payload);
    case C.SAVE_PRESET:
      return state.map(p => {
        if (p.id === action.payload.id) {
          return action.payload;
        }
        return p;
      });
    case C.SAVE_NEW_PRESET:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default combineReducers({
  loadedId,
  presets
});
