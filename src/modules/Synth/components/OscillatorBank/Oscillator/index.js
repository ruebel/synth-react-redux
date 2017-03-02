import React, {PropTypes} from 'react';
import Select from '../../../../components/Select';
import Container from '../../../../components/Container';
import RangeControl from '../../../../components/RangeControl';
import WaveShapeSelector from '../../../../components/WaveShapeSelector';
const styles = require('./styles.css');

const Oscillator = ({oscillator, remove, setValue}) => {
  const octaves = [-2, -1, 0, 1, 2].map((s) => ({id: s, name: s}));
  return (
    <Container active close={() => remove(oscillator.id)}>
      <div className={styles.colContainer}>
        <div>
          <Select
            labelKey="name"
            onChange={e => setValue(oscillator.id, e.id, 'octave')}
            options={octaves}
            searchable={false}
            title="Octave"
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
    </Container>
  );
};

Oscillator.propTypes = {
  oscillator: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default Oscillator;
