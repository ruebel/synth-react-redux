import React, {PropTypes} from 'react';
import Button from '../../../../../Button';
import PowerSwitch from '../../../../../PowerSwitch';
const styles = require('./styles.css');

const Mover = ({close, down, on, power, up}) => {
  return (
    <div className={styles.mover}>
      <PowerSwitch value={on} change={power} />
      <Button active click={up} text="^" type="link" />
      <Button active click={down} text="v" type="link" />
      <Button active click={close} text="X" type="link" />
    </div>
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
