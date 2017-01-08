import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Button from '../Button';
import * as actions from '../../actions/presets';

const PresetBank = ({loadedId, loadPreset, presets, removePreset, saveNewPreset, savePreset}) => {
  return (
    <div>
      <Button
        active={Boolean(loadedId)}
        click={() => savePreset(loadedId)}
        text="Save Preset"/>
      <Button
        active
        click={saveNewPreset}
        text="Save New Preset"/>
      <Button
        active={Boolean(loadedId)}
        click={() => removePreset(loadedId)}
        text="Remove Preset"
        type="danger"
      />
      {presets.map((p, i) => {
        return (
          <Button
            active={p.id !== loadedId}
            click={() => loadPreset(p.id)}
            key={i}
            text={p.name}
          />
        );
      })}
    </div>
  );
};

PresetBank.propTypes = {
  loadedId: PropTypes.string,
  loadPreset: PropTypes.func.isRequired,
  presets: PropTypes.array.isRequired,
  removePreset: PropTypes.func.isRequired,
  saveNewPreset: PropTypes.func.isRequired,
  savePreset: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  loadedId: state.presets.loadedId,
  presets: state.presets.presets
});

export default connect(mapStateToProps, actions)(PresetBank);
