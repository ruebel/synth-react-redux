import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Modal from '../Modal';
import {addControl, assignControl, removeControl} from '../../actions/control';

const AssignControl = ({assignControl, note, show}) => {
  return show ? (
    <Modal close={assignControl}>
      <div>
        <h1>Assign MIDI Control</h1>
        <h3>* Use MIDI Control</h3>
        <h2>{note}</h2>
      </div>
    </Modal>
  ) : null;
};

AssignControl.propTypes = {
  assignControl: PropTypes.func.isRequired,
  note: PropTypes.object,
  show: PropTypes.bool
};

const mapStateToProps = (state) => ({
  note: state.control.last,
  show: Boolean(state.control.assign)
});

export default connect(mapStateToProps, {addControl, assignControl,removeControl})(AssignControl);
