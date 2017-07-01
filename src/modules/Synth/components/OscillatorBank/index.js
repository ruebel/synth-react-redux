import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Button from '../../../components/Button';
import Container from '../../../components/Container';
import Oscillator from './Oscillator';
import * as actions from '../../actions';
import {getOscillators} from '../../selectors';

const Bank = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  & > div:not(:first-of-type) {
    margin-left: 5px;
  }
`;

const OscillatorBank = ({addOscillator, oscillators, setOscillatorSetting, removeOscillator}) => {
  const addButton = <Button active click={addOscillator} text="+" type="round"/>;
  return (
    <Container full title="Oscillators" titleControl={addButton}>
      <Bank>
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
      </Bank>
    </Container>
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
    oscillators: getOscillators(state)
  };
};

export default connect(mapStateToProps, actions)(OscillatorBank);
