import React from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import styled from 'styled-components';
import { midiToNoteName } from '../../../../../utils/audio';

const Wrapper = styled.td`
  cursor: pointer;
  transition: background, transform 50ms ease-in-out;

  &:hover {
    background: ${p => Color(p.theme.color.primary).lighten(0.75).string()};
    transform: scaleX(1.2) scaleY(1.2);
    span {
      display: inline-block;
    }
  }
`;

const Header = ({ tone }) => {
  return (
    <Wrapper>
      {midiToNoteName(tone)}
    </Wrapper>
  );
};

Header.propTypes = {
  tone: PropTypes.number
};

export default Header;
