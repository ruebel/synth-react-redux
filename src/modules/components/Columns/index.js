import React, {PropTypes} from 'react';
const styles = require('./styles.css');

const Columns = ({children}) => {
  return (
    <div className={styles.cols}>
      {children}
    </div>
  );
};

Columns.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

export default Columns;
