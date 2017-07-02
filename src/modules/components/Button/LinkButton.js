import Button from './index';
import styled from 'styled-components';
import Color from 'color';

export default styled(Button)`
  background-color: transparent;
  color: ${p => p.theme.color.grayExtraDark};
  min-height: 44px;
  padding: 0 10px;
  transition: color 100ms ease-in-out, background-color 100ms ease-in-out;

  &:hover {
    color: ${p => p.theme.color.primary};
    background-color: ${p => Color(p.theme.color.light).darken(0.05).string()};
  }

  &:disabled {
    color: ${p => p.theme.color.controlDisabled};
    cursor: not-allowed;
  }
`;
