import React, {PropTypes} from 'react';
import Icon from './Icon';

const Play = ({height = '24', styleName, width = '24', fill = '#4682b4'}) => {
  return (
    <svg width={width} height={height} className={styleName} viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path fill={fill} d="m46.44299,30.417l207.114,119.573l-207.114,119.593l0,-239.166z"/>
      </g>
    </svg>
  );
};

Play.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.string,
  styleName: PropTypes.string,
  width: PropTypes.string
};

export default Icon(Play, true);
