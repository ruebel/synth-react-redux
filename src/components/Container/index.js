import React, {PropTypes} from 'react';
import classNames from 'classnames/bind';
const styles = require('./styles.css');
const cx = classNames.bind(styles);

const Container = ({active, children}) => {
  const containerStyle = cx({
    active,
    container: true,
  });
  return (
    <div className={containerStyle}>
      {children}
    </div>
  );
};

Container.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

export default Container;
