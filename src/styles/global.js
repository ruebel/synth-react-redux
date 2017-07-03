import { injectGlobal } from 'styled-components';
import { color, fontFamily } from './theme';

injectGlobal`
  html {
    box-sizing: border-box;
    font-size: 10px;
    font-family: ${fontFamily.primary};
  }
  body {
    font-size: 1.3rem;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  li {
    list-style: none;
  }

  h1 {
    font-family: ${fontFamily.secondary};
    font-style: normal;
    font-weight: 400;
  },

  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${color.grayExtraDark};
    font-family: ${fontFamily.primary};
    font-style: normal;
    font-weight: 700;
  }

  h2 {
    font-size: 2.8rem;
    margin-bottom: 3px;
  }

  p {
    color: ${color.grayExtraDark};
    font-family: ${fontFamily.primary};
    font-style: normal;
    font-weight: 300;
  }
`;
