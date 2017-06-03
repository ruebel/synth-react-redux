import React, { PropTypes } from 'react';
import ReactSelect from 'react-select';

const Select = props => {
  return (
    <div>
      <h3>{props.title}</h3>
      <ReactSelect {...props} />
    </div>
  );
};

Select.propTypes = {
  title: PropTypes.string
};

export default Select;
