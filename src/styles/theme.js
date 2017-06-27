export const color = {
  bodyBg: '#fff',
  light: '#fff',
  primary: '#4682b4',
  secondary: '#42647f',
  grayExtraLight: '#f9f9f9',
  grayLight: '#f1f1f1',
  gray: '#eaeaea',
  graySemidark: '#9b9b9b',
  grayDark: '#a5a5a5',
  grayExtraDark: '#575855',
  black: '#000',
  border: '#9b9b9b',
  control: '#c5c5c5',
  controlEmpty: '#575855',
  controlSuccess: '#81c784',
  controlInfo: '#3e73cc',
  controlWarning: '#f9c233',
  controlDanger: '#e85600',
  controlDisabled: '#cccccc'
};

export const deviceWidth = {
  mobilePhone: '450px',
  largePhone: '600px',
  tablet: '800px',
  desktop: '1000px'
};

export const fontFamily = {
  primary: '"Gotham SSm A", "Gotham SSm B", Arial, sans-serif',
  secondary: '"HelveticaNeue-Medium", Arial, sans-serif'
};

export const fontWeight = {
  black: '900',
  bold: '700',
  semibold: '600',
  regular: '400',
  light: '300',
  extralight: '200'
};

export const media = {
  mobilePhone: `(max-width: ${deviceWidth.mobilePhone})`,
  tablet: `(max-width: ${deviceWidth.tablet})`,
  desktop: `(max-width: ${deviceWidth.desktop})`
};

export default {
  color,
  deviceWidth,
  fontFamily,
  fontWeight
};
