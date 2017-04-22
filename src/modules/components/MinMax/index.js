import React, {PropTypes} from 'react';
import ReactSlider from 'react-slider';
import {scaleNumber} from '../../../utils/math';
import classNames from 'classnames/bind';
const styles = require('./styles.css');
const cx = classNames.bind(styles);

const MinMax = ({max, min, onSet, step, title, value}) => {
  const style = cx({
    wrapper: true
  });
  return (
    <div className={style}>
      <h3>{title}</h3>
      <ReactSlider
        className={styles.slider}
        handleClassName={styles.handle}
        value={value}
        onChange={(e) => onSet(e)}
        min={min || 0}
        max={max || 1.5}
        pearling
        step={step || 0.01}
        withBars>
          <div>{scaleNumber(value[0])}</div>
          <div>{scaleNumber(value[1])}</div>
        </ReactSlider>
    </div>
  );
};

MinMax.propTypes = {
  max: PropTypes.number,
  min: PropTypes.number,
  onSet: PropTypes.func.isRequired,
  step: PropTypes.number,
  title: PropTypes.string,
  value: PropTypes.array.isRequired,
};

export default MinMax;
