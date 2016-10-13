import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/synth';
import RangeControl from '../../RangeControl';

const Portamento = ({on, setPortamento, setPortamentoSpeed, speed}) => {
  return (
    <div>
      <h3>Portamento</h3>
      <input type="checkbox" value={on} onChange={setPortamento} />
      <RangeControl title="Speed"
                    value={speed}
                    onSet={setPortamentoSpeed}
                    min={5}
                    max={100}/>
    </div>
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
    on: state.synth.portamento.on,
    speed: state.synth.portamento.speed
  };
};

export default connect(mapStateToProps, actions)(Portamento);
