import React, {PropTypes} from 'react';
import RangeControl from '../../RangeControl';
import WaveShapeSelector from '../../WaveShapeSelector';

const Oscillator = ({oscillator, remove, setValue}) => {
  const octaves = [-2, -1, 0, 1, 2].map((s, i) => {
    return <option key={i} value={s}>{s}</option>;
  });
  return (
    <div>
      <button onClick={() => remove(oscillator.id)}>X</button>
      <select value={oscillator.octave} onChange={e => setValue(oscillator.id, e.target.value, 'octave')}>
        {octaves}
      </select>
      <WaveShapeSelector value={oscillator.waveShape} change={e => setValue(oscillator.id, e, 'waveShape')}/>
      <RangeControl title="Detune"
                    value={oscillator.detune}
                    onSet={e => setValue(oscillator.id, e, 'detune')}
                    min={-64}
                    max={64}/>
      <RangeControl title="Gain"
                    value={oscillator.gain}
                    onSet={e => setValue(oscillator.id, e, 'gain')}
                    min={0}
                    max={1}/>
    </div>
  );
};

Oscillator.propTypes = {
  oscillator: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default Oscillator;
