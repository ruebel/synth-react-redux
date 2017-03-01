/**
 * Check if a prop settings value has changed
 */
export const checkPropChange = (prev, next, value) => {
  return !prev || next.settings[value].value !== prev.settings[value].value;
};
/**
 * default Audio Effect settings object to extend
 */
export const defaultEffectSettings = {
  color: '#fcfe0e',
  effectLevel: {
    min: 0,
    max: 1,
    name: 'Effect Level',
    value: 1
  },
  name: 'default',
  on: {
    value: true
  },
  title: 'default'
};
