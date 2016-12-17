import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import ReactSlider from 'react-slider';
import {assignControl} from '../../actions/control';
import classNames from 'classnames/bind';
const styles = require('./styles.css');
const cx = classNames.bind(styles);

const RangeControl = ({assign, assignControl, max, min, onSet, step, title, value}) => {
  const style = cx({
    assigned: assign && assign.channel,
    wrapper: true
  });
  return (
    <div className={style}>
      {assign ? (
        <h3
          className={styles.assign}
          onClick={() => assignControl(assign)}>
          {title}
          {assign.channel && <div>{assign.channel}:{assign.control}</div>}
        </h3>
      ) : (
        <h3>{title}</h3>
      )}
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
  assign: PropTypes.shape({
    id: PropTypes.string.isRequired,
    effect: PropTypes.string.isRequired,
    property: PropTypes.string.isRequired
  }),
  assignControl: PropTypes.func.isRequired,
  max: PropTypes.number,
  min: PropTypes.number,
  onSet: PropTypes.func.isRequired,
  step: PropTypes.number,
  title: PropTypes.string,
  value: PropTypes.number.isRequired,
};

export default connect(null, {assignControl})(RangeControl);
