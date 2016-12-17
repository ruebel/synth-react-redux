import React, {PropTypes} from 'react';
import classNames from 'classnames/bind';
const styles = require('./styles.css');
const cx = classNames.bind(styles);

const Button = ({active, click, color, type, text}) => {
  const style = cx({
    button: type !== 'link' && type !== 'round',
    [type || 'primary']: true,
  });
  return (
    <button
      className={style}
      disabled={!active}
      onClick={() => click()}
      style={{background: color}}>
      <div>{text || 'Click Me!'}</div>
    </button>
  );
};

Button.propTypes = {
  active: PropTypes.bool,
  click: PropTypes.func.isRequired,
  color: PropTypes.string,
  flavor: PropTypes.string,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

Button.defaultProps = {
  type: 'primary'
};

export default Button;
