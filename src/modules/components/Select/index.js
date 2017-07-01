import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import styled from 'styled-components';

const Wrapper = styled.div`
  .Select-arrow {
    border-width: 8px 6px 1.5px;
  }

  .Select-arrow-zone {
    padding-right: 1.8rem;
  }

  .Select-clear {
    display: none;
  }

  .Select-control {
    border-color: ${p => p.theme.color.border};
    border-radius: 0;
    border-width: 2px;
    font-size: 1.3rem;
    line-height: 3rem;
    height: 3rem;
    font-family: ${p => p.theme.fontFamily.primary};
  }

  .Select-menu {
    font-family: ${p => p.theme.fontFamily.primary};
  }

  .Select-input,
  .Select-placeholder,
  .Select--single > .Select-control .Select-value {
    padding: 0rem 1rem;
    height: 100%;
  }

  .Select-input {
    padding-left: 1rem;
  }

  .has-value.Select--single > .Select-control .Select-value .Select-value-label,
  .has-value.is-pseudo-focused.Select--single > .Select-control .Select-value .Select-value-label {
    color: ${p => p.theme.color.grayExtraDark};
  }

  .Select-menu-outer {
    border-radius: 0;
    border-width: 2px;
    border-style: solid;
    z-index: 3;
  }
`;

const Select = (props) => {
  return (
    <Wrapper>
      <h3>{props.title}</h3>
      <ReactSelect {...props}/>
    </Wrapper>
  );
};

Select.propTypes = {
  title: PropTypes.string
};

export default Select;
