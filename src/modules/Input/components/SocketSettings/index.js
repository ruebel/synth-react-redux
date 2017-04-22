import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Button from '../../../components/Button';
import ButtonGroup from '../../../components/ButtonGroup';
import Gear from '../../../components/icons/Gear';
import InputGroup from '../../../components/InputGroup';
import MinMax from '../../../components/MinMax';
import Modal from '../../../components/Modal';
import Refresh from '../../../components/icons/Refresh';
import TextInput from '../../../components/TextInput';
import {getSocketPrevious, getSocketSettings} from '../../selectors';
const styles = require('./styles.css');

class SocketSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasChange: false,
      previous: props.settings,
      raw: props.previous.raw,
      settings: props.settings
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.refreshMessage = this.refreshMessage.bind(this);
  }

  handleClose() {
    if (this.state.hasChange) {
      this.props.save(this.state.previous);
    }
    this.setState({
      hasChange: false,
      settings: this.state.previous
    });
    this.props.close();
  }

  handleChange(e, prop) {
    this.setState({
      hasChange: true,
      settings: Object.assign(this.state.settings, {
        [prop]: e.target ? e.target.value : e
      }),
      raw: prop === 'url' ? this.props.previous.raw : this.state.raw
    });
  }

  handleSave() {
    this.props.save(this.state.settings);
    this.setState({
      previous: this.state.settings
    });
  }

  refreshMessage() {
    this.setState({
      raw: this.props.previous.raw
    });
  }

  render() {
    const icon = <Gear fill="rgba(0, 0, 0, 0.3)" height="100vw" width="100vw"/>;
    return this.props.show ? (
      <Modal close={this.handleClose}
        icon={icon}
        >
        <h1>Socket Settings</h1>
        <InputGroup label="Url" required require={this.state.url}>
          <TextInput
            change={(e) => this.handleChange(e, 'url')}
            placeholder="Url"
            required
            value={this.state.settings.url}/>
        </InputGroup>
        <Refresh click={this.refreshMessage}/>
        <div className={styles.data}>
          <pre>
            {JSON.stringify(this.state.raw, null, 2)}
          </pre>
        </div>
        <InputGroup label="Note Length">
          <MinMax
            max={5000}
            min={0}
            step={10}
            onSet={(e) => this.handleChange(e, 'noteLength')}
            value={this.state.settings.noteLength}/>
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
      </Modal>
    ) : null;
  }
}

SocketSettings.propTypes = {
  close: PropTypes.func.isRequired,
  previous: PropTypes.object,
  save: PropTypes.func.isRequired,
  settings: PropTypes.object,
  show: PropTypes.bool
};

const mapStateToProps = (state) => ({
  previous: getSocketPrevious(state),
  settings: getSocketSettings(state)
});

export default connect(mapStateToProps, null)(SocketSettings);
