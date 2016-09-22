import React from 'react';
import {connect} from 'react-redux';
import {setWaveShape} from '../actions/synth';
import {waveShapes} from '../utils/audio';

const WaveShapeSelector = ({shapes, selectedShape, setWaveShape}) => {
  let options = shapes.map((s, i) => {
    return <option key={i} value={s}>{s}</option>;
  });
  return (
    <select value={selectedShape} onChange={e => {
      setWaveShape(e.target.value);
    }}>
      {options}
    </select>
  );
};

const mapStateToProps = (state) => {
  return {
    shapes: waveShapes,
    selectedShape: state.synth.waveShape
  };
};

export default connect(mapStateToProps, {setWaveShape})(WaveShapeSelector);
