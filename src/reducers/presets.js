import {combineReducers} from 'redux';
import initialState from '../store/initialState';

const loadedId = (state = initialState.presets.loadedId, action) => {
  switch(action.type) {
    case 'LOAD_PRESET':
      return action.payload;
    case 'SAVE_NEW_PRESET':
      return action.payload.id;
    case 'REMOVE_PRESET':
      return null;
    default:
      return state;
  }
};

const presets = (state = initialState.presets.presets, action) => {
  switch(action.type) {
    case 'CLEAR_PRESETS':
      return [];
    case 'REMOVE_PRESET':
      return state.filter(p => p.id !== action.payload);
    case 'SAVE_PRESET':
      return state.map(p => {
        if (p.id === action.payload.id) {
          return action.payload;
        }
        return p;
      });
    case 'SAVE_NEW_PRESET':
      return [...state, action.payload];
    default:
      return state;
  }
};

export default combineReducers({
  loadedId,
  presets
});
