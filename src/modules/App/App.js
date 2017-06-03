import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Audio, actions as audioActions } from '../Audio';
import Columns from '../components/Columns';
import { AssignControl } from '../Control';
import { Input, selectors as inputSelectors } from '../Input';
import { Presets } from '../Presets';
import { Sequencer } from '../Sequencer';
import { Synth } from '../Synth';
import { inputTypes } from '../../utils/input';
const styles = require('./styles.css');

const App = ({ input, keyDown, keyUp }) => {
  return (
    <div className={styles.container}>
      <Columns>
        <Input />
        <Presets />
      </Columns>
      <Sequencer />
      {input &&
        input.device !== inputTypes.stream &&
        <Synth keyDown={keyDown} keyUp={keyUp} />}
      <Audio input={input} />
      <AssignControl />
    </div>
  );
};

App.propTypes = {
  input: PropTypes.object,
  keyDown: PropTypes.func.isRequired,
  keyUp: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  input: inputSelectors.getSelectedDevice(state)
});

export default connect(mapStateToProps, {
  keyDown: audioActions.keyDown,
  keyUp: audioActions.keyUp
})(App);
