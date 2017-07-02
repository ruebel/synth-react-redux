import Button from './index';
import styled from 'styled-components';

export default styled(Button)`
  border-radius: 50%;
  height: 32px;
  width: 32px;
  line-height: 32px;
  padding: 0;
  margin: 0 5px;
  display: inline-block;
  text-align: center;

  & > div {
    font-size: 1.8em;
    margin-top: -5px;
  }

  &:focus {
    outline: 0;
  }
`;
