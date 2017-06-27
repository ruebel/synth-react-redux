import styled from 'styled-components';

const Indicator = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid $core-border-color;
  background-color: ${p => p.on ? '#e85600' : 'white'};
`;

export default Indicator;
