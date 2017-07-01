import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const Pause = ({
  height = '24',
  styleName,
  width = '24',
  fill = '#4682b4'
}) => {
  return (
    <svg
      width={width}
      height={height}
      className={styleName}
      viewBox="0 0 300 300"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill={fill}>
        <rect height="240" width="100" y="30" x="20" />
        <rect height="240" width="100" y="30" x="160" />
      </g>
    </svg>
  );
};

Pause.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.string,
  styleName: PropTypes.string,
  width: PropTypes.string
};

export default Icon(Pause, true);
