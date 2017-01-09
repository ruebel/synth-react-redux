import uuid from 'uuid';

export const clearPresets = () => {
  return {
    type: 'CLEAR_PRESETS',
    payload: null
  };
};

const createPreset = (name, state, id) => {
  let newName = name;
  if (!name && id) {
    const existing = state.presets.presets.find(p => p.id === id);
    if (existing) {
      newName = existing.name;
    }
  }
  return Object.assign({}, state, {
    audio: Object.assign({}, state.audio, {
      keys: undefined
    }),
    context: undefined,
    id: id || uuid.v4(),
    input: Object.assign({}, state.input, {
      devices: undefined
    }),
    name: newName,
    presets: undefined
  });
};

export const loadPreset = (id) => (dispatch, getState) => {
  const state = getState();
  const preset = state.presets.presets.find(p => p.id === id);
  dispatch(loadPresetAfter(preset));
};

export const loadPresetAfter = (preset) => {
  return {
    type: 'LOAD_PRESET',
    payload: preset
  };
};

export const removePreset = (id) => {
  return {
    type: 'REMOVE_PRESET',
    payload: id
  };
};

export const saveNewPreset = (name) => (dispatch, getState) => {
  const state = getState();
  const preset = createPreset(name, state);
  dispatch(saveNewPresetAfter(preset));
};

const saveNewPresetAfter = (preset) => {
  return {
    type: 'SAVE_NEW_PRESET',
    payload: preset
  };
};

export const savePreset = (id) => (dispatch, getState) => {
  const state = getState();
  const preset = createPreset(null, state, id);
  dispatch(savePresetAfter(preset));
};

export const savePresetAfter = (preset) => {
  return {
    type: 'SAVE_PRESET',
    payload: preset
  };
};
