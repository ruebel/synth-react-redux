import React from 'react';
import PropTypes from 'prop-types';
import Select from '../Select';
import { waveShapes } from '../../../utils/audio';

const WaveShapeSelector = ({ value, change }) => {
  const options = waveShapes.map(s => ({ id: s, name: s }));
  return (
    <div>
      <Select
        labelKey="name"
        onChange={e => change(e.id)}
        options={options}
        searchable={false}
        title="Shape"
        value={value}
        valueKey="id"
      />
    </div>
  );
};

WaveShapeSelector.propTypes = {
  value: PropTypes.string,
  change: PropTypes.func.isRequired
};

export default WaveShapeSelector;
