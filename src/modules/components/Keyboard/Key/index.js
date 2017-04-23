import React, {PropTypes} from 'react';
const styles = require('./styles.css');
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

class Key extends React.Component {
  constructor(props) {
    super(props);

    this.handleUp = this.handleUp.bind(this);
    this.toggleKey = this.toggleKey.bind(this);
  }

  handleUp() {
    if (!this.props.noUp) {
      this.toggleKey();
    }
  }

  toggleKey() {
    if (this.props.tone.velocity > 0) {
      this.props.keyUp(this.props.tone.id);
    } else {
      this.props.keyDown(this.props.tone.id);
    }
  }

  render() {
    const style = cx({
      key: true,
      on: this.props.tone.velocity > 0,
      ebony: this.props.tone.note.length > 1
    });
    return (
      <div
        onMouseDown={this.toggleKey}
        onMouseUp={this.handleUp}
        className={style} />
    );
  }
}

Key.propTypes = {
  keyDown: PropTypes.func.isRequired,
  keyUp: PropTypes.func.isRequired,
  noUp: PropTypes.bool,
  tone: PropTypes.object.isRequired
};

export default Key;
