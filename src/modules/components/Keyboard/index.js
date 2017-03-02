import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Key from './Key';
import {actions as audioActions, selectors as audioSelectors} from '../../Audio';
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
    keys: audioSelectors.getKeys(state)
  };
};

export default connect(mapStateToProps, {
  keyDown: audioActions.keyDown,
  keyUp: audioActions.keyUp
})(Keyboard);
