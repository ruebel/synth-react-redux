import {combineReducers} from 'redux';
import {getContext} from '../../utils/audio';
import * as audio from '../Audio';
import * as control from '../Control';
import * as input from '../Input';
import * as presets from '../Presets';
import * as synth from '../Synth';

const initialState = {
  context: getContext()
};

function context(state = initialState.context, action) {
  switch(action.type) {
    case 'SETUP_AUDIO':
    return action.payload;
    default:
    return state;
  }
}

const rootReducer = combineReducers({
  [audio.name]: audio.reducers,
  context,
  [control.name]: control.reducers,
  [input.name]: input.reducers,
  [presets.name]: presets.reducers,
  [synth.name]: synth.reducers,
});

export default rootReducer;
