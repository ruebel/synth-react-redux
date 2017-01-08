import uuid from 'uuid';

export const clearPresets = () => {
  return {
    type: 'CLEAR_PRESETS',
    payload: null
  };
};

export const loadPreset = (id) => {
  return {
    type: 'LOAD_PRESET',
    payload: id
  };
};

export const removePreset = (id) => {
  return {
    type: 'REMOVE_PRESET',
    payload: id
  };
};

export const saveNewPreset = (preset) => {
  return {
    type: 'SAVE_NEW_PRESET',
    payload: Object.assign({}, preset, {
      id: uuid.v4()
    })
  };
};

export const savePreset = (id) => {
  return {
    type: 'SAVE_PRESET',
    payload: id
  };
};
