import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {actions as audioActions} from '../../Audio';
import keyMap from '../../../utils/keyMap';

class Keyboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      downKeys: {}
    };

    this.deregister = this.deregister.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.register = this.register.bind(this);
  }

  componentDidMount() {
    this.register();
  }

  componentWillUpdate() {
    return false;
  }

  componentWillUnmount() {
    this.deregister();
  }

  deregister() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
  }

  register() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  handleKeyDown(e) {
    if (this.state.downKeys[e.keyCode]) {
      return;
    }
    const note = keyMap[e.keyCode];
    if (note) {
      this.props.keyDown(note);
      this.setState(state => ({
        downKeys: Object.assign({}, state.downKeys, {
          [e.keyCode]: true
        })
      }));
    }
  }

  handleKeyUp(e) {
    const note = keyMap[e.keyCode];
    this.setState(state => ({
      downKeys: Object.assign({}, state.downKeys, {
        [e.keyCode]: false
      })
    }));
    if (note) {
      this.props.keyUp(note);
    }
  }

  render() {
    return null;
  }
}

Keyboard.propTypes = {
  keyDown: PropTypes.func.isRequired,
  keyUp: PropTypes.func.isRequired
};

export default connect(null, {
  keyDown: audioActions.keyDown,
  keyUp: audioActions.keyUp,
})(Keyboard);
