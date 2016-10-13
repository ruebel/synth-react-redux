import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/synth';
import Oscillator from './Oscillator';

const OscillatorBank = ({addOscillator, oscillators, setOscillatorSetting, removeOscillator}) => {
  return (
    <div>
      <h3>Oscillators</h3>
      <button onClick={addOscillator}>Add Oscillator</button>
      {
        oscillators.map((o, i) => {
          return (
            <Oscillator
              key={i}
              oscillator={o}
              remove={removeOscillator}
              setValue={setOscillatorSetting}
              />);
            })
        }
    </div>
  );
};

OscillatorBank.propTypes = {
  addOscillator: PropTypes.func.isRequired,
  oscillators: PropTypes.array.isRequired,
  setOscillatorSetting: PropTypes.func.isRequired,
  removeOscillator: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    oscillators: state.synth.oscillators
  };
};

export default connect(mapStateToProps, actions)(OscillatorBank);
