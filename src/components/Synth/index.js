import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Envelope from './Envelope';
import Modulation from './Modulation';
import Portamento from './Portamento';
import WaveShapeSelector from '../WaveShapeSelector';
import * as actions from '../../actions/synth';

const Synth = ({waveShape, setWaveShape}) => {
  return (
    <div>
      <Envelope />
      <Modulation />
      <Portamento />
      <WaveShapeSelector value={waveShape} change={setWaveShape}/>
    </div>
  );
};

Synth.propTypes = {
  setWaveShape: PropTypes.func.isRequired,
  waveShape: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    waveShape: state.synth.waveShape
  };
};

export default connect(mapStateToProps, actions)(Synth);
