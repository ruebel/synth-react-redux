import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectors as audioSelectors } from '../Audio';
import Columns from '../components/Columns';
import Envelope from './components/Envelope';
import Keyboard from '../components/Keyboard';
import Modulation from './components/Modulation';
import OscillatorBank from './components/OscillatorBank';
import Portamento from './components/Portamento';
import Transpose from './components/Transpose';

const Synth = ({ keys, keyDown, keyUp }) => {
  return (
    <div>
      <Transpose />
      <Keyboard keys={keys} keyDown={keyDown} keyUp={keyUp} />
      <OscillatorBank />
      <Columns>
        <Envelope />
        <Modulation />
        <Portamento />
      </Columns>
    </div>
  );
};

Synth.propTypes = {
  keys: PropTypes.object.isRequired,
  keyDown: PropTypes.func.isRequired,
  keyUp: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  keys: audioSelectors.getKeys(state)
});

export default connect(mapStateToProps)(Synth);
