import React, {PropTypes} from 'react';
const styles = require('./styles.css');

const Indicator = ({on}) => {
  return (
    <div
      className={styles.indicator}
      style={{
        backgroundColor: on ? '#e85600' : 'white'
      }}
    />
  );
};

Indicator.propTypes = {
  on: PropTypes.bool
};

export default Indicator;
