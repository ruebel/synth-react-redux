import React from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';

const NumberInput = ({ change, placeholder, required, value }) => {
  return (
    <Input
      type="number"
      onChange={change}
      placeholder={placeholder}
      required={required}
      value={value}
    />
  );
};

NumberInput.propTypes = {
  change: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string
};

export default NumberInput;
