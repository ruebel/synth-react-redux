import React from 'react';
import PropTypes from 'prop-types';
import Range from 'rc-slider/lib/Range';
import H3 from '../typography/H3';
import { Handle, RangeStyler } from '../RangeStyler';

const MinMax = ({ max = 1.5, min = 0, onSet, step = 0.01, title, value }) => {
  return (
    <RangeStyler handleSize={30}>
      <H3>{title}</H3>
      <Range
        allowCross={false}
        className="slider"
        handle={Handle}
        onChange={e => onSet(e)}
        min={min}
        max={max}
        step={step}
        value={value}
      />
    </RangeStyler>
  );
};

MinMax.propTypes = {
  max: PropTypes.number,
  min: PropTypes.number,
  onSet: PropTypes.func.isRequired,
  step: PropTypes.number,
  title: PropTypes.string,
  value: PropTypes.array.isRequired
};

export default MinMax;
