import React, {PropTypes} from 'react';
import Button from '../Button';
import PowerSwitch from '../PowerSwitch';
import classNames from 'classnames/bind';
const styles = require('./styles.css');
const cx = classNames.bind(styles);

const Container = ({active, activeChange, close, children, full, tight, title, titleControl}) => {
  const containerStyle = cx({
    active,
    container: true,
    full,
    tight
  });
  const headerStyle = cx({
    header: true,
    pullUp: !title && (titleControl || close)
  });
  return (
    <div className={containerStyle}>
      <div className={headerStyle}>
        <h3>{title}</h3>
        {titleControl}
        {activeChange && <PowerSwitch value={active} change={activeChange} />}
        {close && <Button active click={close} text="X" type="link" />}
      </div>
      {children}
    </div>
  );
};

Container.propTypes = {
  active: PropTypes.bool,
  activeChange: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  close: PropTypes.func,
  full: PropTypes.bool,
  tight: PropTypes.bool,
  title: PropTypes.string,
  titleControl: PropTypes.element
};

export default Container;
