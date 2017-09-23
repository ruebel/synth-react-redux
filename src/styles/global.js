import { injectGlobal } from 'styled-components';
import Color from 'color';
import { color, fontFamily } from './theme';

injectGlobal`
  html {
    box-sizing: border-box;
    font-size: 10px;
    font-family: ${fontFamily.primary};
  }
  body {
    font-size: 1.3rem;
    background: linear-gradient(to top left, ${Color(color.controlDanger).lighten(0.5).string()}, ${Color(color.controlWarning).lighten(0.3).string()});
  }
  button:focus {
    outline:0;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  li {
    list-style: none;
  }
`;
