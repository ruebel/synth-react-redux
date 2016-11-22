import React, {PropTypes} from 'react';
import Select from '../Select';
import {waveShapes} from '../../utils/audio';
const styles = require('./styles.css');

const WaveShapeSelector = ({value, change}) => {
  let options = waveShapes.map(s => ({id: s, name: s}));
  return (
    <div className={styles.wrapper}>
      <Select
        labelKey="name"
        onChange={e => change(e.id)}
        options={options}
        searchable={false}
        title="Shape"
        value={value}
        valueKey="id" />
    </div>
  );
};

WaveShapeSelector.propTypes = {
  value: PropTypes.string,
  change: PropTypes.func.isRequired
};

export default WaveShapeSelector;
