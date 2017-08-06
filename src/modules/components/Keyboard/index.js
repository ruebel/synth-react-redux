import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Key from './Key';

const Wrapper = styled.div`
  height: 100px;
  position: relative;
  overflow: hidden;
  margin: 0;
`;

const Keyboard = ({ keys, keyDown, keyUp, noUp = false }) => {
  return (
    <Wrapper>
      {Object.keys(keys).map((k, i) =>
        <Key
          key={i}
          tone={keys[k]}
          keyDown={keyDown}
          keyUp={keyUp}
          noUp={noUp}
        />
      )}
    </Wrapper>
  );
};

Keyboard.propTypes = {
  keys: PropTypes.object.isRequired,
  keyDown: PropTypes.func.isRequired,
  keyUp: PropTypes.func.isRequired,
  noUp: PropTypes.bool
};

export default Keyboard;
