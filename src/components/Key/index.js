import React from 'react';
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
      <div onClick={this.toggleKey} className={style}>
        {this.props.tone.note}{this.props.tone.octave}
      </div>
    );
  }
}

export default Key;
