import styled from 'styled-components';

const Input = styled.input`
  border: 2px ${p => p.theme.color.border} solid;
  font-size: 1.3rem;
  height: 4rem;
  padding: 5px 24px;
  width: 100%;
`;

export default Input;
