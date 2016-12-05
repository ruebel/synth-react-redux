import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import PowerSwitch from '../../PowerSwitch';
import RangeControl from '../../RangeControl';
import {setAttack, setIgnoreVelocity, setRelease} from '../../../actions/synth';
import Container from '../../Container';

const Envelope = ({envelope, ignoreVelocity, setAttack, setIgnoreVelocity, setRelease}) => {
  return (
    <Container active title="Envelope">
      <PowerSwitch title="Ignore Velocity" value={ignoreVelocity} change={setIgnoreVelocity}/>
      <RangeControl title="Attack" value={envelope.attack} onSet={setAttack}/>
      <RangeControl title="Release" value={envelope.release} onSet={setRelease}/>
    </Container>
  );
};

Envelope.propTypes = {
  envelope: PropTypes.object.isRequired,
  ignoreVelocity: PropTypes.bool,
  setAttack: PropTypes.func.isRequired,
  setIgnoreVelocity: PropTypes.func.isRequired,
  setRelease: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    envelope: state.synth.envelope,
    ignoreVelocity: state.synth.ignoreVelocity
  };
};

export default connect(mapStateToProps, {setAttack, setIgnoreVelocity, setRelease})(Envelope);
