import React, {PropTypes} from 'react';
const styles = require('./styles.css');
import classNames from 'classnames/bind';
let cx = classNames.bind(styles);

class Key extends React.Component {
  constructor(props) {
    super(props);

    this.toggleKey = this.toggleKey.bind(this);
  }

  toggleKey() {
    if (this.props.tone.velocity > 0) {
      this.props.keyUp(this.props.tone.id);
    } else {
      this.props.keyDown(this.props.tone.id);
    }
  }

  render() {
    let style = cx({
      key: true,
      on: this.props.tone.velocity > 0,
      ebony: this.props.tone.note.length > 1
    });
    return (
      <div
        onMouseDown={this.toggleKey}
        onMouseUp={this.toggleKey}
        className={style} />
    );
  }
}

Key.propTypes = {
  keyDown: PropTypes.func.isRequired,
  keyUp: PropTypes.func.isRequired,
  tone: PropTypes.object.isRequired
};

export default Key;
