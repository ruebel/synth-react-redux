import React, {PropTypes} from 'react';
import ReactSlider from 'react-slider';
const styles = require('./styles.css');

const RangeControl = ({max, min, onSet, title, value}) => {
  return (
    <div>
      <h3>{title}</h3>
      <ReactSlider
        className={styles.slider}
        handleClassName={styles.handle}
        value={value}
        onChange={(e) => onSet(e)}
        min={min || 0}
        max={max || 1.5}
        step={0.01}/>
    </div>
  );
};

RangeControl.propTypes = {
  max: PropTypes.number,
  min: PropTypes.number,
  onSet: PropTypes.func.isRequired,
  title: PropTypes.string,
  value: PropTypes.number.isRequired,
};

export default RangeControl;
