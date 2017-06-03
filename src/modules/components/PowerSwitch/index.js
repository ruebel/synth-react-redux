import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
const styles = require('./styles.css');
const cx = classNames.bind(styles);

const PowerSwitch = ({ change, title, value }) => {
  const style = cx({
    switch: true,
    on: value
  });
  const wrapper = cx({
    wrapper: true,
    on: value
  });
  return (
    <div className={wrapper}>
      {title && <h3>{title}</h3>}
      <div className={style} onClick={() => change()}>
        <div />
      </div>
    </div>
  );
};

PowerSwitch.propTypes = {
  change: PropTypes.func.isRequired,
  title: PropTypes.string,
  value: PropTypes.bool
};

export default PowerSwitch;
