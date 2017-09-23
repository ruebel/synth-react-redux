import React from 'react';
import PropTypes from 'prop-types';
import theme from '../../../styles/theme';

const rotate = (rotate, amount) => ({
  transition: 'transform 250ms linear',
  transformOrigin: '50% 50%',
  transform: `rotate(${rotate ? amount : 0}deg)`
});

const PlusMinus = ({ minus, size = 10 }) => {
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 10 10"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill={theme.color.secondary}>
        <polygon style={rotate(minus, '180')} points="0,4 0,6 10,6 10,4 " />
        <polygon style={rotate(minus, '270')} points="4,0 6,0 6,10 4,10 " />
      </g>
    </svg>
  );
};

PlusMinus.propTypes = {
  minus: PropTypes.bool,
  size: PropTypes.number
};

export default PlusMinus;
