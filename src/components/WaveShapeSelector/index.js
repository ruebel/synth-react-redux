import React, {PropTypes} from 'react';
import {waveShapes} from '../../utils/audio';

const WaveShapeSelector = ({value, change}) => {
  let options = waveShapes.map((s, i) => {
    return <option key={i} value={s}>{s}</option>;
  });
  return (
    <select value={value} onChange={e => change(e.target.value)}>
      {options}
    </select>
  );
};

WaveShapeSelector.propTypes = {
  value: PropTypes.string,
  change: PropTypes.func.isRequired
};

export default WaveShapeSelector;
