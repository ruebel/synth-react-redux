import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  & > div:not(:first-of-type) {
    margin-left: 5px;
  }

  & > div {
    flex: 1;
  }
`;
