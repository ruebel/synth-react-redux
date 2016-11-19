import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/synth';
import Button from '../../Button';
import Oscillator from './Oscillator';
const styles = require('./styles.css');

const OscillatorBank = ({addOscillator, oscillators, setOscillatorSetting, removeOscillator}) => {
  return (
    <div>
      <h3>Oscillators <Button active click={addOscillator} text="+" type="round"/></h3>
      <div className={styles.bank}>
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
