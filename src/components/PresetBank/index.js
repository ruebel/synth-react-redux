import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import AddPreset from './AddPreset';
import Button from '../Button';
import Container from '../Container';
import * as actions from '../../actions/presets';
const styles = require('./styles.css');

class PresetBank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAdd: false
    };
    this.handleSave = this.handleSave.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
  }

  handleSave(name) {
    this.toggleEditModal();
    this.props.saveNewPreset(name);
  }

  toggleEditModal() {
    this.setState({
      showAdd: !this.state.showAdd
    });
  }

  render() {
    const {loadedId, loadPreset, presets, removePreset, savePreset} = this.props;
    const menu = (
      <div className={styles.menu}>
        <Button
          active={Boolean(loadedId)}
          click={() => savePreset(loadedId)}
          text="Save"/>
        <Button
          active
          click={this.toggleEditModal}
          text="Save As"
          type="success"
        />
        <Button
          active={Boolean(loadedId)}
          click={() => removePreset(loadedId)}
          text="Remove"
          type="danger"
        />
      </div>
    );
    return (
      <Container active title="Presets" titleControl={menu}>
        <AddPreset
          close={this.toggleEditModal}
          save={this.handleSave}
          show={this.state.showAdd}/>
        <div className={styles.bank}>
          {presets.map((p, i) => {
            return (
              <Button
                active={p.id !== loadedId}
                click={() => loadPreset(p.id)}
                key={i}
                selected={p.id === loadedId}
                text={p.name}
                type={p.id !== loadedId ? 'empty' : 'success'}
              />
            );
          })}
        </div>
      </Container>
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
