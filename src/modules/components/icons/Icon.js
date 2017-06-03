import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
const styles = require('./styles.css');
const cx = classNames.bind(styles);

const Icon = (WrappedComponent, isFill) => {
  class IconComponent extends React.Component {
    render() {
      const style = cx({
        icon: true,
        fill: isFill,
        active: this.props.active,
        disabled: this.props.disabled,
        down: this.props.down,
        left: this.props.left,
        up: this.props.up
      });
      return (
        <div onClick={this.props.click} className={style}>
          <WrappedComponent {...this.props} className={style} />
        </div>
      );
    }
  }

  IconComponent.propTypes = {
    active: PropTypes.bool,
    click: PropTypes.func,
    disabled: PropTypes.bool,
    down: PropTypes.bool,
    left: PropTypes.bool,
    up: PropTypes.bool,
    width: PropTypes.string,
    height: PropTypes.string
  };

  return IconComponent;
};

export default Icon;
