export const checkPropChange = (prev, next, value) => {
  return !prev || next.settings[value].value !== prev.settings[value].value;
};

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
