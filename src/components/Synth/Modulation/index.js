import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/synth';
import Container from '../../Container';
import PowerSwitch from '../../PowerSwitch';
import RangeControl from '../../RangeControl';
import WaveShapeSelector from '../../WaveShapeSelector';
const styles = require('./styles.css');

const Modulation = ({modulation, setModulationDepth, setModulationSpeed, setModulationOn, setModulationShape}) => {
  return (
    <Container active={modulation.on}>
      <div className={styles.header}>
        <h3>Modulation</h3>
        <PowerSwitch value={modulation.on} change={setModulationOn} />
      </div>
      <WaveShapeSelector value={modulation.waveShape} change={setModulationShape} />
      <RangeControl title="Depth"
                    value={modulation.depth}
                    onSet={setModulationDepth}
                    min={0}
                    max={100}/>
      <RangeControl title="Speed"
                    value={modulation.speed}
                    onSet={setModulationSpeed}
                    min={1}
                    max={25}/>
    </Container>
  );
};

Modulation.propTypes = {
  modulation: PropTypes.object.isRequired,
  setModulationDepth: PropTypes.func.isRequired,
  setModulationOn: PropTypes.func.isRequired,
  setModulationSpeed: PropTypes.func.isRequired,
  setModulationShape: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    modulation: state.synth.modulation
  };
};

export default connect(mapStateToProps, actions)(Modulation);
