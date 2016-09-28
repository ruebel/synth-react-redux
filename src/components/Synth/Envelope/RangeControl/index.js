import React, {PropTypes} from 'react';
import ReactSlider from 'react-slider';
const styles = require('./styles.css');

const RangeControl = ({title, value, onSet}) => {
  return (
    <div>
      <h3>{title}</h3>
      <ReactSlider
        className={styles.slider}
        handleClassName={styles.handle}
        value={value}
        onChange={(e) => onSet(e)}
        min={0}
        max={1.5}
        step={0.01}/>
    </div>
  );
};

RangeControl.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number.isRequired,
  onSet: PropTypes.func.isRequired
};

export default RangeControl;
