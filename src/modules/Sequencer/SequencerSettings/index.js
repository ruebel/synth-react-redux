import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Button from '../../components/Button';
import ButtonGroup from '../../components/ButtonGroup';
import Gear from '../../components/icons/Gear';
import InputGroup from '../../components/InputGroup';
import Modal from '../../components/Modal';
import TextInput from '../../components/TextInput';
const getSocketPrevious = () => ({});
const getSocketSettings = () => ({});

const Wrapper = styled.div`
  width: 60vw;
  flex: 1;
`;

class SequencerSettings extends React.Component {
  state = {
    hasChange: false,
    options: [],
    previous: this.props.settings,
    settings: this.props.settings,
    showRaw: false
  };

  handleClose = () => {
    if (this.state.hasChange) {
      this.props.save(this.state.previous);
    }
    this.setState({
      hasChange: false,
      settings: this.state.previous
    });
    this.props.close();
  };

  handleChange = (e, prop) => {
    this.setState({
      hasChange: true,
      settings: Object.assign(this.state.settings, {
        [prop]: e.target ? e.target.value : e
      })
    });
  };

  handleSave = () => {
    this.props.save(this.state.settings);
    this.setState({
      previous: this.state.settings
    });
  };

  render() {
    const icon = (
      <Gear fill="rgba(0, 0, 0, 0.3)" height="100vw" width="100vw" />
    );
    return this.props.show
      ? <Modal close={this.handleClose} icon={icon}>
          <Wrapper>
            <h1>Sequencer Settings</h1>
            <InputGroup label="Url" required require={this.state.url}>
              <TextInput
                change={e => this.handleChange(e, 'url')}
                placeholder="Url"
                required
                value={this.state.settings.url}
              />
            </InputGroup>
            <ButtonGroup>
              <Button
                active
                click={this.handleClose}
                text="Cancel"
                type="danger"
              />
              <Button
                active={Boolean(this.state.hasChange)}
                click={this.handleSave}
                text="Save"
              />
            </ButtonGroup>
          </Wrapper>
        </Modal>
      : null;
  }
}

SequencerSettings.propTypes = {
  close: PropTypes.func.isRequired,
  previous: PropTypes.object,
  save: PropTypes.func.isRequired,
  settings: PropTypes.object,
  show: PropTypes.bool
};

const mapStateToProps = state => ({
  previous: getSocketPrevious(state),
  settings: getSocketSettings(state)
});

export default connect(mapStateToProps, null)(SequencerSettings);
