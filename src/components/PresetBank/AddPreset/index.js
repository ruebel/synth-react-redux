import React, {PropTypes} from 'react';
import Modal from '../../Modal';

const AddPreset = ({close, show}) => {
  return show ? (
    <Modal close={close}>
      <h1>Add Preset</h1>
    </Modal>
  ) : null;
};

AddPreset.propTypes = {
  close: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  show: PropTypes.bool
};

export default AddPreset;
