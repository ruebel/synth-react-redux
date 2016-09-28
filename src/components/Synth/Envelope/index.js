import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import RangeControl from './RangeControl';
import {setAttack, setRelease} from '../../../actions/synth';

const Envelope = ({envelope, setAttack, setRelease}) => {
  return (
    <div>
      <RangeControl title="Attack" value={envelope.attack} onSet={setAttack} />
      <RangeControl title="Release" value={envelope.release} onSet={setRelease} />
    </div>
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
