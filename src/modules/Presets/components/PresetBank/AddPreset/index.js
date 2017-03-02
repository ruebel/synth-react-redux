import React, {PropTypes} from 'react';
import Button from '../../../../components/Button';
import InputGroup from './InputGroup';
import Modal from '../../../../components/Modal';
import TextInput from './TextInput';
const styles = require('./styles.css');

class AddPreset extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ''
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleClose() {
    this.setState({
      name: ''
    });
    this.props.close();
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleSave() {
    this.props.save(this.state.name);
    this.setState({
      name: ''
    });
  }

  render() {
    return this.props.show ? (
      <Modal close={this.handleClose}>
        <h1>Add Preset</h1>
        <InputGroup label="Preset Name" required require={this.state.name}>
          <TextInput
            change={this.handleNameChange}
            placeholder="Preset Name"
            required
            value={this.state.name}/>
        </InputGroup>
        <div className={styles.buttonGroup}>
          <Button
            active
            click={this.handleClose}
            text="Cancel"
            type="danger"
          />
          <Button
            active={Boolean(this.state.name)}
            click={this.handleSave}
            text="Save"
          />
        </div>
      </Modal>
    ) : null;
  }
}

AddPreset.propTypes = {
  close: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  show: PropTypes.bool
};

export default AddPreset;
