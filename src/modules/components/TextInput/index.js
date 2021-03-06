import React from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';

const TextInput = ({ change, placeholder, required, value }) => {
  return (
    <Input
      type="text"
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
