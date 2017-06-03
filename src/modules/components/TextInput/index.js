import React, { PropTypes } from 'react';
const styles = require('./styles.css');

const TextInput = ({ change, placeholder, required, value }) => {
  return (
    <input
      type="text"
      className={styles.input}
      onChange={change}
      placeholder={placeholder}
      required={required}
      value={value}
    />
  );
};

TextInput.propTypes = {
  change: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string
};

export default TextInput;
