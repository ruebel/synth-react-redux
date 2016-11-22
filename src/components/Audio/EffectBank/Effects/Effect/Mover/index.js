import React, {PropTypes} from 'react';
import Button from '../../../../../Button';

const Mover = ({close, down, up}) => {
  return (
    <div>
      <Button active click={up} text="^" type="link" />
      <Button active click={down} text="v" type="link" />
      <Button active click={close} text="X" type="link" />
    </div>
  );
};

Mover.propTypes = {
  close: PropTypes.func.isRequired,
  down: PropTypes.func.isRequired,
  up: PropTypes.func.isRequired
};

export default Mover;
