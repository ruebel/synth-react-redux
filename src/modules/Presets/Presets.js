import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import AddPreset from './components/AddPreset';
import Button from '../components/Button';
import Container from '../components/Container';
import * as actions from './actions';
import { getLoadedId, getPresets } from './selectors';

const Bank = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;

  & button {
    margin-right: 5px;
    flex: 1;
  }
`;

const Menu = styled.div`
  & button {
    margin-left: 2px;
    padding: 4px;
    min-height: 30px;
  }
`;

class Presets extends React.Component {
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
    const {
      loadedId,
      loadPreset,
      presets,
      removePreset,
      savePreset
    } = this.props;
    const menu = (
      <Menu>
        <Button
          active={Boolean(loadedId)}
          click={() => savePreset(loadedId)}
          text="Save"
        />
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
      </Menu>
    );
    return (
      <Container active title="Presets" titleControl={menu}>
        <AddPreset
          close={this.toggleEditModal}
          save={this.handleSave}
          show={this.state.showAdd}
        />
        <Bank>
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
        </Bank>
      </Container>
    );
  }
}

Presets.propTypes = {
  loadedId: PropTypes.string,
  loadPreset: PropTypes.func.isRequired,
  presets: PropTypes.array.isRequired,
  removePreset: PropTypes.func.isRequired,
  saveNewPreset: PropTypes.func.isRequired,
  savePreset: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loadedId: getLoadedId(state),
  presets: getPresets(state)
});

export default connect(mapStateToProps, actions)(Presets);
