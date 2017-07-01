import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Input = styled.input`
  border: 2px ${p => p.theme.color.border} solid;
  border-radius: 3px;
  font-size: 1.3rem;
  height: 4rem;
  padding: 5px 24px;
  width: 100%;
`;

const TextInput = ({change, placeholder, required, value}) => {
  return (
    <Input
    type="text"
    onChange={change}
    placeholder={placeholder}
    required={required}
    value={value}/>
  );
};

TextInput.propTypes = {
  change: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string
};

export default TextInput;
