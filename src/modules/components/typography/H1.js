import styled from 'styled-components';

export default styled.h1`
  font-family: ${p => p.theme.fontFamily.secondary};
  font-style: normal;
  font-weight: 400;
  color: ${p => p.theme.color.primary};
`;
