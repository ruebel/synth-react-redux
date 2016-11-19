import React, {PropTypes} from 'react';
import ReactSlider from 'react-slider';
const styles = require('./styles.css');

const RangeControl = ({max, min, onSet, step, title, value}) => {
  return (
    <div className={styles.wrapper}>
      <h3>{title}</h3>
      <ReactSlider
        className={styles.slider}
        handleClassName={styles.handle}
        value={value}
        onChange={(e) => onSet(e)}
        min={min || 0}
        max={max || 1.5}
        pearling={true}
        step={step || 0.01}
        withBars={true}>
          <div>{Math.abs(value) < 1 ? value.toFixed(2) : value.toFixed(1)}</div>
        </ReactSlider>
    </div>
  );
};

RangeControl.propTypes = {
  max: PropTypes.number,
  min: PropTypes.number,
  onSet: PropTypes.func.isRequired,
  step: PropTypes.number,
  title: PropTypes.string,
  value: PropTypes.number.isRequired,
};

export default RangeControl;
