import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import RangeControl from '../../RangeControl';
import {setAttack, setRelease} from '../../../actions/synth';
import Container from '../../Container';

const Envelope = ({envelope, setAttack, setRelease}) => {
  return (
    <Container active title="Envelope">
      <RangeControl title="Attack" value={envelope.attack} onSet={setAttack}/>
      <RangeControl title="Release" value={envelope.release} onSet={setRelease}/>
    </Container>
  );
};

Envelope.propTypes = {
  envelope: PropTypes.object.isRequired,
  setAttack: PropTypes.func.isRequired,
  setRelease: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    envelope: state.synth.envelope
  };
};

export default connect(mapStateToProps, {setAttack, setRelease})(Envelope);
