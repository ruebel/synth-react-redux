import Button from './index';
import styled from 'styled-components';

export default styled(Button)`
  background-color: transparent;
  color: ${p => p.theme.color.grayExtraDark};
  min-height: 44px;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
  padding: 0 10px;
  margin: 0;
  transition: color 100ms ease-in-out, background-color 100ms ease-in-out;

  &:hover {
    color: ${p => p.theme.color.primary};
    background-color: color(${p => p.theme.color.light} b(5%));
  }

  &:disabled {
    color: ${p => p.theme.color.controlDisabled};
    cursor: not-allowed;
  }
`;
