import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Container from '../../../components/Container';
import PowerSwitch from '../../../components/PowerSwitch';
import RangeControl from '../../../components/RangeControl';
import {setAttack, setIgnoreVelocity, setRelease} from '../../actions';
import {getEnvelope, getIgnoreVelocity} from '../../selectors';

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
    envelope: getEnvelope(state),
    ignoreVelocity: getIgnoreVelocity(state)
  };
};

export default connect(mapStateToProps, {setAttack, setIgnoreVelocity, setRelease})(Envelope);
