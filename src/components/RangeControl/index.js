import React, {PropTypes} from 'react';
import ReactTooltip from 'react-tooltip';
import {connect} from 'react-redux';
import ReactSlider from 'react-slider';
import {assignControl} from '../../actions/control';
import {scaleNumber} from '../../utils/math';
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
          data-tip
          data-for="midi"
          onClick={() => assignControl(assign)}>
          {title}
          {assign.channel && <div>{assign.channel}:{assign.control}</div>}
          <ReactTooltip id="midi">
            {assign.channel ?
              (
                <div>
                  <h3>
                    Click to edit MIDI control
                  </h3>
                  <h3>
                    Channel:
                    <span>
                      {assign.channel}
                    </span>
                  </h3>
                  <h3>
                    Control:
                    <span>
                      {assign.control}
                    </span>
                  </h3>
                </div>
              ) :
              'Click to assign MIDI control'
            }
          </ReactTooltip>
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
        pearling
        step={step || 0.01}
        withBars>
          <div>{scaleNumber(value)}</div>
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
