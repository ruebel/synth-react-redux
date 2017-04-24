import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Audio, actions as audioActions, selectors as audioSelectors} from '../Audio';
import {Input} from '../Input';
import Keyboard from '../components/Keyboard';
import {Presets} from '../Presets';
import {Synth} from '../Synth';
import {AssignControl} from '../Control';
const styles = require('./styles.css');

const App = ({keys, keyDown, keyUp}) => {
  return (
    <div className={styles.container}>
      <div className={styles.inline}>
        <Input />
        <Presets />
      </div>
      <Synth />
      <Keyboard
        keys={keys}
        keyDown={keyDown}
        keyUp={keyUp}
      />
      <Audio />
      <AssignControl />
    </div>
  );
};

App.propTypes = {
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
})(App);
