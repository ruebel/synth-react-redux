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
    if (this.props.value.on) {
      this.props.keyUp(this.props.value.id);
    } else {
      this.props.keyDown(this.props.value.id);
    }
  }

  render() {
    let style = cx({
      key: true,
      on: this.props.value.on,
      ebony: this.props.value.note.length > 1
    });
    return (
      <div onClick={this.toggleKey} className={style}>
        {this.props.value.note}{this.props.value.octave}
      </div>
    );
  }
}

export default Key;
