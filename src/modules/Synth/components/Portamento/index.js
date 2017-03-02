import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Container from '../../../components/Container';
import RangeControl from '../../../components/RangeControl';
import * as actions from '../../actions';
import {getPortamentoOn, getPortamentoSpeed} from '../../selectors';

const Portamento = ({on, setPortamento, setPortamentoSpeed, speed}) => {
  return (
    <Container active={on} activeChange={setPortamento} title="Portamento">
      <RangeControl title="Speed"
                    value={speed}
                    onSet={setPortamentoSpeed}
                    min={5}
                    max={100}/>
    </Container>
  );
};

Portamento.propTypes = {
  on: PropTypes.bool.isRequired,
  setPortamento: PropTypes.func.isRequired,
  setPortamentoSpeed: PropTypes.func.isRequired,
  speed: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return {
    on: getPortamentoOn(state),
    speed: getPortamentoSpeed(state)
  };
};

export default connect(mapStateToProps, actions)(Portamento);
