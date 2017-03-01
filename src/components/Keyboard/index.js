import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Key from './Key';
import {keyDown, keyUp} from '../../actions/audio';
import {getKeys} from '../../selectors/audio';
const styles = require('./styles.css');

const Keyboard = ({keys, keyDown, keyUp}) => {
  return (
    <div className={styles.wrapper}>
      {Object.keys(keys).map((k, i) => {
        return (
          <Key key={i}
               tone={keys[k]}
               keyDown={keyDown}
               keyUp={keyUp}/>);
        })}
    </div>
  );
};

Keyboard.propTypes = {
  keys: PropTypes.object.isRequired,
  keyDown: PropTypes.func.isRequired,
  keyUp: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    keys: getKeys(state)
  };
};

export default connect(mapStateToProps, {keyDown, keyUp})(Keyboard);
