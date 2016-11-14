import React, {PropTypes} from 'react';
import classNames from 'classnames/bind';
const styles = require('./styles.css');
const cx = classNames.bind(styles);

const Button = ({active, click, type, text}) => {
  const style = cx({
    [type]: true
  });
  return (
    <button className={style} onClick={() => click()} disabled={!active}>
      {text || 'Click Me!'}
    </button>
  );
};

Button.propTypes = {
  active: PropTypes.bool,
  click: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

Button.defaultProps = {
  type: 'primary'
};

export default Button;
