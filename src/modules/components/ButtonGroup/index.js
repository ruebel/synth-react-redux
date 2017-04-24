import React, {PropTypes} from 'react';
const styles = require('./styles.css');

const ButtonGroup = ({children}) => {
  return (
    <div className={styles.buttonGroup}>
      {children}
    </div>
  );
};

ButtonGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

export default ButtonGroup;
