import React, {PropTypes} from 'react';
import Keyboard from '../../../../components/Keyboard';
import {generateKeys} from '../../../../../utils/audio';

class Scale extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    this.state = {
      keys: this.transformKeyArray(props.keys)
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      keys: this.transformKeyArray(props.keys)
    });
  }

  handleKeyDown(e) {
    this.props.onChange([...this.props.keys, e]);
  }

  handleKeyUp(e) {
    this.props.onChange(this.props.keys.filter(k => k != e));
  }

  transformKeyArray(keyArray) {
    const keys = generateKeys(0, 12);
    return Object.keys(keys).reduce((total, k) => {
      return Object.assign({}, total, {
        [k]: Object.assign({}, keys[k], {
          velocity: keyArray.indexOf(keys[k].id) >= 0 ? 1 : 0
        })
      });
    }, {});
  }

  render() {
    return (
      <Keyboard
        keys={this.state.keys}
        keyDown={this.handleKeyDown}
        keyUp={this.handleKeyUp}
        noUp
      />
    );
  }
}

Scale.propTypes = {
  keys: PropTypes.array,
  onChange: PropTypes.func.isRequired
};

export default Scale;
