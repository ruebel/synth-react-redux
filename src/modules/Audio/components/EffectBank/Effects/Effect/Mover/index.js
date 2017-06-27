import React, {PropTypes} from 'react';
import styled from 'styled-components';
import Button from '../../../../../../components/Button';
import PowerSwitch from '../../../../../../components/PowerSwitch';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: middle;
  margin-top: -5px;
  margin-right: -10px;
`;

const Mover = ({close, down, on, power, up}) => {
  return (
    <Wrapper>
      <PowerSwitch value={on} change={power} />
      <Button active click={up} text="^" type="link" />
      <Button active click={down} text="v" type="link" />
      <Button active click={close} text="X" type="link" />
    </Wrapper>
  );
};

Mover.propTypes = {
  close: PropTypes.func.isRequired,
  down: PropTypes.func.isRequired,
  on: PropTypes.bool,
  power: PropTypes.func.isRequired,
  up: PropTypes.func.isRequired
};

export default Mover;
