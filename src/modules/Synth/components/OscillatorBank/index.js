import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/Button';
import Container from '../../../components/Container';
import Oscillator from './Oscillator';
import * as actions from '../../actions';
import { getOscillators } from '../../selectors';
const styles = require('./styles.css');

const OscillatorBank = ({
  addOscillator,
  oscillators,
  setOscillatorSetting,
  removeOscillator
}) => {
  const addButton = (
    <Button active click={addOscillator} text="+" type="round" />
  );
  return (
    <Container full title="Oscillators" titleControl={addButton}>
      <div className={styles.bank}>
        {oscillators.map((o, i) => {
          return (
            <Oscillator
              key={i}
              oscillator={o}
              remove={removeOscillator}
              setValue={setOscillatorSetting}
            />
          );
        })}
      </div>
    </Container>
  );
};

OscillatorBank.propTypes = {
  addOscillator: PropTypes.func.isRequired,
  oscillators: PropTypes.array.isRequired,
  setOscillatorSetting: PropTypes.func.isRequired,
  removeOscillator: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    oscillators: getOscillators(state)
  };
};

export default connect(mapStateToProps, actions)(OscillatorBank);
