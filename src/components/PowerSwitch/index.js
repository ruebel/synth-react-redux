import React, {PropTypes} from 'react';
import classNames from 'classnames/bind';
const styles = require('./styles.css');
const cx = classNames.bind(styles);

const PowerSwitch = ({change, value}) => {
  const style = cx({
    switch: true,
    on: value
  });
  return (
    <div
      className={style}
      onClick={() => change()}>
        <div/>
      </div>
  );
};

PowerSwitch.propTypes = {
  change: PropTypes.func.isRequired,
  value: PropTypes.bool
};

export default PowerSwitch;
