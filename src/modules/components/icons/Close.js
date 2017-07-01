import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const Close = ({height = '24', styleName, width = '24', fill = '#4682b4'}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className={styleName} viewBox="0 0 220 220">
      <g fill={fill}>
        <path d="m169.418,13.92749c-1.396,-1.396 -3.681,-1.396 -5.077,0l-51.802,51.802c-1.396,1.396 -3.681,1.396 -5.077,0l-51.801,-51.802c-1.396,-1.396 -3.681,-1.396 -5.077,0l-26.656,26.655c-1.396,1.396 -1.396,3.681 0,5.077l51.802,51.802c1.396,1.396 1.396,3.681 0,5.077l-51.802,51.802c-1.396,1.396 -1.396,3.681 0,5.077l26.655,26.655c1.396,1.396 3.681,1.396 5.077,0l51.802,-51.802c1.396,-1.396 3.681,-1.396 5.077,0l51.801,51.801c1.396,1.396 3.681,1.396 5.077,0l26.655,-26.655c1.396,-1.396 1.396,-3.681 0,-5.077l-51.801,-51.801c-1.396,-1.396 -1.396,-3.681 0,-5.077l51.801,-51.801c1.396,-1.396 1.396,-3.681 0,-5.077l-26.654,-26.656z"/>
      </g>
    </svg>
  );
};

Close.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.string,
  styleName: PropTypes.string,
  width: PropTypes.string
};

export default Icon(Close, true);
