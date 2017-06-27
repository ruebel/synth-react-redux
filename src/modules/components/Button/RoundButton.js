import Button from './index';
import styled from 'styled-components';

export default styled(Button)`
  border-radius: 50%;
  background-color: ${p => p.theme.color.primary};
  color: ${p => p.theme.color.light};
  height: 32px;
  width: 32px;
  line-height: 32px;
  border: none;
  padding: 0;
  cursor: pointer;
  margin: 0 5px;
  display: inline-block;
  text-align: center;
  transition: background-color 100ms ease-in-out, transform 100ms ease-in-out;

  & > div {
    font-size: 1.8em;
    margin-top: -5px;
  }

  &:hover {
    background-color: color(${p => p.theme.color.primary} b(10%));
    transform: scaleX(1.2) scaleY(1.2);
  }

  &:disabled {
    background-color: ${p => p.theme.color.controlDisabled};
    cursor: not-allowed;
  }

  &:focus {
    outline: 0;
  }
`;
