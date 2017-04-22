import React, {PropTypes} from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
const styles = require('./styles.css');

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      preventClose: false
    };

    this.handleClose = this.handleClose.bind(this);
    this.stopClose = this.stopClose.bind(this);
  }

  handleClose(e, force = false) {
    e.stopPropagation();
    if (this.state.preventClose) {
      this.setState({
        preventClose: false
      });
      if (force) {
        this.props.close();
      }
    } else {
      this.props.close();
    }
  }

  stopClose(e) {
    e.stopPropagation();
    this.setState({
      preventClose: true
    });
  }

  render() {
    return (
      <CSSTransitionGroup
        transitionName={styles}
        transitionAppear
        transitionEnter={false}
        transitionLeave
        transitionAppearTimeout={150}
        transitionLeaveTimeout={150}>
        <div className={styles.wrapper} onClick={this.handleClose} key="1">
          {this.props.icon && (
            <div className={styles.icon}>{this.props.icon}</div>
          )}
          <div className={styles.inner} onClick={this.stopClose}>
            {this.props.children}
          </div>
        </div>
      </CSSTransitionGroup>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  close: PropTypes.func.isRequired,
  icon: PropTypes.element
};

export default Modal;
