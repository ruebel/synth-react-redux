import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Button from '../Button';
import Modal from '../Modal';
import {addControl, assignControl, removeControl} from '../../actions/control';
const styles = require('./styles.css');

const AssignControl = ({assignControl, note, show}) => {
  return show ? (
    <Modal close={assignControl}>
      <div className={styles.wrapper}>
        <h1>Assign MIDI Control</h1>
        {!note && <h3>* Activate MIDI Control</h3>}
        {note && <h3>Channel: {note[0]} Control: {note[1]}</h3>}
        <div className={styles.buttonRow}>
          <Button click={() => 1} text="Cancel" type="link"/>
          <Button active={note} click={() => 1} text="Assign Control"/>
        </div>
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
