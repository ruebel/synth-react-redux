import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import AddPreset from './AddPreset';
import Button from '../Button';
import * as actions from '../../actions/presets';

class PresetBank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAdd: false
    };
    this.toggleEditModal = this.toggleEditModal.bind(this);
  }

  toggleEditModal() {
    this.setState({
      showAdd: !this.state.showAdd
    });
  }

  render() {
    const {loadedId, loadPreset, presets, removePreset, savePreset} = this.props;
    return (
      <div>
        <AddPreset
          close={this.toggleEditModal}
          save={this.props.saveNewPreset}
          show={this.state.showAdd}/>
        <Button
          active={Boolean(loadedId)}
          click={() => savePreset(loadedId)}
          text="Save Preset"/>
        <Button
          active
          click={this.toggleEditModal}
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
  }
}

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
