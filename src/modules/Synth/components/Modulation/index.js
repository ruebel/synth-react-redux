import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Container from '../../../components/Container';
import RangeControl from '../../../components/RangeControl';
import WaveShapeSelector from '../../../components/WaveShapeSelector';
import * as actions from '../../actions';
import {getModulation} from '../../selectors';

const Modulation = ({modulation, setModulationDepth, setModulationSpeed, setModulationOn, setModulationShape}) => {
  return (
    <Container active={modulation.on} activeChange={setModulationOn} title="Modulation">
      <WaveShapeSelector value={modulation.shape} change={setModulationShape} />
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
    modulation: getModulation(state)
  };
};

export default connect(mapStateToProps, actions)(Modulation);
