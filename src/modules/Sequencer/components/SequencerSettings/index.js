import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Button from '../../../components/Button';
import ButtonGroup from '../../../components/ButtonGroup';
import Gear from '../../../components/icons/Gear';
import H1 from '../../../components/typography/H1';
import InputGroup from '../../../components/InputGroup';
import Modal from '../../../components/Modal';
import NumberInput from '../../../components/NumberInput';
import TimeSigEdit from './TimeSigEdit';
import { setSettings } from '../../actions';
import { getSettings } from '../../selectors';

const Wrapper = styled.div`
  width: 60vw;
  flex: 1;
`;

class SequencerSettings extends React.PureComponent {
  state = {
    hasChange: false,
    options: [],
    previous: this.props.settings,
    settings: this.props.settings
  };

  handleClose = () => {
    if (this.state.hasChange) {
      this.props.setSettings(this.state.previous);
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
      settings: {
        ...this.state.settings,
        [prop]: e.target ? Number.parseInt(e.target.value || 0) : e
      }
    });
  };

  handleSave = () => {
    this.props.setSettings(this.state.settings);
    this.setState({
      previous: this.state.settings
    });
    this.props.close();
  };

  render() {
    const icon = (
      <Gear fill="rgba(0, 0, 0, 0.3)" height="100vw" width="100vw" />
    );
    return this.props.show
      ? <Modal close={this.handleClose} icon={icon}>
          <Wrapper>
            <H1>Sequencer Settings</H1>
            <InputGroup label="Tempo" required require={this.state.tempo}>
              <NumberInput
                change={e => this.handleChange(e, 'tempo')}
                placeholder="Tempo (bpm)"
                required
                value={this.state.settings.tempo}
              />
            </InputGroup>
            <InputGroup
              label="Measures"
              required
              require={this.state.measureCnt}
            >
              <NumberInput
                change={e => this.handleChange(e, 'measureCnt')}
                placeholder="Measures"
                required
                value={this.state.settings.measureCnt}
              />
            </InputGroup>
            <TimeSigEdit
              change={e => this.handleChange(e, 'timeSig')}
              timeSig={this.state.settings.timeSig}
            />
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
  measureCnt: PropTypes.number,
  previous: PropTypes.object,
  settings: PropTypes.object,
  setSettings: PropTypes.func.isRequired,
  show: PropTypes.bool
};

const mapStateToProps = state => ({
  settings: getSettings(state)
});

export default connect(mapStateToProps, {
  setSettings
})(SequencerSettings);
