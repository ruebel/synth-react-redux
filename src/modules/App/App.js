import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Audio, actions as audioActions, selectors as audioSelectors} from '../Audio';
import {Input, selectors as inputSelectors} from '../Input';
import Keyboard from '../components/Keyboard';
import {Presets} from '../Presets';
import {Synth} from '../Synth';
import {AssignControl} from '../Control';
import {inputTypes} from '../../utils/input';
const styles = require('./styles.css');

const App = ({input, keys, keyDown, keyUp}) => {
  return (
    <div className={styles.container}>
      <div className={styles.inline}>
        <Input />
        <Presets />
      </div>
      {input && input.device !== inputTypes.stream && (
        <div>
          <Synth />
          <Keyboard
            keys={keys}
            keyDown={keyDown}
            keyUp={keyUp}
          />
        </div>
      )}
      <Audio input={input}/>
      <AssignControl />
    </div>
  );
};

App.propTypes = {
  input: PropTypes.object,
  keys: PropTypes.object.isRequired,
  keyDown: PropTypes.func.isRequired,
  keyUp: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    input: inputSelectors.getSelectedDevice(state),
    keys: audioSelectors.getKeys(state)
  };
};

export default connect(mapStateToProps, {
  keyDown: audioActions.keyDown,
  keyUp: audioActions.keyUp
})(App);
