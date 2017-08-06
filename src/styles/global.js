import { injectGlobal } from 'styled-components';
import { fontFamily } from './theme';

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
`;
