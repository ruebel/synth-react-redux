import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Button from '../Button';
import RangeControl from '../RangeControl';
import Modal from '../Modal';
import {addControl, assignControl, removeControl} from '../../actions/control';
const styles = require('./styles.css');

const AssignControl = ({addControl, assignControl, control, note}) => {
  return control ? (
    <Modal close={addControl}>
      <div className={styles.wrapper}>
        <h1>Assign MIDI Control</h1>
        <h3 className={styles.control}>{control.effect} - {control.property}</h3>
        <div className={styles.midi}>
          {!note && <h3>* Activate MIDI Control</h3>}
          {note && (
            <div>
              <h3>
                Channel: <span>{note[0]}</span>
              </h3>
              <h3>
                Control: <span>{note[1]}</span>
              </h3>
              <RangeControl title="Value" value={note[2]} min={0} max={127} onSet={()=>1}/>
            </div>
          )}
        </div>
        <div className={styles.buttonRow}>
          <Button active click={() => assignControl(null)} text="Cancel" type="link"/>
          <Button active={Boolean(note)} click={() => addControl(control, note)} text="Assign Control"/>
        </div>
      </div>
    </Modal>
  ) : null;
};

AssignControl.propTypes = {
  addControl: PropTypes.func.isRequired,
  assignControl: PropTypes.func.isRequired,
  control: PropTypes.shape({
    id: PropTypes.string.isRequired,
    effect: PropTypes.string.isRequired,
    property: PropTypes.string.isRequired
  }),
  note: PropTypes.object,
  show: PropTypes.bool
};

const mapStateToProps = (state) => ({
  control: state.control.assign,
  note: state.control.last
});

export default connect(mapStateToProps, {addControl, assignControl,removeControl})(AssignControl);
