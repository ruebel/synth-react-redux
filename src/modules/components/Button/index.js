import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
const styles = require('./styles.css');
const cx = classNames.bind(styles);

const Button = ({ active, click, color, type, selected, text }) => {
  const style = cx({
    button: type !== 'link' && type !== 'round',
    [type || 'primary']: true,
    selected
  });
  return (
    <button
      className={style}
      disabled={!active || selected}
      onClick={() => click()}
      style={{ background: color }}
    >
      <div>{text || 'Click Me!'}</div>
    </button>
  );
};

Button.propTypes = {
  active: PropTypes.bool,
  click: PropTypes.func.isRequired,
  color: PropTypes.string,
  flavor: PropTypes.string,
  selected: PropTypes.bool,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

Button.defaultProps = {
  type: 'primary'
};

export default Button;
