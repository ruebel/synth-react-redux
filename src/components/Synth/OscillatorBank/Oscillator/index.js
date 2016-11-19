import React, {PropTypes} from 'react';
import Select from 'react-select';
import Button from '../../../Button';
import RangeControl from '../../../RangeControl';
import WaveShapeSelector from '../../../WaveShapeSelector';
const styles = require('./styles.css');

const Oscillator = ({oscillator, remove, setValue}) => {
  const octaves = [-2, -1, 0, 1, 2].map((s) => ({id: s, name: s}));
  return (
    <div className={styles.wrapper}>
      <Button
        active
        click={() => remove(oscillator.id)}
        text="X"
        type="link" />
      <div className={styles.colContainer}>
        <div>
          <h3>Octave</h3>
          <Select
            labelKey="name"
            onChange={e => setValue(oscillator.id, e.id, 'octave')}
            options={octaves}
            searchable={false}
            value={oscillator.octave}
            valueKey="id" />
        </div>
        <WaveShapeSelector value={oscillator.waveShape} change={e => setValue(oscillator.id, e, 'waveShape')}/>
      </div>
      <RangeControl title="Detune"
                    value={oscillator.detune}
                    onSet={e => setValue(oscillator.id, e, 'detune')}
                    min={-64}
                    max={64} />
      <RangeControl title="Gain"
                    value={oscillator.gain}
                    onSet={e => setValue(oscillator.id, e, 'gain')}
                    min={0}
                    max={1} />
    </div>
  );
};

Oscillator.propTypes = {
  oscillator: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default Oscillator;
