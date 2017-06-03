import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
const styles = require('./styles.css');
const cx = classNames.bind(styles);

const InputGroup = ({ children, label, require, required }) => {
  const style = cx({
    label: true,
    invalid: required && !require
  });
  return (
    <div className={styles.wrapper}>
      <div className={style}>
        {label} {required && !require && <span>*</span>}
      </div>
      {children}
    </div>
  );
};

InputGroup.propTypes = {
  children: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  require: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object
  ]),
  required: PropTypes.bool
};

export default InputGroup;
