import React, { PropTypes } from 'react';
import Key from './Key';
const styles = require('./styles.css');

const Keyboard = ({ keys, keyDown, keyUp, noUp }) => {
  return (
    <div className={styles.wrapper}>
      {Object.keys(keys).map((k, i) => {
        return (
          <Key
            key={i}
            tone={keys[k]}
            keyDown={keyDown}
            keyUp={keyUp}
            noUp={noUp}
          />
        );
      })}
    </div>
  );
};

Keyboard.propTypes = {
  keys: PropTypes.object.isRequired,
  keyDown: PropTypes.func.isRequired,
  keyUp: PropTypes.func.isRequired,
  noUp: PropTypes.bool
};

export default Keyboard;
