import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Label = styled.div`
  margin-bottom: 0.5rem;
  color: ${p =>
    p.invalid ? p.theme.color.danger : p.theme.color.grayExtraDark};

  & span {
    font-size: 2em;
    position: absolute;
    line-height: 0.9em;
    margin-left: 0.2em;
  }
`;

const Wrapper = styled.div`margin-top: 30px;`;

const InputGroup = ({ children, label, require, required }) => {
  return (
    <Wrapper>
      <Label invalid={required && !require}>
        {label} {required && !require && <span>*</span>}
      </Label>
      {children}
    </Wrapper>
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
